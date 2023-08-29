import NextAuth from "next-auth";
import Providers from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "../../../prisma/prisma";
import AzureADProvider from "next-auth/providers/azure-ad";

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
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
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
    jwt: async ({ token, user, account }) => {
      if (!user) {
        return token;
      }
    
      token.user = {
        id: user.id,
        isAdmin: user.isAdmin,
      };
    
      token.accessToken = account.access_token;
    
      if (account.provider === 'azure-ad') {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        
        const hash = await bcrypt.hash("PASS_THE_HASH", 10);
        const userToCreate = {
          password: hash,
          email: user.email,
          name: user.name,
          isAdmin: false,
        };
    
        if (!dbUser) {
          const newUser = await prisma.user.create({
            data: userToCreate,
            select: { id: true }
          });
          token.user.id = newUser.id;
          token.user.isAdmin = false;
        } else {
          token.user.id = dbUser.id;
          token.user.isAdmin = dbUser.isAdmin;
        }
      }
    
      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.id = token.user.id;
      session.user.isAdmin = token.user.isAdmin;
      session.user.id = token.user.id;
      return session;
      
    },
  },
  
  debug: true,
};

export default (req, res) => NextAuth(req, res, options);

