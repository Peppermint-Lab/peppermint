import NextAuth from "next-auth";
import Providers from "next-auth/providers/credentials";
import KeycloakProvider from "next-auth/providers/keycloak";
import bcrypt from "bcrypt";
import { prisma } from "../../../prisma/prisma";

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    KeycloakProvider({
      clientId: "peppermint-keycloak",
      clientSecret: "fwsPHsJ6S6YpVmfUep9X7wcT0hgJBOUm",
      issuer: "http://localhost:8080/realms/peppermint",
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
          throw new Error(error);
        }
      },
    }),
  ],
  secret: "yudjXHbqE5VH4LkwZ4srgsdL2EZrjp",
  session: {
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
      return baseUrl
    },
    async session({ session, token, user }) {
      // checking for user changes on: language, email & name
      console.log(token);
      const check_user = await prisma.user.findUnique({
        where: { email: token.email },
      });

      if (!check_user) throw new Error("No user found");

      session.id = check_user.id;
      session.user = token.user;
      return Promise.resolve(session);
    },
  },
  debug: true,
};

export default (req, res) => NextAuth(req, res, options);
