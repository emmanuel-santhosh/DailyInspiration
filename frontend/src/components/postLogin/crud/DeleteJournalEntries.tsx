import {useJournalEntryRetrieval} from "../../../hooks/useJournalEntryRetrieval.ts";
import {useEffect} from "react";
import {fetchJournalEntries} from "../../../services/fetchJournalEntries.ts";
import LoadingJournalEntries from "../LoadingJournalEntries.tsx";
import ListOfJournalEntries from "../ListOfJournalEntries.tsx";

export default function DeleteJournalEntries() {

    const {journalEntries, setJournalEntries, loading, setLoading} = useJournalEntryRetrieval();

    useEffect(() => {
        void fetchJournalEntries({setJournalEntries, setLoading});
    }, []);

    const handleJournalEntryDelete = (deletedJournalEntryId: number) => {
        setJournalEntries(journalEntries.filter(
            journalEntry => journalEntry.id !== deletedJournalEntryId
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
                    Delete your entries
                </h2>
                <h3>
                    Let go of whatever doesn't let you grow.
                </h3>
            </header>
            <ListOfJournalEntries
                journalEntries={journalEntries}
                operation={"Delete"}
                onJournalEntryDelete={handleJournalEntryDelete}
            />
        </>
    )
}