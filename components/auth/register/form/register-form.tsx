"use client";

import { RegisterFormValues, RegisterSchema } from "@/schemas";
import { SchoolAuth } from "@/types/school";
import { zodResolver } from "@hookform/resolvers/zod";
import { Country } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import StepperBar from "./stepper";
import { CountryInput } from "./country-input";
import { SubmitButtons } from "./submit-buttons";
import { SchoolInput } from "./school-input";
import { ProgramInput } from "./program-input";
import { Form } from "@/components/ui/form";
import { InformationInputs } from "./information-input";
import { EducationInputs } from "./education-inputs";
import { AccountInputs } from "./account-inputs";
import { PreviewRegister } from "../preview-register";

type Props = {
  schools: Awaited<SchoolAuth[]>;
};

const RegisterForm = ({ schools }: Props) => {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RegisterFormValues>();
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    mode: "all",
    resolver: zodResolver(RegisterSchema),
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const onSubmit = async () => {
    console.log(data);
  };

  const processForm: SubmitHandler<RegisterFormValues> = (data) => {
    setData(data);
  };

  type FieldName = keyof RegisterFormValues;

  const country = watch("country") as Country;
  const schoolName = watch("schoolName") as string;
  const programName = watch("programName") as string;

  const filteredSchoolsByCountry =
    country && Array.isArray(schools)
      ? schools.filter((school) => school.country === country)
      : [];

  const filteredProgramsBySchool =
    schoolName && Array.isArray(schools)
      ? schools.find((school) => school.name === schoolName)?.programs
      : [];

  const steps = [
    {
      id: "Bước 1",
      name: country ? `Đã chọn: ${country}` : "Chọn quốc gia du học",
      fields: ["country"],
    },
    {
      id: "Bước 2",
      name: schoolName ? `Đã chọn: ${schoolName}` : "Chọn trường học",
      fields: ["schoolName"],
    },
    {
      id: "Bước 3",
      name: programName
        ? `Đã chọn: ${programName}`
        : "Chọn chương trình đào tạo",
      fields: ["programName"],
    },
    {
      id: "Bước 4",
      name: "Thông tin cá nhân",
      fields: [
        "name",
        "phoneNumber",
        "dob",
        "gender",
        "idCardNumber",
        "city",
        "district",
        "ward",
        "addressLine",
      ],
    },
    {
      id: "Bước 5",
      name: "Thông tin học vấn",
      fields: [
        "degreeType",
        "certificateType",
        "certificateImg",
        "gradeType",
        "gradeScore",
      ],
    },
    {
      id: "Bước 6",
      name: "Đăng ký tài khoản",
      fields: ["email", "password", "confirmPassword"],
    },
    {
      id: "Bước 7",
      name: "Hoàn tất",
      fields: [],
    },
  ];

  const next = async () => {
    const fields = steps[currentStep]?.fields;

    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const selectedSchool = schools.find((school) => school.name === schoolName);

  return (
    <div id="register-form">
      <StepperBar steps={steps} currentStep={currentStep} />
      {currentStep === 0 && (
        <CountryInput setValue={setValue} watch={watch} errors={errors} />
      )}
      {currentStep === 1 && (
        <SchoolInput
          setValue={setValue}
          watch={watch}
          errors={errors}
          schools={filteredSchoolsByCountry}
        />
      )}
      {currentStep === 2 && (
        <ProgramInput
          setValue={setValue}
          watch={watch}
          errors={errors}
          programs={filteredProgramsBySchool}
        />
      )}
      <Form {...form}>
        <form>
          {currentStep === 3 && (
            <InformationInputs control={control} watch={watch} />
          )}
          {currentStep === 4 && (
            <EducationInputs
              control={control}
              watch={watch}
              setValue={setValue}
            />
          )}
          {currentStep === 5 && (
            <AccountInputs control={control} watch={watch} />
          )}
        </form>
      </Form>
      {/* Preview data */}
      {data && selectedSchool && currentStep === steps.length - 1 && (
        <PreviewRegister
          setValue={setValue}
          watch={watch}
          data={data}
          school={selectedSchool}
        />
      )}
      {!data && currentStep === steps.length - 1 && (
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-main dark:text-main-foreground">
            Lỗi hoàn tất thông tin hồ sơ
          </h1>
          <p className="text-neutral-500 dark:text-neutral-300">
            Vui lòng kiểm tra lại thông tin ở những bước trước đó
          </p>
        </div>
      )}
      <SubmitButtons
        currentStep={currentStep}
        data={data}
        loading={loading}
        next={next}
        onSubmit={handleSubmit(onSubmit)}
        prev={prev}
        stepsLength={steps.length}
      />
    </div>
  );
};

export default RegisterForm;
