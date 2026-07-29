import {useEffect} from "react";
import {fetchJournalEntries} from "../../../services/fetchJournalEntries.ts";
import {useJournalEntryRetrieval} from "../../../hooks/useJournalEntryRetrieval.ts";

export default function ReadJournalEntries() {

    const {journalEntries, setJournalEntries, loading, setLoading} = useJournalEntryRetrieval();

    useEffect(() => {
        void fetchJournalEntries({setJournalEntries,setLoading});
    }, [journalEntries]);

    if (loading) {
        return (
            <header>
                <h2>Loading ...</h2>
            </header>
        )
    }

    return (
        <>
            <header>
                <h2>
                    Recall your entries
                </h2>
            </header>
            <section className={"journal__entry__section"}>
                {
                    journalEntries.map((journalEntry) =>
                        /*
                        * https://react.dev/learn/rendering-lists
                        * */
                        <article className={"journal__entry__holder"}
                                 key={journalEntry.id}
                                 id={`journal__entry__${journalEntry.id}`}>
                            <p> Quote: {journalEntry.quote}</p>
                            <br/>
                            <p> Topic: {journalEntry.topic}</p>
                            <br/>
                        </article>
                    )
                }
            </section>
        </>
    )
}