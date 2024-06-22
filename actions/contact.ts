"use server";

import { ContactSchema } from "@/schemas";
import { z } from "zod";

export const createContact = async (values: z.infer<typeof ContactSchema>) => {
  try {
    const validatedFields = ContactSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Trường dữ liệu không hợp lệ" };
    }

    const { ...data } = validatedFields.data;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/contacts`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const contact = await res.json();

    if (!contact.id) {
      return { error: "Gửi phản hồi thất bại" };
    }

    return { success: "Gửi phản hồi thành công" };
  } catch (error) {
    console.log("ERROR CREATE CONTACT ACTION", error);

    return { error: "Gửi phản hồi thất bại" };
  }
};
