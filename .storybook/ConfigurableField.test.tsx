import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { ConfigurableField } from './ConfigurableField';

// A wrapper component to provide the form context
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('ConfigurableField', () => {
    test('renders a text input correctly', () => {
        const { control } = useForm().control;
        render(
            <TestWrapper>
                <ConfigurableField
                    control={control}
                    fieldType="text"
                    name="testInput"
                    label="Test Input"
                    placeholder="Enter text..."
                />
            </TestWrapper>
        );

        expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
    });

    test('renders a checkbox correctly', () => {
        const { control } = useForm().control;
        render(
            <TestWrapper>
                <ConfigurableField
                    control={control}
                    fieldType="checkbox"
                    name="testCheckbox"
                    label="Test Checkbox"
                    description="Check me"
                />
            </TestWrapper>
        );

        expect(screen.getByLabelText('Check me')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    // Add more tests for other field types (number, select, etc.)
    // For example, a test for the select field:
    test('renders a select dropdown', () => {
        const { control } = useForm().control;
        render(<TestWrapper><ConfigurableField control={control} fieldType="select" name="testSelect" label="Test Select" /></TestWrapper>);
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
});