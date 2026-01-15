import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assistantsApi } from '@/services/assistants.api';

export function useDeleteAssistant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      return assistantsApi.remove(id);
    },
    
    // Optimistic update
    onMutate: async (assistantId) => {
      // Cancelar queries en progreso
      await queryClient.cancelQueries({ queryKey: ['assistants'] });

      // Guardar snapshot del estado anterior
      const previousAssistants = queryClient.getQueryData(['assistants']);

      // Optimistically update
      queryClient.setQueryData(['assistants'], (old: any) => {
        return old?.filter((assistant: any) => assistant.id !== assistantId);
      });

      // Retornar contexto con el snapshot
      return { previousAssistants };
    },

    // Si falla, hacer rollback
    onError: (err, assistantId, context) => {
      if (context?.previousAssistants) {
        queryClient.setQueryData(['assistants'], context.previousAssistants);
      }
    },

    // Siempre refetch al final
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['assistants'] });
    },
  });
}