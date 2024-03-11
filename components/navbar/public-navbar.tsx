"use client";

import {
  Button,
  Divider,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export const PublicNavbar = () => {
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
        </NavbarBrand>
      </NavbarContent>
      {/* Navigation */}
      <NavbarContent className="hidden gap-16 md:flex" justify="center">
        <NavbarItem isActive={pathname.includes("/")}>
          <Link
            color="primary"
            href="/"
            className="text-[#7D1F1F] dark:text-primary"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname.includes("/schools")}>
          <Link
            color="primary"
            href="/schools"
            className="text-[#7D1F1F] dark:text-primary"
          >
            Schools
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname.includes("/social")}>
          <Link
            color="primary"
            href="/social"
            className="text-[#7D1F1F] dark:text-primary"
          >
            Social
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname.includes("/about")}>
          <Link
            color="primary"
            href="/about"
            className="text-[#7D1F1F] dark:text-primary"
          >
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end" className="hidden md:flex">
        <Button
          variant="bordered"
          size="lg"
          className="border-[#7D1F1F] font-semibold text-[#7D1F1F] dark:border-primary dark:text-white"
        >
          Get Started
        </Button>
        <Button
          variant="shadow"
          size="lg"
          className="bg-[#7D1F1F] font-semibold text-white dark:text-primary"
        >
          Login
        </Button>
      </NavbarContent>
      {/* Mobile Menu */}
      <NavbarMenu>
        <div className="flex items-center gap-x-4 py-1.5"></div>
        <Divider />
        {/* <MobileManagementDropdown /> */}
      </NavbarMenu>
    </Navbar>
  );
};
