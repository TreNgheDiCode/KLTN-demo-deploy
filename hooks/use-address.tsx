import { provinces } from "@/data/provinces";

export const getProvinces = () => {
  return provinces.map((province) => ({
    code: province.code,
    fullName: province.fullName,
  }));
};

export const getDistricts = (provinceCode: string) => {
  const province = provinces.find((p) => p.code === provinceCode);
  if (!province) return [];
  return province.districts.map((district) => ({
    code: district.code,
    fullName: district.fullName,
  }));
};

export const getDistrictsByProvinceName = (provinceName: string) => {
  const province = provinces.find((p) => p.fullName === provinceName);
  if (!province) return [];
  return province.districts.map((district) => ({
    code: district.code,
    fullName: district.fullName,
  }));
};

export const getWards = (provinceCode: string, districtCode: string) => {
  const province = provinces.find((p) => p.code === provinceCode);
  if (!province) return [];
  const district = province.districts.find((d) => d.code === districtCode);
  if (!district) return [];
  return district.wards.map((ward) => ({
    code: ward.code,
    fullName: ward.fullName,
  }));
};

export const getWardsByDistrictName = (
  provinceName: string,
  districtName: string,
) => {
  const province = provinces.find((p) => p.fullName === provinceName);
  if (!province) return [];
  const district = province.districts.find((d) => d.fullName === districtName);
  if (!district) return [];
  return district.wards.map((ward) => ({
    code: ward.code,
    fullName: ward.fullName,
  }));
};
