interface Props {
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export function EmptyState({
    title,
    description,
    action
}: Props) {
    return (
        <div className="text-center py-10">
            <h2 className="text-xl font-semibold">{title}</h2>
            {description && <p>{description}</p>}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
