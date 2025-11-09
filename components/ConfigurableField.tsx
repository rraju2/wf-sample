"use client";

import { Control } from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { MultiSelect } from "./MultiSelect";

export type FieldOption = {
    value: string;
    label: string;
};

interface ConfigurableFieldProps {
    control: Control<any>;
    fieldType:
    | "text"
    | "select"
    | "checkbox"
    | "radio"
    | "date"
    | "date-of-birth"
    | "calendar"
    | "number";
    name: string;
    label: string;
    placeholder?: string;
    description?: string;
    options?: FieldOption[];
    isMulti?: boolean;
    min?: number;
    max?: number;
}

export function ConfigurableField({
    control,
    fieldType,
    name,
    label,
    placeholder,
    description,
    options = [],
    isMulti = false,
    min,
    max,
}: ConfigurableFieldProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <>
                            {fieldType === "text" && (
                                <Input placeholder={placeholder} {...field} />
                            )}
                            {fieldType === "number" && (
                                <Input
                                    type="number"
                                    placeholder={placeholder}
                                    {...field}
                                    min={min}
                                    max={max}
                                    onChange={(e) => field.onChange(e.target.value === '' ? null : +e.target.value)}
                                />
                            )}
                            {fieldType === "select" && isMulti && (
                                <MultiSelect control={control} name={name} label="" options={options} placeholder={placeholder} />
                            )}

                            {fieldType === "select" && !isMulti && (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {options.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            {fieldType === "checkbox" && (
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        id={name}
                                    />
                                    <label htmlFor={name} className="text-sm font-medium">
                                        {description}
                                    </label>
                                </div>
                            )}
                            {fieldType === "radio" && (
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    {options.map((option) => (
                                        <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value={option.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {option.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            )}
                            {(fieldType === "date" || fieldType === "date-of-birth") && (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>{placeholder || 'Pick a date'}</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                fieldType === "date-of-birth" ? date > new Date() || date < new Date("1900-01-01") : date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                            {fieldType === "calendar" && <Calendar mode="single" selected={field.value} onSelect={field.onChange} className="rounded-md border" />}
                        </>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}