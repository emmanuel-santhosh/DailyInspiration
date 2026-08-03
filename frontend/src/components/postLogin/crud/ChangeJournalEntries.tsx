import ListOfJournalEntries from "../ListOfJournalEntries.tsx";
import LoadingJournalEntries from "../LoadingJournalEntries.tsx";
import {useJournalEntryRetrieval} from "../../../hooks/useJournalEntryRetrieval.ts";
import {useEffect} from "react";
import {fetchJournalEntries} from "../../../services/fetchJournalEntries.ts";

export default function ChangeJournalEntries() {

    const {journalEntries, setJournalEntries, loading, setLoading} = useJournalEntryRetrieval();

    useEffect(() => {
        void fetchJournalEntries({setJournalEntries, setLoading});
    });

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
                    You change as a person - let your entries reflect that. <br/>
                    Click on a journal entry to update it.
                </h3>
            </header>
            <ListOfJournalEntries
                journalEntries={journalEntries}
                operation={"Update"}/>
        </>
    )
}