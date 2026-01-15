'use client';

import { useAssistants } from '@/hooks/useAssistants';
import { useAssistantsStore } from '@/store/assistants.store';
import { AssistantsList } from '@/components/assistants/AssistantsList';
import { EmptyState } from '@/components/ui/EmptyState';
import { Assistant } from '@/types/assistant';
import MainLayout from '@/components/MainLayout';
import { CreateAssistantModal } from '@/components/modals/CreateAssistantModal';
import { EditAssistantModal } from '@/components/modals/EditAssistantModal';
import { DeleteAssistantModal } from '@/components/modals/DeleteAssistantModal';

export default function HomePage() {
	const { data: assistants, isLoading, isError } = useAssistants();
	const { openCreateModal, openEditModal, openDeleteModal } = useAssistantsStore();

	const handleEdit = (assistant: Assistant) => {
		openEditModal(assistant); // Ya selecciona y abre el modal
	};

	const handleDelete = (assistant: Assistant) => {
		openDeleteModal(assistant); // Ya selecciona y abre el modal
	};

	const handleTrain = (assistant: Assistant) => {
		console.log('Entrenar', assistant);
	};

	// Loading state
	if (isLoading) {
		return (
			<MainLayout>
				<div className="flex items-center justify-center w-full min-h-[60vh]">
				<p className="text-lg text-gray-600">Cargando asistentes...</p>
				</div>
			</MainLayout>
		);
	}

	// Error state
	if (isError) {
		return (
			<MainLayout>
				<div className="flex items-center justify-center w-full min-h-[60vh]">
				<p className="text-lg text-red-600">Error al cargar asistentes</p>
				</div>
			</MainLayout>
		);
	}

	// Empty state
	if (!assistants || assistants.length === 0) {
		return (
			<MainLayout>
				<div className="w-full">
				<EmptyState
					title="No hay asistentes"
					description="Crea tu primer asistente de IA"
					action={
					<button
						onClick={openCreateModal}
						className="px-4 py-2 bg-[var(--color-primary-pink)] text-white rounded-lg hover:scale-102 transition-colors cursor-pointer"
					>
						Crear asistente
					</button>
					}
				/>
				</div>
				<CreateAssistantModal />
			</MainLayout>
		);
	}

	// Lista de asistentes
	return (
		<MainLayout>
			<div className="w-full">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Asistentes</h1>
				<button
					onClick={openCreateModal}
					className="px-4 py-2 bg-[var(--color-primary-pink)] text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
				>
					+ Crear Asistente
				</button>
				</div>

				<AssistantsList
					assistants={assistants}
					onEdit={handleEdit}
					onDelete={handleDelete}
					onTrain={handleTrain}
				/>
			</div>
			<CreateAssistantModal />
			<EditAssistantModal />
			<DeleteAssistantModal /> 
		</MainLayout>
	);
}
