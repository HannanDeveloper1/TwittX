import { CreatePostSchemaType } from "@/app/(root)/createpost";

// Fix: send FormData, not JSON, and do not set Content-Type (let browser set it)
export const createPost = async (formData: FormData) => {
  const req = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/post`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  const res = await req.json();
  return res;
};
