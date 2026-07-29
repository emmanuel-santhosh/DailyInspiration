import {type SubmitHandler, useForm} from "react-hook-form"
import {
    BASE_BACKEND_URI,
    type JournalEntryRequestDto,
    MAX_LENGTH_QUOTE,
    MAX_LENGTH_TOPIC
} from "../../types/JournalEntryDto.ts";
import axios from "axios";

export default function CreateJournalEntry() {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<JournalEntryRequestDto>();

    const onSubmit: SubmitHandler<JournalEntryRequestDto> =
        async (data: JournalEntryRequestDto) => {
            try {
                // await PAUSES here, waiting for server response
                // Meanwhile, the UI stays responsive
                const response = await axios.post(BASE_BACKEND_URI, data);

                // Once server responds, this line runs
                console.log("Saved successfully:", response.data);
                alert("Data saved!");
                reset();

            } catch (error) {
                // If network error or server error occurs
                console.error("Failed to save:", error);
                alert("Failed to save data");
            }
        };

    return (
        <>
            <header>
                <h2>
                    Jot down your thoughts
                </h2>
            </header>
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
                       value={"Create"}></input>
            </form>
        </>
    )
}