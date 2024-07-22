import React from "react";
import { redirect } from "next/navigation";
import getSchool from "@/actions/school/get-school";
import { HomeStay } from "@/components/school/homestay";
import { Blogs } from "@/components/school/blog";
import { Operation } from "@/components/school/operation";
import Program from "@/components/school/program";
import { Operation2 } from "@/components/school/operation2";
import Welcome from "@/components/school/welcome";
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
      <div className="program-container rounded-lg px-6 py-12 text-center shadow-md">
        <h3 className="text-center text-4xl font-extrabold text-black dark:text-primary sm:text-5xl lg:text-6xl">
          Cơ sở chính
        </h3>
        <div className="flex flex-col items-center justify-center space-y-8 md:flex-row md:space-x-8 md:space-y-0">
          <Operation />
          <Operation2 />
        </div>
      </div>
      <HomeStay />
      <Blogs />
    </div>
  );
};
export default TruongHocNamePage;
