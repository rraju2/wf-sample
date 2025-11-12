'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface Option {
    id: string;
    label: string;
}

interface SearchableSelectProps {
    placeholder?: string;
    options: Option[];
    multiSelect?: boolean;
    disabled?: boolean;
    maxSelectCount?: number;
    onChange?: (value: string[] | string | null) => void;
}

/**
 * Accessible, keyboard-navigable searchable select.
 *
 * Notes:
 * - The input is used for search and receives initial focus.
 * - Options are rendered in a listbox (role="listbox") with role="option".
 * - aria-activedescendant is used to point to the currently focused option.
 */
export default function SearchableSelect({
    placeholder = 'Search...',
    options,
    multiSelect = false,
    disabled = false,
    maxSelectCount,
    onChange,
}: SearchableSelectProps) {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<string[]>([]);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);

    // Refs to DOM nodes of options for scrolling/focus management
    const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Filter + Sort A→Z
    const filtered = useMemo(() => {
        return options
            .filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, [search, options]);

    // Reset focus index when list changes
    useEffect(() => {
        setFocusedIndex(filtered.length > 0 ? 0 : -1);
    }, [filtered.length]);

    // Ensure focused option is visible
    useEffect(() => {
        if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
            optionRefs.current[focusedIndex]!.scrollIntoView({
                block: 'nearest',
                behavior: 'smooth',
            });
        }
    }, [focusedIndex]);

    // Update parent via onChange
    const updateSelected = (newSel: string[] | string | null) => {
        onChange?.(newSel);
    };

    const toggleSelect = (id: string) => {
        if (multiSelect) {
            const already = selected.includes(id);
            let newSel = already ? selected.filter((s) => s !== id) : [...selected, id];

            if (maxSelectCount && newSel.length > maxSelectCount) {
                // Keep UX gentle: ignore extra selection and inform user
                // Replace with toast or inline message in your app
                // eslint-disable-next-line no-alert
                alert(`You can select up to ${maxSelectCount} items only`);
                return;
            }

            setSelected(newSel);
            updateSelected(newSel);
        } else {
            setSelected([id]);
            updateSelected(id);
        }
    };

    // Keyboard handling on the input (also captures arrows while in search box)
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;

        const last = filtered.length - 1;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex((idx) => (idx < last ? idx + 1 : 0));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex((idx) => (idx > 0 ? idx - 1 : last));
                break;
            case 'Home':
                e.preventDefault();
                setFocusedIndex(0);
                break;
            case 'End':
                e.preventDefault();
                setFocusedIndex(last);
                break;
            case 'Enter':
                e.preventDefault();
                if (focusedIndex >= 0 && filtered[focusedIndex]) {
                    toggleSelect(filtered[focusedIndex].id);
                }
                break;
            case ' ':
            case 'Spacebar': // some browsers
                // allow space to select when not typing in input? we'll use it to toggle as well
                // but prevent default only if there is a focused option
                if (focusedIndex >= 0 && filtered[focusedIndex]) {
                    e.preventDefault();
                    toggleSelect(filtered[focusedIndex].id);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setSearch('');
                setFocusedIndex(filtered.length > 0 ? 0 : -1);
                inputRef.current?.focus();
                break;
            default:
                break;
        }
    };

    // Build friendly display value
    const displayValue = multiSelect
        ? selected.map((id) => options.find((o) => o.id === id)?.label).filter(Boolean).join(', ')
        : options.find((o) => o.id === selected[0])?.label || '';

    // Generate ids for aria-activedescendant / options
    const listboxId = `listbox-${Math.random().toString(36).slice(2, 9)}`;
    const optionId = (idx: number) => `${listboxId}-option-${idx}`;

    return (
        <div className="w-full" aria-disabled={disabled}>
            {/* Visible selection summary (optional) */}
            {displayValue ? (
                <div className="mb-2 text-sm text-muted-foreground">Selected: {displayValue}</div>
            ) : null}

            {/* Search input */}
            <Input
                ref={inputRef}
                placeholder={placeholder}
                value={search}
                disabled={disabled}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={onKeyDown}
                aria-controls={listboxId}
                aria-activedescendant={focusedIndex >= 0 ? optionId(focusedIndex) : undefined}
                aria-haspopup="listbox"
                role="combobox"
                aria-expanded={filtered.length > 0}
            />

            {/* Options listbox */}
            <div
                id={listboxId}
                role="listbox"
                aria-multiselectable={multiSelect || undefined}
                tabIndex={-1}
                className="border rounded-md max-h-48 overflow-auto mt-2"
                onKeyDown={(e) => {
                    // Allow keyboard navigation when focus is inside list container (for users tabbing into it)
                    // We forward to same logic as input
                    onKeyDown(e as unknown as React.KeyboardEvent<HTMLInputElement>);
                }}
            >
                {filtered.length === 0 ? (
                    <div className="text-sm text-muted-foreground p-2 text-center">No options found</div>
                ) : (
                    filtered.map((opt, idx) => {
                        const isSelected = selected.includes(opt.id);
                        const isFocused = idx === focusedIndex;
                        return (
                            <div key={opt.id} className="px-1">
                                <Button
                                    // each option is a button to be keyboard-focusable via click too
                                    id={optionId(idx)}
                                    ref={(el) => (optionRefs.current[idx] = el)}
                                    onClick={() => toggleSelect(opt.id)}
                                    onMouseEnter={() => setFocusedIndex(idx)}
                                    role="option"
                                    aria-selected={isSelected}
                                    tabIndex={isFocused ? 0 : -1}
                                    variant={isSelected ? 'default' : 'ghost'}
                                    className={
                                        'w-full flex justify-between items-center px-3 py-2 text-left ' +
                                        (isFocused ? 'ring-2 ring-ring' : '')
                                    }
                                >
                                    <span>{opt.label}</span>
                                    {isSelected && <Check className="w-4 h-4" aria-hidden />}
                                </Button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
