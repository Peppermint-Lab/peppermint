import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Providers from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";
import AzureADProvider from "next-auth/providers/azure-ad";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../../../prisma/prisma";

const options = {
  site: process.env.NEXTAUTH_URL,
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.SSO_GITHUB_CLIENTID,
      clientSecret: process.env.SSO_GITHUB_CLIENTSECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Auth0Provider({
      clientId: process.env.SSO_AUTH0_CLIENTID,
      clientSecret: process.env.SSO_AUTH0_CLIENTSECRET,
      issuer: process.env.SSO_AUTH0_ISSUER,
      allowDangerousEmailAccountLinking: true,
    }),
    AzureADProvider({
      clientId: process.env.SSO_AZAD_CLIENTID,
      clientSecret: process.env.SSO_AZAD_CLIENTSECRET,
      tenantId: process.env.SSO_AZAD_TENANTID,
    }),
    Providers({
      name: "Credentials",
      async authorize(credentials, req, res) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) throw new Error("No user found");

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) throw new Error("Password is not valid");

          return {
            email: user.email,
            id: user.id,
            name: user.name,
            isAdmin: user.isAdmin,
            language: user.language,
            ticket_created: user.notify_ticket_created,
            ticket_status_changed: user.notify_ticket_status_changed,
            ticket_comments: user.notify_ticket_comments,
            ticket_assigned: user.notify_ticket_assigned,
          };
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
      },
    }),
  ],
  secret: "yudjXHbqE5VH4LkwZ4srgsdL2EZrjp",
  session: {
    strategy: "jwt",
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  database: process.env.DATABASE_URL,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      // checking for user changes on: language, email & name
      const check_user = await prisma.user.findUnique({
        where: { email: user !== undefined ? user.email : token.email },
      });

      if (!check_user) throw new Error("No user found");

      // console.log("TOKEN: ", token);
      // console.log("SESSION: ", session);
      // console.log("USER: ", user);

      if (!user) {
        session.user = token;
        session.user.id = check_user.id;
        session.user.isAdmin = check_user.isAdmin
        return Promise.resolve(session);
      } else {
        session.user = user;
        session.user.id = check_user.id;
        session.user.isAdmin = check_user.isAdmin
        return Promise.resolve(session);
      }
    },
  },
  debug: false,
};

export default (req, res) => NextAuth(req, res, options);
