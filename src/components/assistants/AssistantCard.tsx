import { Assistant } from '@/types/assistant';

interface Props {
    assistant: Assistant;
    onEdit: () => void;
    onDelete: () => void;
    onTrain: () => void;
}

export function AssistantCard({
    assistant,
    onEdit,
    onDelete,
    onTrain
}: Props) {
    return (
        <div className="
        group
        bg-[var(--color-bg-soft)]
        rounded-xl 
        p-6
        flex 
        flex-col 
        gap-4
        ">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-900 mb-1">
                    {assistant.name}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-200 text-blue-800">
                    {assistant.language}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-300 text-purple-800">
                    {assistant.tone}
                    </span>
                </div>
                </div>
                
                {/* Indicador de audio */}
                <div className={`
                p-2 rounded-lg text-lg
                ${assistant.audioEnabled ? 'bg-gray-300' : 'bg-gray-400'}
                `}>
                {assistant.audioEnabled ? '🔊' : '🔇'}
                </div>
            </div>

            <div className='flex flex-wrap justify-between gap-4'>
                <div className="space-y-2 w-full max-w-sm">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Distribución de respuestas
                    </p>
                    <div className="flex gap-2">
                        {Object.entries(assistant.responseLength).map(([key, value]) => {
                            // Definimos los colores para cada clave
                            const colors = {
                                short: 'bg-blue-400',   // Para "Cortas"
                                medium: 'bg-purple-500', // Para "Medias"
                                long: 'bg-orange-600'    // Para "Largas" (coherente con tu azul profundo)
                            };

                            return (
                                <div key={key} className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-gray-600 capitalize">
                                        {key === 'short' ? 'Cortas' : key === 'medium' ? 'Medias' : 'Largas'}
                                    </span>
                                    <span className="text-xs font-semibold text-gray-900">{value}%</span>
                                    </div>
                                    <div className="w-full bg-gray-400 rounded-full h-2">
                                    <div
                                        /* Corregido: agregamos aserción de tipo */
                                        className={`${colors[key as keyof typeof colors] || 'bg-gray-500'} h-2 rounded-full transition-all duration-500`}
                                        style={{ width: `${value}%` }}
                                    />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex gap-2 justify-end grow md:grow-0 w-full md:w-auto">
                    <button 
                        onClick={onEdit} // ← AGREGAR
                        className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-warning)] text-white rounded-lg font-medium text-sm cursor-pointer transition-transform duration-300 ease-in-out hover:scale-102"
                    >
                        ✏️ Editar
                    </button>
                    
                    <button 
                        onClick={onTrain} // ← AGREGAR
                        className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium text-sm cursor-pointer transition-transform duration-300 ease-in-out hover:scale-102"
                    >
                        ⚡ Entrenar
                    </button>
                    
                    <button 
                        onClick={onDelete} // ← AGREGAR
                        className="px-4 py-2.5 bg-[var(--color-danger)] text-white rounded-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-102"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    );
}