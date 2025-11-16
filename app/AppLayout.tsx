import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen bg-background">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-6 sm:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}