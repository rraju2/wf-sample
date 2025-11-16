"use client";

import React, { useState, useEffect } from "react";
import { SelectWithValidationProps, Option } from "../app/types";
import { ERRORS, PLACEHOLDERS } from "../app/config/constants";
import { SearchIcon, SortAscIcon, SortDescIcon, AddIcon } from "./icons";

export default function SelectWithValidation({
    label,
    placeholder = PLACEHOLDERS.SELECT,
    datasource,
    mode = "single",
    value,
    onChange,
    allowAddNew = false,
    onAddNew,
    validation,
}: SelectWithValidationProps) {
    const [options, setOptions] = useState<Option[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                const res = await fetch(datasource);
                const data = await res.json();
                if (isMounted) setOptions(data);
            } catch (err) {
                console.error(err);
            }
        })();
        return () => {
            isMounted = false;
        };
    }, [datasource]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleAddNew = async () => {
        if (onAddNew && searchTerm) {
            const newOption = await onAddNew(searchTerm);
            setOptions((prev) => [...prev, newOption]);
            onChange(
                mode === "multiple"
                    ? [...(value || []), newOption]
                    : newOption
            );
            setSearchTerm("");
        }
    };

    const handleSelect = (option: Option) => {
        if (mode === "multiple") {
            const exists = (value as Option[] || []).some((v: Option) => v.id === option.id);
            if (!exists) onChange([...(value || []), option]);
        } else {
            onChange(option);
        }
        setError("");
    };

    const handleRemove = (option: Option) => {
        if (mode === "multiple") {
            onChange((value as Option[] || []).filter((v: Option) => v.id !== option.id));
        } else {
            onChange(null);
        }
    };

    const filteredOptions = options
        .filter((o) => o.label.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => a.label.localeCompare(b.label));

    const handleSort = (direction: "asc" | "desc") => {
        const sorted = [...options].sort((a, b) =>
            direction === "asc"
                ? a.label.localeCompare(b.label)
                : b.label.localeCompare(a.label)
        );
        setOptions(sorted);
    };

    const validate = () => {
        if (!validation) return true;
        if (validation.required) {
            if (mode === "multiple" && (!value || value.length === 0)) {
                setError(ERRORS.REQUIRED);
                return false;
            }
            if (mode === "single" && !value) {
                setError(ERRORS.REQUIRED);
                return false;
            }
        }
        if (validation.minSelected && value?.length < validation.minSelected) {
            setError(ERRORS.MIN_SELECTED.replace("{min}", validation.minSelected.toString()));
            return false;
        }
        if (validation.maxSelected && value?.length > validation.maxSelected) {
            setError(ERRORS.MAX_SELECTED.replace("{max}", validation.maxSelected.toString()));
            return false;
        }
        setError("");
        return true;
    };

    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="font-semibold">{label}</label>
            <div className="flex gap-2 items-center">
                <div className="flex flex-1 items-center border rounded px-2">
                    <SearchIcon />
                    <input
                        type="text"
                        className="w-full p-1 outline-none"
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <button type="button" onClick={() => handleSort("asc")} className="p-1 border rounded">
                    <SortAscIcon />
                </button>
                <button type="button" onClick={() => handleSort("desc")} className="p-1 border rounded">
                    <SortDescIcon />
                </button>
                {allowAddNew && (
                    <button
                        type="button"
                        onClick={handleAddNew}
                        className="p-1 border rounded bg-blue-500 text-white"
                    >
                        <AddIcon />
                    </button>
                )}
            </div>
            <div className="border rounded p-1 max-h-40 overflow-auto">
                {filteredOptions.map((o) => (
                    <div
                        key={o.id}
                        className="flex justify-between p-1 hover:bg-slate-100 cursor-pointer"
                    >
                        <span onClick={() => handleSelect(o)}>{o.label}</span>
                        {mode === "multiple" && (value as Option[])?.some((v: Option) => v.id === o.id) && (
                            <button onClick={() => handleRemove(o)}>x</button>
                        )}
                    </div>
                ))}
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
}
