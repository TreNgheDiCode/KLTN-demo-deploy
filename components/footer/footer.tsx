import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  PhoneCall,
  MapPin,
} from "lucide-react";

import Image from "next/image";

export default function FooterDemo() {
  return (
    <footer className="auto mt-4 w-full bg-[#F8F8F8] dark:bg-black">
      <div className="container mx-auto grid grid-cols-1 py-10 md:grid-cols-3">
        <div className="mb-4 w-auto">
          <Image width={130} height={100} src="/LOGO_RED3.png" alt="" />
          <div className="md:w-2/3">
            <p className="w-auto text-base text-[#767676]">
              Tầm nhìn cung cấp một nền giáo dục chất lượng và dễ tiếp cận cho
              sinh viên từ nhiều nền văn hóa khác nhau
            </p>
          </div>

          <div className="justify-left mt-4 flex space-x-5 lg:mt-2">
            <Link href={""}>
              <Facebook className="rounded text-[#7D1F1F] shadow hover:bg-[#4267B2] hover:text-white hover:ring-4" />
            </Link>
            <Link href={""}>
              <Instagram className="rounded from-indigo-500 via-purple-500 to-pink-500 text-[#7D1F1F] shadow hover:bg-gradient-to-r hover:text-white hover:ring-4" />
            </Link>
            <Link href={""}>
              <Linkedin className="rounded text-[#7D1F1F] shadow hover:bg-[#0077b5] hover:text-white hover:ring-4" />
            </Link>
          </div>
        </div>

        <div className="w-full justify-between text-left lg:flex">
          <div className="w-full px-4">
            <h2 className="mb-4 font-bold tracking-widest text-[#030000] dark:text-primary md:text-lg">
              CHÚNG TÔI
            </h2>
            <ul className="mb-8 list-none space-y-2 text-base">
              <li>
                <Link
                  href={"/"}
                  className="text-[#767676] hover:font-bold hover:text-[#7D1F1F]"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="text-[#767676] hover:font-bold hover:text-[#7D1F1F]"
                >
                  Điều khoản
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="text-[#767676] hover:font-bold hover:text-[#7D1F1F]"
                >
                  Chính sách
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="text-[#767676] hover:font-bold hover:text-[#7D1F1F]"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full px-4">
          <h2 className="mb-4 font-bold tracking-widest text-[#030000] dark:text-primary md:text-lg">
            CEMC. CO LTD
          </h2>
          <div className="grid grid-cols-1 gap-y-3 text-base text-[#767676]">
            <div className="flex hover:font-bold hover:text-[#7D1F1F]">
              <Mail></Mail>
              <span className="ml-3">contact@huflit.edu.vn</span>
            </div>
            <div className="flex hover:font-bold hover:text-[#7D1F1F]">
              <PhoneCall></PhoneCall>
              <span className="ml-3">
                (+84 28) 38 632 052 - Fax: (+84 28) 38 650 991
              </span>
            </div>
            <div className="flex hover:font-bold hover:text-[#7D1F1F]">
              <Mail></Mail>
              <span className="ml-3">
                828 Sư Vạn Hạnh, Phường 13, Quận 10, TP. Hồ Chí Minh
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
