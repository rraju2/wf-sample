'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';

interface Option {
    id: string;
    label: string;
}

interface SearchableSelectProps {
    placeholder: string;
    options: Option[];
    multiSelect?: boolean;
    required?: boolean;
    maxSelect?: number;
    disabled?: boolean;
    onChange?: (selected: string[] | string | null) => void;
}

export default function SearchableSelect({
    placeholder,
    options,
    multiSelect = false,
    required = false,
    maxSelect,
    disabled = false,
    onChange,
}: SearchableSelectProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selected, setSelected] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const filteredOptions = useMemo(() => {
        const filtered = options.filter((opt) =>
            opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filtered.sort((a, b) => a.label.localeCompare(b.label));
    }, [options, searchTerm]);

    const handleSelect = (value: string) => {
        if (multiSelect) {
            const already = selected.includes(value);
            let updated = already ? selected.filter((v) => v !== value) : [...selected, value];

            if (maxSelect && updated.length > maxSelect) {
                setError(`You can select up to ${maxSelect} items.`);
                return;
            }
            setError(null);
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
        <div className="flex flex-col gap-1">
            <Select disabled={disabled} onValueChange={handleSelect}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder}>
                        {displayValue || placeholder}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent className="p-2">
                    <div className="sticky top-0 bg-background pb-2">
                        <Input
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-8 text-sm"
                        />
                    </div>

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

                    {filteredOptions.length === 0 && (
                        <div className="text-muted-foreground text-sm p-2">
                            No results found
                        </div>
                    )}
                </SelectContent>
            </Select>

            {error && <span className="text-xs text-red-500">{error}</span>}
            {required && !selected.length && !disabled && (
                <span className="text-xs text-orange-600">This field is required</span>
            )}
        </div>
    );
}
