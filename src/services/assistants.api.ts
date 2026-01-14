import { Assistant } from '@/types/assistant';

let assistants: Assistant[] = [
    {
        id: '1',
        name: 'Asistente de Ventas',
        language: 'Español',
        tone: 'Profesional',
        responseLength: {
        short: 30,
        medium: 50,
        long: 20
        },
        audioEnabled: true,
        rules:
        'Eres un asistente especializado en ventas. Siempre sé cordial y enfócate en identificar necesidades del cliente antes de ofrecer productos.'
    },
    {
        id: '2',
        name: 'Soporte Técnico',
        language: 'Inglés',
        tone: 'Amigable',
        responseLength: {
        short: 20,
        medium: 30,
        long: 50
        },
        audioEnabled: false,
        rules:
        'Ayudas a resolver problemas técnicos de manera clara y paso a paso. Siempre confirma que el usuario haya entendido antes de continuar.'
    }
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const shouldFail = (probability = 0.1) => Math.random() < probability;

export const assistantsApi = {
    async getAll(): Promise<Assistant[]> {
        await delay(300);
        return [...assistants];
    },

    async create(assistant: Assistant): Promise<Assistant> {
        await delay(400);
        assistants.push(assistant);
        return assistant;
    },

    async update(updated: Assistant): Promise<Assistant> {
        await delay(400);
        assistants = assistants.map((a) =>
        a.id === updated.id ? updated : a
        );
        return updated;
    },

    async remove(id: string): Promise<void> {
        await delay(300);
        if (shouldFail()) {
        throw new Error('No se pudo eliminar el asistente');
        }
        assistants = assistants.filter((a) => a.id !== id);
    }
};
