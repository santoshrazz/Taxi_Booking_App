import NextAuth, { CredentialsSignin } from "next-auth";
import credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { connectToDb } from "./Db/db.config";
import { UserModel } from "./models/user.model";
import bcryptjs from "bcryptjs";
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Google,
    credentials({
      credentials: {
        email: {
          label: "Your Email",
          placeholder: "some@gmail.com",
          type: "email",
        },
        password: {
          label: "Password",
          placeholder: "******",
          type: "password",
        },
      },
      async authorize(credentials) {
        // const { email, password } = credentials;
        const email = credentials.email as string;
        const password = credentials.password as string;
        if (!email || !password) {
          throw new Error("All fields require");
        }
        try {
          await connectToDb();
          const user = await UserModel.findOne({ email });
          if (!user) {
            throw new Error("No user exists");
          }
          const isPasswordCorrect = await bcryptjs.compare(
            password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("User password incorrect");
          }
          return user;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: "secretisNextAuthSecret",
});
