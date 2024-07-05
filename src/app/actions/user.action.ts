import axios from "axios";
import { signIn } from "next-auth/react";

export const signupUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post("/api/signup", { name, email, password });
    return response.data;
  } catch (error: any) {
    console.log(`Error while creating user`, error);
    return error;
  }
};

export const loginToUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const loginResponse = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });
  return loginResponse;
};

export const loginWithGoogle = async () => {
  try {
    const response = await signIn("google");
    console.log(response);
  } catch (error) {
    console.log("error in login with google", error);
  }
};
