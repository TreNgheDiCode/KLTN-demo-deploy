"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { DegreeType } from "@prisma/client";

interface ProgramInputProps {
  field: any;
  onSelectionChange: () => void;
  isLoading: boolean;
  value: string;
  errorMessage?: string;
  isInvalid: boolean;
}

export const DegreeInput = ({
  field,
  onSelectionChange,
  isLoading,
  value,
  errorMessage,
  isInvalid,
}: ProgramInputProps) => {
  return (
    <Select
      disallowEmptySelection
      items={[DegreeType.HIGHSCHOOL, DegreeType.UNIVERSITY]}
      isDisabled={isLoading}
      label="Academic level"
      labelPlacement="outside"
      variant="bordered"
      size="md"
      aria-label="Choose a academic level"
      placeholder="Choose a academic level"
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      onSelectionChange={onSelectionChange}
      defaultSelectedKeys={[DegreeType.HIGHSCHOOL]}
      classNames={{
        listbox: "text-primary",
      }}
      {...field}
    >
      <SelectItem key={DegreeType.HIGHSCHOOL}>Highschool</SelectItem>
      <SelectItem key={DegreeType.UNIVERSITY}>University</SelectItem>
    </Select>
  );
};
