export interface Ward {
  code: string;
  fullName: string;
}

export interface District {
  code: string;
  fullName: string;
  wards: Ward[];
}

export interface Province {
  code: string;
  fullName: string;
  districts: District[];
}
