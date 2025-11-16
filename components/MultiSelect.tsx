import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { cn } from "@/lib/utils"; // Assuming cn utility is available

export type OptionType = {
    label: string;
    value: string;
};

interface MultiSelectProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    label: string;
    options: OptionType[];
    placeholder?: string;
}

export function MultiSelect({
    control,
    name,
    label,
    options,
    placeholder = "Select options...",
}: MultiSelectProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline" role="combobox"
                                className="w-full justify-between min-h-[38px] h-auto"
                            >
                                <div className="flex-1 flex flex-wrap gap-1">
                                    {field.value?.length > 0 ?
                                        (field.value.map((value: string) => (
                                            <Badge key={value}
                                                variant="secondary"
                                                className="mr-1"
                                            >
                                                {options.find((o) => o.value === value)?.label}
                                                <button
                                                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            field.onChange(field.value.filter((v: string) => v !== value));
                                                        }
                                                    }}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}
                                                    onClick={() => field.onChange(field.value.filter((v: string) => v !== value))}
                                                >
                                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                                </button>
                                            </Badge>
                                        ))) :
                                        (<span className="text-muted-foreground text-sm mx-2">{placeholder}</span>)
                                    }
                                </div>
                                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                            <Command>
                                <CommandInput placeholder="Search..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup>
                                        {options.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                onSelect={() => {
                                                    const currentValues = field.value || [];
                                                    field.onChange(
                                                        currentValues.includes(option.value)
                                                            ? currentValues.filter((v: string) => v !== option.value)
                                                            : [...currentValues, option.value]
                                                    );
                                                }}
                                            >
                                                <Check className={cn("mr-2 h-4 w-4", field.value?.includes(option.value) ? "opacity-100" : "opacity-0")} />
                                                {option.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}