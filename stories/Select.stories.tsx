import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ReusableSelect } from "@/components/ReusableSelect";
import { MultiSelect } from "@/components/MultiSelect";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
// import { action } from '@storybook/addon-actions';

import { fn } from "storybook/test";

const meta: Meta = {
    title: "Custom UI/Selects",
    component: ReusableSelect,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
};

export default meta;

const FormSchema = z.object({
    trialType: z.string({
        message: "Please select a study type.",
    }),
    customer: z.string().optional(),
    countries: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one country.",
    }),
    languages: z.array(z.string()).optional(),
});

type SelectFormProps = {
    defaultValues?: z.infer<typeof FormSchema>;
    triggerValidation?: boolean;
};

function SelectForm({ defaultValues, triggerValidation }: SelectFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: defaultValues || { countries: [], languages: [] },
    });

    useEffect(() => {
        if (triggerValidation) {
            form.trigger();
        }
    }, [triggerValidation, form]);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        fn()(data);
        // '@storybook/addon-actions' is not available; use console.log for local debugging
        console.log("onSubmit", data);
    }

    const trialTypes = [
        { value: "cro", label: "CRO" },
        { value: "sponsor", label: "Sponsor" },
    ];

    const customers = [
        { value: "customer-a", label: "Customer A" },
        { value: "customer-b", label: "Customer B" },
        { value: "customer-c", label: "Customer C" },
    ];

    const countries = [
        { value: "usa", label: "United States" },
        { value: "germany", label: "Germany" },
        { value: "uk", label: "United Kingdom" },
        { value: "japan", label: "Japan" },
        { value: "australia", label: "Australia" },
    ];

    const languages = [
        { value: "en", label: "English" },
        { value: "de", label: "German" },
        { value: "ja", label: "Japanese" },
        { value: "es", label: "Spanish" },
        { value: "fr", label: "French" },
    ];


    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-6xl space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Clinical Trial Setup</h1>
                        <p className="text-muted-foreground">Please fill out the details for the clinical trial.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        <Card>
                            <CardHeader>
                                <CardTitle>Trial Information</CardTitle>
                                <CardDescription>Select the type and customer for this trial.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <ReusableSelect control={form.control} name="trialType" label="Trial Type" placeholder="Select a trial type..." options={trialTypes} />
                                <ReusableSelect control={form.control} name="customer" label="Customer (Optional)" placeholder="Select a customer..." options={customers} />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Regional Settings</CardTitle>
                                <CardDescription>Specify the country and languages for this trial study.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <MultiSelect control={form.control} name="countries" label="Countries" options={countries} placeholder="Select countries..." />
                                <MultiSelect control={form.control} name="languages" label="Languages (Optional)" options={languages} placeholder="Select languages..." />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="w-full max-w-sm mx-auto">
                        <Button type="submit" className="w-full">Submit</Button>
                    </div>
                </form>
            </Form>
        </main>
    );
}

type Story = StoryObj<typeof SelectForm>;

export const Default: Story = {
    render: () => <SelectForm />,
};

export const PreFilled: Story = {
    render: () => (
        <SelectForm
            defaultValues={{
                trialType: "sponsor",
                customer: "customer-b",
                countries: ["usa", "germany"],
                languages: ["en"],
            }}
        />
    ),
};

export const ValidationError: Story = {
    render: () => (
        <SelectForm
            defaultValues={{ trialType: "", countries: [] }}
            triggerValidation={true}
        />
    ),
};