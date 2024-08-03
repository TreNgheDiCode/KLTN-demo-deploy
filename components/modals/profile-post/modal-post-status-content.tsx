"use client";

import {
  Button,
  Divider,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { StatusButton } from "./status-button";
import { SetStateAction } from "react";
import { Status } from "../profile-post-modal";

interface ModalPostStatusContentProps {
  currentStatus: {
    label: string;
    icon: JSX.Element;
    description: string;
  };
  onClick: (
    value: SetStateAction<{
      label: string;
      icon: JSX.Element;
      description: string;
    }>,
  ) => void;
  onReturn: (value: boolean) => void;
}

export const ModalPostStatusContent = ({
  onClick,
  currentStatus,
  onReturn,
}: ModalPostStatusContentProps) => {
  return (
    <ModalContent className="bg-white text-primary dark:bg-background">
      <ModalHeader className="relative items-center justify-center">
        <button
          onClick={() => onReturn(false)}
          className="absolute left-6 top-5"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        Chủ đề của bài viết
      </ModalHeader>
      <Divider />
      <ModalBody>
        <div className="flex flex-col">
          <h1 className="text-base font-semibold">
            Ai có thể xem bài đăng của bạn?
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Bài viết của bạn sẽ hiển thị trên bảng tin, trang cá nhân và kết quả
            tìm kiếm.
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Cài đặt mặc định là <strong>Công khai</strong>, nhưng bạn có thể
            thay đổi cài đặt này bên dưới.
          </p>
        </div>
        <StatusButton
          activeStatus={Status.PUBLIC}
          currentStatus={currentStatus}
          onClick={() => onClick(Status.PUBLIC)}
        />
        <StatusButton
          activeStatus={Status.FRIENDS}
          currentStatus={currentStatus}
          onClick={() => onClick(Status.FRIENDS)}
        />
        <StatusButton
          activeStatus={Status.EXCEPT}
          currentStatus={currentStatus}
          onClick={() => onClick(Status.EXCEPT)}
        />
        <StatusButton
          activeStatus={Status.PRIVATE}
          currentStatus={currentStatus}
          onClick={() => onClick(Status.PRIVATE)}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={() => {
            onClick(Status.PUBLIC);
            onReturn(false);
          }}
          color="primary"
          variant="bordered"
        >
          Thoát
        </Button>
        <Button
          onClick={() => {
            onReturn(false);
          }}
          color="primary"
        >
          Xác nhận
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};
