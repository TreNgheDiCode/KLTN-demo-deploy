"use client";

import { ContactFormValues, ContactSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ContactTitle } from "@prisma/client";
import { useState } from "react";
import { Button } from "../ui/button";
import { SchoolLib } from "@/types";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createContact } from "@/actions/contact";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

type Props = {
  schools: SchoolLib[] | null;
};
export const ContactForm = ({ schools }: Readonly<Props>) => {
  const { t } = useTranslation("contact");
  const titleLabelMap: Record<ContactTitle, string> = {
    [ContactTitle.FEEDBACK]: `${t("request")}`,
    [ContactTitle.SYSTEM]: `${t("systemProblem")}`,
    [ContactTitle.REFUND]: `${t("request for refund")}`,
    [ContactTitle.BILLING]: `${t("order and payment")}`,
    [ContactTitle.SUBSCRIPTION]: `${t("unSubscribe")}`,
    [ContactTitle.SCHOLARSHIP]: `${t("Scholarship")}`,
    [ContactTitle.PROCEDURE]: `${t("Study abroad procedures")}`,
  };
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const hasSchools = schools && schools.length > 0;

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
                  {hasSchools ? (
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={"-" + `${t("SelectSchool")}` + "-"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {schools.map((school) => (
                          <SelectItem key={school.id} value={school.id}>
                            {school.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {t("NoSchoolsAvailable")}
                    </p>
                  )}
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
