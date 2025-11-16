import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import SelectWithValidation from "@/components/SelectWithValidation";
import { API_ENDPOINTS } from "@/config/api";
import { LABELS, PLACEHOLDERS } from "@/config/constants";

export default {
    title: "Components/SelectWithValidation",
    component: SelectWithValidation,
    argTypes: {
        layout: {
            control: { type: "select", options: ["desktop", "tablet", "mobile"] },
        },
    },
} as ComponentMeta<typeof SelectWithValidation>;

export const SingleSelect: ComponentStory<typeof SelectWithValidation> = (args) => {
    const [value, setValue] = useState(null);
    return (
        <SelectWithValidation
            {...args}
            label={LABELS.COUNTRIES}
            placeholder={PLACEHOLDERS.SELECT}
            datasource={API_ENDPOINTS.COUNTRIES}
            mode="single"
            value={value}
            onChange={setValue}
            allowAddNew
            onAddNew={async (label) => ({ id: Date.now().toString(), label, value: label })}
        />
    );
};
