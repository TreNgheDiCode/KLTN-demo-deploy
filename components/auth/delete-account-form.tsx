"use client";

import { confirmDelete } from "@/actions/auth/delete";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";
import { CardWrapper } from "./card-wrapper";

export const DeleteAccountForm = () => {
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

    await confirmDelete(token)
      .then((res) => {
        if (res.success) {
          toast.success(res.success);

          setTimeout(() => router.push("/auth/register"), 2000);
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
    <CardWrapper>
      <div className="flex w-full items-center justify-center">
        {isLoading && <BeatLoader />}
      </div>
    </CardWrapper>
  );
};
