import type {JournalEntryRequestDto, JournalEntryResponseDto} from "../../types/JournalEntryDto.ts";
import type {JournalEntryOperation} from "../../types/JournalEntryOperation.ts";
import {useState} from "react";
import EditModal from "./EditModal.tsx";

interface ListOfJournalEntriesProps {
    journalEntries: JournalEntryResponseDto[];
    operation: JournalEntryOperation
}

export default function ListOfJournalEntries(props: ListOfJournalEntriesProps) {

    // Following hooks are for modal component
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedJournalEntry, setSelectedJournalEntry] = useState<JournalEntryRequestDto | null>(null);
    const [journalEntryId, setJournalEntryId] = useState<number>(0);

    const clickHandler = (journalEntry: JournalEntryRequestDto) => {
        setIsOpen(true);
        setSelectedJournalEntry(journalEntry);
    };

    return (
        <>
            <section className={"journal__entry__section"}>
                {
                    props.journalEntries.map((journalEntry) =>
                        <>
                            {/*
                        * https://react.dev/learn/rendering-lists
                        * */}
                            <article className={"journal__entry__holder"}
                                     key={journalEntry.id}
                                     id={`journal__entry__${journalEntry.id}`}>
                                <p> Quote: {journalEntry.quote}</p>
                                <br/>
                                <p> Topic: {journalEntry.topic}</p>
                                <br/>
                            </article>
                            {(props.operation !== "Create" && props.operation !== "Read") &&
                                <button key={`button_${journalEntry.id}`}
                                        onClick={() => {
                                            clickHandler(journalEntry);
                                            setJournalEntryId(journalEntry.id);
                                        }}>{props.operation}</button>}
                        </>
                    )
                }
                {isOpen &&
                    selectedJournalEntry &&
                    <EditModal journalEntry={selectedJournalEntry}
                               setIsOpen={setIsOpen}
                               operation={props.operation}
                               journalEntryId={journalEntryId}
                               setSelectedJournalEntry={setSelectedJournalEntry}/>}
            </section>
        </>
    )
}