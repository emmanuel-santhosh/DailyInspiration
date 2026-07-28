import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_BACKEND_URI, type JournalEntryDto} from "../../types/JournalEntryDto.ts";

export default function ReadJournalEntries() {

    const [journalEntries, setJournalEntries] = useState<JournalEntryDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        /*
        * async is wrapped in a function because it is an expression.
        * useEffect expects either assignment or function call.
        * */
        const fetchData = async () => {
            try {
                const response = await axios.get(BASE_BACKEND_URI);
                setJournalEntries(response.data);
            } catch (error) {
                console.log(error);
                alert("Failed to receive data. \nPlease check console.");
            } finally {
                setLoading(false);
            }
        };
        void fetchData();
    }, []);

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
                <section className={"journal__entry__section"}>
                    {
                        journalEntries.map((journalEntry, index) =>
                            <article className={"journal__entry__holder"}
                                     key={index + 1}
                                     id={`journal__entry__${index + 1}`}>
                                <p> Quote: {journalEntry.quote}</p>
                                <br/>
                                <p> Topic: {journalEntry.topic}</p>
                                <br/>
                            </article>
                        )
                    }
                </section>
            </header>
        </>
    )
}