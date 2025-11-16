"use client";

import React from "react";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="flex items-center h-16 px-6 border-b bg-background shrink-0 z-10">
      <h1 className="text-xl font-bold tracking-tight">{t("formBuilder")}</h1>
      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm font-medium">{t("language")}:</span>
        <select
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="border p-1 rounded-md bg-background text-sm"
        >
          <option value="en">English</option>
          <option value="de">German</option>
        </select>
      </div>
    </header>
  );
}