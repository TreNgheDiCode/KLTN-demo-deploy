"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

const StudentSettingsPage = () => {
  const currentUser = useCurrentUser();

  return <div>Settings</div>;
};

export default StudentSettingsPage;
