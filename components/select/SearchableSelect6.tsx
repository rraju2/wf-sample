'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

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
    allowAddNew?: boolean; // NEW FLAG
}

export default function SearchableSelect({
    options,
    multiSelect = false,
    maxSelectCount,
    onChange,
    required = false,
    placeholder = 'Search...',
    allowAddNew = false,
}: SearchableSelectProps) {
    const [search, setSearch] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [selected, setSelected] = useState<string[]>([]);
    const [localOptions, setLocalOptions] = useState<Option[]>(options);

    const listRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Merge search + filter + sort
    const filteredOptions = localOptions
        .filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => a.label.localeCompare(b.label));

    // Check if current input can be added as new option
    const canAddNew =
        allowAddNew &&
        search.trim() !== '' &&
        !localOptions.some((o) => o.label.toLowerCase() === search.toLowerCase());

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

    const handleAddNew = () => {
        const newOption: Option = {
            id: `new-${Date.now()}`,
            label: search.trim(),
        };
        setLocalOptions([...localOptions, newOption]);
        handleSelect(newOption.id);
        setSearch('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'ArrowDown':
                setFocusedIndex((i) => (i + 1) % filteredOptions.length);
                break;
            case 'ArrowUp':
                setFocusedIndex((i) =>
                    i <= 0 ? filteredOptions.length - 1 : i - 1
                );
                break;
            case 'Enter':
                if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
                    handleSelect(filteredOptions[focusedIndex].id);
                } else if (canAddNew) {
                    handleAddNew();
                }
                break;
            case 'Escape':
                setSearch('');
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (focusedIndex >= 0 && listRef.current) {
            const el = listRef.current.children[focusedIndex] as HTMLElement;
            el?.scrollIntoView({ block: 'nearest' });
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
                    'w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-sky-600',
                    required && selected.length === 0 && 'border-red-500'
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
                {filteredOptions.map((option, idx) => {
                    const isSelected = selected.includes(option.id);
                    const isFocused = focusedIndex === idx;
                    return (
                        <li
                            key={option.id}
                            id={option.id}
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => handleSelect(option.id)}
                            className={cn(
                                'px-3 py-2 cursor-pointer hover:bg-sky-100',
                                isFocused && 'bg-sky-200',
                                isSelected && 'font-semibold text-sky-700'
                            )}
                        >
                            {option.label}
                        </li>
                    );
                })}

                {/* Add new option */}
                {canAddNew && (
                    <li
                        onClick={handleAddNew}
                        className="px-3 py-2 cursor-pointer bg-green-50 hover:bg-green-100 font-medium text-green-700"
                    >
                        Add &quot;{search.trim()}&quot;
                    </li>
                )}

                {filteredOptions.length === 0 && !canAddNew && (
                    <li className="text-sm text-muted-foreground p-2 text-center">
                        No options found
                    </li>
                )}
            </ul>
        </div>
    );
}
