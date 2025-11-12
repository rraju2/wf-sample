/**
 * 
 * This version adds:

Input box for search/filter

A–Z sorting

Works reactively when “Type” changes

Uses ShadCN styling (consistent with your theme)
 */

'use client';

import { useState, useMemo } from 'react';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import customersData from './utils/customers.json';
import { Input } from '@/components/ui/input';

interface CustomerSelectProps {
    type: string | null;
}

export default function CustomerSelect({ type }: CustomerSelectProps) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter + Sort customers
    const customers = useMemo(() => {
        if (!type) return [];
        const list = customersData[type] || [];
        const filtered = list.filter((c) =>
            c.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filtered.sort((a, b) => a.label.localeCompare(b.label));
    }, [type, searchTerm]);

    return (
        <div className="flex flex-col gap-2">
            <Select disabled={!type}>
                <SelectTrigger>
                    <SelectValue
                        placeholder={type ? 'Select Customer' : 'Select Type First'}
                    />
                </SelectTrigger>
                <SelectContent className="p-2">
                    {/* Search Box */}
                    {type && (
                        <div className="sticky top-0 bg-background pb-2">
                            <Input
                                placeholder="Search customer..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-8 text-sm"
                            />
                        </div>
                    )}

                    {/* Customer Options */}
                    {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                            {customer.label}
                        </SelectItem>
                    ))}

                    {/* No Results */}
                    {customers.length === 0 && type && (
                        <div className="text-muted-foreground text-sm p-2">
                            No matching customers
                        </div>
                    )}
                </SelectContent>
            </Select>
        </div>
    );
}
