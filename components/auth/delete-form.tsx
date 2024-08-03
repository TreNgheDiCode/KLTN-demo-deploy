"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CardWrapper } from "./card-wrapper";

import { DeleteFormValues, DeleteSchema } from "@/schemas";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "@nextui-org/react";
import { deleteAccount } from "@/actions/auth/delete";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const DeleteForm = () => {
  const [loading, setLoading] = useState(false);
  const [isExist, setIsExist] = useState(false);

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

  return (
    <CardWrapper>
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
                    <Input placeholder="Enter your email" {...field} />
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
                    <FormLabel>Password</FormLabel>
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
            Submit
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
