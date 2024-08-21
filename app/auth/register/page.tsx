import RegisterForm from "@/components/auth/register/form/register-form";
import { RegisterHero } from "@/components/auth/register/hero";
import { GetSchoolsAuth } from "@/data/school";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Register",
  description: "Register for an account",
};

const RegisterPage = async () => {
  const schools = await GetSchoolsAuth();

  if (!schools || schools.length === 0) {
    redirect("/");
  }

  return (
    <div className="size-full">
      <div className="relative size-full overflow-x-hidden">
        <RegisterHero />
        <RegisterForm schools={schools} />
      </div>
    </div>
  );
};

export default RegisterPage;
