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
import { LanguageToggle } from "../language-switcher";
import { useTranslation } from "react-i18next";
import i18n from "@/app/i18n/i18n";
import { Globe } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

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
  const { t } = useTranslation("nav");
  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

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
        <button className="text-[16px] text-[#7D1F1F] dark:text-primary">
          {t("School")}
        </button>
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
            {t("NoSchoolFound")}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );

  const renderNavItems = () => {
    const commonItems: NavItem[] = [
      { key: "school", label: t("School"), component: renderSchoolList() },
      { key: "about", label: t("About Us"), href: "/about" },
      { key: "contact", label: t("Contact"), href: "/contact" },
    ];

    const loggedInItems: NavItem[] = [
      { key: "social", label: t("Social"), href: "/social" },
      {
        key: "statusProfile",
        label: t("ProfileStatus"),
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
        zIndex: 99,
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
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="light"
                  className="text-[#7D1f1F] dark:text-white"
                >
                  {t("Language")} <Globe />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Language Selector"
                className="rounded-xl border-2 border-[#cccccc]"
              >
                <DropdownItem
                  className="text-primary dark:text-white"
                  onClick={() => handleLanguageChange("en")}
                >
                  <ReactCountryFlag
                    className="emojiFlag mr-1 text-2xl"
                    countryCode={"US"}
                    svg
                    alt="lang"
                  />
                  English
                </DropdownItem>
                <DropdownItem
                  className="text-primary dark:text-white"
                  onClick={() => handleLanguageChange("vi")}
                >
                  <ReactCountryFlag
                    className="emojiFlag mr-1 text-2xl"
                    countryCode={"VN"}
                    svg
                    alt="lang"
                  />
                  Tiếng Việt
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
                {t("Sign Up")}
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
                {t("Log In")}
              </Button>
            </>
          )}
        </NavbarContent>
        {/* mobile menu */}
        <NavbarMenu className="flex min-h-screen flex-col justify-between space-y-4 bg-gray-50 p-4 dark:bg-gray-900 md:hidden">
          <div className="space-y-4">
            <div className="space-y-2">{renderNavItems()}</div>

            <div className="flex justify-center py-2">
              <NavbarItem>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="light"
                      className="text-[#7D1f1F] dark:text-white"
                    >
                      {t("Language")} <Globe />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Language Selector"
                    className="rounded-xl border-2 border-[#cccccc]"
                  >
                    <DropdownItem
                      className="text-primary dark:text-white"
                      onClick={() => handleLanguageChange("en")}
                    >
                      <ReactCountryFlag
                        className="emojiFlag mr-1 text-2xl"
                        countryCode={"US"}
                        svg
                        alt="lang"
                      />
                      English
                    </DropdownItem>
                    <DropdownItem
                      className="text-primary dark:text-white"
                      onClick={() => handleLanguageChange("vi")}
                    >
                      <ReactCountryFlag
                        className="emojiFlag mr-1 text-2xl"
                        countryCode={"VN"}
                        svg
                        alt="lang"
                      />
                      Tiếng Việt
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            </div>
            <div className="flex justify-center">
              <NavbarItem>
                <ThemeToggle />
              </NavbarItem>
            </div>
            <div className="w-full space-y-3">
              {account ? (
                <AccountMenu account={account} isMobile={true} />
              ) : (
                <>
                  <Button
                    as={Link}
                    onClick={() => setLoading(true)}
                    isLoading={isLoading}
                    variant="shadow"
                    radius="full"
                    size="lg"
                    className="w-full bg-[#7D1F1F] font-semibold text-white transition-colors hover:bg-[#9B2626] dark:text-primary"
                    href="/auth/login"
                  >
                    {t("Log In")}
                  </Button>
                  <Button
                    as={Link}
                    variant="bordered"
                    radius="full"
                    onClick={() => setLoading(true)}
                    isLoading={isLoading}
                    size="lg"
                    className="w-full border-[#7D1F1F] font-semibold text-[#7D1F1F] transition-colors hover:bg-[#7D1F1F] hover:text-white dark:border-primary dark:text-white"
                    href="/auth/register"
                  >
                    {t("Sign Up")}
                  </Button>
                </>
              )}
            </div>
          </div>
        </NavbarMenu>
      </Navbar>
    </motion.div>
  );
};
