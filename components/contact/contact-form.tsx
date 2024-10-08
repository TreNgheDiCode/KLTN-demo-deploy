"use client";

import { createContact } from "@/actions/contact";
import { ContactFormValues, ContactSchema } from "@/schemas";
import { SchoolData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { FeedbackType } from "@prisma/client";

type Props = {
  schools: SchoolData | null;
};
export const ContactForm = ({ schools }: Readonly<Props>) => {
  const { t } = useTranslation("contact");
  const titleLabelMap: Record<FeedbackType, string> = {
    [FeedbackType.FEEDBACK]: `${t("request")}`,
    [FeedbackType.SYSTEM]: `${t("systemProblem")}`,
    [FeedbackType.REFUND]: `${t("request for refund")}`,
    [FeedbackType.BILLING]: `${t("order and payment")}`,
    [FeedbackType.SUBSCRIPTION]: `${t("unSubscribe")}`,
    [FeedbackType.SCHOLARSHIP]: `${t("Scholarship")}`,
    [FeedbackType.PROCEDURE]: `${t("Study abroad procedures")}`,
    [FeedbackType.GENERAL]: `${t("System problem")}`,
    [FeedbackType.UNKNOWN]: `${t("System problem")}`,
    [FeedbackType.QUESTION]: `${t("System problem")}`,
  };
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ContactFormValues>({
    mode: "all",
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      phone: "",
      schoolId: undefined,
      title: undefined,
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setLoading(true);

    await createContact(values)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(res.success);
          form.reset();
          router.refresh();
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="container flex h-full flex-col items-center gap-y-2 pt-4 text-primary">
        <h1 className="text-3xl font-bold text-main dark:text-primary">
          {t("contact")}
        </h1>
        <p className="text-center">
          {t("des1")}
          <br />
          {t("des2")}
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-1/2 max-w-[70vw] space-y-3"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("title")}*</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("selectProblem") + "..."} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(titleLabelMap).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="schoolId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("school")}</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={"-" + `${t("SelectSchool")}` + "-"}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {schools?.map((school) => (
                        <SelectItem key={school.id} value={school.id}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <Input {...field} placeholder="john.example@gmail.com" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phoneNumber")}*</FormLabel>
                    <Input {...field} placeholder="0763111234" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}*</FormLabel>
                  <Input {...field} placeholder="John Doe" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("messenger")}*</FormLabel>
                  <Textarea {...field} placeholder={t("desMess") + "..."} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center">
              <Button
                disabled={loading}
                className="bg-main hover:bg-main/85 dark:bg-background dark:hover:bg-background/85"
                type="submit"
              >
                {t("button")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
