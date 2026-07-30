import {BASE_BACKEND_URI, type JournalEntryRequestDto} from "../types/JournalEntryDto.ts";
import axios from "axios";
import type {SubmitHandler, UseFormReset} from "react-hook-form";
import type {JournalEntryOperation} from "../types/JournalEntryOperation.ts";

type onSubmitProps = {
    reset: UseFormReset<JournalEntryRequestDto>;
    id?: number;
    operation: JournalEntryOperation;
}

export function formSubmit(props: Readonly<onSubmitProps>): SubmitHandler<JournalEntryRequestDto> {
    const {reset} = props;
    return async (data: JournalEntryRequestDto) => {
        switch (props.operation) {
            case "Create":
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
                    alert("Failed to save data. Check console.");
                }
                break;
            case "Read":
                break;
            case "Update":
                break;
        }
    };

}

