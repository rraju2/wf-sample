import { DynamicSelect } from "./components/select";

export default function Page() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-background">
            <div className="p-8 rounded-2xl shadow-lg border w-[400px] bg-card">
                <h1 className="text-xl font-semibold mb-4 text-center">Dynamic Type & Customer Select</h1>
                <DynamicSelect />
            </div>
        </div>
    );
}
