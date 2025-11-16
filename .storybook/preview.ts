import type { Preview } from '@storybook/nextjs-vite'
import '../app/globals.css';
import React from 'react';
import { ThemeDecorator } from '../stories/ThemeDecorator';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { value: 'en', title: 'English' },
  { value: 'fr', title: 'Français' },
  { value: 'es', title: 'Español' },
  { value: 'ga', title: 'Gaeilge' },
];

const LAYOUTS = [
  { value: 'desktop', title: 'Desktop' },
  { value: 'tablet', title: 'Tablet' },
  { value: 'mobile', title: 'Mobile' },
];

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: { icon: 'globe', items: LANGUAGES },
  },
  layoutType: {
    name: 'Layout',
    description: 'Form layout type',
    defaultValue: 'desktop',
    toolbar: { icon: 'mirror', items: LAYOUTS },
  },
};

export const decorators = [
  (Story: any, context: any) => {
    const { locale, layoutType } = context.globals;

    // A component that handles the language change effect
    const LanguageManager = () => {
      const { i18n } = useTranslation();
      React.useEffect(() => {
        i18n.changeLanguage(locale);
      }, [locale, i18n]);
      return null; // This component does not render anything
    };

    return (
      <ThemeDecorator>
      <LanguageManager />
      < div data - layout={ layoutType } className = "h-screen p-4" >
        <Story args={ { ...context.args, layout: layoutType }} />
          </div>
          </ThemeDecorator>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: { expanded: true },
  backgrounds: { default: 'light' },
};



//////


/*
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - s//kip a11y checks entirely
      test: 'todo'
    }
  },
}; */

//export default preview;