import { Assistant } from '@/types/assistant';
import { AssistantCard } from './AssistantCard';

interface Props {
  assistants: Assistant[];
  onEdit: (assistant: Assistant) => void;
  onDelete: (assistant: Assistant) => void;
  onTrain: (assistant: Assistant) => void;
}

export function AssistantsList({
	assistants,
	onEdit,
	onDelete,
	onTrain
}: Props) {
  return (
    <div className="flex flex-col gap-4">
		{assistants.map((assistant) => (
			<AssistantCard
				key={assistant.id}
				assistant={assistant}
				onEdit={() => onEdit(assistant)}
				onDelete={() => onDelete(assistant)}
				onTrain={() => onTrain(assistant)}
			/>
		))}
    </div>
  );
}