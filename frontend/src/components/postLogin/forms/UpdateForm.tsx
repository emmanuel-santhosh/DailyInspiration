import {type JournalEntryRequestDto, type JournalEntryResponseDto} from "../../../types/JournalEntryDto.ts";
import type {JournalEntryOperation} from "../../../types/JournalEntryOperation.ts";
import {type SubmitHandler} from "react-hook-form";
import {useJournalEntryUpdate} from "../../../hooks/crud/useJournalEntryUpdate.ts";
import FormGUI from "./FormGUI.tsx";
import {useJournalEntryForm} from "../../../hooks/useJournalEntryForm.ts";

type updateFormProps = {
    operation: JournalEntryOperation;
    id: number;
    journalEntry: JournalEntryRequestDto;

    // Callback fn to parent modal
    onUpdateSuccess: () => void;

    onJournalEntryUpdate?: (updatedJournalEntry: JournalEntryResponseDto) => void;
}

export default function UpdateForm(props: Readonly<updateFormProps>) {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useJournalEntryForm(props.journalEntry);

    const onReset = () => {
        reset();
    };

    const {updateJournalEntry} = useJournalEntryUpdate();

    const onSubmit: SubmitHandler<JournalEntryRequestDto> = async (formData: JournalEntryRequestDto) => {
        const result = await updateJournalEntry(
            formData,
            props.id);
        if (result.success) {
            alert("Data updated!");

            // Propagate success to modal
            props.onUpdateSuccess();

            if (props.onJournalEntryUpdate && result.data) {
                props.onJournalEntryUpdate(result.data);
            }

        } else {
            alert("Failed to update data. Check console.");
        }

    };

    return (
        <FormGUI onSubmit={onSubmit}
                 handleSubmit={handleSubmit}
                 operation={props.operation}
                 errors={errors}
                 register={register}
                 onReset={onReset}/>
    )
}