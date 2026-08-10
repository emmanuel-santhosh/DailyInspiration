import type {JournalEntryOperation} from "../../../types/JournalEntryOperation.ts";
import type {JournalEntryRequestDto} from "../../../types/JournalEntryDto.ts";
import FormGUI from "./FormGUI.tsx";
import {useJournalEntryForm} from "../../../hooks/useJournalEntryForm.ts";
import type {SubmitHandler} from "react-hook-form";
import {useJournalEntryDelete} from "../../../hooks/crud/useJournalEntryDelete.ts";

type deleteFormProps = {
    operation: JournalEntryOperation;
    id: number;
    journalEntry: JournalEntryRequestDto;

    onUpdateSuccess: () => void;

    onJournalEntryDelete?: (deletedJournalEntryId: number) => void;
}

export default function DeleteForm(props: Readonly<deleteFormProps>) {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useJournalEntryForm(props.journalEntry);

    const {deleteJournalEntry} = useJournalEntryDelete();

    const onSubmit: SubmitHandler<JournalEntryRequestDto> = async () => {
        const result = await deleteJournalEntry(
            props.id
        );
        if(result.success){
            alert("Data deleted!");
            if (props.onUpdateSuccess) {
                props.onUpdateSuccess();
            }
            if (props.onJournalEntryDelete) {
                props.onJournalEntryDelete(props.id);
            }
        }
        else{
            alert("Failed to delete data. Check console.");
        }
    };
    return (
        <FormGUI register={register}
                 handleSubmit={handleSubmit}
                 errors={errors}
                 operation={props.operation}
                 onSubmit={onSubmit}/>
    )
}