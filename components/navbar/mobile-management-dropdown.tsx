import { Button, NavbarMenuItem, NavbarContent } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth/logout";

export const MobileManagementDropdown = () => {
  const pathname = usePathname();

  return (
    <NavbarContent className="flex flex-col gap-4 md:hidden" justify="start">
      <NavbarMenuItem isActive={pathname.includes(`/logout`)} key="logout">
        <Button
          onClick={() => logout()}
          disableRipple
          color="danger"
          radius="sm"
          variant="light"
          className="h-full w-full justify-start p-0 text-large"
        >
          Đăng xuất
        </Button>
      </NavbarMenuItem>
    </NavbarContent>
  );
};
