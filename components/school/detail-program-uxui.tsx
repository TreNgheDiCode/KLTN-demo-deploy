import Image from "next/image";
import { Montserrat } from "next/font/google";
import { useTranslation } from "react-i18next";

const font = Montserrat({ weight: "500", subsets: ["vietnamese"] });

export const DetailProgramUXUI = () => {
  const { t } = useTranslation("school");
  return (
    <div className="mx-auto w-[70%]">
      <span className="text-xl font-bold">{t("DeatilProgram")}:</span>
      <div className="mt-8 text-center text-4xl font-bold text-[#001524] dark:text-primary">
        {t("InformationProgram")} UX/UI
      </div>

      <div className="mt-6 rounded-3xl border-2 border-[#61677A] bg-[#D8D9DA] p-6 dark:bg-black">
        <div className="">
          <Image
            width={352}
            height={329}
            alt=""
            src={"/uiux.jpg"}
            className="col-span-1 mb-4 h-auto w-full rounded-lg object-cover lg:mb-0"
          />
          <div className="text-justify">
            Khóa học UX/UI tại Cornerstone được tích hợp trong các chương trình
            như Cử nhân Thiết kế (Design) và Cử nhân Truyền thông đa phương tiện
            (Multimedia Communication). Khóa học này cung cấp kiến thức và kỹ
            năng cần thiết để sinh viên có thể thiết kế các sản phẩm kỹ thuật số
            với trải nghiệm người dùng tốt nhất.
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-4xl font-bold text-[#001524] dark:text-primary">
        {t("EducationProgram")}
      </div>

      <div className="mt-6 rounded-3xl border-2 border-[#61677A] bg-[#D8D9DA] p-6 dark:bg-black">
        <div className="">
          <div className="col-span-2 mb-4 text-justify">
            <h3 className="mt-4 text-xl font-semibold">Học kỳ 1: Nền tảng</h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Introduction to UI/UX Design:</strong> Tổng quan về
                thiết kế giao diện người dùng và trải nghiệm người dùng, bao gồm
                các nguyên tắc cơ bản và công cụ thiết kế.
              </li>
              <li>
                <strong>Graphic Design Fundamentals:</strong> Nguyên tắc thiết
                kế đồ họa, bao gồm màu sắc, typography, và bố cục, sử dụng các
                phần mềm như Adobe XD và Figma.
              </li>
              <li>
                <strong>User Research and Analysis:</strong> Phương pháp nghiên
                cứu người dùng và phân tích dữ liệu người dùng để cải thiện
                thiết kế.
              </li>
            </ul>

            <h3 className="mt-4 text-xl font-semibold">
              Học kỳ 2: Phát triển chuyên môn
            </h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Advanced UI/UX Design:</strong> Thiết kế giao diện người
                dùng nâng cao, bao gồm thiết kế phản hồi và tương tác.
              </li>
              <li>
                <strong>Prototyping and Wireframing:</strong> Tạo wireframes và
                prototypes để kiểm tra và trình bày ý tưởng thiết kế.
              </li>
              <li>
                <strong>User Testing:</strong> Phương pháp kiểm thử người dùng
                để đánh giá và cải thiện trải nghiệm người dùng.
              </li>
            </ul>

            <h3 className="mt-4 text-xl font-semibold">
              Học kỳ 3: Ứng dụng và thực hành
            </h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Capstone Project:</strong> Dự án tốt nghiệp, nơi sinh
                viên sẽ thiết kế và phát triển một sản phẩm UI/UX từ đầu đến
                cuối.
              </li>
              <li>
                <strong>Industry Practice:</strong> Thực tập và làm việc với các
                dự án thực tế để tích lũy kinh nghiệm làm việc trong ngành thiết
                kế UI/UX.
              </li>
            </ul>

            <h2 className="mb-4 text-2xl font-semibold">
              Phương pháp giảng dạy
            </h2>
            <ul className="list-disc pl-6">
              <li>
                <strong>Lý thuyết kết hợp thực hành:</strong> Cung cấp sự cân
                bằng giữa lý thuyết và thực hành, với nhiều dự án thực tế để
                sinh viên áp dụng kiến thức.
              </li>
              <li>
                <strong>Hướng dẫn từ các chuyên gia:</strong> Sinh viên được
                hướng dẫn bởi các giảng viên và chuyên gia có kinh nghiệm trong
                ngành thiết kế UI/UX.
              </li>
              <li>
                <strong>Dự án nhóm và cá nhân:</strong> Phát triển kỹ năng cá
                nhân và làm việc nhóm qua các dự án thực tế.
              </li>
            </ul>

            <h2 className="mb-4 text-2xl font-semibold">Cơ hội nghề nghiệp</h2>
            <ul className="list-disc pl-6">
              <li>UI/UX Designer</li>
              <li>UX Researcher</li>
              <li>Interaction Designer</li>
              <li>Product Designer</li>
              <li>Design Consultant</li>
            </ul>

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
            src={"/uiux1.png"}
            className="col-span-1 h-auto w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailProgramUXUI;
