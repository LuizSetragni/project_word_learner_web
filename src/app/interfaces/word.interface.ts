export interface WordInterface {
    id: number;
    content: string;
    link: string;
    phrase_1: string;
    phrase_2: string;
    phrase_3: string;
    synonym_1: string;
    synonym_2: string;
    synonym_3: string;
    meaning_1: string;
    meaning_2: string;
    meaning_3: string;
    created_at: Date;
    user_id: number;
    read: boolean;
}