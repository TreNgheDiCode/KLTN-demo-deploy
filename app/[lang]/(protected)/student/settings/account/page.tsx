import { AccountForm } from "@/components/settings/account-form";
import { currentAccount } from "@/lib/account";
import { redirect } from "next/navigation";

const SettingsAccountPage = async () => {
  const user = await currentAccount();

  if (!user) {
    redirect("/");
  }

  return <AccountForm user={user} />;
};

export default SettingsAccountPage;
