import {useForm, type SubmitHandler} from "react-hook-form"
import {type JournalEntryDto, MAX_LENGTH_QUOTE, MAX_LENGTH_TOPIC} from "../../types/JournalEntryDto.ts";

export default function CreateJournalEntry() {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<JournalEntryDto>({
        defaultValues: {
            quote: "Pity ? It was pity that stayed Bilbo's hand.",
            topic: "Gandalf, pity, mercy"
        }
    });

    const onSubmit: SubmitHandler<JournalEntryDto> =
        (UserEntry) => console.log(UserEntry);

    return (
        <>
            <header>
                <h2>
                    Jot down your thoughts
                </h2>
            </header>
            // "handleSubmit" will validate your inputs before invoking "onSubmit"
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor={"quote"}>Quote:</label>
                <br/>
                <input id={"quote"}
                       {...register(
                           "quote",
                           {
                               required: "This field is required",
                               maxLength: {
                                   value:MAX_LENGTH_QUOTE,
                                   message: "Max length is " + MAX_LENGTH_QUOTE
                               }
                           }
                       )
                       }
                       size={MAX_LENGTH_QUOTE*0.2}
                />
                <br/>
                <span>{errors.quote?.message}</span>
                <br/>
                <label htmlFor={"topic"}>Topic:</label>
                <br/>
                <input id={"topic"}
                       {...register("topic",
                           {
                               required: "This field is required",
                               maxLength: {
                                   value:MAX_LENGTH_TOPIC,
                                   message: "Max length is " + MAX_LENGTH_TOPIC
                               }
                           })}
                       size={MAX_LENGTH_TOPIC*0.4}
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