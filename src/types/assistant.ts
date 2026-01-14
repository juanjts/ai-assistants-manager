export type AssistantLanguage = 'es' | 'en' | 'pt';

export type AssistantTone =
    | 'formal'
    | 'casual'
    | 'professional'
    | 'friendly';

export interface AssistantResponseConfig {
    short: number;
    medium: number;
    long: number;
    audioEnabled: boolean;
}

export interface Assistant {
    id: string;
    name: string;
    language: AssistantLanguage;
    tone: AssistantTone;
    responseConfig: AssistantResponseConfig;
    createdAt: string;
}
