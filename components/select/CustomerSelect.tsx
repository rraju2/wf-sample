'use client';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import customersData from './utils/customers.json';

interface CustomerSelectProps {
    type: string | null;
}

export default function CustomerSelect({ type }: CustomerSelectProps) {
    const customers = type ? customersData[type] || [] : [];

    return (
        <Select disabled={!type}>
            <SelectTrigger>
                <SelectValue placeholder={type ? "Select Customer" : "Select Type First"} />
            </SelectTrigger>
            <SelectContent>
                {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                        {customer.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
