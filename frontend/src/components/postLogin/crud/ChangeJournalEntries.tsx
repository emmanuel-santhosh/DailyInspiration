import ListOfJournalEntries from "../ListOfJournalEntries.tsx";
import LoadingJournalEntries from "../LoadingJournalEntries.tsx";
import {useJournalEntryRetrieval} from "../../../hooks/useJournalEntryRetrieval.ts";
import {useEffect} from "react";
import {fetchJournalEntries} from "../../../services/fetchJournalEntries.ts";
import type {JournalEntryResponseDto} from "../../../types/JournalEntryDto.ts";

export default function ChangeJournalEntries() {

    const {journalEntries, setJournalEntries, loading, setLoading} = useJournalEntryRetrieval();

    useEffect(() => {
        void fetchJournalEntries({setJournalEntries, setLoading});
    }, []);

    const handleJournalEntryUpdate = (updatedJournalEntry: JournalEntryResponseDto) => {
        setJournalEntries(journalEntries.map(
            existingJournalEntry =>
                existingJournalEntry.id === updatedJournalEntry.id
                    ? updatedJournalEntry
                    : existingJournalEntry
        ));
    };

    if (loading) {
        return (
            <LoadingJournalEntries/>
        )
    }

    return (
        <>
            <header>
                <h2>
                    Edit your entries
                </h2>
                <h3>
                    You change as a person - let your entries reflect that.
                </h3>
            </header>
            <ListOfJournalEntries
                journalEntries={journalEntries}
                operation={"Update"}
                onJournalEntryUpdate={handleJournalEntryUpdate}
            />
        </>
    )
}