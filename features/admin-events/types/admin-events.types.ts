export interface Event {
    id: string;
    title: string;
    typeId: string;
    datetime: string;
    location: string;
    speaker: string;
    speakerTitle: string;
    status: 'draft' | 'ongoing' | 'upcoming' | 'completed';
    registrations?: number;
    type?: 'seminar' | 'networking' | 'exhibition';
    description?: string;
    detailedContent?: string;
    agenda?: string[];
    targetAudience?: string;
}

export interface EventType {
    id: string;
    name: string;
    description: string;
    isActive?: boolean;
}
