import SocialContent from "@/components/Social/social-content";
import { currentAccount } from "@/lib/account";
import { GetStudentLibByStudentCode } from "@/lib/student";
import { StudentLib } from "@/types";
import { redirect } from "next/navigation";
const Social = async () => {
  const user = await currentAccount();
  if (!user) {
    redirect("/");
  }
  const student: StudentLib = await GetStudentLibByStudentCode(
    user.student.studentCode,
  );
  return <SocialContent student={student} />;
};
export default Social;
