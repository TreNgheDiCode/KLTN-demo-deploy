import Image from "next/image";
import { Montserrat } from "next/font/google";

const font = Montserrat({ weight: "500", subsets: ["vietnamese"] });

export const DetailProgram = () => {
  return (
    <div className="mx-auto w-[70%]">
      <span className="text-xl font-bold">Chi tiết ngành học</span>

      <div className="mt-8 text-center text-4xl font-bold text-[#001524]">
        THÔNG TIN KHÓA UI/UX
      </div>

      <div className="mt-6 rounded-3xl border-2 border-[#61677A] bg-[#D8D9DA] p-6">
        <div className="lg:grid lg:grid-cols-3 lg:gap-6">
          <Image
            width={352}
            height={329}
            alt=""
            src={"/program1.png"}
            className="col-span-1 mb-4 h-auto w-full rounded-lg object-cover lg:mb-0"
          />
          <div className="col-span-2 text-justify">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-4xl font-bold text-[#001524]">
        CHƯƠNG TRÌNH HỌC
      </div>

      <div className="mt-6 rounded-3xl border-2 border-[#61677A] bg-[#D8D9DA] p-6">
        <div className="lg:grid lg:grid-cols-3 lg:gap-6">
          <div className="col-span-2 mb-4 text-justify lg:mb-0">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
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

export default DetailProgram;
