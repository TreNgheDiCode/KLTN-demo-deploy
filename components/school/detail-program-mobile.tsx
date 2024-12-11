import Image from "next/image";
import { Montserrat } from "next/font/google";
import { useTranslation } from "react-i18next";

const font = Montserrat({ weight: "500", subsets: ["vietnamese"] });

export const DetailProgramMobile = () => {
  const { t } = useTranslation("school");
  return (
    <div className="mx-auto w-[70%]">
      <span className="text-xl font-bold">{t("DeatilProgram")}</span>

      <div className="mt-8 text-center text-4xl font-bold text-[#001524] dark:text-primary">
        {t("InformationProgram")} MOBILE
      </div>

      <div className="mt-6 rounded-3xl border-2 border-[#61677A] bg-[#D8D9DA] p-6 dark:bg-black">
        <div className="">
          <Image
            width={352}
            height={329}
            alt=""
            src={"/ltmobile.jpg"}
            className="col-span-1 mb-4 h-auto w-full rounded-lg object-cover lg:mb-0"
          />
          <div className="text-justify">
            <p className="text-gray-700">
              Chương trình đào tạo phát triển ứng dụng di động tại Cornerstone
              International College kéo dài từ 1 đến 2 năm, tùy thuộc vào lộ
              trình học mà sinh viên chọn. Chương trình cung cấp các kiến thức
              và kỹ năng cần thiết để phát triển ứng dụng di động cho cả iOS và
              Android, bao gồm lập trình, thiết kế giao diện, và tối ưu hóa hiệu
              suất ứng dụng.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-4xl font-bold text-[#001524] dark:text-primary">
        {t("EducationProgram")}
      </div>

      <div className="mt-6 rounded-3xl border-2 border-[#61677A] bg-[#D8D9DA] p-6 dark:bg-black">
        <div className="">
          <div className="col-span-2 mb-4 text-justify lg:mb-0">
            <h2 className="mb-4 text-2xl font-semibold">
              Cấu trúc chương trình
            </h2>

            <h3 className="mt-4 text-xl font-semibold">Học kỳ 1: Nền tảng</h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Introduction to Mobile Development:</strong> Tổng quan
                về phát triển ứng dụng di động, bao gồm các công nghệ phổ biến
                như React Native và Flutter.
              </li>
              <li>
                <strong>Programming Fundamentals:</strong> Ngôn ngữ lập trình cơ
                bản như JavaScript cho React Native và Dart cho Flutter.
              </li>
              <li>
                <strong>UI/UX Design for Mobile:</strong> Nguyên tắc thiết kế
                giao diện người dùng và trải nghiệm người dùng cho ứng dụng di
                động.
              </li>
            </ul>

            <h3 className="mt-4 text-xl font-semibold">
              Học kỳ 2: Phát triển ứng dụng
            </h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Advanced Mobile Development:</strong> Kỹ thuật lập trình
                nâng cao, bao gồm quản lý trạng thái, và tích hợp API.
              </li>
              <li>
                <strong>Cross-Platform Development:</strong> Phát triển ứng dụng
                cho cả iOS và Android bằng React Native hoặc Flutter.
              </li>
              <li>
                <strong>Performance Optimization:</strong> Tối ưu hóa hiệu suất
                ứng dụng và xử lý các vấn đề liên quan đến hiệu suất.
              </li>
            </ul>

            <h3 className="mt-4 text-xl font-semibold">
              Học kỳ 3: Ứng dụng và thực hành
            </h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Full-Stack Mobile Development:</strong> Phát triển ứng
                dụng di động toàn diện từ front-end đến back-end.
              </li>
              <li>
                <strong>Capstone Project:</strong> Dự án tốt nghiệp, nơi sinh
                viên thiết kế và phát triển một ứng dụng di động từ đầu đến
                cuối.
              </li>
              <li>
                <strong>Industry Practice:</strong> Thực tập và làm việc với các
                dự án thực tế để tích lũy kinh nghiệm làm việc.
              </li>
            </ul>

            <h2 className="mb-4 text-2xl font-semibold">
              Phương pháp giảng dạy
            </h2>
            <ul className="list-disc pl-6">
              <li>
                <strong>Lý thuyết kết hợp thực hành:</strong> Cân bằng giữa lý
                thuyết và thực hành, với nhiều dự án thực tế để sinh viên áp
                dụng kiến thức.
              </li>
              <li>
                <strong>Hướng dẫn từ các chuyên gia:</strong> Sinh viên được
                hướng dẫn bởi các giảng viên và chuyên gia có kinh nghiệm trong
                lĩnh vực phát triển ứng dụng di động.
              </li>
              <li>
                <strong>Dự án nhóm và cá nhân:</strong> Phát triển kỹ năng cá
                nhân và làm việc nhóm qua các dự án thực tế.
              </li>
            </ul>
            <h2 className="mb-4 text-2xl font-semibold">Cơ hội nghề nghiệp</h2>
            <ul className="list-disc pl-6">
              <li>Mobile App Developer</li>
              <li>Cross-Platform Developer</li>
              <li>UI/UX Designer for Mobile</li>
              <li>Full-Stack Mobile Developer</li>
              <li>Mobile Project Manager</li>
            </ul>
            <h2 className="mb-4 text-2xl font-semibold">
              Học phí và điều kiện nhập học
            </h2>
            <p className="text-gray-700">
              <strong>Học phí:</strong> Dao động từ 15,000 CAD đến 25,000 CAD
              mỗi năm, tùy thuộc vào lộ trình học.
            </p>
            <p className="text-gray-700">
              <strong>Điều kiện nhập học:</strong> Tốt nghiệp THPT và yêu cầu
              trình độ tiếng Anh (IELTS hoặc tương đương).
            </p>
            <p className="text-gray-700">
              <strong>Cách đăng ký:</strong>
              <br />
              Website:{" "}
              <a
                href="https://www.ciccc.ca/"
                className="text-blue-600 hover:underline"
              >
                Cornerstone International Community College of Canada
              </a>
              <br />
              Hotline:{" "}
              <a
                href="tel:+16046201111"
                className="text-blue-600 hover:underline"
              >
                +1 604-620-1111
              </a>
            </p>
          </div>
          <Image
            width={352}
            height={329}
            alt=""
            src={"/ltmobile1.jpg"}
            className="col-span-1 h-auto w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailProgramMobile;
