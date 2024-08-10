import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";

export const metadata = {
  title: "Đăng nhập",
};

const LoginPage = async () => {
  return (
    <div className="relative h-full w-full scrollbar-hide">
      <Image
        fill
        src={"/login.jpg"}
        alt="register"
        className="absolute object-cover blur"
        priority
        quality={100}
      />
      <div className="relative z-50 flex h-full items-center justify-evenly gap-x-4 p-4">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
