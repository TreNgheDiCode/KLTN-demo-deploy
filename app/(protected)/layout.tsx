import FooterDemo from "@/components/footer/footer";
import { ProtectedNavbar } from "@/components/navbar/protected-navbar";
import { currentAccount, GetAccountIdLib } from "@/lib/account";
import { AccountIdLib } from "@/types";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentAccount();

  if (!user) {
    redirect("/");
  }

  const account = await currentAccount();
  const loggedInAccount: AccountIdLib = await GetAccountIdLib(account?.id!);
  return (
    <div className="h-full w-full bg-[#fff] dark:bg-background">
      <ProtectedNavbar user={user} account={loggedInAccount} />
      {children}
      <FooterDemo />
    </div>
  );
};

export default ProtectedLayout;
