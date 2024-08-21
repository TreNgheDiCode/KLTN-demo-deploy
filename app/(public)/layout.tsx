import ChatTrigger from "@/components/chat/chat-trigger";
import FooterDemo from "@/components/footer/footer";
import { PublicNavbar } from "@/components/navbar/public-navbar";
import { GetAccountIdLib, currentAccount } from "@/lib/account";
import { GetNameSchools } from "@/lib/nameSchools";
import { NameSchool, SchoolLib } from "@/types";
import { cookies } from "next/headers";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const accountPromise = currentAccount();
  const cookieStore = cookies();
  const clientId = cookieStore.get("ably_clientId")?.value || "";

  const account = await accountPromise;
  const loggedInAccountPromise = account?.id
    ? GetAccountIdLib(account.id)
    : Promise.resolve(null);
  const loggedInAccount = await loggedInAccountPromise;

  // Lấy danh sách các trường
  const schools = await GetNameSchools();

  return (
    <div className="relative">
      <ChatTrigger clientId={clientId} />
      <PublicNavbar account={loggedInAccount} schools={schools} />
      <div className="h-full w-full scrollbar-hide">{children}</div>
      <FooterDemo />
    </div>
  );
};

export default PublicLayout;
