import Image from "next/image";
import { Montserrat } from "next/font/google";
import { useTranslation } from "react-i18next";

const font = Montserrat({ weight: "500", subsets: ["vietnamese"] });

export const DetailProgramAI = () => {
  const { t } = useTranslation("school");
  return (
    <div className="mx-auto w-[70%]">
      <span className="text-xl font-bold">{t("DeatilProgram")}</span>

      <div className="mt-8 text-center text-4xl font-bold text-[#001524] dark:text-primary">
        {t("InformationProgram")} AI
      </div>

      <div className="mt-6 rounded-3xl border-2 border-[#61677A] bg-[#D8D9DA] p-6 dark:bg-black">
        <div className="">
          <Image
            width={352}
            height={329}
            alt=""
            src={"/AI.jpg"}
            className="col-span-1 mb-4 h-auto w-full rounded-lg object-cover lg:mb-0"
          />
          <div className="text-justify">
            <p className="text-gray-700">
              Chương trình đào tạo AI tại Cornerstone International College kéo
              dài từ 1 đến 2 năm, tùy thuộc vào lộ trình học của sinh viên.
              Chương trình cung cấp kiến thức vững chắc về trí tuệ nhân tạo, học
              máy, và các kỹ thuật phân tích dữ liệu nâng cao.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-4xl font-bold text-[#001524] dark:text-primary">
        CHƯƠNG TRÌNH HỌC
      </div>

      <div className="mt-6 rounded-3xl border-2 border-[#61677A] bg-[#D8D9DA] p-6 dark:bg-black">
        <div className="">
          <div className="mb-4 text-justify">
            <h3 className="mt-4 text-xl font-semibold">
              Học kỳ 1: Nền tảng AI
            </h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Introduction to AI and Machine Learning:</strong> Tổng
                quan về trí tuệ nhân tạo và học máy, các thuật toán cơ bản và
                ứng dụng.
              </li>
              <li>
                <strong>Mathematics for AI:</strong> Toán học cơ bản và nâng
                cao, bao gồm đại số tuyến tính, xác suất và thống kê.
              </li>
              <li>
                <strong>Programming for AI:</strong> Lập trình với Python và các
                thư viện như NumPy, Pandas, và Scikit-learn.
              </li>
            </ul>

            <h3 className="mt-4 text-xl font-semibold">
              Học kỳ 2: Phát triển và Ứng dụng AI
            </h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Advanced Machine Learning:</strong> Các kỹ thuật học máy
                nâng cao, bao gồm học sâu và mạng nơ-ron tích chập.
              </li>
              <li>
                <strong>Natural Language Processing (NLP):</strong> Xử lý ngôn
                ngữ tự nhiên, bao gồm các mô hình ngôn ngữ và phân tích văn bản.
              </li>
              <li>
                <strong>AI and Data Ethics:</strong> Đạo đức trong AI, bảo mật,
                quyền riêng tư và quyết định tự động.
              </li>
            </ul>

            <h3 className="mt-4 text-xl font-semibold">
              Học kỳ 3: Ứng dụng và Thực hành
            </h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>AI in Practice:</strong> Áp dụng các kỹ thuật AI vào các
                dự án thực tế.
              </li>
              <li>
                <strong>AI Project and Development:</strong> Dự án lớn cuối kỳ,
                thiết kế và phát triển một ứng dụng AI từ đầu đến cuối.
              </li>
              <li>
                <strong>Capstone Project:</strong> Dự án tốt nghiệp giải quyết
                một bài toán thực tế bằng AI.
              </li>
            </ul>
            <h2 className="mb-4 text-2xl font-semibold">
              Phương pháp giảng dạy
            </h2>
            <ul className="list-disc pl-6">
              <li>
                <strong>Lý thuyết kết hợp thực hành:</strong> Cân bằng giữa lý
                thuyết và thực hành với nhiều dự án thực tế.
              </li>
              <li>
                <strong>Hướng dẫn từ các chuyên gia:</strong> Hướng dẫn trực
                tiếp từ giảng viên có kinh nghiệm trong ngành AI.
              </li>
              <li>
                <strong>Dự án nhóm và cá nhân:</strong> Phát triển kỹ năng cá
                nhân và làm việc nhóm qua các dự án thực tế.
              </li>
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
            src={"/AI1.jpg"}
            className="col-span-1 h-auto w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailProgramAI;
