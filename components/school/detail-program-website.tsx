import Image from "next/image";
import { Montserrat } from "next/font/google";
import { useTranslation } from "react-i18next";

const font = Montserrat({ weight: "500", subsets: ["vietnamese"] });

export const DetailProgramWebsite = () => {
  const { t } = useTranslation("school");
  return (
    <div className="mx-auto h-auto w-[70%]">
      <span className="text-xl font-bold">{t("DeatilProgram")}</span>

      <div className="mt-8 text-center text-4xl font-bold text-[#001524] dark:text-primary">
        {t("InformationProgram")} Website
      </div>

      <div className="mt-6 rounded-3xl border-2 border-[#61677A] bg-[#D8D9DA] p-6 dark:bg-black">
        <div className="">
          <Image
            width={352}
            height={329}
            alt=""
            src={"/program1.png"}
            className="col-span-1 mb-4 h-auto w-full rounded-lg object-cover"
          />
          <div className="">
            Khóa học phát triển website tại Đại học Cornerstone được tích hợp
            trong các chương trình đào tạo như Cử nhân Công nghệ Thông tin (IT)
            và Cử nhân Thiết kế (Digital Media). Khóa học này tập trung vào việc
            cung cấp kiến thức và kỹ năng cần thiết để thiết kế, phát triển, và
            quản lý các trang web hiện đại. 1. Tổng quan về khóa học Khóa học
            phát triển website tại Cornerstone cung cấp cho sinh viên những kiến
            thức từ cơ bản đến nâng cao về lập trình web, thiết kế giao diện
            người dùng (UI), và trải nghiệm người dùng (UX). Sinh viên sẽ học
            cách tạo ra các trang web tương tác, tối ưu hóa hiệu suất, và đảm
            bảo tính bảo mật.
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-4xl font-bold text-[#001524] dark:text-primary">
        CHƯƠNG TRÌNH ĐÀO TẠO
      </div>
      <div className="mt-6 rounded-3xl border-2 border-[#61677A] bg-[#D8D9DA] p-6 dark:bg-black">
        <div className="">
          <div className="col-span-2 mb-4 text-justify lg:mb-0">
            <h2 className="mb-4 text-2xl font-semibold">
              Tổng quan về chương trình
            </h2>
            <p className="text-gray-700">
              Chương trình đào tạo phát triển website tại Cornerstone
              International College kéo dài từ 1 đến 2 năm, tùy thuộc vào lộ
              trình học mà sinh viên chọn. Chương trình bao gồm các học phần lý
              thuyết kết hợp với thực hành, giúp sinh viên nắm vững các kỹ năng
              cần thiết để trở thành một chuyên gia trong lĩnh vực phát triển
              web.
            </p>
            <h2 className="mb-4 text-2xl font-semibold">
              Cấu trúc chương trình
            </h2>
            <h3 className="mt-4 text-xl font-semibold">Học kỳ 1: Nền tảng</h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Introduction to Web Design and Development:</strong>{" "}
                Tổng quan về công nghệ web, bao gồm HTML, CSS, và JavaScript cơ
                bản. Hiểu về cách xây dựng cấu trúc một trang web và các nguyên
                tắc thiết kế cơ bản.
              </li>
              <li>
                <strong>Graphic Design Fundamentals:</strong> Nguyên tắc cơ bản
                của thiết kế đồ họa, bao gồm màu sắc, typography, và bố cục. Sử
                dụng phần mềm thiết kế như Adobe Photoshop và Illustrator để tạo
                nội dung hình ảnh cho web.
              </li>
              <li>
                <strong>Web Technologies:</strong> Giới thiệu về các công nghệ
                web hiện đại và các công cụ phát triển phổ biến. Hiểu về sự khác
                biệt giữa các công nghệ front-end và back-end.
              </li>
            </ul>

            <h3 className="mt-4 text-xl font-semibold">
              Học kỳ 2: Phát triển chuyên môn
            </h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Advanced Web Development:</strong> Lập trình JavaScript
                nâng cao, bao gồm việc sử dụng các thư viện và framework như
                React.js. HTML5 và CSS3 nâng cao để tạo giao diện người dùng
                hiện đại và tương tác.
              </li>
              <li>
                <strong>Back-End Development:</strong> Lập trình phía server
                (server-side) với Node.js hoặc PHP. Quản lý cơ sở dữ liệu với
                SQL và NoSQL. Xây dựng và tích hợp API, phát triển ứng dụng web
                động.
              </li>
              <li>
                <strong>User Experience (UX) Design:</strong> Nghiên cứu hành vi
                người dùng và tạo ra các giải pháp thiết kế tập trung vào người
                dùng. Tạo wireframes, prototypes, và kiểm thử giao diện người
                dùng. Thiết kế trải nghiệm người dùng hiệu quả cho các trang
                web.
              </li>
            </ul>

            <h3 className="mt-4 text-xl font-semibold">
              Học kỳ 3: Ứng dụng và thực hành
            </h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Full-Stack Web Development:</strong> Phát triển các ứng
                dụng web toàn diện, từ front-end đến back-end. Tích hợp các công
                nghệ hiện đại như Progressive Web Apps (PWA) và các công cụ
                DevOps.
              </li>
              <li>
                <strong>Web Security and Performance Optimization:</strong> Bảo
                mật thông tin trên web, bao gồm bảo vệ dữ liệu và chống lại các
                cuộc tấn công phổ biến như SQL Injection, XSS. Tối ưu hóa hiệu
                suất trang web để cải thiện tốc độ tải và trải nghiệm người
                dùng. SEO và tối ưu hóa công cụ tìm kiếm.
              </li>
              <li>
                <strong>Capstone Project:</strong> Dự án tốt nghiệp, nơi sinh
                viên sẽ thiết kế và phát triển một trang web hoặc ứng dụng web
                từ đầu đến cuối. Làm việc theo nhóm hoặc cá nhân để hoàn thành
                dự án và trình bày kết quả trước hội đồng giảng viên.
              </li>
            </ul>
            <h2 className="mb-4 text-2xl font-semibold">
              Phương pháp giảng dạy
            </h2>
            <ul className="list-disc pl-6">
              <li>
                <strong>Học kết hợp lý thuyết và thực hành:</strong> Chương
                trình cung cấp sự cân bằng giữa lý thuyết và thực hành, với
                nhiều dự án thực tế để sinh viên áp dụng những gì đã học.
              </li>
              <li>
                <strong>Hướng dẫn từ các chuyên gia:</strong> Sinh viên sẽ nhận
                được sự hướng dẫn trực tiếp từ các giảng viên có kinh nghiệm
                trong ngành công nghệ thông tin và thiết kế.
              </li>
              <li>
                <strong>Dự án nhóm và cá nhân:</strong> Khóa học nhấn mạnh vào
                việc làm việc nhóm và phát triển kỹ năng cá nhân thông qua các
                dự án thực tế.
              </li>
            </ul>
            <h2 className="mb-4 text-2xl font-semibold">Cơ hội nghề nghiệp</h2>
            <ul className="list-disc pl-6">
              <li>Front-End Developer</li>
              <li>Back-End Developer</li>
              <li>Full-Stack Developer</li>
              <li>UX/UI Designer</li>
              <li>Web Project Manager</li>
            </ul>
            <h2 className="mb-4 text-2xl font-semibold">
              Học phí và điều kiện nhập học
            </h2>
            <p className="text-gray-700">
              <strong>Học phí:</strong> Học phí cho chương trình tại Cornerstone
              dao động khoảng 15,000 CAD đến 25,000 CAD mỗi năm, tùy thuộc vào
              lộ trình học.
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
            src={"/program2.png"}
            className="col-span-1 h-auto w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailProgramWebsite;
