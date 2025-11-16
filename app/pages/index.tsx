"use client";

import React, { useState } from "react";
import FormBuilder from "@/components/form-builder/FormBuilder";
import Layout from "@/app/dashboard/Layout";
import { useTranslation } from "@/i18n/hooks";

export default function HomePage() {
    const [layout, setLayout] = useState<"desktop" | "tablet" | "mobile">("desktop");
    const { t, changeLanguage, locale } = useTranslation();

    return (
        <Layout>
            <div className="flex flex-col gap-4">
                {/* Controls for layout and language */}
                <div className="flex gap-4 items-center">
                    <label className="font-semibold">{t("labels.layout") || "Layout"}:</label>
                    <select
                        value={layout}
                        onChange={(e) =>
                            setLayout(e.target.value as "desktop" | "tablet" | "mobile")
                        }
                        className="border p-1 rounded"
                    >
                        <option value="desktop">{t("labels.desktop") || "Desktop"}</option>
                        <option value="tablet">{t("labels.tablet") || "Tablet"}</option>
                        <option value="mobile">{t("labels.mobile") || "Mobile"}</option>
                    </select>

                    <label className="font-semibold">{t("labels.language") || "Language"}:</label>
                    <select
                        value={locale}
                        onChange={(e) => changeLanguage(e.target.value)}
                        className="border p-1 rounded"
                    >
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                        <option value="es">Español</option>
                        <option value="ga">Gaeilge</option>
                    </select>
                </div>

                {/* FormBuilder Component */}
                <div className="flex-1 min-h-[600px]">
                    <FormBuilder layout={layout} />
                </div>
            </div>
        </Layout>
    );
}
