import {type JournalEntryRequestDto} from "../../../types/JournalEntryDto.ts";
import {type SubmitHandler} from "react-hook-form";
import {useJournalEntryCreate} from "../../../hooks/crud/useJournalEntryCreate.ts";
import type {JournalEntryOperation} from "../../../types/JournalEntryOperation.ts";
import FormGUI from "./FormGUI.tsx";
import {useJournalEntryForm} from "../../../hooks/useJournalEntryForm.ts";

type createFormProps = {
    operation: JournalEntryOperation;
}

export default function CreateForm(props: Readonly<createFormProps>) {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useJournalEntryForm();

    const onReset = () => {
        reset();
    };

    const {createJournalEntry} = useJournalEntryCreate();

    const onSubmit: SubmitHandler<JournalEntryRequestDto> = async (formData: JournalEntryRequestDto) => {
        const result = await createJournalEntry(formData);
        if (result.success) {
            alert("Data saved!");
            reset();
        } else {
            alert("Journal entry creation failed. Please check console.");
        }
    };

    return (
        <FormGUI operation={props.operation}
                 handleSubmit={handleSubmit}
                 onSubmit={onSubmit}
                 register={register}
                 errors={errors}
                 onReset={onReset}/>
    )
}