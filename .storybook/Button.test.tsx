import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button', () => {
    test('renders the button with the correct label', () => {
        render(<Button label="Click Me" />);
        const buttonElement = screen.getByRole('button', { name: /Click Me/i });
        expect(buttonElement).toBeInTheDocument();
    });

    test('applies the primary class when primary prop is true', () => {
        render(<Button primary label="Primary Button" />);
        const buttonElement = screen.getByRole('button', { name: /Primary Button/i });
        expect(buttonElement).toHaveClass('storybook-button--primary');
    });

    test('applies the correct size class', () => {
        const { rerender } = render(<Button size="small" label="Small" />);
        expect(screen.getByRole('button', { name: /Small/i })).toHaveClass('storybook-button--small');

        rerender(<Button size="large" label="Large" />);
        expect(screen.getByRole('button', { name: /Large/i })).toHaveClass('storybook-button--large');
    });

    test('applies the fullWidth class when fullWidth prop is true', () => {
        render(<Button fullWidth label="Full Width" />);
        const buttonElement = screen.getByRole('button', { name: /Full Width/i });
        expect(buttonElement).toHaveClass('storybook-button--full-width');
    });

    test('calls the onClick handler when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick} label="Clickable" />);
        const buttonElement = screen.getByRole('button', { name: /Clickable/i });
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('is disabled when the disabled prop is passed', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick} label="Disabled" disabled />);
        const buttonElement = screen.getByRole('button', { name: /Disabled/i });
        expect(buttonElement).toBeDisabled();

        // Ensure onClick is not called when disabled
        fireEvent.click(buttonElement);
        expect(handleClick).not.toHaveBeenCalled();
    });
});