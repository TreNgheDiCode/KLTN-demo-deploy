"use client";

import { logout } from "@/actions/auth/logout";
import { AccountIdLib } from "@/types";
import {
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export const AccountMenu = ({
  account,
  isMobile = false,
}: {
  account: AccountIdLib;
  isMobile?: boolean;
}) => {
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
        Thông tin của tôi
      </button>
      <button
        onClick={onLogOut}
        className="flex w-full items-center py-2 text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <LogOut className="mr-2 size-4" />
        Đăng xuất
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
        <DropdownSection title={"Hồ sơ"} showDivider>
          <DropdownItem
            key={"profile"}
            className="gap-2 font-semibold text-primary"
          >
            <p className="font-semibold">Đăng nhập bằng</p>
            <p className="font-semibold">{account.email}</p>
          </DropdownItem>
          <DropdownItem onClick={handclick} key={"profile"}>
            Thông tin của tôi
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title={"Hành động"}>
          <DropdownItem
            onClick={onLogOut}
            color="danger"
            key={"logout"}
            startContent={<LogOut className="size-4" />}
          >
            Đăng xuất
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );

  return isMobile ? mobileMenuContent : desktopMenuContent;
};
