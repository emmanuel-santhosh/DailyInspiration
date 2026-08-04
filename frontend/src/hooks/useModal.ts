import type {JournalEntryRequestDto} from "../types/JournalEntryDto.ts";
import {useState} from "react";

export default function useModal() {
    // Following hooks are for modal component
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedJournalEntry, setSelectedJournalEntry] = useState<JournalEntryRequestDto | null>(null);
    const [journalEntryId, setJournalEntryId] = useState<number>(0);

    return {isOpen, setIsOpen,
        selectedJournalEntry, setSelectedJournalEntry,
        journalEntryId, setJournalEntryId};
}