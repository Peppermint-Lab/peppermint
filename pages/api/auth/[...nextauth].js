import NextAuth from "next-auth";
import Providers from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "../../../prisma/prisma";

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
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
            ticket_created: user.ticket_created,
            ticket_status_changed: user.ticket_status_changed,
            ticket_comments: user.ticket_comments,
            ticket_assigned: user.ticket_assigned,
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
      console.log(token);
      user && (token.user = user);
      return token;
    },
    async session({ session, token, user }) {
      // checking for user changes on: language, email & name
      const check_user = await prisma.user.findUnique({
        where: { id: token.user.id },
      });

      if (!check_user) throw new Error("No user found");

      session.id = token.user.id;
      session.user = token.user

      // session.accessToken = token.accessToken;
      // session.user.isAdmin = token.user.isAdmin;
      // session.user.id = token.user.id;
      // session.user.language =
      //   token.user.language !== check_user.language
      //     ? check_user.language
      //     : token.user.language;
      // session.user.name =
      //   token.name.language !== check_user.name
      //     ? check_user.name
      //     : token.user.name;
      // session.user.email =
      //   token.user.email !== check_user.email
      //     ? check_user.email
      //     : token.user.email;
      return Promise.resolve(session);
    },
  },
  debug: true,
};

export default (req, res) => NextAuth(req, res, options);
