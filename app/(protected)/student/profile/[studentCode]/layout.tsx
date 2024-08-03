import { ProfileHeader } from "@/components/profile/profile-header";
import { GetStudentLibByStudentCode } from "@/lib/student";
import { StudentLib } from "@/types";
import { redirect } from "next/navigation";

const ProfileIdLayout = async ({
  children,
  params: { studentCode },
}: {
  children: React.ReactNode;
  params: { studentCode: string };
}) => {
  const student: StudentLib = await GetStudentLibByStudentCode(studentCode);

  if (!student || !student.studentCode) {
    redirect("/");
  }

  if (!student.studentCode.match(studentCode)) {
    return <div className="hidden px-24 py-6 md:block"></div>;
  }

  return (
    <div className="hidden flex-col gap-3 px-24 py-6 md:flex">
      <ProfileHeader
        name={student.account.name}
        schoolName={student.school.name}
        coverUrl={student.cover || ""}
        logoUrl={student.account.image || undefined}
        postCount={student.profile.posts.length}
        profileId={student.profile.id}
      />
      {children}
    </div>
  );
};

export default ProfileIdLayout;
