import Image from "next/image";
import { FaLocationCrosshairs } from "react-icons/fa6";

const Procedure = () => {
  return (
    <div>
      <div className="min-h-screen w-full">
        <div className="relative h-fit w-full bg-white md:h-[800px]">
          <div className="grid h-full w-full grid-cols-1 md:grid-cols-10">
            <div className="order-2 col-span-1 md:order-1 md:col-span-6">
              <div className="mt-8 flex items-center justify-between gap-x-3 px-12">
                <h1 className="text-5xl font-bold capitalize">
                  Quy trình đặt cọc
                </h1>
                <div className="relative h-[176px] w-[221px]">
                  <Image
                    fill
                    src={"/Truong1/laco.png"}
                    alt="laco"
                    className=""
                  />
                </div>
              </div>
              <div className="mx-12 grid max-w-[60%] grid-cols-1 pt-2">
                <ul className="list-none space-y-2 decoration-slice text-lg font-medium text-[#777E90]">
                  <li className="flex">
                    <div>
                      <FaLocationCrosshairs className="mr-2 h-6 w-6 text-[#FF4415]" />
                    </div>
                    <span>
                      Cornerstone cung cấp các tùy chọn{" "}
                      <strong>học vị đơn</strong> va <strong>học vị kép</strong>
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <div>
                      <FaLocationCrosshairs className="mr-2 h-6 w-6 text-[#FF4415]" />
                    </div>
                    <span className="">
                      Tùy chọn <strong>học vị kép</strong> là gói tốt hơn cho
                      sinh viên vì họ có thời gian học tập và làm việc tại
                      canada lâu hơn (1 năm làm việc + 1 năm học), điều này cũng
                      có thể tăng cơ hội của họ trong việc tìm được nhà tài trợ.
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <div>
                      <FaLocationCrosshairs className="mr-2 h-6 w-6 text-[#FF4415]" />
                    </div>
                    <span>
                      Tất cả sinh viên đăng ký chương trình{" "}
                      <strong>học vị kép</strong> cũng sẽ nhận được gói ưu đãi
                      độc quyền từ beeznest, bao gồm hỗ trợ kinh nghiệm làm
                      việc, phát triển sự nghiệp, mời tham dự các sự kiện mạng
                      lưới độc quyền và giúp tạo cơ hội việc làm.
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <div>
                      <FaLocationCrosshairs className="mr-2 h-6 w-6 text-[#FF4415]" />
                    </div>
                    <span>
                      Trước khi sinh viên nộp đơn xin visa, cần thanh toán $1500
                      để nhận thư chấp nhận.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative order-1 col-span-1 md:order-2 md:col-span-4">
              <Image
                fill
                src={"/Truong1/procedure.png"}
                alt="procedure"
                className="invisible object-contain md:visible"
              />
            </div>
          </div>
          <div className="absolute bottom-0 h-[174px] w-[164px]">
            <Image
              fill
              src={"/Truong1/logostudent.png"}
              alt="logostudent"
              className="invisible absolute bottom-0 md:visible"
            />
          </div>
          <div className="absolute bottom-0 h-8 w-full rounded-t-xl bg-blue-950" />
          <div className="absolute top-0 h-8 w-full rounded-b-xl bg-blue-950" />
        </div>
      </div>
    </div>
  );
};

export default Procedure;
