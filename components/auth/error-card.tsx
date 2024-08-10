import { AlertTriangle } from "lucide-react";
import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Ôi không! Đã xảy ra lỗi không mong muốn."
      backButtonHref="/auth/login"
      backButtonLabel="Quay lại trang đăng nhập"
    >
      <div className="flex w-full items-center justify-center">
        <AlertTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
