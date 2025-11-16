"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFormContext } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react"; // Reusing CalendarIcon for dropdown arrow
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { MultiSelect } from "./MultiSelect";

export type FieldOption = {
    value: string;
    label: string;
};

interface AdvancedSelectProps {
    name: string;
    label: string;
    value: string | string[];
    onChange: (value: string | string[]) => void;
    placeholder?: string;
    staticOptions?: FieldOption[];
    dataSourceUrl?: string;
    isSearchable?: boolean;
    allowAddNew?: boolean;
    postUrl?: string;
    isMulti?: boolean;
}

export function AdvancedSelect({ name, label, value, onChange, placeholder, staticOptions = [], dataSourceUrl, isSearchable, allowAddNew, postUrl, isMulti }: AdvancedSelectProps) {
    const [open, setOpen] = useState(false);
    const [fetchedOptions, setFetchedOptions] = useState<FieldOption[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortDir, setSortDir] = useState<'asc' | 'desc' | 'none'>('none');
    const { control } = useFormContext();

    useEffect(() => {
        if (dataSourceUrl) {
            fetch(dataSourceUrl)
                .then(res => res.json())
                .then(data => {
                    // Adapt fetched data to { value, label } format
                    const adaptedOptions = data.map((item: any) => ({
                        value: item.cca2 || item.id || item.value, // Assuming cca2 for country codes, or generic id/value
                        label: item.name?.common || item.name || item.label, // Assuming common name for countries, or generic name/label
                    }));
                    setFetchedOptions(adaptedOptions);
                })
                .catch(console.error);
        }
    }, [dataSourceUrl]);

    const allOptions = useMemo(() => {
        const source = dataSourceUrl ? fetchedOptions : staticOptions;
        let filtered = source;

        if (isSearchable && searchTerm) {
            filtered = source.filter((option: FieldOption) =>
                option.label.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortDir !== 'none') {
            return [...filtered].sort((a, b) => {
                if (sortDir === 'asc') {
                    return a.label.localeCompare(b.label);
                }
                return b.label.localeCompare(a.label);
            });
        }

        return filtered;
    }, [dataSourceUrl, fetchedOptions, staticOptions, isSearchable, searchTerm, sortDir]);

    const handleAddNew = () => {
        if (allowAddNew && searchTerm) {
            const newOption = { value: searchTerm.toLowerCase().replace(/\s+/g, '-'), label: searchTerm };
            const newOptions = [...(dataSourceUrl ? fetchedOptions : staticOptions), newOption];
            if (dataSourceUrl) {
                setFetchedOptions(newOptions);
            }

            // If a postUrl is provided, send the new option to the server
            if (postUrl) {
                fetch(postUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ label: searchTerm }),
                })
                    .then(res => res.json())
                    .then(savedOption => {
                        // Optionally, you could update the option with the ID from the server
                        console.log('Saved new option:', savedOption);
                    })
                    .catch(console.error);
            }
            onChange(newOption.value);
            setSearchTerm("");
            setOpen(false);
        }
    };

    const showAddNew = allowAddNew && searchTerm && !allOptions.some(opt => opt.label.toLowerCase() === searchTerm.toLowerCase());

    if (isMulti) {
        // MultiSelect component needs to be implemented to handle these advanced features
        return <MultiSelect
            control={control}
            name={name}
            label={label}
            options={allOptions}
            placeholder={placeholder}
        />
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between font-normal">
                    <div className="flex-1 text-left">
                        {value ? allOptions.find(option => option.value === value)?.label : placeholder || "Select an option..."}
                    </div>
                    <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                    {isSearchable && <CommandInput placeholder="Search..." onValueChange={setSearchTerm} />}
                    <div className="flex items-center justify-end p-1 border-b">
                        <Button variant="ghost" size="sm" onClick={() => setSortDir('asc')} disabled={sortDir === 'asc'}>A-Z</Button>
                        <Button variant="ghost" size="sm" onClick={() => setSortDir('desc')} disabled={sortDir === 'desc'}>Z-A</Button>
                        <Button variant="ghost" size="sm" onClick={() => setSortDir('none')} disabled={sortDir === 'none'}>-</Button>
                    </div>
                    <CommandList>
                        <CommandEmpty>
                            {showAddNew ? (
                                <Button className="w-full" onClick={handleAddNew}>
                                    Add "{searchTerm}"
                                </Button>
                            ) : 'No results found.'}
                        </CommandEmpty>
                        <CommandGroup>
                            {allOptions.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {option.label}
                                </CommandItem>
                            ))}
                            {showAddNew && (
                                <CommandItem onSelect={handleAddNew}>
                                    + Add "{searchTerm}"
                                </CommandItem>
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}