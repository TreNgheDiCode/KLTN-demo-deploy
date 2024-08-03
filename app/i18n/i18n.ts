"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import tệp JSON trực tiếp
import enNav from "../(locales)/en/nav.json";
import viNav from "../(locales)/vi/nav.json";
import viHome from "../(locales)/vi/home.json";
import enHome from "../(locales)/en/home.json";
import eSchool from "../(locales)/en/school.json";
import viSchool from "../(locales)/vi/school.json";
import viAboutUs from "../(locales)/vi/about-us.json";
import enAboutUs from "../(locales)/en/about-us.json";
import enContact from "../(locales)/en/contact.json";
import viContact from "../(locales)/vi/contact.json";
import viSocial from "../(locales)/vi/social.json";
import enSocial from "../(locales)/en/social.json";
import enLoading from "../(locales)/en/loading.json";
import viLoading from "../(locales)/vi/loading.json";

const resources = {
  en: {
    nav: enNav,
    home: enHome,
    school: eSchool,
    aboutUs: enAboutUs,
    contact: enContact,
    social: enSocial,
    loading: enLoading,
  },
  vi: {
    nav: viNav,
    home: viHome,
    school: viSchool,
    aboutUs: viAboutUs,
    contact: viContact,
    social: viSocial,
    loading: viLoading,
  },
};
const defaultNS = "nav";
// Cấu hình i18next
i18n.use(initReactI18next).init({
  resources,
  lng: "vi", // Ngôn ngữ mặc định
  fallbackLng: "vi",
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
