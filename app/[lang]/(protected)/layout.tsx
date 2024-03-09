import { ProtectedNavbar } from "@/components/navbar/protected-navbar";
import { Lang, getDictionary } from "@/data/dictionaries";
import { currentAccount } from "@/lib/account";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) => {
  const user = await currentAccount();

  if (!user) {
    redirect("/");
  }

  const dict = await getDictionary(params.lang);

  return (
    <div className="h-full w-full">
      <ProtectedNavbar user={user} dict={dict} />
      {children}
    </div>
  );
};

export default ProtectedLayout;
