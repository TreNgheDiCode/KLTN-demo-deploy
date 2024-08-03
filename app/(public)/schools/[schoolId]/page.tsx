import React from "react";
import getSchool from "@/actions/school/get-school";
import { HomeStay } from "@/components/school/homestay";
import { Blogs } from "@/components/school/blog";
import Program from "@/components/school/program";
import Welcome from "@/components/school/welcome";
import Operation from "@/components/school/operation";
export const revalidate = 0;

const TruongHocNamePage = async ({
  params,
}: {
  params: { schoolId: string };
}) => {
  const school = await getSchool(params.schoolId);

  if (!school) {
    return <>Không tìm thấy trường học</>;
  }
  return (
    <div>
      <Welcome school={school} />
      <Program />
      <div className="program-container rounded-lg px-6 py-12 text-center shadow-md"></div>
      <Operation />
      <HomeStay />
      <Blogs />
    </div>
  );
};
export default TruongHocNamePage;
