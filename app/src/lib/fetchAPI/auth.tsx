import { SchemaType } from "@/app/(auth)/sign-up";
export const signupUser = async (data: SchemaType) => {
  console.log(`${process.env.EXPO_PUBLIC_API_URL}/auth/signup`);
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
