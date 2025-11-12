'use client';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import typesData from './utils/types.json';

interface TypeSelectProps {
    onTypeChange: (value: string) => void;
}

export default function TypeSelect({ onTypeChange }: TypeSelectProps) {
    return (
        <Select onValueChange={onTypeChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
                {typesData.types.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                        {type.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
