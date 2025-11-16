import { useState } from "react";
import en from "./en";
import fr from "./fr";
import es from "./es";
import ga from "./ga";

const LANGS: any = { en, fr, es, ga };

export const useTranslation = () => {
    const [locale, setLocale] = useState("en");
    const changeLanguage = (lang: string) => setLocale(lang);

    const t = (key: string) => {
        const keys = key.split(".");
        let val = LANGS[locale];
        keys.forEach((k) => { if (val) val = val[k]; });
        return val || key;
    };

    return { t, locale, changeLanguage };
};
