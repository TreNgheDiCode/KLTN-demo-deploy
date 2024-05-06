import {
  Post,
  Profile,
  ProfileBiography,
  School,
  Student,
  StudentStatus,
} from "@prisma/client";

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

export type StudentLib = Student & {
  account: {
    dob: Date;
    address: string;
    name: string;
    image: string;
  };
  school: {
    name: string;
    logo: string;
  };
  profile: Profile & {
    posts: Post[];
    biography: ProfileBiography;
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
