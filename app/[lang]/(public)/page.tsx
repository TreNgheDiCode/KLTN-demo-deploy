import { HeroHeader } from "@/components/home/hero-header";
import { VideoSection } from "@/components/home/video-section";
import { getDictionary } from "@/data/dictionaries";
import { GetSchoolLib } from "@/lib/school";
import { metadata } from "../layout";
import Image from "next/image";
import { Fullscreen } from "lucide-react";
import { Textarea } from "@nextui-org/react";

export default async function Home({
  params: { lang },
}: {
  params: { lang: "en" | "vi" };
}) {
  const dict = await getDictionary(lang);
  metadata.title = dict.Home.Title;
  const schools = await GetSchoolLib();
  return (
    <main className="flex flex-col">
      <HeroHeader schools={schools || []} />
      <VideoSection />
      <div className="flex h-screen bg-orange-500 text-primary">
        <div className="w-[23%] border-collapse bg-slate-500">
          <div className="flex h-[28%] items-center justify-center border-l-2 border-r-2 border-t-2 border-[#D1D8C5] bg-[#EEEEEE] text-[19px] font-bold">
            Trang chủ
          </div>
          <div className="flex h-[18%] items-center justify-center border-l-2 border-r-2 border-t-2 border-[#D1D8C5] bg-[#EEEEEE] text-[19px] font-bold">
            Thông báo
          </div>
          <div className="flex h-[18%] items-center justify-center border-l-2 border-r-2 border-t-2 border-[#D1D8C5] bg-[#EEEEEE] text-[19px] font-bold">
            Thông tin hồ sơ
          </div>
          <div className="flex h-[18%] items-center justify-center border-l-2 border-r-2 border-t-2 border-[#D1D8C5] bg-[#EEEEEE] text-[19px] font-bold">
            Điểm số
          </div>
          <div className="flex h-[18%] items-center justify-center border-2 border-[#D1D8C5] bg-[#EEEEEE] text-[19px] font-bold">
            Tin tức
          </div>
        </div>

        <div className="w-[2%] bg-[#7E8EF1]"></div>
        <div className="w-[75%] bg-[#615EFC]">
          <div className="mt-3 flex items-center justify-center text-[22px] font-bold">
            Trạng Thái: Đang chờ duyệt
          </div>
          <div className="relative mt-2">
            <Image
              src={"/login.jpg"}
              alt=""
              width={100}
              height={100}
              sizes="100whm"
              className="h-[150px] w-full rounded-sm"
            />
            <Image
              src={"/login.jpg"}
              alt=""
              width={100}
              height={100}
              sizes="100whm"
              className="absolute bottom-0 h-[100px] w-[100px] rounded-full border-2 border-black"
            />
          </div>
          <div className="flex">
            <div className="h-full w-[48%] bg-slate-700">
              <div className="text-[19px] font-bold">Thông Tin Cá Nhân</div>
              <div className="flex">
                <div className="font-bold">Mã Học sinh: </div>
                <div className="ml-2 text-[16px]">21DH112543</div>
              </div>
              <div className="flex">
                <div className="font-bold">Họ và tên: </div>
                <div className="ml-2 text-[16px]">Nguyễn Sinh Hương</div>
              </div>
              <div className="flex">
                <div className="font-bold">Giới tính: </div>
                <div className="ml-2 text-[16px]">Nam</div>
              </div>
              <div className="flex">
                <div className="font-bold">Ngày sinh: </div>
                <div className="ml-2 text-[16px]">17 tháng 10, 2000</div>
              </div>
              <div className="flex">
                <div className="font-bold">CCCD: </div>
                <div className="ml-2 text-[16px]">098321761</div>
              </div>
              <div className="flex">
                <div className="font-bold">Email: </div>
                <div className="ml-2 text-[16px]">
                  nguyensinhhuong123@gmail.com
                </div>
              </div>
              <div className="flex">
                <div className="font-bold">Địa chỉ: </div>
                <div className="ml-2 text-[16px]">
                  20, Đường số 8, Phường 11, Quận Gò Vấp
                </div>
              </div>
            </div>
            <div className="h-full w-[4%] bg-white">đá</div>
            <div className="h-full w-[48%] bg-slate-700">
              <div className="text-[19px] font-bold">Thông Tin Đào Tạo</div>
              <div className="flex">
                <div className="font-bold">Trường học: </div>
                <div className="ml-2 text-[16px]">Corner Stone Cannada</div>
              </div>
              <div className="flex">
                <div className="font-bold">Ngành đào tạo: </div>
                <div className="ml-2 text-[16px]">UI UX Designer</div>
              </div>
              <div className="flex">
                <div className="font-bold">Cơ sở: </div>
                <div className="ml-2 text-[16px]">Không có thông tin</div>
              </div>
              <div className="flex">
                <div className="font-bold">Địa chỉ cơ sở chính: </div>
                <div className="ml-2 text-[16px]">Không có thông tin</div>
              </div>
              <div className="flex">
                <div className="font-bold">Điểm trung bình tích lũy: </div>
                <div className="ml-2 text-[16px]">2.9GPA</div>
              </div>
              <div className="flex">
                <div className="font-bold">Chứng chỉ ngoại ngữ: </div>
                <div className="ml-2 text-[16px]">TOEFL</div>
              </div>
              <div className="flex">
                <div className="font-bold">Trình độ học tập: </div>
                <div className="ml-2 text-[16px]">UNIVERCITY</div>
              </div>
            </div>
          </div>
          <div className="block">
            <div>Thông tin bổ sung: </div>
            <Textarea value={"Không có thông tin bổ sung gì "} disabled />
          </div>
        </div>
      </div>
    </main>
  );
}
