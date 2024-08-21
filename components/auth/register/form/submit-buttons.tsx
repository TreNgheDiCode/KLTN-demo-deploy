"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  prev: () => void;
  next: () => void;
  currentStep: number;
  stepsLength: number;
  data: any;
  onSubmit: (data: any) => void;
  loading: boolean;
};

export const SubmitButtons = ({
  prev,
  next,
  currentStep,
  stepsLength,
  data,
  onSubmit,
  loading,
}: Props) => {
  return (
    <div className="my-4 flex w-full items-center justify-around">
      <Button
        variant="outline"
        onClick={prev}
        disabled={currentStep === 0 || loading}
        className="flex items-center gap-x-2 rounded bg-white px-2 py-1 text-sm font-semibold text-main/90 shadow-sm ring-1 ring-inset ring-main/30 hover:bg-main/5 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-main-component dark:text-main-foreground/90 dark:ring-main-foreground/30 dark:hover:bg-main-foreground/5"
      >
        <ChevronLeft />
        Quay về
      </Button>
      {currentStep === stepsLength - 1 &&
        (loading ? (
          <div className="flex items-center gap-x-2">
            <span>Đang xử lý...</span>
            <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-main dark:border-main-component"></div>
          </div>
        ) : (
          <Button
            onClick={() => onSubmit(data)}
            disabled={loading}
            className="border-main bg-main font-bold text-white dark:border-main-component dark:bg-main-component dark:text-main-foreground"
          >
            Đăng ký hồ sơ
          </Button>
        ))}
      <Button
        variant="outline"
        onClick={next}
        disabled={currentStep === stepsLength - 1 || loading}
        className="flex items-center gap-x-2 rounded bg-white px-2 py-1 text-sm font-semibold text-main/90 shadow-sm ring-1 ring-inset ring-main/30 hover:bg-main/5 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-main-component dark:text-main-foreground/90 dark:ring-main-foreground/30 dark:hover:bg-main-foreground/5"
      >
        Tiếp theo
        <ChevronRight />
      </Button>
    </div>
  );
};
