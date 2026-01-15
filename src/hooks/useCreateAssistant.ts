import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assistantsApi } from '@/services/assistants.api';
import { Assistant } from '@/types/assistant';

export function useCreateAssistant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newAssistant: Omit<Assistant, 'id'>) => {
      // Generar ID temporal
      const assistant: Assistant = {
        ...newAssistant,
        id: Date.now().toString(),
      };
      return assistantsApi.create(assistant);
    },
    
    onSuccess: () => {
      // Invalidar y refetch de la lista de asistentes
      queryClient.invalidateQueries({ queryKey: ['assistants'] });
    },
  });
}