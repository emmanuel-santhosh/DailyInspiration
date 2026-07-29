import type {JournalEntryResponseDto} from "../../../types/JournalEntryDto.ts";
import type {JournalEntryOperation} from "../../../types/JournalEntryOperation.ts";
import {toSentenceCase} from "../../../utils/toSentenceCase.ts";

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
                            {props.operation !== "READ" &&
                                <div className={"crud__button__pair"}>
                                    <button className={"journal__entry__operation"}>
                                        {toSentenceCase(props.operation)}
                                    </button>
                                    <button className={"journal__entry__operation"}>
                                        Cancel
                                    </button>
                                </div>
                            }
                        </article>
                    )
                }
            </section>
        </>
    )
}