"use client";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { AccountMenu } from "./account-menu";
import { ThemeToggle } from "./theme-toggle";
import { AccountIdLib, SchoolLib } from "@/types";
import { usePathname } from "next/navigation";

interface PublicNavbarProps {
  account?: AccountIdLib;
  schools?: SchoolLib[];
}
type NavItem = {
  key: string;
  label: string;
  href?: string;
  component?: React.ReactNode;
};

export const PublicNavbar = ({ account, schools = [] }: PublicNavbarProps) => {
  const pathname = usePathname();
  const [isLoading, setLoading] = useState(false);
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  // State to handle the active nav item
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);

  // Change navbar background color based on scroll position
  useEffect(() => {
    if (!navbarRef.current) return;

    const navbarElement = navbarRef.current;

    const handleScroll = () => {
      if (window.scrollY > 0) {
        navbarElement.style.backgroundColor =
          theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)";
        navbarElement.style.backdropFilter = "blur(10px)";
      } else {
        navbarElement.style.backgroundColor = "transparent";
        navbarElement.style.backdropFilter = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [theme]);

  // Set active nav item on click
  const handleNavItemClick = (item: string) => {
    setActiveNavItem(item);
  };

  const renderSchoolList = () => (
    <Dropdown>
      <DropdownTrigger>
        <Button className="text-[#7D1F1F] dark:text-primary" variant="light">
          Trường học
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="School List"
        className="rounded-xl border-2 border-[#cccccc]"
      >
        {schools.length > 0 ? (
          schools.map((school) => (
            <DropdownItem key={school.id} className="text-primary">
              <Link href={`/schools/${school.id}`}>{school.name}</Link>
            </DropdownItem>
          ))
        ) : (
          <DropdownItem className="text-black dark:text-primary">
            Không tìm thấy trường
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );

  const renderNavItems = () => {
    const commonItems: NavItem[] = [
      { key: "school", label: "Trường học", component: renderSchoolList() },
      { key: "about", label: "Thông tin về chúng tôi", href: "/about" },
      { key: "contact", label: "Liên hệ", href: "/contact" },
    ];

    const loggedInItems: NavItem[] = [
      { key: "social", label: "Mạng xã hội", href: "/social" },
      {
        key: "statusProfile",
        label: "Trạng thái thông tin",
        href: "/statusProfile",
      },
    ];

    const items = account ? [...commonItems, ...loggedInItems] : commonItems;

    return items.map((item) => (
      <NavbarItem
        key={item.key}
        isActive={
          item.href ? pathname.includes(item.href) : activeNavItem === item.key
        }
        onClick={() => handleNavItemClick(item.key)}
      >
        {item.component || (
          <Link
            href={item.href || "#"}
            className="text-[#7D1F1F] dark:text-primary"
          >
            {item.label}
          </Link>
        )}
      </NavbarItem>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.5 },
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
        {/* Desktop Navigation */}
        <NavbarContent className="hidden gap-16 md:flex" justify="center">
          {renderNavItems()}
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
                Đăng ký
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
                Đăng nhập
              </Button>
            </>
          )}
        </NavbarContent>
        {/* Mobile Navigation */}
        <NavbarMenu className="md:hidden">
          {renderNavItems()}
          <NavbarItem>
            <ThemeToggle />
          </NavbarItem>
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
                Đăng ký
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
                Đăng nhập
              </Button>
            </>
          )}
        </NavbarMenu>
      </Navbar>
    </motion.div>
  );
};
