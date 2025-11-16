import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SelectWithValidation from "@/components/SelectWithValidation";

const mockData = [
    { id: "1", label: "USA", value: "USA" },
    { id: "2", label: "France", value: "France" },
];

global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(mockData) })
) as jest.Mock;

describe("SelectWithValidation", () => {
    it("renders options and allows selection", async () => {
        const handleChange = jest.fn();
        render(
            <SelectWithValidation
                label="Countries"
                datasource="/api/countries"
                value={null}
                onChange={handleChange}
            />
        );
        await waitFor(() => screen.getByText("USA"));
        fireEvent.click(screen.getByText("USA"));
        expect(handleChange).toHaveBeenCalledWith(mockData[0]);
    });

    it("allows search filtering", async () => {
        render(
            <SelectWithValidation
                label="Countries"
                datasource="/api/countries"
                value={null}
                onChange={() => { }}
            />
        );
        await waitFor(() => screen.getByText("USA"));
        fireEvent.change(screen.getByPlaceholderText("Select..."), { target: { value: "Fra" } });
        expect(screen.queryByText("USA")).toBeNull();
        expect(screen.getByText("France")).toBeInTheDocument();
    });
});
