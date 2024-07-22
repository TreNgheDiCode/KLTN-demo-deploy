// đây là call api của ngành học
const URL = `${process.env.NEXT_PUBLIC_API_URL}/school/programs`;

const getProgram = async (nameTruong: string) => {
  const res = await fetch(`${URL}/${nameTruong}`);
  if (!res.ok) {
    throw new Error("Lấy ngành học thất bại ");
  }
  return res.json();
};
export default getProgram;
