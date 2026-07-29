import type {JournalEntryRequestDto} from "../../../types/JournalEntryDto.ts";
import JournalEntryForm from "../JournalEntryForm.tsx";
import type {JournalEntryOperation} from "../../../types/JournalEntryOperation.ts";

type modalProps = {
    journalEntry: JournalEntryRequestDto,
    setIsOpen: (isOpen: boolean) => void,
    operation: JournalEntryOperation,
    id: number
}

export default function Modal(props: Readonly<modalProps>) {

    const clickHandler = () => {
        props.setIsOpen(false);
    }

    return (
        <><JournalEntryForm operation={props.operation} journalEntry={props.journalEntry} id={props.id}/>
            <button onClick={clickHandler}>Close</button>
        </>
    )
}