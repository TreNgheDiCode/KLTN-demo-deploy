"use client";

import { CardWrapper } from "./card-wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { newVerification } from "@/actions/auth/new-verification";
import { toast } from "sonner";

export const NewVerificationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      toast.error("Missing verification token");
      return;
    }

    setIsLoading(true);

    await newVerification(token)
      .then((res) => {
        if (res.success) {
          toast.success(res.success);

          setTimeout(() => router.push("/auth/login"), 2000);
        }

        if (res.error) {
          toast.error(res.error);
        }
      })
      .finally(() => setIsLoading(false));
  }, [token, router]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
    headerLabel="Xác minh tài khoản"
    backButtonLabel="Quay lại trang đăng nhập"
    backButtonHref="/auth/login"
    >
      <div className="flex w-full items-center justify-center">
        {isLoading && <BeatLoader />}
      </div>
    </CardWrapper>
  );
};
