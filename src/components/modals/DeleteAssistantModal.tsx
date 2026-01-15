'use client';

import { Modal } from '@/components/ui/ModalBaseLayout';
import { Button } from '@/components/ui/Button';
import { useAssistantsStore } from '@/store/assistants.store';
import { useDeleteAssistant } from '@/hooks/useDeleteAssistant';

export function DeleteAssistantModal() {
  const { isDeleteModalOpen, closeDeleteModal, selectedAssistant } = useAssistantsStore();
  const { mutate: deleteAssistant, isPending } = useDeleteAssistant();

  const handleDelete = () => {
    if (!selectedAssistant) return;

    deleteAssistant(selectedAssistant.id, {
      onSuccess: () => {
        alert('✅ Asistente eliminado exitosamente');
        closeDeleteModal();
      },
      onError: (error) => {
        alert(`❌ Error al eliminar asistente: ${error.message}`);
      },
    });
  };

  if (!selectedAssistant) return null;

  return (
    <Modal
      isOpen={isDeleteModalOpen}
      onClose={closeDeleteModal}
      title="Eliminar Asistente"
      size="sm"
      showCloseButton={true}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full">
          <span className="text-3xl">⚠️</span>
        </div>

        <div className="text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            ¿Estás seguro de que deseas eliminar el asistente
          </p>
          <p className="font-semibold text-gray-900 dark:text-white text-lg">
            "{selectedAssistant.name}"?
          </p>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Esta acción no se puede deshacer.
        </p>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={closeDeleteModal}
            fullWidth
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={handleDelete}
            isLoading={isPending}
            fullWidth
          >
            Eliminar
          </Button>
        </div>
      </div>
    </Modal>
  );
}