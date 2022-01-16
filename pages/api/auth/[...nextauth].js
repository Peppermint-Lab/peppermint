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
          };
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: "lXVsKy1aOGTyAgrqdU5JBa8J5Iu+sRdJ1e9LEH++dtM=",
  database: process.env.DATABASE_URL,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // console.log(token, user)
      user && (token.user = user)

      return token
  },
    async session({ session, token, user }) {
      // console.log(session, user, token)
      session.accessToken = token.accessToken
      session.id = token.user.id
      return session
    }
  },
  debug: true,
};

export default (req, res) => NextAuth(req, res, options);
