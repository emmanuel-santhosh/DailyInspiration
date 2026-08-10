import {type JournalEntryRequestDto, MAX_LENGTH_QUOTE, MAX_LENGTH_TOPIC} from "../../../types/JournalEntryDto.ts";
import type {FieldErrors, UseFormHandleSubmit, UseFormRegister} from "react-hook-form";
import type {JournalEntryOperation} from "../../../types/JournalEntryOperation.ts";

type formGuiProps = {
    operation: JournalEntryOperation;
    handleSubmit: UseFormHandleSubmit<JournalEntryRequestDto, JournalEntryRequestDto>
    onSubmit: (formData: JournalEntryRequestDto) => void;
    register: UseFormRegister<JournalEntryRequestDto>;
    errors: FieldErrors<JournalEntryRequestDto>;
    onReset?: () => void;

}

export default function FormGUI(props: Readonly<formGuiProps>) {

    const isReadOnly: boolean = props.operation === "Delete";

    return (
        <form onSubmit={props.handleSubmit(props.onSubmit)}>
            <label htmlFor={"quote"}>Quote</label>
            <br/>
            <input id={"quote"}
                   {...props.register(
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
            <span>{props.errors.quote?.message}</span>
            <br/>
            <label htmlFor={"topic"}>Topic</label>
            <br/>
            <input id={"topic"}
                   {...props.register("topic",
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
            <span>{props.errors.topic?.message}</span>
            <br/>
            <input className={"create__Journal__Entry"}
                   type={"submit"}
                   value={props.operation}></input>
            <br/>
            {!isReadOnly &&
                <button type="button" onClick={props.onReset}>Reset</button>
            }
        </form>
    )
}