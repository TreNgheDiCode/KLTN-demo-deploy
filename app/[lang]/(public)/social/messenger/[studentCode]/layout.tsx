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
      <div className="h-full w-full scrollbar-hide">{children}</div>
    </div>
  );
};

export default PublicLayout;
