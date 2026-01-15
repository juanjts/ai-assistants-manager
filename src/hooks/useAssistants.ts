import { useQuery } from '@tanstack/react-query';
import { assistantsApi } from '@/services/assistants.api';

export function useAssistants() {
    return useQuery({
        queryKey: ['assistants'],
        queryFn: assistantsApi.getAll,
        staleTime: 1000 * 60 * 5, // Los datos se consideran frescos por 5 minutos
        refetchOnWindowFocus: false, // No refetch al cambiar de pestaña
    });
}
