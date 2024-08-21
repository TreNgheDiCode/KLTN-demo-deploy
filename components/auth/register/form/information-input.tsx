"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getDistrictsByProvinceName,
  getProvinces,
  getWardsByDistrictName,
} from "@/hooks/use-address";
import { cn } from "@/lib/utils";
import { RegisterFormValues } from "@/schemas";
import { Gender } from "@prisma/client";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Control, UseFormWatch } from "react-hook-form";

type Props = {
  control: Control<RegisterFormValues>;
  watch: UseFormWatch<RegisterFormValues>;
};

export const InformationInputs = ({ control, watch }: Props) => {
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
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-main dark:text-main-foreground">
                Họ và tên
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập họ tên của bạn..."
                  {...field}
                  className="text-primary dark:text-main-foreground"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <FormField
            control={control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-main dark:text-main-foreground">
                  Ngày sinh
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        className={cn(
                          "w-full rounded-md border border-neutral-300 bg-transparent pl-3 text-left font-normal text-primary hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground dark:border-neutral-700 dark:text-main-foreground",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), "dd/MM/yyyy", {
                            locale: vi,
                          })
                        ) : (
                          <span>Chọn ngày sinh</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      fromYear={1920}
                      toYear={2009}
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date("2009-12-31") ||
                        date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-main dark:text-main-foreground">
                  Số điện thoại
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập số điện thoại của bạn..."
                    {...field}
                    className="text-primary dark:text-main-foreground"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="idCardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-main dark:text-main-foreground">
                  Số CMND
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập số CMND của bạn..."
                    {...field}
                    className="text-primary dark:text-main-foreground"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-main dark:text-main-foreground">
                Giới tính
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="text-primary dark:text-main-foreground">
                  <FormControl>
                    <SelectValue />
                  </FormControl>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Gender.MALE}>Nam</SelectItem>
                  <SelectItem value={Gender.FEMALE}>Nữ</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h2 className="text-base font-medium text-main dark:text-main-foreground">
            ĐỊA CHỈ
          </h2>
          <div className="my-2 h-1 w-full bg-main dark:bg-main-foreground" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <CityInput control={control} watch={watch} />
            <DistrictInput control={control} watch={watch} />
            <WardInput control={control} watch={watch} />
            <FormField
              control={control}
              name="addressLine"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel className="text-main dark:text-main-foreground">
                    Địa chỉ chi tiết
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập địa chỉ của bạn..."
                      {...field}
                      className="text-primary dark:text-main-foreground"
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="text-xs text-muted-foreground dark:text-main-component">
                    Ví dụ: Số nhà, tên đường, tên khu vực...
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CityInput = ({ control }: Props) => {
  const provinces = getProvinces();
  return (
    <FormField
      control={control}
      name={`city`}
      render={({ field }) => (
        <FormItem>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <button className="relative inline-flex h-12 w-full overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-main px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    {field.value || "Chọn thành phố"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </span>
                </button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="h-[380px]">
              <Command
                loop
                filter={(value, search, keywords) => {
                  const extendValue = value + " " + keywords?.join(" ");

                  return extendValue
                    .toLowerCase()
                    .includes(search.toLowerCase())
                    ? 1
                    : 0;
                }}
              >
                <CommandInput placeholder="Mã/Tên thành phố..." />
                <CommandEmpty>Không tìm thấy thành phố</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {provinces?.map((province) => {
                      return (
                        <CommandItem
                          keywords={[province.fullName]}
                          key={province.code}
                          value={province.fullName}
                          onSelect={(value) => {
                            field.onChange(value);
                          }}
                          className={cn(
                            province.fullName === field.value && "bg-muted/85",
                          )}
                        >
                          {province.fullName}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              province.fullName === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      );
                    })}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const DistrictInput = ({ control, watch }: Props) => {
  const city = watch("city");
  const districts = getDistrictsByProvinceName(city);

  return (
    <FormField
      control={control}
      name={`district`}
      render={({ field }) => (
        <FormItem>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <button className="relative inline-flex h-12 w-full overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-main px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    {field.value || "Chọn quận/huyện"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </span>
                </button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="h-[380px]">
              <Command
                loop
                filter={(value, search, keywords) => {
                  const extendValue = value + " " + keywords?.join(" ");

                  return extendValue
                    .toLowerCase()
                    .includes(search.toLowerCase())
                    ? 1
                    : 0;
                }}
              >
                <CommandInput placeholder="Mã/Tên quận/huyện..." />
                <CommandEmpty>Không tìm thấy quận/huyện</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {city &&
                      districts?.map((district) => {
                        return (
                          <CommandItem
                            keywords={[district.fullName]}
                            key={district.code}
                            value={district.fullName}
                            onSelect={(value) => {
                              field.onChange(value);
                            }}
                            className={cn(
                              district.fullName === field.value &&
                                "bg-muted/85",
                            )}
                          >
                            {district.fullName}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                district.fullName === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        );
                      })}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const WardInput = ({ control, watch }: Props) => {
  const city = watch("city");
  const district = watch("district");
  const wards = getWardsByDistrictName(city, district);

  return (
    <FormField
      control={control}
      name={`ward`}
      render={({ field }) => (
        <FormItem>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <button className="relative inline-flex h-12 w-full overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-main px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    {field.value || "Chọn phường/xã/thị trấn"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </span>
                </button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="h-[380px]">
              <Command
                loop
                filter={(value, search, keywords) => {
                  const extendValue = value + " " + keywords?.join(" ");

                  return extendValue
                    .toLowerCase()
                    .includes(search.toLowerCase())
                    ? 1
                    : 0;
                }}
              >
                <CommandInput placeholder="Mã/Tên phường/xã/thị trấn..." />
                <CommandEmpty>Không tìm thấy quận/huyện</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {city &&
                      district &&
                      wards?.map((ward) => {
                        return (
                          <CommandItem
                            keywords={[ward.fullName]}
                            key={ward.code}
                            value={ward.fullName}
                            onSelect={(value) => {
                              field.onChange(value);
                            }}
                            className={cn(
                              ward.fullName === field.value && "bg-muted/85",
                            )}
                          >
                            {ward.fullName}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                ward.fullName === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        );
                      })}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
