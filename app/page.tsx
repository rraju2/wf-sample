"use client";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ConfigurableField } from "@/components/ConfigurableField";
import { PropertiesPanel } from "./PropertiesPanel";
import { LiveJsonPreview } from "./LiveJsonPreview";

const formSchema = z.object({});

export default function Home() {
  const [droppedItems, setDroppedItems] = useState([]);
  const [layout, setLayout] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const { t } = useTranslation();

  // Dynamically build schema based on dropped items
  const dynamicSchema = buildDynamicSchema(droppedItems);

  const form = useForm({ resolver: zodResolver(dynamicSchema) });
  const { watch, formState: { errors } } = form;

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const componentType = event.dataTransfer.getData('application/form-builder-component');

    // Define default configurations for each component type
    const componentConfigs: Record<string, any> = {
      text: { fieldType: 'text', label: t('textInput') },
      select: { fieldType: 'select', label: t('selectDropdown'), dataSourceUrl: 'https://restcountries.com/v3.1/all?fields=name,cca2', isSearchable: true, allowAddNew: true },
      countries: { fieldType: 'select', label: t('countriesDropdown'), dataSourceUrl: 'https://restcountries.com/v3.1/all?fields=name,cca2', isSearchable: true, allowAddNew: false },
      languages: { fieldType: 'select', label: t('languagesDropdown'), dataSourceUrl: 'https://restcountries.com/v3.1/all?fields=name,cca2', isSearchable: true, allowAddNew: true },
      cro: { fieldType: 'select', label: t('croDropdown'), dataSourceUrl: 'https://restcountries.com/v3.1/all?fields=name,cca2', isSearchable: true, allowAddNew: true },
      phases: { fieldType: 'select', label: t('phasesDropdown'), dataSourceUrl: 'https://restcountries.com/v3.1/all?fields=name,cca2', isSearchable: true, allowAddNew: false },
      customers: { fieldType: 'select', label: t('customersDropdown'), dataSourceUrl: 'https://restcountries.com/v3.1/all?fields=name,cca2', isSearchable: true, allowAddNew: true },
      devices: { fieldType: 'select', label: t('devicesDropdown'), dataSourceUrl: 'https://restcountries.com/v3.1/all?fields=name,cca2', isSearchable: true, allowAddNew: true },
      checkbox: { fieldType: 'checkbox', label: t('checkbox') },
      label: { fieldType: 'label', label: t('labelComponent'), text: 'Static Label' },
    };

    const config = componentConfigs[componentType];

    if (componentType) {
      setDroppedItems(items => [...items, {
        id: `${componentType}-${Date.now()}`,
        type: componentType,
        label: config.label || `${componentType.charAt(0).toUpperCase() + componentType.slice(1)} Field`,
        name: `${componentType}${droppedItems.length + 1}`,
        required: false,
        placeholder: t('placeholder'),
        // Spread select-specific properties
        dataSourceUrl: config.dataSourceUrl,
        isSearchable: config.isSearchable,
        allowAddNew: config.allowAddNew,
        postUrl: config.postUrl,
        isMulti: config.isMulti,
        min: undefined,
        colSpan: 1,
      }]);
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  const handlePropertyChange = (id: string, property: string, value: any) => {
    console.log(`Changing property ${property} to ${value} for component ${id}`);
    setDroppedItems(items =>
      items.map(item =>
        item.id === id ? { ...item, [property]: value } : item
      )
    );
  };

  const getGridClass = () => {
    switch (layout) {
      case 'desktop':
        return 'grid-cols-3';
      case 'tablet':
        return 'grid-cols-2';
      case 'mobile':
        return 'grid-cols-1';
    }
  };

  const layoutOptions = [
    { value: 'desktop', label: t('desktop') },
    { value: 'tablet', label: t('tablet') },
    { value: 'mobile', label: t('mobile') },
  ];

  const selectedComponent = droppedItems.find(item => item.id === selectedComponentId) || null;

  const liveJsonData = {
    layout: layout,
    fields: droppedItems.map(item => ({
      id: item.id,
      type: item.type,
      name: item.name,
      label: item.label,
      placeholder: item.placeholder,
      validation: {
        required: item.required,
        min: item.min,
        max: item.max,
      },
    })),
    values: watch(),
    errors: errors,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] h-full gap-4">
      <div>
        <div className="mb-4 flex items-center gap-4">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{t('layout')}</label>
          <select
            value={layout}
            onChange={(e) => setLayout(e.target.value as 'desktop' | 'tablet' | 'mobile')}
            className="border p-2 rounded-md bg-background"
          >
            {layoutOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full max-w-6xl space-y-8">
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              className={`min-h-[600px] p-4 bg-muted/20 border-2 border-dashed border-muted-foreground/40 rounded-lg grid ${getGridClass()} gap-4 auto-rows-min overflow-hidden`}
            >
              {droppedItems.length === 0 ? (
                <div className="col-span-full row-span-full flex items-center justify-center text-muted-foreground">
                  <p>{t('dropZonePlaceholder')}</p>
                </div>
              ) : (
                droppedItems?.map((item, index) => (
                  <div key={item.id} onClick={() => setSelectedComponentId(item.id)} className={`col-span-${item.colSpan} p-2 bg-background rounded-md shadow-sm border relative group cursor-pointer ${selectedComponentId === item.id ? 'ring-2 ring-primary' : ''}`}>
                    <ConfigurableField
                      control={form.control}
                      name={item.name}
                      label={item.label}
                      fieldType={item.type}
                      required={item.required}
                      min={item.min}
                      max={item.max}
                      placeholder={item.placeholder}
                      // Pass select-specific props
                      dataSourceUrl={item.dataSourceUrl}
                      isSearchable={item.isSearchable}
                      allowAddNew={item.allowAddNew}
                      postUrl={item.postUrl}
                      isMulti={item.isMulti}
                    />
                  </div>
                ))
              )}
            </div>
            <Button type="submit" className="w-full">{t('submit')}</Button>
          </form>
        </Form>
      </div>
      <div className="flex flex-col divide-y">
        <PropertiesPanel
          selectedComponent={selectedComponent}
          onPropertyChange={handlePropertyChange}
        />
        <LiveJsonPreview data={liveJsonData} />
      </div>
    </div>
  );
}

// Helper function to dynamically build the Zod schema
function buildDynamicSchema(items: any[]) {
  const schemaFields: { [key: string]: z.ZodTypeAny } = {};

  items.forEach(item => {
    let fieldSchema: z.ZodTypeAny;

    const isSelect = ['select', 'countries', 'languages', 'cro', 'phases', 'customers', 'devices'].includes(item.type);

    if (isSelect && item.isMulti) {
      fieldSchema = z.array(z.string());
    } else {
      fieldSchema = z.string(); // Default to string for single select and other types
    }

    if (item.type === 'number') {
      fieldSchema = z.number().nullable();
      if (item.min !== undefined) fieldSchema = fieldSchema.min(item.min, `${item.label} must be at least ${item.min}`);
      if (item.max !== undefined) fieldSchema = fieldSchema.max(item.max, `${item.label} must be at most ${item.max}`);
    }

    if (item.required) {
      const requiredMessage = `${item.label} is required`;
      fieldSchema = isSelect && item.isMulti
        ? (fieldSchema as z.ZodArray<any>).min(item.min ?? 1, item.min ? `${item.label} requires at least ${item.min} selections` : requiredMessage)
        : fieldSchema.refine(val => val !== null && val !== undefined && val !== '', requiredMessage);
    }
    if (isSelect && item.isMulti && item.max !== undefined) {
      fieldSchema = (fieldSchema as z.ZodArray<any>).max(item.max, `${item.label} allows at most ${item.max} selections`);
    }
    schemaFields[item.name] = fieldSchema;
  });
  return z.object(schemaFields);
}
