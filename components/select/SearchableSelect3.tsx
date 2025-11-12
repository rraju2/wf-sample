/**
 * Add logic for:

Search filter

Sorting A → Z

Enforcing maxSelectCount
 */

'use client';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

export default function SearchableSelect({
    placeholder,
    options,
    multiSelect = false,
    disabled = false,
    maxSelectCount,
    onChange,
}: SearchableSelectProps) {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<string[]>([]);

    // 🔍 Filter + Sort
    const filtered = useMemo(() => {
        return options
            .filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, [search, options]);

    const handleSelect = (id: string) => {
        if (multiSelect) {
            let newSel = selected.includes(id)
                ? selected.filter((s) => s !== id)
                : [...selected, id];

            if (maxSelectCount && newSel.length > maxSelectCount) {
                newSel = newSel.slice(0, maxSelectCount);
                alert(`You can select up to ${maxSelectCount} items only`);
            }

            setSelected(newSel);
            onChange?.(newSel);
        } else {
            setSelected([id]);
            onChange?.(id);
        }
    };

    return (
        <div className="w-full">
            <Input
                placeholder="Search..."
                value={search}
                disabled={disabled}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-2"
            />

            <div className="border rounded-md max-h-48 overflow-auto">
                {filtered.map((opt) => (
                    <Button
                        key={opt.id}
                        variant={selected.includes(opt.id) ? 'default' : 'ghost'}
                        onClick={() => handleSelect(opt.id)}
                        disabled={disabled}
                        className="w-full flex justify-between px-3 py-2"
                    >
                        {opt.label}
                        {selected.includes(opt.id) && <Check className="w-4 h-4" />}
                    </Button>
                ))}
                {filtered.length === 0 && (
                    <div className="text-sm text-muted-foreground p-2 text-center">
                        No options found
                    </div>
                )}
            </div>
        </div>
    );
}
