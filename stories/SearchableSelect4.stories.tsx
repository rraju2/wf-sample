import SearchableSelect from '../SearchableSelect';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SearchableSelect> = {
    title: 'Components/SearchableSelect',
    component: SearchableSelect,
    argTypes: {
        multiSelect: { control: 'boolean' },
        maxSelectCount: { control: 'number' },
    },
};

export default meta;
type Story = StoryObj<typeof SearchableSelect>;

const mockOptions = [
    { id: '1', label: 'Alpha' },
    { id: '2', label: 'Beta' },
    { id: '3', label: 'Gamma' },
];

export const Playground: Story = {
    args: {
        placeholder: 'Select items...',
        options: mockOptions,
        multiSelect: true,
        maxSelectCount: 2,
    },
};
