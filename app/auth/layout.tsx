import { LanguageToggle } from "@/components/language-switcher";
import { Image } from "@nextui-org/react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="absolute flex w-full items-center justify-between">
        <Image
          width={85}
          src="/logo_icon_light.png"
          alt="logo"
          className="m-4 flex-1 dark:hidden"
        />
        <Image
          width={85}
          src="/logo_icon_light.png"
          alt="logo"
          className="m-4 hidden flex-1 dark:block"
        />
        <div className="mx-4 flex items-center gap-x-2">
          <LanguageToggle />
        </div>
      </div>
      <div className="flex h-full items-center justify-center bg-background">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
