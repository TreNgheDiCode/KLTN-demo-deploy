"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";

import { deleteAccount } from "@/actions/auth/delete";
import { DeleteFormValues, DeleteSchema } from "@/schemas";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Modal } from "../ui/animated-modal";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";

export const DeleteForm = () => {
  const [loading, setLoading] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const form = useForm<DeleteFormValues>({
    resolver: zodResolver(DeleteSchema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (values: DeleteFormValues) => {
    setLoading(true);

    // Call deleteAccount action
    const res = await deleteAccount(values);

    if (res.messsage) {
      setIsExist(true);
      setLoading(false);
    }

    if (res.success) {
      toast.success(res.success);
      router.push("/auth/login");
    }

    if (res.error) {
      toast.error(res.error);
    }

    setLoading(false);
  };

  const steps = [
    {
      title: "Bước 1",
      description: "Nhập email của bạn, sau đó ấn xác nhận để tiếp tục.",
    },
    {
      title: "Bước 2",
      description:
        "Hệ thống xác thực người dùng có tồn tại, bạn cung cấp mật khẩu để nhận email xác nhận hoàn tất thủ tục.",
    },
    {
      title: "Bước 3",
      description:
        "Sau khi nhấn vào đường dẫn được cung cấp trong email, tài khoản của bạn sẽ bị xóa vĩnh viễn.",
    },
  ];

  return (
    <>
      <AlertDialog open={open} onOpenChange={() => setOpen((value) => !value)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-main-foreground text-main">
              Quy trình xóa tài khoản
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              {steps.map((step, index) => (
                <Alert
                  key={step.title}
                  variant={
                    index === steps.length - 1 ? "destructive" : "default"
                  }
                >
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>{step.title}</AlertTitle>
                  <AlertDescription>{step.description}</AlertDescription>
                </Alert>
              ))}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              className="w-full bg-[#7D1F1F] text-white"
              onClick={() => setOpen(false)}
            >
              Đã hiểu
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <CardWrapper
        headerLabel="Xóa tài khoản của bạn"
        subLabel="Xin lưu ý, hành động này không thể hủy bỏ."
        backButtonLabel="Bạn quên mật khẩu tài khoản?"
        backButtonHref="/auth/reset"
        subIcon={<InfoCircledIcon className="h-6 w-6 text-muted-foreground" />}
        subIconAction={() => {
          setOpen(true);
        }}
      >
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập email của bạn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isExist && (
                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <Button
              isLoading={loading}
              isDisabled={loading}
              type="submit"
              className="w-full bg-[#7D1F1F] text-white"
              variant="shadow"
            >
              Xác nhận xóa tài khoản
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};
