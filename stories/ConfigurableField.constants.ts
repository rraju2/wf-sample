export const FIELD_TYPES = [
    'text',
    'select',
    'checkbox',
    'radio',
    'date',
    'date-of-birth',
    'calendar',
    'number',
] as const;

export const SELECT_OPTIONS = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
];

export const RADIO_OPTIONS = [
    { value: 'all', label: 'All new messages' },
    { value: 'mentions', label: 'Direct messages and mentions' },
    { value: 'none', label: 'Nothing' },
];

export const AGE_VALIDATION_MESSAGES = {
    REQUIRED: "Age is required.",
    MIN: "Must be 18 or older.",
    MAX: "Age must be 65 or less.",
};

export const AGE_MIN_VALUE = 18;
export const AGE_MAX_VALUE = 65;

export const DEFAULT_STORY_FIELD_NAME = 'story-field';
export const DEFAULT_STORY_FIELD_LABEL = 'Field Label';