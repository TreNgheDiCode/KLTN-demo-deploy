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

  if (!user.studentCode) {
    return (
      <div className="flex h-screen items-center justify-center text-center text-[24px] font-bold text-primary dark:text-white">
        <p>Bạn chưa được nhà trường xác thực tài khoản!!.</p>
      </div>
    );
  }

  const student: StudentLib = await GetStudentLibByStudentCode(
    user.studentCode,
  );

  return <SocialContent student={student} />;
};

export default Social;
