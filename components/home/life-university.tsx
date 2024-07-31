import { Button } from "@nextui-org/react";
import Image from "next/image";

const LifeUniversity = () => {
  return (
    <>
      <div className="mt-[25px] flex flex-wrap">
        <div className="mb-6 w-full md:mb-0 md:w-[472px]">
          <h1 className="text-[28px] font-bold text-[#7D1F1F] md:text-[40px]">
            Cuộc sống của du học sinh
          </h1>
          <div className="text-sm text-primary md:text-base">
            Thế giới cần những bộ óc tò mò, logic với khuynh hướng giải quyết
            vấn đề sáng tạo. Cornerstone giúp xây dựng nền tảng vững chắc cho
            thị trường việc làm đầy thách thức ngày nay trong các lĩnh vực khoa
            học máy tính, kỹ thuật và toán học.
          </div>
          <div className="mt-3">
            <Button className="border-1 border-black bg-white dark:border-white dark:bg-black">
              Tìm hiểu thêm
            </Button>
          </div>
          <Image
            className="mt-6 md:mt-[25px]"
            src={"/life4.png"}
            alt="life4"
            width={472}
            height={463}
          />
        </div>
        <div className="mb-6 w-full md:mb-0 md:ml-[25px] md:w-auto">
          <Image
            className="rounded-3xl"
            src={"/life5.png"}
            alt="life1"
            width={346}
            height={200}
          />
          <Image
            className="mt-6 md:mt-[25px]"
            src={"/life3.png"}
            alt="life5"
            width={346}
            height={365}
          />
        </div>
        <div className="w-full md:ml-[25px] md:w-auto">
          <Image src={"/life1.png"} alt="life1" width={370} height={916} />
          <Image
            className="mt-6 md:mt-[25px]"
            src={"/life2.png"}
            alt="life2"
            width={370}
            height={526}
          />
        </div>
      </div>
    </>
  );
};

export default LifeUniversity;
