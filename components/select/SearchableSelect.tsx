/**
 * This is the generic reusable select that supports:

single or multiple selection (multiSelect flag)

search/filter

sorted options
 */

'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface Option {
    id: string;
    label: string;
}

interface SearchableSelectProps {
    placeholder: string;
    options: Option[];
    multiSelect?: boolean;
    disabled?: boolean;
    onChange?: (selected: string[] | string | null) => void;
}

export default function SearchableSelect({
    placeholder,
    options,
    multiSelect = false,
    disabled = false,
    onChange,
}: SearchableSelectProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selected, setSelected] = useState<string[]>([]);

    // Filter + Sort
    const filteredOptions = useMemo(() => {
        const filtered = options.filter((opt) =>
            opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filtered.sort((a, b) => a.label.localeCompare(b.label));
    }, [options, searchTerm]);

    // Handle select logic
    const handleSelect = (value: string) => {
        if (multiSelect) {
            const alreadySelected = selected.includes(value);
            const updated = alreadySelected
                ? selected.filter((v) => v !== value)
                : [...selected, value];
            setSelected(updated);
            onChange?.(updated);
        } else {
            setSelected([value]);
            onChange?.(value);
        }
    };

    const displayValue = multiSelect
        ? selected.map((id) => options.find((o) => o.id === id)?.label).join(', ')
        : options.find((o) => o.id === selected[0])?.label || '';

    return (
        <div className="flex flex-col gap-2">
            <Select
                disabled={disabled}
                onValueChange={handleSelect}
            >
                <SelectTrigger>
                    <SelectValue placeholder={placeholder}>
                        {displayValue || placeholder}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent className="p-2">
                    {/* Search Field */}
                    <div className="sticky top-0 bg-background pb-2">
                        <Input
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-8 text-sm"
                        />
                    </div>

                    {/* Options */}
                    {filteredOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                            {multiSelect ? (
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={selected.includes(option.id)}
                                        onCheckedChange={() => handleSelect(option.id)}
                                    />
                                    {option.label}
                                </div>
                            ) : (
                                option.label
                            )}
                        </SelectItem>
                    ))}

                    {/* Empty State */}
                    {filteredOptions.length === 0 && (
                        <div className="text-muted-foreground text-sm p-2">
                            No results found
                        </div>
                    )}
                </SelectContent>
            </Select>
        </div>
    );
}
