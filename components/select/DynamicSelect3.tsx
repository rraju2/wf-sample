'use client';
import { useState } from 'react';
import { z } from 'zod';
import TypeSelect from './TypeSelect';
import CustomerSelect from './CustomerSelect';

// Validation schema
const schema = z.object({
    type: z.string().min(1, 'Type is required'),
    customers: z.union([z.string(), z.array(z.string())]).optional(),
});

export default function DynamicSelect() {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedCustomers, setSelectedCustomers] = useState<string[] | string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = () => {
        const result = schema.safeParse({
            type: selectedType || '',
            customers: selectedCustomers,
        });

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.errors.forEach((err) => {
                if (err.path[0]) fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
        } else {
            setErrors({});
            alert(JSON.stringify(result.data, null, 2));
        }
    };

    return (
        <div className="flex flex-col gap-4 w-[340px]">
            <TypeSelect onTypeChange={setSelectedType} />
            {errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}

            <CustomerSelect type={selectedType} onChange={setSelectedCustomers} />

            <button
                className="bg-primary text-white rounded-lg py-2 mt-4 hover:bg-primary/80"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
}
