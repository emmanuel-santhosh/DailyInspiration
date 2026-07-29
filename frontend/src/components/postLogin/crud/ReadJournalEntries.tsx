import {useEffect} from "react";
import {fetchJournalEntries} from "../../../services/fetchJournalEntries.ts";
import {useJournalEntryRetrieval} from "../../../hooks/useJournalEntryRetrieval.ts";
import ListOfJournalEntries from "./ListOfJournalEntries.tsx";
import LoadingJournalEntries from "../LoadingJournalEntries.tsx";

export default function ReadJournalEntries() {

    const {journalEntries, setJournalEntries, loading, setLoading} = useJournalEntryRetrieval();

    useEffect(() => {
        void fetchJournalEntries({setJournalEntries, setLoading});
    }, []);

    if (loading) {
        return (
            <LoadingJournalEntries/>
        )
    }

    return (
        <>
            <header>
                <h2>
                    Recall your entries
                </h2>
            </header>
            <ListOfJournalEntries
                journalEntries={journalEntries}
                operation={"READ"}/>
        </>
    )
}