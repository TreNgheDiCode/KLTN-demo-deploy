"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEdgeStore } from "@/hooks/use-edgestore";
import { RegisterFormValues } from "@/schemas";
import { SingleFileDropzone } from "@/types/generic";
import { CertificateType, DegreeType, GradeType } from "@prisma/client";
import { useState } from "react";
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { toast } from "sonner";
import { CertificateDropzone } from "./certificate-dropzone";
import { Button } from "@/components/ui/button";

type Props = {
  control: Control<RegisterFormValues>;
  watch: UseFormWatch<RegisterFormValues>;
  setValue: UseFormSetValue<RegisterFormValues>;
};

export const EducationInputs = ({ control, watch, setValue }: Props) => {
  const [certificate, setCertificate] = useState<
    SingleFileDropzone | undefined
  >();
  const [uploadingCertificate, setUploadingCertificate] = useState(false);
  const { edgestore } = useEdgeStore();

  const onSelectedCertificate = async (value?: SingleFileDropzone) => {
    if (value?.file && value.file instanceof File) {
      setCertificate(value);
      setUploadingCertificate(true);
      try {
        await edgestore.publicFiles
          .upload({
            file: value.file,
          })
          .then((res) => {
            if (res.url) {
              setCertificate({ file: res.url });
              setValue("certificateImg", res.url);
            }
            if (!res.url) {
              toast.error("Có lỗi xảy ra khi tải ảnh lên");

              setCertificate(undefined);
            }
          });
      } catch (error) {
        setCertificate(undefined);
        toast.error("Có lỗi xảy ra khi tải ảnh lên");
      } finally {
        setUploadingCertificate(false);
      }
    }
  };

  const gradeType = watch("gradeType") as GradeType;
  const certificateType = watch("certificateType") as CertificateType;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="my-2 text-center text-lg font-semibold text-main dark:text-main-foreground md:text-xl lg:text-3xl xl:text-5xl">
        Vui lòng cung cấp thông tin cơ bản của bạn
      </h1>
      <p className="text-center text-sm text-neutral-500 dark:text-neutral-800 lg:text-base">
        *Thông tin này sẽ được sử dụng để lập hồ sơ và đính kèm thông tin trong
        tài khoản của bạn*
      </p>
      <div className="mx-auto my-4 h-1 w-[30vw] bg-main dark:bg-main-foreground" />
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
        <FormField
          control={control}
          name="degreeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-main dark:text-main-foreground">
                Trình độ học vấn
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="text-primary dark:text-main-foreground">
                  <FormControl>
                    <SelectValue />
                  </FormControl>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={DegreeType.UNIVERSITY}>Đại học</SelectItem>
                  <SelectItem value={DegreeType.HIGHSCHOOL}>
                    Phổ thông
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-3">
          <FormField
            control={control}
            name="gradeType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-main dark:text-main-foreground">
                  Thang điểm trung bình
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="text-primary dark:text-main-foreground">
                    <FormControl>
                      <SelectValue />
                    </FormControl>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={GradeType.GPA}>
                      GPA (Thang điểm 4)
                    </SelectItem>
                    <SelectItem value={GradeType.CGPA}>
                      CGPA (Thang điểm 10)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {gradeType && (
            <FormField
              control={control}
              name="gradeScore"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-main dark:text-main-foreground">
                    Điểm số
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step={0.1}
                      max={gradeType === GradeType.GPA ? 4 : 10}
                      min={0}
                      className="text-primary dark:text-main-foreground"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <FormField
          control={control}
          name="certificateType"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-main dark:text-main-foreground">
                Chứng chỉ ngoại ngữ
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="text-primary dark:text-main-foreground">
                  <FormControl>
                    <SelectValue />
                  </FormControl>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={CertificateType.IELTS}>IELTS</SelectItem>
                  <SelectItem value={CertificateType.TOEFL}>TOEFL</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {certificateType && (
          <FormField
            control={control}
            name="certificateImg"
            render={({ field }) => {
              return (
                <FormItem className="row-span-3 flex flex-col gap-2">
                  <FormLabel className="text-main dark:text-main-foreground">
                    Ảnh chứng chỉ ngoại ngữ
                  </FormLabel>
                  {uploadingCertificate ? (
                    <div className="flex h-64 items-center justify-center">
                      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-main/90 dark:border-main-foreground/90"></div>
                    </div>
                  ) : (
                    <FormControl>
                      <CertificateDropzone
                        disabled={
                          control._formState.isSubmitting ||
                          uploadingCertificate
                        }
                        value={
                          { file: field.value || certificate?.file } ??
                          certificate
                        }
                        onChange={(file) => {
                          if (file) {
                            onSelectedCertificate({ file });
                          }
                        }}
                      />
                    </FormControl>
                  )}
                  {field.value && (
                    <Button
                      disabled={
                        control._formState.isSubmitting || uploadingCertificate
                      }
                      size="sm"
                      onClick={() => {
                        field.onChange("");
                        setCertificate(undefined);
                      }}
                      className={
                        "bg-main text-white hover:bg-main/70 dark:bg-main-component dark:text-main-foreground hover:dark:bg-main-component/70"
                      }
                    >
                      Xóa ảnh
                    </Button>
                  )}
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}
      </div>
    </div>
  );
};
