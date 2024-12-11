import { CrispProvider } from "@/scripts/crisp-provider";
import { ProfileInformation } from "@/components/profile/profile-information";
import { ProfilePosts } from "@/components/profile/post/profile-post";
import { ProfilePostsList } from "@/components/profile/post/profile-posts-list";
import { GetStudentLibByStudentCode } from "@/lib/student";
import { StudentLib } from "@/types";
import { redirect } from "next/navigation";

const ProfileIdPage = async ({
  params: { studentCode },
}: {
  params: { studentCode: string };
}) => {
  if (!studentCode) {
    redirect("/");
  }
  const student: StudentLib = await GetStudentLibByStudentCode(studentCode);
  return (
    <div className="relative flex flex-col gap-4 p-4 md:grid md:grid-cols-12">
      {/* Phần thông tin profile */}
      <div className="md:col-span-3">
        <ProfileInformation
          address={student.account.address}
          dob={student.account.dob}
          schoolLogo={student.school.logo}
          schoolName={student.school.name}
          biography={student.profile.biography}
        />
      </div>
      {/* Phần bài viết và danh sách bài viết */}
      <div className="md:col-span-9">
        <ProfilePosts
          name={student.account.name}
          image={student.account.image || undefined}
        />
        <div className="flex flex-col gap-4 text-primary">
          {student.profile.posts.length > 0 && (
            <ProfilePostsList
              posts={student.profile.posts}
              name={student.account.name}
              logo={student.account.image || ""}
              profileId={student.profile.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileIdPage;
