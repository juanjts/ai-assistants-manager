'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/ui/ModalBaseLayout';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useAssistantsStore } from '@/store/assistants.store';
import { useUpdateAssistant } from '@/hooks/useUpdateAssistant';
import { AssistantLanguage, AssistantTone } from '@/types/assistant';

interface FormData {
  name: string;
  language: AssistantLanguage;
  tone: AssistantTone;
  short: number;
  medium: number;
  long: number;
  audioEnabled: boolean;
}

export function EditAssistantModal() {
  const { isEditModalOpen, closeEditModal, selectedAssistant } = useAssistantsStore();
  const { mutate: updateAssistant, isPending } = useUpdateAssistant();
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    trigger,
  } = useForm<FormData>({
    mode: 'onChange',
  });

  // Pre-cargar datos cuando se selecciona un asistente
  useEffect(() => {
    if (selectedAssistant) {
      reset({
        name: selectedAssistant.name,
        language: selectedAssistant.language,
        tone: selectedAssistant.tone,
        short: selectedAssistant.responseLength.short,
        medium: selectedAssistant.responseLength.medium,
        long: selectedAssistant.responseLength.long,
        audioEnabled: selectedAssistant.audioEnabled,
      });
    }
  }, [selectedAssistant, reset]);

  // Watch para validación
  const name = watch('name');
  const language = watch('language');
  const tone = watch('tone');
  const short = watch('short');
  const medium = watch('medium');
  const long = watch('long');
  const totalPercentage = Number(short) + Number(medium) + Number(long);

  const isStep1Valid = 
    name && name.trim().length >= 3 && 
    !!language &&
    !!tone &&
    !errors.name;

  const handleClose = () => {
    reset();
    setCurrentStep(1);
    closeEditModal();
  };

  const handleNext = async () => {
    const isValid = await trigger(['name', 'language', 'tone']);
    if (isValid) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const onSubmit = (data: FormData) => {
    if (totalPercentage !== 100) {
      alert('La suma de los porcentajes debe ser exactamente 100%');
      return;
    }

    if (!selectedAssistant) return;

    updateAssistant(
      {
        id: selectedAssistant.id,
        name: data.name,
        language: data.language,
        tone: data.tone,
        responseLength: {
          short: Number(data.short),
          medium: Number(data.medium),
          long: Number(data.long),
        },
        audioEnabled: data.audioEnabled,
        rules: selectedAssistant.rules, // Mantener las reglas existentes
      },
      {
        onSuccess: () => {
          alert('✅ Asistente actualizado exitosamente');
          handleClose();
        },
        onError: (error) => {
          alert(`❌ Error al actualizar asistente: ${error.message}`);
        },
      }
    );
  };

  if (!selectedAssistant) return null;

  return (
    <Modal
      isOpen={isEditModalOpen}
      onClose={handleClose}
      title="Editar Asistente"
      size="lg"
      showCloseButton={true}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Indicador de pasos */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center font-semibold
            ${currentStep === 1 ? 'bg-[var(--color-primary-pink)] text-white' : 'bg-gray-200 text-gray-600'}
          `}>
            1
          </div>
          <div className="w-12 h-1 bg-gray-200" />
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center font-semibold
            ${currentStep === 2 ? 'bg-[var(--color-primary-pink)] text-white' : 'bg-gray-200 text-gray-600'}
          `}>
            2
          </div>
        </div>

        {/* Paso 1 */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Datos Básicos
            </h3>

            <Input
              label="Nombre del asistente"
              placeholder="Ej: Asistente de Ventas"
              {...register('name', {
                required: 'El nombre es requerido',
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres',
                },
              })}
              error={errors.name?.message}
              required
            />

            <Select
              label="Idioma"
              options={[
                { value: 'Español', label: 'Español' },
                { value: 'Inglés', label: 'Inglés' },
                { value: 'Portugués', label: 'Portugués' },
              ]}
              {...register('language', {
                required: 'El idioma es requerido',
              })}
              error={errors.language?.message}
              required
            />

            <Select
              label="Tono"
              options={[
                { value: 'Formal', label: 'Formal' },
                { value: 'Casual', label: 'Casual' },
                { value: 'Profesional', label: 'Profesional' },
                { value: 'Amigable', label: 'Amigable' },
              ]}
              {...register('tone', {
                required: 'El tono es requerido',
              })}
              error={errors.tone?.message}
              required
            />

            <div className="flex justify-end pt-2 py-2">
              <Button 
                type="button" 
                onClick={handleNext}
                disabled={!isStep1Valid}
              >
                Siguiente →
              </Button>
            </div>
          </div>
        )}

        {/* Paso 2 */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Configuración de Respuestas
            </h3>

            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Distribución de longitud de respuestas (debe sumar 100%)
              </p>

              <Input
                type="number"
                label="Respuestas cortas (%)"
                min={0}
                max={100}
                {...register('short', { required: true, min: 0, max: 100 })}
              />

              <Input
                type="number"
                label="Respuestas medias (%)"
                min={0}
                max={100}
                {...register('medium', { required: true, min: 0, max: 100 })}
              />

              <Input
                type="number"
                label="Respuestas largas (%)"
                min={0}
                max={100}
                {...register('long', { required: true, min: 0, max: 100 })}
              />

              <div className={`
                p-3 rounded-lg text-sm font-medium
                ${totalPercentage === 100 
                  ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                  : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                }
              `}>
                Total: {totalPercentage}% {totalPercentage === 100 ? '✓' : '(debe ser 100%)'}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="audioEnabled-edit"
                {...register('audioEnabled')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="audioEnabled-edit" className="text-sm text-gray-700 dark:text-gray-300">
                Habilitar respuestas de audio
              </label>
            </div>

            <div className="flex gap-3 pt-2 py-2">
              <Button
                type="button"
                variant="secondary"
                onClick={handleBack}
                fullWidth
              >
                ← Atrás
              </Button>
              <Button
                type="submit"
                isLoading={isPending}
                disabled={totalPercentage !== 100}
                fullWidth
              >
                Actualizar Asistente
              </Button>
            </div>
          </div>
        )}

        {/* Botón cancelar */}
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            fullWidth
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
}