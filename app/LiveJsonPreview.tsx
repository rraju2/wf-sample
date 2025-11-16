"use client";

import React from 'react';

export function LiveJsonPreview({ data }: { data: any }) {
    return (
        <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 tracking-tight">Live JSON Preview</h2>
            <pre className="text-sm bg-muted/40 p-4 rounded-lg overflow-x-auto">
                <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
        </div>
    );
}