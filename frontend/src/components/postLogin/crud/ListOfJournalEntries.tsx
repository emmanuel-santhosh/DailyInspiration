import type {JournalEntryResponseDto} from "../../../types/JournalEntryDto.ts";
import type {JournalEntryOperation} from "../../../types/JournalEntryOperation.ts";

interface ListOfJournalEntriesProps {
    journalEntries: JournalEntryResponseDto[];
    operation: JournalEntryOperation
}

export default function ListOfJournalEntries(props: ListOfJournalEntriesProps) {
    return (
        <>
            <section className={"journal__entry__section"}>
                {
                    props.journalEntries.map((journalEntry) =>
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