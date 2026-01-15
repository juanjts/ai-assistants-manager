'use client';

import { ReactNode, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseButton?: boolean;
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true,
}: ModalProps) {
    // Bloquear scroll del body cuando el modal está abierto
    useEffect(() => {
        if (isOpen) {
        document.body.style.overflow = 'hidden';
        } else {
        document.body.style.overflow = 'unset';
        }

        return () => {
        document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Cerrar con tecla ESC
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
            onClose();
        }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Tamaños del modal
    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <>
        {/* Overlay/Backdrop */}
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={onClose}
            aria-hidden="true"
        />

        {/* Modal Container */}
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
            {/* Modal Content */}
            <div
                className={`
                relative
                w-full
                ${sizeClasses[size]}
                bg-[var(--color-bg-soft)]
                dark:bg-[var(--color-dark-deep)]
                rounded-2xl
                shadow-2xl
                animate-slideUp
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 py-3 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {title}
                </h2>
                
                {showCloseButton && (
                    <button
                    onClick={onClose}
                    className="
                        p-2
                        rounded-lg
                        text-gray-400
                        dark:text-white
                        hover:text-gray-600
                        hover:bg-gray-100
                        transition-colors
                        duration-200
                        text-2xl
                        leading-none
                        w-8
                        h-8
                        flex
                        items-center
                        justify-center
                    "
                    aria-label="Cerrar modal"
                    >
                    ×
                    </button>
                )}
                </div>

                {/* Body */}
                <div className="p-6 py-3">
                {children}
                </div>
            </div>
            </div>
        </div>
        </>
    );
}