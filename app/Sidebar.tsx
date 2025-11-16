"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';

const DraggableComponent = ({ type, label, icon }: { type: string, label: string, icon: JSX.Element }) => {
    const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('application/form-builder-component', type);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            className="flex items-center p-3 border rounded-md cursor-grab bg-background text-sm hover:shadow-md transition-shadow"
            onDragStart={onDragStart}
            draggable
        >
            {icon}
            <span className="ml-2 font-medium">{label}</span>
        </div>
    );
};

const TextInputIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>;
const SelectIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="m9 12 2 2 4-4" /></svg>;
const CheckboxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>;
const LanguagesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="m7 2 5 5" /><path d="m12 18 6-6" /><path d="m14 14 6-6 2-3" /><path d="M10 5h12" /><path d="m17 2 5 5" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>;
const ClipboardListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
const SmartphoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>;
const TagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.432 0l6.568-6.568a2.426 2.426 0 0 0 0-3.432z" /><circle cx="18" cy="6" r="1" /></svg>;

export function Sidebar() {
    const { t } = useTranslation();

    return (
        <aside className="w-72 p-6 border-r bg-muted/40 hidden lg:block">
            <h2 className="text-lg font-semibold mb-4 tracking-tight">{t('components')}</h2>
            <div className="space-y-3">
                <DraggableComponent type="text" label={t('textInput')} icon={<TextInputIcon />} />
                <DraggableComponent type="select" label={t('selectDropdown')} icon={<SelectIcon />} />
                <DraggableComponent type="countries" label={t('countriesDropdown')} icon={<GlobeIcon />} />
                <DraggableComponent type="languages" label={t('languagesDropdown')} icon={<LanguagesIcon />} />
                <DraggableComponent type="cro" label={t('croDropdown')} icon={<BriefcaseIcon />} />
                <DraggableComponent type="phases" label={t('phasesDropdown')} icon={<ClipboardListIcon />} />
                <DraggableComponent type="customers" label={t('customersDropdown')} icon={<UsersIcon />} />
                <DraggableComponent type="devices" label={t('devicesDropdown')} icon={<SmartphoneIcon />} />
                <DraggableComponent type="checkbox" label={t('checkbox')} icon={<CheckboxIcon />} />
                <DraggableComponent type="label" label={t('labelComponent')} icon={<TagIcon />} />
            </div>
        </aside>
    );
}