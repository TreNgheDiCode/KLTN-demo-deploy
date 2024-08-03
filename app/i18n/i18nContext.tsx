"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import i18n from "./i18n"; // Import i18n đã cấu hình

// Định nghĩa context
interface I18nContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Định nghĩa provider
interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [locale, setLocale] = useState<string>(i18n.language);
  const value = {
    locale,
    setLocale: (newLocale: string) => {
      i18n.changeLanguage(newLocale);
      setLocale(newLocale);
    },
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

// Hook để sử dụng context
export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
