import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { ConfigurableField } from '@/components/ConfigurableField';
import {
    FIELD_TYPES,
    SELECT_OPTIONS,
    RADIO_OPTIONS,
    AGE_VALIDATION_MESSAGES,
    AGE_MIN_VALUE, AGE_MAX_VALUE, DEFAULT_STORY_FIELD_NAME, DEFAULT_STORY_FIELD_LABEL
} from './ConfigurableField.constants';

const meta: Meta<typeof ConfigurableField> = {
    title: 'Components/ConfigurableField',
    component: ConfigurableField,
    decorators: [
        (Story, { args }) => {
            // Default schema for most stories
            let schema = z.object({ [args.name || 'defaultName']: z.any() });

            // Specific schema for the AgeInput story to show validation
            if (args.fieldType === 'number' && args.name === 'age') {
                schema = z.object({
                    age: z.number({ required_error: AGE_VALIDATION_MESSAGES.REQUIRED })
                        .min(AGE_MIN_VALUE, { message: AGE_VALIDATION_MESSAGES.MIN })
                        .max(AGE_MAX_VALUE, { message: AGE_VALIDATION_MESSAGES.MAX }),
                });
            }

            const form = useForm({
                resolver: zodResolver(schema),
                mode: 'onChange', // Show errors as user types
                defaultValues: {
                    [args.name || 'defaultName']: args.isMulti ? [] : '',
                    ...(args.name === 'age' && { age: undefined }),
                },
            });

            return (
                <Form {...form}>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                        <Story args={{ ...args, control: form.control }} />
                    </form>
                </Form>
            );
        },
    ],
    argTypes: {
        fieldType: {
            control: 'select',
            options: FIELD_TYPES,
        },
        label: { control: 'text' },
        placeholder: { control: 'text' },
        description: { control: 'text' },
        options: {
            control: 'object',
            if: { arg: 'fieldType', eq: 'radio' },
        },
        isMulti: {
            control: 'boolean',
            if: { arg: 'fieldType', eq: 'select' },
        },
        control: {
            table: {
                disable: true,
            },
        },
        name: {
            table: {
                disable: true,
            },
        },
    },
    args: {
        name: DEFAULT_STORY_FIELD_NAME,
        label: DEFAULT_STORY_FIELD_LABEL,
    },
};

export default meta;
type Story = StoryObj<typeof ConfigurableField>;

export const TextInput: Story = {
    args: {
        fieldType: 'text',
        placeholder: 'Enter text...',
    },
};

export const SelectInput: Story = {
    args: {
        fieldType: 'select',
        placeholder: 'Select an option...',
        options: SELECT_OPTIONS,
        isMulti: false,
    },
};

export const MultiSelectInput: Story = {
    args: {
        ...SelectInput.args,
        isMulti: true,
    },
};

export const CheckboxInput: Story = {
    args: {
        fieldType: 'checkbox',
        description: 'I agree to the terms and conditions.',
    },
};

export const RadioGroupInput: Story = {
    args: {
        fieldType: 'radio',
        label: 'Notification preference',
        options: RADIO_OPTIONS,
    },
};

export const DateInput: Story = {
    args: {
        fieldType: 'date',
        label: 'Start Date',
        placeholder: 'Pick a start date',
    },
};

export const AgeInput: Story = {
    args: {
        name: 'age',
        fieldType: 'number',
        label: 'Age',
        placeholder: 'Enter your age',
        min: AGE_MIN_VALUE,
        max: AGE_MAX_VALUE,
    },
};