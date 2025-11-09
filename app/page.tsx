"use client";

import { ConfigurableField } from "@/components/ConfigurableField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ReusableSelect } from "@/components/ReusableSelect";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const singleSelectSchema = z.object({
  protocolName: z.string().min(1, "Protocol name is required."),
  trialType: z.string({
    message: "Please select a study type.",
  }),
  customer: z.string().optional(),
  countries: z.string().min(1, "You have to select at least one country."),
  terms: z.boolean().refine((val) => val === true, { message: "You must accept the terms and conditions." }),
  languages: z.array(z.string()).optional(),
});

const multiSelectSchema = singleSelectSchema.extend({
  countries: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one country.",
  }),
});

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

export default function Home() {
  const [isMulti, setIsMulti] = useState(true);
  const formSchema = isMulti ? multiSelectSchema : singleSelectSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      protocolName: "",
      countries: isMulti ? ([] as string[]) : ("" as string),
      languages: [] as string[],
      terms: false,
    } as unknown as Partial<z.infer<typeof formSchema>>,
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form Submitted:", data);
    alert(`Form submitted with ${isMulti ? 'multi' : 'single'}-select for countries! Check the console for the data.`);
  }

  const { formState } = form;
  const formData = form.watch();

  const requiredFields = Object.fromEntries(
    Object.entries(formSchema.shape).map(([key, schema]) => [
      key,
      !schema.isOptional(),
    ])
  );
  const liveJson = {
    values: formData,
    errors: formState.errors,
    required: requiredFields,
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-6xl space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Create new Protocol</h1>
            <p className="text-muted-foreground">Please fill out the details for the clinical trial study</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            <Card>
              <CardHeader>
                <CardTitle>Create New Protocol</CardTitle>
                <CardDescription>Select the study type and customer for this study</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ReusableSelect control={form.control} name="trialType" label="Trial Type" placeholder="Select a trial type..." options={trialTypes} />
                <ReusableSelect control={form.control} name="customer" label="Customer (Optional)" placeholder="Select a customer..." options={customers} />
              </CardContent>
              <CardFooter className="flex-col items-start gap-4">
                {/* Example of a configurable checkbox */}
                <ConfigurableField control={form.control} name="protocolName" label="Protocol Name" fieldType="text" description="Protocol Name" />
                <ConfigurableField control={form.control} name="terms" label="" fieldType="checkbox" description="I accept the terms and conditions" />
              </CardFooter>

            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Regional Settings</CardTitle>
                <CardDescription>Specify the country and languages for this trial study.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch id="multi-select-switch" checked={isMulti} onCheckedChange={() => setIsMulti(!isMulti)} />
                  <Label htmlFor="multi-select-switch">Enable Multi-select for Countries</Label>
                </div>
                <ConfigurableField
                  control={form.control}
                  name="countries"
                  label="Countries"
                  fieldType="select"
                  placeholder="Select countries..."
                  options={countries}
                  isMulti={isMulti}
                />
                <ConfigurableField control={form.control} name="languages" label="Languages (Optional)" fieldType="select" isMulti={true} options={languages} placeholder="Select languages..." />
              </CardContent>
            </Card>
            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Live Form Data</CardTitle>
                <CardDescription>As you fill the form, the data will appear here.</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="p-4 bg-secondary rounded-md overflow-x-auto">
                  <code>{JSON.stringify(liveJson, null, 2)}</code>
                </pre>
              </CardContent>
            </Card>
          </div>

          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
    </main>
  );
}
