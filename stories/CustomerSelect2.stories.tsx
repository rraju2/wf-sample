import type { Meta, StoryObj } from '@storybook/react';
import CustomerSelect from '../CustomerSelect';

const meta: Meta<typeof CustomerSelect> = {
    title: 'Components/CustomerSelect',
    component: CustomerSelect,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CustomerSelect>;

export const CROType: Story = {
    args: {
        type: 'cro',
    },
};

export const SponsorType: Story = {
    args: {
        type: 'sponsor',
    },
};
