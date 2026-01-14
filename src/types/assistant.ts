export type AssistantLanguage = 'Español' | 'Inglés' | 'Portugués';

export type AssistantTone =
    | 'Formal'
    | 'Casual'
    | 'Profesional'
    | 'Amigable';

export interface AssistantResponseLength {
    short: number;
    medium: number;
    long: number;
}

export interface Assistant {
    id: string;
    name: string;
    language: AssistantLanguage;
    tone: AssistantTone;
    responseLength: AssistantResponseLength;
    audioEnabled: boolean;
    rules: string;
}
