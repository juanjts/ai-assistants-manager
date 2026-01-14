import { Assistant } from '@/types/assistant';

let assistants: Assistant[] = [];

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
