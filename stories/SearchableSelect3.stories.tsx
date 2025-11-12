import type { Meta, StoryObj } from '@storybook/react';
import SearchableSelect from '../SearchableSelect';

const meta: Meta<typeof SearchableSelect> = {
    title: 'Components/SearchableSelect',
    component: SearchableSelect,
    argTypes: {
        multiSelect: { control: 'boolean' },
        required: { control: 'boolean' },
        maxSelect: { control: 'number' },
    },
};

export default meta;
type Story = StoryObj<typeof SearchableSelect>;

const mockOptions = [
    { id: 'a', label: 'Alpha' },
    { id: 'b', label: 'Beta' },
    { id: 'c', label: 'Charlie' },
];

export const Configurable: Story = {
    args: {
        placeholder: 'Searchable Select',
        options: mockOptions,
        multiSelect: false,
        required: false,
        maxSelect: 3,
    },
};
