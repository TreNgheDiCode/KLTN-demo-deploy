import { Header } from "./header";
import { BackButton } from "./back-button";
import { CardWrapper } from "./card-wrapper";
import { AlertTriangle } from "lucide-react";

export const ErrorCard = () => {
  return (
    <CardWrapper>
      <div className="flex w-full items-center justify-center">
        <AlertTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
