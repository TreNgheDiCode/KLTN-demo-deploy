"use-client";
import StatusProfileContent from "@/components/statusProfile/statusProfile-content";
import StatusProfileNotMSSVContent from "@/components/statusProfile/statusProfile-notMSSV-content";
import { currentAccount } from "@/lib/account";
import {
  GetStudentLibByEmail,
  GetStudentLibByStudentCode,
} from "@/lib/student";
import { StudentEmail, StudentLib } from "@/types";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const user = await currentAccount();
  const email = user?.email;
  if (!user) {
    redirect("/");
  }

  if (!user.student.studentCode) {
    const account: StudentEmail = await GetStudentLibByEmail(email || "");
    return <StatusProfileNotMSSVContent account={account} />;
  }
  const student: StudentLib = await GetStudentLibByStudentCode(
    user?.student.studentCode || "",
  );
  return <StatusProfileContent student={student} />;
};
export default ProfilePage;
