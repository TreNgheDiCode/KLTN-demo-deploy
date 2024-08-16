import { RegisterForm } from "@/components/auth/register-form";
import { GetSchoolLib } from "@/lib/school";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Register",
  description: "Register for an account",
};

const RegisterPage = async () => {
  const schools = await GetSchoolLib();

  if (!schools) {
    redirect("/");
  }

  return (
    <div className="relative h-full w-full">
      <Image
        fill
        src={"/register.jpg"}
        alt="register"
        className="absolute object-cover blur"
        quality={100}
        priority
      />
      <div className="relative z-50 flex h-full items-center justify-evenly gap-x-4 p-4">
        <RegisterForm schools={schools.data} />
      </div>
    </div>
  );
};

export default RegisterPage;
