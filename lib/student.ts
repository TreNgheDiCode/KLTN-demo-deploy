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
