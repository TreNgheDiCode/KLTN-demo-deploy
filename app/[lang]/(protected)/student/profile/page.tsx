import * as React from "react";

import { HomePage } from "@/components/profile/HomeProfile/home-page";
import { currentAccount } from "@/lib/account";
import { redirect } from "next/navigation";
import { GetStudentLibByStudentCode } from "@/lib/student";
import { StudentLib } from "@/types";
const StudentProfilePage = async () => {
  const user = await currentAccount();

  if (!user) {
    redirect("/"); // Trả về trang chủ
  }
  const student: StudentLib = await GetStudentLibByStudentCode(
    user.studentCode,
  );

  return (
    <>
      <div className="container flex bg-white py-8 text-primary dark:bg-background">
        <HomePage student={student} />
      </div>
    </>
  );
};
export default StudentProfilePage;
