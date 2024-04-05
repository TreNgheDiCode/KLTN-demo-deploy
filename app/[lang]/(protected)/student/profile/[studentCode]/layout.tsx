import { ProfileHeader } from "@/components/profile/profile-header";
import { GetPostsLib } from "@/lib/profile/post";
import { GetProfileLib } from "@/lib/profile/profile";

const ProfileIdLayout = async ({
  children,
  params: { studentCode },
}: {
  children: React.ReactNode;
  params: { studentCode: string };
}) => {
  const profile = await GetProfileLib(studentCode);
  const posts = await GetPostsLib();

  if (!profile.user?.studentCode.match(studentCode)) {
    return <div className="hidden px-24 py-6 md:block"></div>;
  }

  return (
    <div className="hidden flex-col gap-3 px-24 py-6 md:flex">
      <ProfileHeader
        name={profile.user?.name!}
        schoolName={profile.user.school?.name!}
        coverUrl={profile?.coverImage || ""}
        logoUrl={profile.user?.image || undefined}
        postCount={posts.length}
      />
      {children}
    </div>
  );
};

export default ProfileIdLayout;
