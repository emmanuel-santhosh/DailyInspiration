import type {JournalEntryRequestDto} from "../../types/JournalEntryDto.ts";
import JournalEntryForm from "./JournalEntryForm.tsx";
import type {JournalEntryOperation} from "../../types/JournalEntryOperation.ts";
import Modal from 'react-modal';
import "../../styles/EditModal.css"

type modalProps = {
    journalEntry: JournalEntryRequestDto,
    journalEntryId: number
    operation: JournalEntryOperation,
    setIsOpen: (isOpen: boolean) => void,
    setSelectedJournalEntry: (journalEntry: JournalEntryRequestDto | null) => void
}

Modal.setAppElement('#root');

export default function EditModal(props: Readonly<modalProps>) {

    const closeHandler = () => {
        props.setIsOpen(false);
        props.setSelectedJournalEntry(null);
    }

    return (
        <Modal
            overlayClassName="modal-overlay"
            className="modal-content"
            contentLabel={"Edit Journal Entry"}
            onRequestClose={closeHandler}
            isOpen={!!props.journalEntry}>
            <JournalEntryForm
                operation={props.operation}
                journalEntry={props.journalEntry}
                id={props.journalEntryId}/>
            <button
                onClick={closeHandler}
                className="modal-close-btn"
                aria-label="Close modal">
                Close
            </button>
        </Modal>
    )
}