import NextAuth from "next-auth";
import Providers from "next-auth/providers/credentials";

const options = {
    site: process.env.NEXTAUTH_URL,
    providers: [
      Providers({
        name: "Credentials",
        async authorize(credentials, req, res) {
          try {
            // const { db } = await connectToDatabase();
            // const user = await db.collection("users").findOne({
            //   email: credentials.email,
            // });
  
            // if (!user) throw new Error("No user found");
  
            // const isPasswordValid = await verifyPassword(
            //   credentials.password,
            //   user.password
            // );
  
            // if (!isPasswordValid) throw new Error("Password is not valid");
  
            // return {
            //   email: user.email,
            //   id: user._id,
            // };
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
    secret: 'lXVsKy1aOGTyAgrqdU5JBa8J5Iu+sRdJ1e9LEH++dtM=',
    database: process.env.DATABASE_URL,
    pages: {
      signIn: "/auth/login",
    },
    debug: true,
  };
  
  export default (req, res) => NextAuth(req, res, options);