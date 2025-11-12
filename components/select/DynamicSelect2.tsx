/**
 * Now we can toggle multiSelect via a flag or config JSON.
 */

'use client';
import { useState } from 'react';
import TypeSelect from './TypeSelect';
import CustomerSelect from './CustomerSelect';

export default function DynamicSelect() {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [customers, setCustomers] = useState<string[] | string | null>(null);

    return (
        <div className="flex flex-col gap-4 w-[320px]">
            <TypeSelect onTypeChange={setSelectedType} />
            <CustomerSelect
                type={selectedType}
                multiSelect={true}   // 🔧 change to false for single
                onChange={setCustomers}
            />

            <div className="text-sm text-muted-foreground mt-2">
                Selected: {Array.isArray(customers) ? customers.join(', ') : customers}
            </div>
        </div>
    );
}
