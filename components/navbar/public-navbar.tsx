"use client";

import { AccountIdLib } from "@/types";
import {
  Button,
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AccountMenu } from "./account-menu";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";

interface PublicNavbarProps {
  account?: AccountIdLib;
}

export const PublicNavbar = ({ account }: PublicNavbarProps) => {
  const pathname = usePathname();
  const [isLoading, setLoading] = useState(false);
  const { theme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const navbarRef = useRef(null);

  useEffect(() => {
    if (!navbarRef.current) return;

    const navbarElement = navbarRef.current as HTMLElement;

    const handleClick = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight) {
        navbarElement.style.backgroundColor =
          theme === "dark" ? "black" : "white";
      }
    };

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        navbarElement.style.backgroundColor =
          theme === "dark" ? "black" : "white";
      } else {
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClick);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
    };
  }, [theme]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 2 },
      }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Navbar
        isBordered
        ref={navbarRef}
        isBlurred={false}
        onMenuOpenChange={setIsOpen}
        style={{
          position: "absolute",
          width: "100%",
        }}
        classNames={{
          wrapper: "max-w-full flex h-[85px] p-0 pl-3 pr-6",
          menu: "bg-white dark:bg-background",
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
            </Link>a
            <Link href="/">
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
          <NavbarItem isActive={pathname.includes("/student/profile")}>
            <Link
              color="primary"
              href="en/student/profile"
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
          <NavbarItem isActive={pathname.includes("/about")}>
            <Link
              color="primary"
              href="/contact"
              className="text-[#7D1F1F] dark:text-primary"
            >
              Contact Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <ThemeToggle />
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" justify="end" className="hidden md:flex">
          {account && <AccountMenu account={account} />}
          {!account && (
            <>
              <Button
                as={Link}
                variant="bordered"
                radius="full"
                onClick={() => setLoading(true)}
                isLoading={isLoading}
                size="md"
                className="border-[#7D1F1F] font-semibold text-[#7D1F1F] dark:border-primary dark:text-white"
                href="/auth/register"
              >
                Get Started
              </Button>
              <Button
                as={Link}
                onClick={() => setLoading(true)}
                isLoading={isLoading}
                variant="shadow"
                radius="full"
                size="md"
                className="bg-[#7D1F1F] font-semibold text-white dark:text-primary"
                href="/auth/login"
              >
                Login
              </Button>
            </>
          )}
        </NavbarContent>
        {/* Mobile Menu */}
        <NavbarMenu>
          <div className="flex items-center gap-x-4 py-1.5"></div>
          <Divider />
          {/* <MobileManagementDropdown /> */}
        </NavbarMenu>
      </Navbar>
    </motion.div>
  );
};
