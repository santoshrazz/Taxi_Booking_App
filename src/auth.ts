import NextAuth, { CredentialsSignin } from "next-auth";
import credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

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
        const { email, password } = credentials;
        try {
          if (!email || !password) {
            throw new Error("All fields require");
          }
          if (email === "santoshrajbgp11@gmail.com") {
            return { id: "1", name: "Santosh" };
          } else {
            throw new Error("No user found with this email");
          }
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
