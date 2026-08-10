import type {JournalEntryRequestDto, JournalEntryResponseDto} from "../../types/JournalEntryDto.ts";
import type {JournalEntryOperation} from "../../types/JournalEntryOperation.ts";
import Modal from 'react-modal';
import "../../styles/EditModal.css"
import UpdateForm from "./forms/UpdateForm.tsx";
import DeleteForm from "./forms/DeleteForm.tsx";

type modalProps = {
    journalEntry: JournalEntryRequestDto,
    journalEntryId: number,
    operation: JournalEntryOperation,
    setIsOpen: (isOpen: boolean) => void,
    setSelectedJournalEntry: (journalEntry: JournalEntryRequestDto | null) => void,

    onJournalEntryUpdate?: (updatedJournalEntry: JournalEntryResponseDto) => void,
    onJournalEntryDelete?: (deletedJournalEntryId: number) => void
}

Modal.setAppElement('#root');

export default function EditModal(props: Readonly<modalProps>) {

    const handleUpdateSuccess = () => {
        // On successful update, modal can be closed
        closeHandler();
    };

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
            {props.operation === "Update" &&
                <UpdateForm
                    operation={props.operation}
                    journalEntry={props.journalEntry}
                    id={props.journalEntryId}
                    onUpdateSuccess={handleUpdateSuccess}
                    onJournalEntryUpdate={props.onJournalEntryUpdate}
                />
            }

            {props.operation === "Delete" &&
                <DeleteForm
                    operation={props.operation}
                    journalEntry={props.journalEntry}
                    id={props.journalEntryId}
                    onUpdateSuccess={handleUpdateSuccess}
                    onJournalEntryDelete={props.onJournalEntryDelete}
                />
            }

            <div className={"modal-buttons"}>
                <button
                    onClick={closeHandler}
                    className="modal-close-btn"
                    type={"button"}
                    aria-label="Close modal">
                    Close
                </button>
            </div>
        </Modal>
    )
}