import {useForm} from "react-hook-form";
import type {JournalEntryRequestDto} from "../types/JournalEntryDto.ts";

export function useJournalEntryForm(journalEntry?: JournalEntryRequestDto) {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        setValues
    } = useForm<JournalEntryRequestDto>({
        defaultValues: {
            quote: journalEntry?.quote ?? "",
            topic: journalEntry?.topic ?? ""
        }
    });

    return {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        setValues
    };
}


