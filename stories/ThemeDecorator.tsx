import React from "react";

export const ThemeDecorator = ({ children }: { children: React.ReactNode }) => {
    return <div className="bg-bgLight min-h-screen p-4">{children}</div>;
};
