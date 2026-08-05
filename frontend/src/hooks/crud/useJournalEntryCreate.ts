import useJournalEntrySubmit from "../useJournalEntrySubmit.ts";
import {BASE_BACKEND_URI, type JournalEntryRequestDto,} from "../../types/JournalEntryDto.ts";
import type {UseFormReset} from "react-hook-form";
import axios from "axios";

export const useJournalEntryCreate = () => {
    const {isAxiosOperationTakingPlace, setIsAxiosOperationTakingPlace} = useJournalEntrySubmit();

    const createJournalEntry = async (
        data: JournalEntryRequestDto,
        reset: UseFormReset<JournalEntryRequestDto>
    ) => {
        setIsAxiosOperationTakingPlace(true);
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
        } finally {
            setIsAxiosOperationTakingPlace(false);
        }
    };

    return {create: createJournalEntry, isAxiosOperationTakingPlace};
};