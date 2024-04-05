import { PublicNavbar } from "@/components/navbar/public-navbar";
import { GetAccountIdLib, currentAccount } from "@/lib/account";
import { AccountIdLib } from "@/types";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const account = await currentAccount();

  const loggedInAccount: AccountIdLib = await GetAccountIdLib(account?.id!);
  return (
    <div className="relative">
      <PublicNavbar account={loggedInAccount} />
      <div className="h-full w-full scrollbar-hide">{children}</div>
    </div>
  );
};

export default PublicLayout;
