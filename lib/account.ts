import { auth } from "@/auth";

export const currentAccount = async () => {
  const session = await auth();

  if (!session?.user.email) {
    return null;
  }

  return session?.user;
};

export const GetAccountIdLib = async (id: string) => {
  try {
    const req = await fetch(`${process.env.API_URL}/api/accounts/${id}`);

    const res = await req.json();

    if (res.error) {
      return null;
    }

    return res;
  } catch (error) {
    return null;
  }
};
