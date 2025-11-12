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

    // Read behavior from config.json
    const multiSelect = type ? configData.typeConfig[type]?.multiSelect || false : false;

    return (
        <SearchableSelect
            placeholder={type ? 'Select Customer' : 'Select Type First'}
            options={options}
            multiSelect={multiSelect}
            disabled={disabled}
            onChange={onChange}
        />
    );
}
