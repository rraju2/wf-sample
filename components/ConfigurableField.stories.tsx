import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ConfigurableField } from './ConfigurableField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import React from 'react';

const meta: Meta<typeof ConfigurableField> = {
    title: 'Components/ConfigurableField',
    component: ConfigurableField,
    decorators: [
        (Story, { args }) => {
            // This decorator dynamically creates a zod schema and react-hook-form instance
            // based on the story's args, making each story a realistic form scenario.
            let fieldSchema;
            if (args.isMulti) {
                fieldSchema = z.array(z.string());
                if (args.required) fieldSchema = fieldSchema.min(1, `${args.label} is required.`);
            } else if (args.fieldType === 'number') {
                fieldSchema = z.number().nullable();
                if (args.required) fieldSchema = fieldSchema.min(args.min ?? -Infinity);
            } else if (args.fieldType === 'checkbox') {
                fieldSchema = z.boolean();
            } else if (args.fieldType === 'date') {
                fieldSchema = z.date().nullable();
            } else {
                fieldSchema = z.string();
                if (args.required) fieldSchema = fieldSchema.min(1, `${args.label} is required.`);
            }

            const schema = z.object({
                [args.name]: fieldSchema.optional(),
            });

            const form = useForm({
                resolver: zodResolver(schema),
                defaultValues: {
                    [args.name]: args.isMulti ? [] :
                        args.fieldType === 'checkbox' ? false :
                            args.fieldType === 'number' ? null : ''
                },
            });

            return (
                <FormProvider {...form}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(console.log)} className="space-y-4 w-80">
                            <Story />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </FormProvider>
            );
        },
    ],
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConfigurableField>;

export const TextInput: Story = {
    args: {
        fieldType: 'text',
        name: 'protocolName',
        label: 'Protocol Name',
        placeholder: 'Enter protocol name...',
    },
};

export const RequiredTextInput: Story = {
    args: {
        ...TextInput.args,
        name: 'requiredProtocolName',
        required: true,
    },
};

export const NumberInput: Story = {
    args: {
        fieldType: 'number',
        name: 'subjectCount',
        label: 'Subject Count',
        placeholder: 'Enter number of subjects...',
        min: 1,
        max: 100,
    },
};

export const Checkbox: Story = {
    args: {
        fieldType: 'checkbox',
        name: 'terms',
        label: 'Terms and Conditions',
        description: 'I accept the terms and conditions',
    },
};

export const RadioGroup: Story = {
    args: {
        fieldType: 'radio',
        name: 'studyPhase',
        label: 'Study Phase',
        options: [
            { value: 'phase1', label: 'Phase 1' },
            { value: 'phase2', label: 'Phase 2' },
            { value: 'phase3', label: 'Phase 3' },
        ],
    },
};

export const DatePicker: Story = {
    args: {
        fieldType: 'date',
        name: 'startDate',
        label: 'Study Start Date',
        placeholder: 'Pick a start date',
    },
};

export const SingleSelect: Story = {
    args: {
        fieldType: 'select',
        name: 'country',
        label: 'Country',
        placeholder: 'Select a country...',
        staticOptions: [
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'mx', label: 'Mexico' },
        ],
        isSearchable: true,
    },
};

export const MultiSelectWithApi: Story = {
    args: {
        fieldType: 'select',
        name: 'countries',
        label: 'Countries',
        placeholder: 'Select countries...',
        isMulti: true,
        dataSourceUrl: 'https://restcountries.com/v3.1/all?fields=name,cca2',
        isSearchable: true,
        allowAddNew: false,
        min: 2,
        max: 4,
        required: true,
    },
    decorators: [
        (Story, { args }) => {
            // Schema for multi-select array
            const schema = z.object({
                [args.name]: z.array(z.string())
                    .min(args.min || 1, `Please select at least ${args.min} countries.`)
                    .max(args.max || 5, `You can select at most ${args.max} countries.`),
            });

            const form = useForm({
                resolver: zodResolver(schema),
                defaultValues: { [args.name]: [] },
            });

            return (
                <FormProvider {...form}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(console.log)} className="space-y-4 w-80">
                            <Story />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </FormProvider>
            );
        },
    ],
};

export const SelectWithAddNew: Story = {
    args: {
        ...SingleSelect.args,
        name: 'sponsor',
        label: 'Sponsor',
        placeholder: 'Search or add a new sponsor...',
        allowAddNew: true,
        postUrl: '/api/sponsors', // Mock POST URL
    },
};

```

### 2. New Story for `MultiSelect`

This story focuses specifically on the `MultiSelect` component, making it easy to test its UI and interactions in isolation.

```diff
--- /dev/null
+++ b / c / Users / rraju / ui - trefoil / wf - sample / components / MultiSelect.stories.tsx
@@ -0, 0 + 1, 58 @@
+import type { Meta, StoryObj } from '@storybook/react';
+import { useForm, FormProvider } from 'react-hook-form';
+import { zodResolver } from '@hookform/resolvers/zod';
+import * as z from 'zod';
+import { MultiSelect } from './MultiSelect';
+import { Button } from '@/components/ui/button';
+import { Form } from '@/components/ui/form';
+import React from 'react';
+
    +const meta: Meta<typeof MultiSelect> = {
+ title: 'Components/MultiSelect',
    +    component: MultiSelect,
        +    decorators: [
            +        (Story, { args }) => {
+            const schema = z.object({
+ [args.name]: z.array(z.string()).min(1, 'Please select at least one option.'),
                +            });
+
    +            const form = useForm({
+ resolver: zodResolver(schema),
        +                defaultValues: { [args.name]: [] },
        +            });
+
    +            return (
        +                <FormProvider {...form}>
            +                    <Form {...form}>
                +                        <form onSubmit={form.handleSubmit(console.log)} className="space-y-4 w-80">
                    +                            <Story />
                    +                            <Button type="submit">Submit</Button>
                    +                        </form>
                +                    </Form>
            +                </FormProvider>
        +            );
+        },
+    ],
+    parameters: {
    +        layout: 'centered',
        +    },
+    tags: ['autodocs'],
    +};
+
    +export default meta;
+type Story = StoryObj<typeof MultiSelect>;
+
    +export const Default: Story = {
+ args: {
+        name: 'languages',
    +        label: 'Languages',
        +        placeholder: 'Select languages...',
            +        options: [
                +            { value: 'en', label: 'English' },
                +            { value: 'de', label: 'German' },
                +            { value: 'ja', label: 'Japanese' },
                +            { value: 'es', label: 'Spanish' },
                +            { value: 'fr', label: 'French' },
                +        ],
                +    },
+};