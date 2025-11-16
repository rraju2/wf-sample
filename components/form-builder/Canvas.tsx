"use client";

import React from "react";
import { LayoutType } from "@/types";

interface CanvasProps {
    selectedComponent: any;
    setSelectedComponent: (comp: any) => void;
    t: (key: string) => string;
    layout: LayoutType;
}

export default function Canvas({ t, layout }: CanvasProps) {
    const gridCols =
        layout === "desktop" ? "grid-cols-3" :
            layout === "tablet" ? "grid-cols-2" :
                "grid-cols-1";

    const formData = [
        { id: "c1", labelKey: "labels.countries", type: "select" },
        { id: "c2", labelKey: "labels.languages", type: "select" },
        { id: "c3", labelKey: "labels.sponsors", type: "select" },
    ];

    return (
        <div className="flex-1 p-2 bg-white rounded shadow overflow-auto">
            <div className={`grid gap-4 ${gridCols}`}>
                {formData.map((f) => (
                    <div key={f.id} className="p-2 border rounded bg-slate-50">
                        <span className="block mb-1 font-semibold">{t(f.labelKey)}</span>
                        <input
                            type="text"
                            className="w-full border p-1 rounded"
                            placeholder={t("placeholders.select")}
                        />
                    </div>
                ))}
            </div>
            <pre className="mt-4 bg-slate-50 p-2 rounded">
                {JSON.stringify(formData, null, 2)}
            </pre>
        </div>
    );
}
