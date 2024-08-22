export const GetStudentLibByStudentCode = async (studentCode: string) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/accounts/students/profiles/${studentCode}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  const data = await req.json();
  return data;
};
export const GetStudentLibByEmail = async (email: string) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/accounts/students/email/${email}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  const data = await req.json();
  return data;
};
