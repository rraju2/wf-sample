"use client";
import React from "react";

interface PropertyEditorProps {
    selectedComponent: any;
    setSelectedComponent: (comp: any) => void;
    t: (key: string) => string;
}

export default function PropertyEditor({ selectedComponent, setSelectedComponent, t }: PropertyEditorProps) {
    if (!selectedComponent) return <div className="w-64 p-2">No component selected</div>;

    return (
        <div className="w-64 p-2 border rounded bg-slate-100 h-full overflow-auto">
            <h4 className="font-bold mb-2">Properties</h4>

            <label className="block mb-1">Label</label>
            <input
                type="text"
                className="w-full border p-1 rounded mb-2"
                value={selectedComponent.label || ""}
                onChange={(e) =>
                    setSelectedComponent({ ...selectedComponent, label: e.target.value })
                }
            />

            <label className="block mb-1">Column Span</label>
            <select
                className="w-full border p-1 rounded"
                value={selectedComponent.colSpan || 1}
                onChange={(e) =>
                    setSelectedComponent({
                        ...selectedComponent,
                        colSpan: e.target.value === "full" ? "full" : Number(e.target.value),
                    })
                }
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value="full">Full</option>
            </select>
        </div>
    );
}
