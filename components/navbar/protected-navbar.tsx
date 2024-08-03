"use client";

import {
  Avatar,
  Divider,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  User,
} from "@nextui-org/react";
import { UserButton } from "./user-button";
import { ExtendedUser } from "@/auth";
import { CameraIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ManagementDropdown } from "./management-dropdown";
import { MobileManagementDropdown } from "./mobile-management-dropdown";
import Image from "next/image";
import { UserAvatar } from "../user-avatar";
import { AccountMenu } from "./account-menu";
import { AccountIdLib } from "@/types";

interface ProtectedNavbarProps {
  user: ExtendedUser;
  account?: AccountIdLib;
}

export const ProtectedNavbar = ({ user, account }: ProtectedNavbarProps) => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar
      isBordered
      onMenuOpenChange={setIsOpen}
      className="bg-white dark:bg-background"
      classNames={{
        wrapper: "max-w-full flex h-[85px] p-0 pl-3 pr-6",
        menu: "top-[85px] bg-white dark:bg-background",
        toggleIcon: "text-[#7D1f1F] dark:text-primary",
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-[#7D1F1F] data-[active=true]:dark:after:bg-primary",
        ],
      }}
    >
      {/* Branding & Logo */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <Image
              height={68}
              width={200}
              priority={true}
              style={{ width: "auto", height: "auto" }}
              quality={100}
              alt="logo"
              src="/logo_light.png"
              className="h-fit dark:hidden"
            />
            <Image
              height={68}
              width={200}
              priority={true}
              style={{ width: "auto", height: "auto" }}
              quality={100}
              alt="logo"
              src="/logo_dark.png"
              className="hidden h-fit dark:block"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      {/* Navigation */}
      <NavbarContent className="hidden gap-4 md:flex" justify="start">
        <NavbarItem isActive={pathname.includes("/profile")}>
          <Link
            color="primary"
            href="/student/profile"
            className="text-[#7D1F1F] dark:text-primary"
          >
            Thông tin hồ sơ
          </Link>
        </NavbarItem>
      </NavbarContent>
      <div className="hidden md:flex">
        <AccountMenu account={account!} />
      </div>
      {/* Mobile Menu */}
      <NavbarMenu>
        <Divider />
        <MobileManagementDropdown />
      </NavbarMenu>
    </Navbar>
  );
};
