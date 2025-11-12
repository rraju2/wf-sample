import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface Option {
    id: string;
    label: string;
}

interface SearchableSelectProps {
    options: Option[];
    multiSelect?: boolean;
    maxSelectCount?: number;
    onChange?: (value: string | string[]) => void;
    required?: boolean;
    placeholder?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
    options,
    multiSelect = false,
    maxSelectCount,
    onChange,
    required = false,
    placeholder = "Search...",
}) => {
    const [search, setSearch] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [selected, setSelected] = useState<string[]>([]);
    const [typeahead, setTypeahead] = useState(""); // track typed letters
    const typeaheadTimeout = useRef<NodeJS.Timeout | null>(null);

    const listRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredOptions = options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (optionId: string) => {
        if (multiSelect) {
            if (selected.includes(optionId)) {
                setSelected(selected.filter((id) => id !== optionId));
            } else {
                if (maxSelectCount && selected.length >= maxSelectCount) {
                    alert(`You can select up to ${maxSelectCount} items only`);
                    return;
                }
                setSelected([...selected, optionId]);
            }
            onChange?.(selected);
        } else {
            setSelected([optionId]);
            onChange?.(optionId);
        }
    };

    // Typeahead logic: type "ga" jumps to "Gamma"
    const handleTypeahead = (key: string) => {
        if (typeaheadTimeout.current) clearTimeout(typeaheadTimeout.current);
        const newTypeahead = typeahead + key.toLowerCase();
        setTypeahead(newTypeahead);

        const matchIndex = filteredOptions.findIndex((o) =>
            o.label.toLowerCase().startsWith(newTypeahead)
        );

        if (matchIndex >= 0) setFocusedIndex(matchIndex);

        typeaheadTimeout.current = setTimeout(() => setTypeahead(""), 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case "ArrowDown":
                setFocusedIndex((i) => (i + 1) % filteredOptions.length);
                break;
            case "ArrowUp":
                setFocusedIndex((i) =>
                    i <= 0 ? filteredOptions.length - 1 : i - 1
                );
                break;
            case "Enter":
                if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
                    handleSelect(filteredOptions[focusedIndex].id);
                }
                break;
            case "Escape":
                setSearch("");
                break;
            default:
                if (/^[a-zA-Z0-9]$/.test(e.key)) handleTypeahead(e.key);
        }
    };

    useEffect(() => {
        if (focusedIndex >= 0 && listRef.current) {
            const focusedEl = listRef.current.children[focusedIndex] as HTMLElement;
            focusedEl?.scrollIntoView({ block: "nearest" });
        }
    }, [focusedIndex]);

    return (
        <div className="w-full max-w-sm">
            <input
                ref={inputRef}
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className={cn(
                    "w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-sky-600",
                    required && selected.length === 0 && "border-red-500"
                )}
                aria-activedescendant={
                    focusedIndex >= 0 ? filteredOptions[focusedIndex].id : undefined
                }
                aria-expanded="true"
                aria-multiselectable={multiSelect}
                aria-required={required}
                role="combobox"
            />
            <ul
                ref={listRef}
                role="listbox"
                className="mt-1 border rounded-md max-h-48 overflow-auto"
            >
                {filteredOptions.map((option, idx) => (
                    <li
                        key={option.id}
                        id={option.id}
                        role="option"
                        aria-selected={selected.includes(option.id)}
                        onClick={() => handleSelect(option.id)}
                        className={cn(
                            "px-3 py-2 cursor-pointer hover:bg-sky-100",
                            focusedIndex === idx && "bg-sky-200",
                            selected.includes(option.id) && "font-semibold text-sky-700"
                        )}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchableSelect;
