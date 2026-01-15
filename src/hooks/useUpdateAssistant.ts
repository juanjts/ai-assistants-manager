import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assistantsApi } from '@/services/assistants.api';
import { Assistant } from '@/types/assistant';

export function useUpdateAssistant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assistant: Assistant) => {
      return assistantsApi.update(assistant);
    },
    
    onSuccess: () => {
      // Invalidar y refetch de la lista de asistentes
      queryClient.invalidateQueries({ queryKey: ['assistants'] });
    },
  });
}