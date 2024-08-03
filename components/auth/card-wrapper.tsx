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
}

export const CardWrapper = ({ children }: CardWrapperProps) => {
  return (
    <Card className="w-[500px] px-3 py-4">
      <CardHeader>
        <Header  />
      </CardHeader>
      <CardBody>{children}</CardBody>
      <Divider />
      <CardFooter className="flex items-center justify-center"></CardFooter>
    </Card>
  );
};
