"use client";

import { deleteChatMessages } from "@/actions/chat-support";
import { useChatMessages } from "@/hooks/use-chat-messages";
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AlertModal } from "./alert-modal";

type Props = {
  clientId: string;
};

export const ChatAction = ({ clientId }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    setLoading(true);

    await deleteChatMessages(clientId).then((res) => {
      if (res.error) {
        toast.error(res.error);
      }

      if (res.success) {
        toast.success(res.success);
        setOpen(false);
      }
    });

    router.refresh();
    setLoading(false);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button disabled={loading} variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Hành động</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-[99999]">
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
          <DropdownMenuItem disabled={loading} onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4 text-rose-600" /> Khôi phục hội thoại
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
