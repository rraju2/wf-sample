import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import FormBuilder from "@/components/form-builder/FormBuilder";

export default {
    title: "Components/FormBuilder",
    component: FormBuilder,
    argTypes: {
        layout: {
            control: { type: "select", options: ["desktop", "tablet", "mobile"] },
        },
    },
} as ComponentMeta<typeof FormBuilder>;

const Template: ComponentStory<typeof FormBuilder> = (args) => <FormBuilder {...args} />;

export const Default = Template.bind({});
Default.args = {
    layout: "desktop",
};
