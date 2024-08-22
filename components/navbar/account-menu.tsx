"use client";

import { logout } from "@/actions/auth/logout";
import { AccountIdLib } from "@/types";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export const AccountMenu = ({
  account,
  isMobile = false,
}: {
  account: AccountIdLib;
  isMobile?: boolean;
}) => {
  const { t } = useTranslation("nav");
  const router = useRouter();

  const onLogOut = async () => {
    await logout().then(() => {
      router.refresh();
    });
  };

  const handclick = () => {
    router.push(`student/profile/${account.student.studentCode}`);
  };

  const mobileMenuContent = (
    <div className="flex flex-col items-center space-y-4 border-t border-gray-200 pt-4 dark:border-gray-700">
      <User
        name={account.name}
        description={account.email}
        className="text-primary"
        avatarProps={{
          src: account.image,
        }}
      />
      <button
        onClick={handclick}
        className="w-full py-2 text-left text-primary hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
      >
        {t("myInformation")}
      </button>
      <button
        onClick={onLogOut}
        className="flex w-full items-center py-2 text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <LogOut className="mr-2 size-4" />
        {t("logout")}
      </button>
    </div>
  );

  const desktopMenuContent = (
    <Dropdown placement="bottom-end" backdrop="blur">
      <DropdownTrigger>
        <User
          as={"button"}
          name={account.name}
          description={account.email}
          className="text-primary transition-transform"
          avatarProps={{
            src: account.image,
          }}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Account Actions"
        variant="flat"
        color="primary"
        className="text-primary"
      >
        <DropdownSection title={`${t("information")}`} showDivider>
          <DropdownItem
            key={"profile"}
            className="gap-2 font-semibold text-primary"
          >
            <p className="font-semibold">{t("loginby")}</p>
            <p className="font-semibold">{account.email}</p>
          </DropdownItem>
          <DropdownItem onClick={handclick} key={"profile"}>
            {t("myInformation")}
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title={`${t("action")}`}>
          <DropdownItem
            onClick={onLogOut}
            color="danger"
            key={"logout"}
            startContent={<LogOut className="size-4" />}
          >
            {t("logout")}
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );

  return isMobile ? mobileMenuContent : desktopMenuContent;
};
