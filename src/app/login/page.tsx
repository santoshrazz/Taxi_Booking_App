import { auth } from "@/auth";
import LoginComp from "@/Components/loginComp";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }

  return (
    <div>
      <LoginComp />
    </div>
  );
};

export default page;
