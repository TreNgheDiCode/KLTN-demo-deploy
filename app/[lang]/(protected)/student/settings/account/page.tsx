import { currentUser } from "@/lib/user";
import { AccountForm } from "../../../../../../components/settings/account-form";

const SettingsAccountPage = async () => {
  const user = await currentUser();

  return <AccountForm user={user!} />;
};

export default SettingsAccountPage;
