import {type JournalEntryRequestDto, MAX_LENGTH_QUOTE, MAX_LENGTH_TOPIC} from "../../../types/JournalEntryDto.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import {useJournalEntryCreate} from "../../../hooks/crud/useJournalEntryCreate.ts";
import type {JournalEntryOperation} from "../../../types/JournalEntryOperation.ts";

type createFormProps = {
    operation:JournalEntryOperation;
}

export default function CreateForm(props:Readonly<createFormProps>) {

    const defaultQuote: string = "";

    const defaultTopic: string = "";

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        setValues
    } = useForm<JournalEntryRequestDto>({
        defaultValues: {
            quote: defaultQuote,
            topic: defaultTopic
        }
    });

    const onReset = () => {
        setValues({
            quote: defaultQuote,
            topic: defaultTopic
        });
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
            />
            <br/>
            <span>{errors.topic?.message}</span>
            <br/>
            <input className={"create__Journal__Entry"}
                   type={"submit"}
                   value={props.operation}></input>
            <br/>
            <button type="button" onClick={onReset}>Reset</button>
        </form>
    )
}