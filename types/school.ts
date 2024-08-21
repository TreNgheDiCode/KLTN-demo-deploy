import { Country } from "@prisma/client";

export type SchoolAuth = {
  id: string;
  name: string;
  country: Country;
  logo: string;
  short: string | null;
  background: string;
  locations: {
    name: string;
    isMain: boolean;
    cover: string;
    description: string;
    images: {
      url: string;
    }[];
  }[];
  programs: {
    name: string;
    cover: string;
    description: string;
    images: {
      url: string;
    }[];
  }[];
};
