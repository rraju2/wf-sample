"use client";

import React, { useState, useEffect } from "react";
import { LayoutType } from "@/types";
import LibraryPanel from "./LibraryPanel";
import Canvas from "./Canvas";
import PropertyEditor from "./PropertyEditor";
import { useTranslation } from "@/i18n/hooks";

interface FormBuilderProps {
    layout?: LayoutType;
}

export default function FormBuilder({ layout: propLayout }: FormBuilderProps) {
    const [selectedComponent, setSelectedComponent] = useState<any>(null);
    const [layout, setLayout] = useState<LayoutType>(propLayout || "desktop");
    const { t } = useTranslation();

    useEffect(() => {
        if (propLayout) setLayout(propLayout);
    }, [propLayout]);

    return (
        <div className="flex gap-4 h-full">
            <LibraryPanel t={t} />
            <Canvas
                selectedComponent={selectedComponent}
                setSelectedComponent={setSelectedComponent}
                t={t}
                layout={layout}
            />
            <PropertyEditor
                selectedComponent={selectedComponent}
                setSelectedComponent={setSelectedComponent}
                t={t}
            />
        </div>
    );
}
