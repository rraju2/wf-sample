'use client';
import SearchableSelect from './SearchableSelect';
import customersData from './utils/customers.json';

interface CustomerSelectProps {
    type: string | null;
    multiSelect?: boolean;
    onChange?: (value: string[] | string | null) => void;
}

export default function CustomerSelect({
    type,
    multiSelect = false,
    onChange,
}: CustomerSelectProps) {
    const options = type ? customersData[type] || [] : [];
    const disabled = !type;

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
