"use server";

import prisma from "@/lib/db";
import { signIn as authSignIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export const signIn = async ({ data }: { data: { email: string } }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) return { error: "ACCOUNT_NOT_FOUND" };

  //send email verefication link.
  await authSignIn("nodemailer", {
    email: data.email,
    redirect: false,
  });

  redirect("/auth/verify-email");
};

export const signUp = async ({
  data,
}: {
  data: { name: string; email: string };
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) return { error: "ACCOUNT_ALREADY_EXISTS" };

  //create user.

  await prisma.user.create({ data });

  //send email verefication link.
  await authSignIn("nodemailer", {
    email: data.email,
    redirect: false,
  });

  redirect("/auth/verify-email");
};
