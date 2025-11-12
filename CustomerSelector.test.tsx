import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CustomerSelector } from './CustomerSelector';

// Mock the JSON data import
jest.mock('../Users/rraju/ui-trefoil/wf-sample/customer-data.json', () => ({
    cro: ['Customer A', 'Customer B', 'Customer C'],
    sponsor: ['Customer D', 'Customer E', 'Customer F'],
}), { virtual: true });

describe('CustomerSelector', () => {
    beforeEach(() => {
        render(<CustomerSelector />);
    });

    test('renders with initial default values', () => {
        expect(screen.getByLabelText('Trial Type')).toHaveValue('cro');
        expect(screen.getByLabelText('Customer')).toHaveValue('Customer A');
        expect(screen.queryByText(/Submitted:/)).not.toBeInTheDocument();
    });

    test('customer options change when trial type is changed', () => {
        const trialTypeSelect = screen.getByLabelText('Trial Type');
        const customerSelect = screen.getByLabelText('Customer');

        // Change to "Sponsor"
        fireEvent.change(trialTypeSelect, { target: { value: 'sponsor' } });

        // Verify Trial Type and Customer are updated
        expect(trialTypeSelect).toHaveValue('sponsor');
        expect(customerSelect).toHaveValue('Customer D'); // Defaults to the first in the new list

        // Verify the options in the customer dropdown are now for "Sponsor"
        const customerOptions = within(customerSelect).getAllByRole('option');
        const customerOptionValues = customerOptions.map(opt => opt.value);
        expect(customerOptionValues).toEqual(['Customer D', 'Customer E', 'Customer F']);

        // Change back to "CRO"
        fireEvent.change(trialTypeSelect, { target: { value: 'cro' } });

        // Verify Trial Type and Customer are updated back
        expect(trialTypeSelect).toHaveValue('cro');
        expect(customerSelect).toHaveValue('Customer A');
    });

    test('allows selection of a different customer', () => {
        const customerSelect = screen.getByLabelText('Customer');
        fireEvent.change(customerSelect, { target: { value: 'Customer C' } });
        expect(customerSelect).toHaveValue('Customer C');
    });

    test('shows a submission message when the submit button is clicked', () => {
        const trialTypeSelect = screen.getByLabelText('Trial Type');
        const customerSelect = screen.getByLabelText('Customer');
        const submitButton = screen.getByRole('button', { name: /Submit/i });

        // Change selections
        fireEvent.change(trialTypeSelect, { target: { value: 'sponsor' } });
        fireEvent.change(customerSelect, { target: { value: 'Customer E' } });

        // Submit
        fireEvent.click(submitButton);

        // Verify submission message
        const submissionMessage = screen.getByText(/Submitted: Type - sponsor, Customer - Customer E/);
        expect(submissionMessage).toBeInTheDocument();
    });

    test('clears the submission message when a selection is changed after submitting', () => {
        const submitButton = screen.getByRole('button', { name: /Submit/i });
        fireEvent.click(submitButton);
        expect(screen.getByText(/Submitted:/)).toBeInTheDocument();

        const customerSelect = screen.getByLabelText('Customer');
        fireEvent.change(customerSelect, { target: { value: 'Customer B' } });
        expect(screen.queryByText(/Submitted:/)).not.toBeInTheDocument();
    });
});