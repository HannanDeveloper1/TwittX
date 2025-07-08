import { SignInSchemaType } from "@/app/(auth)/sign-in";
import { SignUpSchemaType } from "@/app/(auth)/sign-up";
export const signupUser = async (data: SignUpSchemaType) => {
  const req = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
    credentials: "include",
  });

  const res = await req.json();
  return res;
};

export const signinUser = async (data: SignInSchemaType) => {
  const req = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
    credentials: "include",
  });

  const res = await req.json();
  return res;
};

export const authorizeUser = async () => {
  const req = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth`, {
    method: "GET",
    credentials: "include",
  });

  const res = await req.json();
  return res;
};

export const signout = async () => {
  const req = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/signout`, {
    method: "GET",
    credentials: "include",
  });
  const res = await req.json();
  return res;
};
