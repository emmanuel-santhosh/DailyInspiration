import useJournalEntrySubmit from "../useJournalEntrySubmit.ts";
import {
    BASE_BACKEND_URI,
    type JournalEntryRequestDto,
    type JournalEntryResponseDto,
} from "../../types/JournalEntryDto.ts";
import axios from "axios";
import type {JournalEntryCreateResult} from "../../types/backend/BackendToAxios.ts";

export const useJournalEntryCreate = () => {
    const {isAxiosOperationTakingPlace, setIsAxiosOperationTakingPlace} = useJournalEntrySubmit();

    const createJournalEntry = async (
        data: JournalEntryRequestDto
    ): Promise<JournalEntryCreateResult> => {
        setIsAxiosOperationTakingPlace(true);
        try {
            // await PAUSES here, waiting for server response
            // Meanwhile, the UI stays responsive
            const response = await axios.post<JournalEntryResponseDto>(BASE_BACKEND_URI, data);

            // Once server responds, this line runs
            console.log("Saved successfully:", response.data);
            return {
                data: response.data,
                success: true
            };
        } catch (error) {
            // If network error or server error occurs
            console.error("Failed to save:", error);
            return {
                success: false
            };
        } finally {
            setIsAxiosOperationTakingPlace(false);
        }
    };

    return {createJournalEntry, isAxiosOperationTakingPlace};
};