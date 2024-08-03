"use-client";
import StatusProfileContent from "@/components/statusProfile/statusProfile-content";
import { currentAccount } from "@/lib/account";
import { GetStudentLibByStudentCode } from "@/lib/student";
import { StudentLib } from "@/types";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const user = await currentAccount();
  if (!user) {
    redirect("/");
  }
  const student: StudentLib = await GetStudentLibByStudentCode(
    user?.studentCode || "",
  );
  return <StatusProfileContent student={student} />;
};
export default ProfilePage;
