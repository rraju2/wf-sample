"use client";
import React from "react";

interface LibraryPanelProps {
    t: (key: string) => string;
}

export default function LibraryPanel({ t }: LibraryPanelProps) {
    const components = ["SelectWithValidation", "TextInput", "Checkbox"];
    return (
        <div className="w-60 border p-2 rounded bg-slate-100 h-full overflow-auto">
            <h4 className="font-bold mb-2">{t("labels.library")}</h4>
            {components.map((c) => (
                <div
                    key={c}
                    className="p-1 border mb-1 cursor-pointer hover:bg-slate-200"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("component", c)}
                >
                    {c}
                </div>
            ))}
        </div>
    );
}
