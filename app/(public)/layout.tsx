import ChatTrigger from "@/components/chat/chat-trigger";
import FooterDemo from "@/components/footer/footer";
import { PublicNavbar } from "@/components/navbar/public-navbar";
import { GetAccountIdLib, currentAccount } from "@/lib/account";
import { GetSchoolLib } from "@/lib/school";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const accountPromise = currentAccount();
  const schoolsPromise = GetSchoolLib();
  const cookieStore = cookies();
  const clientId = cookieStore.get("ably_clientId");

  const account = await accountPromise;
  const loggedInAccountPromise = GetAccountIdLib(account?.id!);
  const loggedInAccount = await loggedInAccountPromise;

  const [schools] = await Promise.all([schoolsPromise]);

  return (
    <div className="relative">
      <ChatTrigger clientId={clientId?.value} />
      <PublicNavbar account={loggedInAccount} schools={schools?.data || []} />
      <div className="h-full w-full scrollbar-hide">{children}</div>
      <FooterDemo />
    </div>
  );
};

export default PublicLayout;
