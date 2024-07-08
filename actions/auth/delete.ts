"use server";

import { DeleteFormValues, DeleteSchema } from "@/schemas";

export const deleteAccount = async (values: DeleteFormValues) => {
  try {
    const validatedFields = DeleteSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields." };
    }

    const data = validatedFields.data;

    const req = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/delete`, {
      method: "DELETE",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await req.json();

    if (res.error) {
      return { error: res.error };
    }

    if (res.message) {
      return { messsage: res.message };
    }

    return { success: res.success };
  } catch (error) {
    console.log("DELETE ACCOUNT ERROR: ", error);

    return {
      error:
        "An error occurred while deleting your account. Please try again later.",
    };
  }
};

export const confirmDelete = async (token?: string) => {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/auth/delete/${token}`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const res = await req.json();

    if (res.error) {
      return { error: res.error };
    }

    return { success: res.success };
  } catch (error) {
    console.log("CONFIRM DELETE ERROR: ", error);

    return {
      error:
        "An error occurred while confirming the deletion of your account. Please try again later.",
    };
  }
};
