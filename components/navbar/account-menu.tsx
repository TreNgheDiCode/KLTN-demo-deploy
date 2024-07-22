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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const AccountMenu = ({ account }: { account: AccountIdLib }) => {
  const router = useRouter();
  const onLogOut = async () => {
    await logout().then(() => {
      router.refresh();
    });
  };
  const handclick = () => {
    router.push(`student/profile/${account.student.studentCode}`);
  };
  return (
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
        <DropdownSection title={"Profile"} showDivider>
          <DropdownItem
            key={"profile"}
            className="gap-2 font-semibold text-primary"
          >
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{account.email}</p>
          </DropdownItem>
          <DropdownItem onClick={handclick} key={"profile"}>
            My Profile
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title={"Actions"}>
          <DropdownItem
            onClick={onLogOut}
            color="danger"
            key={"logout"}
            startContent={<LogOut className="size-4" />}
          >
            Logout
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
