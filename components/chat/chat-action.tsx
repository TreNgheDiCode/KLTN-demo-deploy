"use client";

import { useRouter } from "next/navigation";
import { AlertModal } from "./alert-modal";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { deleteChatMessages } from "@/actions/chat-support";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

type Props = {
  clientId: string;
};

export const ChatAction = ({ clientId }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data } = useSession();
  const accountId = (data && data.user && data.user.id) || undefined;

  const onConfirm = async () => {
    setLoading(true);

    await deleteChatMessages(clientId, accountId).then((res) => {
      if (res.error) {
        toast.error(res.error);
      }

      if (res.success) {
        toast.success(res.success);
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
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Hành động</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-[99999]">
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4 text-rose-600" /> Khôi phục hội thoại
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
