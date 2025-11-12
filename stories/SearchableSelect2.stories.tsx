import type { Meta, StoryObj } from '@storybook/react';
import SearchableSelect from '../SearchableSelect';

const meta: Meta<typeof SearchableSelect> = {
    title: 'Components/SearchableSelect',
    component: SearchableSelect,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchableSelect>;

const mockOptions = [
    { id: 'a', label: 'Alpha' },
    { id: 'b', label: 'Beta' },
    { id: 'c', label: 'Charlie' },
    { id: 'd', label: 'Delta' },
];

export const SingleSelect: Story = {
    args: {
        placeholder: 'Select item',
        options: mockOptions,
        multiSelect: false,
    },
};

export const MultiSelect: Story = {
    args: {
        placeholder: 'Select multiple items',
        options: mockOptions,
        multiSelect: true,
    },
};
