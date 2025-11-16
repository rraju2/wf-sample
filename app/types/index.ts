export interface Option {
    id: string;
    label: string;
    value: any;
}

export interface ValidationRules {
    required?: boolean;
    minSelected?: number;
    maxSelected?: number;
}

export type LayoutType = "desktop" | "tablet" | "mobile";

export interface SelectWithValidationProps {
    label: string;
    placeholder?: string;
    datasource: string; // API endpoint
    mode?: "single" | "multiple";
    value: any;
    onChange: (val: any) => void;
    allowAddNew?: boolean;
    onAddNew?: (label: string) => Promise<Option>;
    validation?: ValidationRules;
}
