import { DeleteForm } from "@/components/auth/delete-form";
import Image from "next/image";

export const metadata = {
  title: "Xóa tài khoản",
  description: "Xóa tài khoản của bạn khỏi hệ thống",
};

const ResetPage = () => {
  return (
    <div className="relative h-full w-full">
      <Image
        fill
        src={"/login.jpg"}
        alt="deleteAccount"
        className="absolute object-fill blur"
        quality={100}
        priority
      />
      <div className="relative z-50 flex h-full items-center justify-evenly gap-x-4 p-4">
        <DeleteForm />
      </div>
      <p className="dark:text-main-foreground absolute bottom-2 left-2 text-sm font-semibold text-white">
        8660740207586182375 Study Abroad - CEMC CO,. LTD - Nguyễn Trung Hưng
      </p>
    </div>
  );
};

export default ResetPage;
