import { School, StudentStatus } from "@prisma/client";

export type SchoolLib = School & {
  programs: {
    name: string;
  }[];
};

export type AccountIdLib = {
  id: string;
  name: string;
  image?: string;
  email: string;
  isTwoFactorEnabled: boolean;
  student: {
    studentCode: string;
    status: StudentStatus;
  };
};

export type Ward = {
  Id: string;
  Name: string;
  Level: string;
};

export type District = {
  Id: string;
  Name: string;
  Wards: Ward[];
};

export type City = {
  Id: string;
  Name: string;
  Districts: District[];
};
