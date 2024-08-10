"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { Header } from "./header";
import { BackButton } from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  subLabel?: string;
  backButtonLabel: string;
  backButtonHref: string;
  subIcon?: React.ReactNode | JSX.Element;
  subIconAction?: () => void;
}

export const CardWrapper = ({
  children,
  headerLabel,
  subLabel,
  backButtonHref,
  backButtonLabel,
  subIcon,
  subIconAction,
}: CardWrapperProps) => {
  return (
    <Card className="w-[500px] px-3 py-4">
      <CardHeader className="relative">
        <Header label={headerLabel} subLabel={subLabel} />
        {subIcon && subIconAction && (
          <div
            onClick={subIconAction}
            className="absolute right-6 top-5 transition hover:scale-105 hover:cursor-pointer hover:font-bold"
          >
            {subIcon}
          </div>
        )}
      </CardHeader>
      <CardBody>{children}</CardBody>
      <Divider />
      <CardFooter className="flex items-center justify-center">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
