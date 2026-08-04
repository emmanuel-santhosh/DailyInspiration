import {useState} from "react";
import type {JournalEntryResponseDto} from "../types/JournalEntryDto.ts";

export function useJournalEntryRetrieval() {
    const [journalEntries, setJournalEntries] = useState<JournalEntryResponseDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    return {
        journalEntries,
        setJournalEntries,
        loading,
        setLoading
    };
}