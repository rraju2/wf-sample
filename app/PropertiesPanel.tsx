'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox";

interface PropertiesPanelProps {
    selectedComponent: any; // Consider defining a more specific type for selectedComponent
    onPropertyChange: (id: string, property: string, value: any) => void;
}

export function PropertiesPanel({ selectedComponent, onPropertyChange }: PropertiesPanelProps) {
    if (!selectedComponent) {
        return (
            <aside className="w-80 p-6 border-l bg-muted/40">
                <h2 className="text-lg font-semibold mb-4 tracking-tight">Properties</h2>
                <div>Select a component to view its properties</div>
            </aside>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onPropertyChange(selectedComponent.id, name, value);
    };

    const handleCheckboxChange = (checked: boolean, name: string) => {
        onPropertyChange(selectedComponent.id, name, checked);
    };

    const handleSelectChange = (value: string, name: string) => {
        onPropertyChange(selectedComponent.id, name, value);
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onPropertyChange(selectedComponent.id, name, value === '' ? undefined : Number(value));
    };

    return (
        <aside className="w-80 p-6 border-l bg-muted/40">
            <h2 className="text-lg font-semibold mb-4 tracking-tight">Properties</h2>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="label">Label</Label>
                    <Input id="label" name="label" value={selectedComponent.label || ''} onChange={handleInputChange} aria-describedby="label-error" />
                </div>
                <div>
                    <Label htmlFor="placeholder">Placeholder</Label>
                    <Input id="placeholder" name="placeholder" value={selectedComponent.placeholder || ''} onChange={handleInputChange} aria-describedby="placeholder-error" />
                </div>
                <div>
                    <Label htmlFor="validation">Validation</Label>
                    <div className="pl-6 pt-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="required"
                                name="required"
                                checked={selectedComponent.required || false}
                                onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, 'required')} // Cast checked to boolean
                            />
                            <Label htmlFor="required">Required</Label>
                        </div>
                    </div>
                </div>
                {(selectedComponent.type === 'select' ||
                    selectedComponent.type === 'countries' ||
                    selectedComponent.type === 'languages' ||
                    selectedComponent.type === 'cro' ||
                    selectedComponent.type === 'phases' ||
                    selectedComponent.type === 'customers' ||
                    selectedComponent.type === 'devices'

                ) && (
                        <div className="border-t pt-4 mt-4 space-y-4">
                            <h3 className="text-md font-semibold">Select Properties</h3>
                            <div>
                                <Label htmlFor="dataSourceUrl">Data Source URL</Label>
                                <Input id="dataSourceUrl" name="dataSourceUrl" value={selectedComponent.dataSourceUrl || ''} onChange={handleInputChange} placeholder="https://api.example.com/data" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="isSearchable"
                                    name="isSearchable"
                                    checked={selectedComponent.isSearchable || false}
                                    onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, 'isSearchable')} // Cast checked to boolean
                                />
                                <Label htmlFor="isSearchable">Enable Search</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="allowAddNew"
                                    name="allowAddNew"
                                    checked={selectedComponent.allowAddNew || false}
                                    onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, 'allowAddNew')}
                                />
                                <Label htmlFor="allowAddNew">Allow Adding New Items</Label>
                            </div>
                            {selectedComponent.allowAddNew && (
                                <div className="pl-6 pt-2">
                                    <Label htmlFor="postUrl">Add New Item URL (POST)</Label>
                                    <Input
                                        id="postUrl"
                                        name="postUrl"
                                        value={selectedComponent.postUrl || ''}
                                        onChange={handleInputChange}
                                        placeholder="e.g., /api/items"
                                    />
                                </div>
                            )}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="isMulti"
                                    name="isMulti"
                                    checked={selectedComponent.isMulti || false}
                                    onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, 'isMulti')}
                                />
                                <Label htmlFor="isMulti">Enable Multi Select</Label>
                            </div>
                            {selectedComponent.isMulti && (
                                <div className="pl-6 pt-2 space-y-4">
                                    <div>
                                        <Label htmlFor="min">Min Selections</Label>
                                        <Input
                                            id="min"
                                            name="min"
                                            type="number"
                                            value={selectedComponent.min || ''}
                                            onChange={handleNumberChange}
                                            placeholder="e.g., 1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="max">Max Selections</Label>
                                        <Input id="max" name="max" type="number" value={selectedComponent.max || ''} onChange={handleNumberChange} placeholder="e.g., 3" />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={selectedComponent.description || ''}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </aside >
    );
}