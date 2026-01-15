import { create } from 'zustand';
import { Assistant } from '@/types/assistant';

interface AssistantUIState {
  // Estado de modales
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  
  // Asistente seleccionado para editar/eliminar
  selectedAssistant: Assistant | null;
  
  // Acciones para modales
  openCreateModal: () => void;
  closeCreateModal: () => void;
  
  openEditModal: (assistant: Assistant) => void;
  closeEditModal: () => void;
  
  openDeleteModal: (assistant: Assistant) => void;
  closeDeleteModal: () => void;
  
  // Limpiar selección
  clearSelection: () => void;
}

export const useAssistantsStore = create<AssistantUIState>((set) => ({
  // Estado inicial
  isCreateModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  selectedAssistant: null,
  
  // Acciones para crear
  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ 
    isCreateModalOpen: false,
    selectedAssistant: null // ← AGREGAR: Limpiar selección
  }),
  
  // Acciones para editar
  openEditModal: (assistant) => set({ 
    isEditModalOpen: true, 
    selectedAssistant: assistant 
  }),
  closeEditModal: () => set({ 
    isEditModalOpen: false, 
    selectedAssistant: null 
  }),
  
  // Acciones para eliminar
  openDeleteModal: (assistant) => set({ 
    isDeleteModalOpen: true, 
    selectedAssistant: assistant 
  }),
  closeDeleteModal: () => set({ 
    isDeleteModalOpen: false, 
    selectedAssistant: null 
  }),
  
  // Limpiar
  clearSelection: () => set({ selectedAssistant: null })
}));