import React from "react";

export default function Sidebar() {
    const items = ["Dashboard", "Forms", "Reports", "Settings"];
    return (
        <aside className="w-60 bg-slate-100 border-r p-2 flex flex-col gap-2">
            {items.map((item) => (
                <div key={item} className="p-2 hover:bg-slate-200 rounded cursor-pointer">
                    {item}
                </div>
            ))}
        </aside>
    );
}
