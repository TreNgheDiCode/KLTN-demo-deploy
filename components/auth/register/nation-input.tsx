"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { Country, DegreeType } from "@prisma/client";

interface NationInputProps {
  field: any;
  onSelectionChange: () => void;
  isLoading: boolean;
  value: string;
  errorMessage?: string;
  isInvalid: boolean;
}

export const NationInput = ({
  field,
  onSelectionChange,
  isLoading,
  value,
  errorMessage,
  isInvalid,
}: NationInputProps) => {
  return (
    <Select
      disallowEmptySelection
      items={[Country.AUSTRALIA, Country.CANADA, Country.KOREA]}
      isDisabled={isLoading}
      label="Nation"
      labelPlacement="outside"
      variant="bordered"
      size="md"
      aria-label="Choose a nation"
      placeholder="Choose a nation"
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      onSelectionChange={onSelectionChange}
      defaultSelectedKeys={[Country.CANADA]}
      classNames={{
        listbox: "text-primary",
      }}
      {...field}
    >
      <SelectItem key={Country.AUSTRALIA}>Australia</SelectItem>
      <SelectItem key={Country.CANADA}>Canada</SelectItem>
      <SelectItem key={Country.KOREA}>Korea</SelectItem>
    </Select>
  );
};
