import { CrispProvider } from "@/scripts/crisp-provider";
import { ProfileInformation } from "@/components/profile/profile-information";
import { ProfilePosts } from "@/components/profile/post/profile-post";
import { ProfilePostsList } from "@/components/profile/post/profile-posts-list";
import { GetStudentLibByStudentCode } from "@/lib/student";
import { StudentLib } from "@/types";
const ProfileIdPage = async ({
  params: { studentCode },
}: {
  params: { studentCode: string };
}) => {
  const student: StudentLib = await GetStudentLibByStudentCode(studentCode);
  return (
    <div className="relative hidden gap-4 md:grid lg:grid-cols-12">
      <div className="lg:col-span-3">
        <ProfileInformation
          address={student.account.address}
          dob={student.account.dob}
          schoolLogo={student.school.logo}
          schoolName={student.school.name}
          biography={student.profile.biography}
        />
      </div>
      <div className="lg:col-span-9">
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
          <CrispProvider />
        </div>
      </div>
    </div>
  );
};

export default ProfileIdPage;
