"use server";
export const updatePhoneNumber = async (
  accountId: string,
  phoneNumber: string,
) => {
  try {
    const Url = `${process.env.NEXT_PUBLIC_API}/api/accounts/${accountId}/phoneNumber`;
    const fetchUrl = fetch(Url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }),
    });
    const res = (await fetchUrl).json();
    return res;
  } catch (error) {
    return { error: "Lỗi" };
  }
};
