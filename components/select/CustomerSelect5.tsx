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
    const config = type ? configData.typeConfig[type] || {} : {};
    const disabled = !type;

    return (
        <SearchableSelect
            placeholder={type ? 'Select Customer' : 'Select Type First'}
            options={options}
            multiSelect={config.multiSelect || false}
            disabled={disabled}
            maxSelect={config.maxSelect}
            required={config.required}
            onChange={onChange}
        />
    );
}
