import { ProtectedNavbar } from "@/components/navbar/navbar";
import { Lang, getDictionary } from "@/data/dictionaries";
import { currentUser } from "@/lib/user";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) => {
  const user = await currentUser();
  const dict = await getDictionary(params.lang);

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="h-full w-full">
      <ProtectedNavbar user={user} dict={dict} />
      {children}
    </div>
  );
};

export default ProtectedLayout;
