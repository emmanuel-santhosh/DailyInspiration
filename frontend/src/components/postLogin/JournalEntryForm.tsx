import {
    type JournalEntryRequestDto,
    type JournalEntryResponseDto,
    MAX_LENGTH_QUOTE,
    MAX_LENGTH_TOPIC
} from "../../types/JournalEntryDto.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import type {JournalEntryOperation} from "../../types/JournalEntryOperation.ts";
import {useEffect} from "react";
import {useJournalEntryCreate} from "../../hooks/crud/useJournalEntryCreate.ts";

type journalEntryForm = {
    operation: JournalEntryOperation,

    // In case existing journal entries are to be processed
    id?: number,
    journalEntry?: JournalEntryRequestDto,

    // Callback fn to parent modal
    onUpdateSuccess?: () => void,

    onJournalEntryUpdate?: (updatedJournalEntry: JournalEntryResponseDto) => void,
    onJournalEntryDelete?: (deletedJournalEntryId: number) => void
}

export default function JournalEntryForm(props: Readonly<journalEntryForm>) {

    const defaultQuote: string = props.journalEntry?.quote ?? "";

    const defaultTopic: string = props.journalEntry?.topic ?? "";

    const isReadOnly: boolean = props.operation === "Delete";

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        setValues
    } = useForm<JournalEntryRequestDto>({
        defaultValues: {
            quote: defaultQuote,
            topic: defaultTopic,
        },
    });

    const {createJournalEntry} = useJournalEntryCreate();

    useEffect(() => {
        reset(props.journalEntry);
    }, [props.journalEntry, reset]);

    const onSubmit:SubmitHandler<JournalEntryRequestDto> = async (formData: JournalEntryRequestDto) => {
        switch (props.operation) {
            case "Create": {
                    const result = await createJournalEntry(formData);
                    if(result.success){
                        alert("Data saved!");
                        reset();
                    }
                    else{
                        alert("Journal entry creation failed. Please check console.");
                    }
                break;
            }
        }
    };

    const onReset = () => {
        setValues({
            quote: defaultQuote,
            topic: defaultTopic
        });
    };

    return (
        <>
            {/*
            "handleSubmit" will validate your inputs before invoking "onSubmit"
            */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor={"quote"}>Quote</label>
                <br/>
                <input id={"quote"}
                       {...register(
                           "quote",
                           {
                               setValueAs: (value) =>
                                   value.trim() === ""
                                       ? undefined
                                       : value.trim(),
                               required: "This field is required",
                               maxLength: {
                                   value: MAX_LENGTH_QUOTE,
                                   message: "Max length is " + MAX_LENGTH_QUOTE
                               }
                           }
                       )
                       }
                       size={MAX_LENGTH_QUOTE * 0.2}
                       placeholder={"Pity ? It was pity that stayed Bilbo's hand."}
                       readOnly={isReadOnly}
                       disabled={isReadOnly}
                />
                <br/>
                <span>{errors.quote?.message}</span>
                <br/>
                <label htmlFor={"topic"}>Topic</label>
                <br/>
                <input id={"topic"}
                       {...register("topic",
                           {
                               setValueAs: (value) =>
                                   value.trim() === ""
                                       ? undefined
                                       : value.trim(),
                               required: "This field is required",
                               maxLength: {
                                   value: MAX_LENGTH_TOPIC,
                                   message: "Max length is " + MAX_LENGTH_TOPIC
                               }
                           })}
                       size={MAX_LENGTH_TOPIC * 0.4}
                       placeholder={"Pity"}
                       readOnly={isReadOnly}
                       disabled={isReadOnly}
                />
                <br/>
                <span>{errors.topic?.message}</span>
                <br/>
                <input className={"create__Journal__Entry"}
                       type={"submit"}
                       value={props.operation}></input>
                <br/>
                {!isReadOnly &&
                    <button type="button" onClick={onReset}>Reset</button>
                }
            </form>
        </>
    )
}