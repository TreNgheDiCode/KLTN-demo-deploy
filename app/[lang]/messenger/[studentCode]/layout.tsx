import FooterDemo from "@/components/footer/footer";
import { PublicNavbar } from "@/components/navbar/public-navbar";
import { GetAccountIdLib, currentAccount } from "@/lib/account";
import { GetSchoolLib } from "@/lib/school";
import { AccountIdLib, SchoolLib } from "@/types";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const account = await currentAccount();
  const loggedInAccount: AccountIdLib = await GetAccountIdLib(account?.id!);
  const schools: SchoolLib[] | null = await GetSchoolLib();

  return (
    <div className="relative">
      <PublicNavbar account={loggedInAccount} schools={schools || []} />
      <div className="h-full w-full pt-[86px] scrollbar-hide">{children}</div>
      <FooterDemo />
    </div>
  );
};

export default PublicLayout;
