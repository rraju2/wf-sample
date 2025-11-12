'use client';
import { useState } from 'react';
import TypeSelect from './TypeSelect';
import CustomerSelect from './CustomerSelect';

export default function DynamicSelect() {
    const [selectedType, setSelectedType] = useState<string | null>(null);

    return (
        <div className="flex flex-col gap-4 w-[300px]">
            <TypeSelect onTypeChange={setSelectedType} />
            <CustomerSelect type={selectedType} />
        </div>
    );
}
