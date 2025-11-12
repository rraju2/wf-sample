'use client';

import SearchableSelect from './SearchableSelect';
import customersData from './utils/customers.json';
import configData from './utils/config.json';

interface CustomerSelectProps {
    type: string | null;
    onChange?: (value: string[] | string | null) => void;
}

export default function CustomerSelect({ type, onChange }: CustomerSelectProps) {
    const options = type ? customersData[type] || [] : [];
    const disabled = !type;
    const cfg = type ? configData.typeConfig[type] : null;

    const multiSelect = cfg?.multiSelect || false;
    const maxSelectCount = cfg?.maxSelectCount || undefined;

    return (
        <SearchableSelect
            placeholder={type ? 'Select Customer' : 'Select Type First'}
            options={options}
            multiSelect={multiSelect}
            disabled={disabled}
            maxSelectCount={maxSelectCount}
            onChange={onChange}
        />
    );
}
