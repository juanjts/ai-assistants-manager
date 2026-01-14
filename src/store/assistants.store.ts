import { create } from 'zustand';
import { Assistant } from '@/types/assistant';

interface AssistantsState {
    assistants: Assistant[];
    selectedAssistant: Assistant | null;

    setAssistants: (assistants: Assistant[]) => void;
    selectAssistant: (assistant: Assistant | null) => void;
    addAssistant: (assistant: Assistant) => void;
    updateAssistant: (assistant: Assistant) => void;
    removeAssistant: (id: string) => void;
}

export const useAssistantsStore = create<AssistantsState>((set) => ({
    assistants: [],
    selectedAssistant: null,

    setAssistants: (assistants) => set({ assistants }),

    selectAssistant: (assistant) =>
        set({ selectedAssistant: assistant }),

    addAssistant: (assistant) =>
        set((state) => ({
        assistants: [...state.assistants, assistant]
        })),

    updateAssistant: (assistant) =>
        set((state) => ({
        assistants: state.assistants.map((a) =>
            a.id === assistant.id ? assistant : a
        )
        })),

    removeAssistant: (id) =>
        set((state) => ({
        assistants: state.assistants.filter((a) => a.id !== id)
        }))
}));
