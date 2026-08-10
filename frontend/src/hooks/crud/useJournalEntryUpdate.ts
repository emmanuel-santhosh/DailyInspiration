import useJournalEntrySubmit from "../useJournalEntrySubmit.ts";
import {
    BASE_BACKEND_URI,
    type JournalEntryRequestDto,
    type JournalEntryResponseDto
} from "../../types/JournalEntryDto.ts";
import axios from "axios";
import type {JournalEntryCreateResult} from "../../types/backend/BackendToAxios.ts";

export const useJournalEntryUpdate = () => {
    const {isAxiosOperationTakingPlace, setIsAxiosOperationTakingPlace} = useJournalEntrySubmit();

    const updateJournalEntry = async (
        data: JournalEntryRequestDto,
        id: number): Promise<JournalEntryCreateResult> => {

        setIsAxiosOperationTakingPlace(true);

        try {
            const response = await axios.put<JournalEntryResponseDto>(BASE_BACKEND_URI + "/" + id, data);
            console.log("Updated successfully:", response.data);
            return {
                data: response.data,
                success: true
            };
        } catch (error) {
            console.error("Failed to update:", error);
            return {
                success: false,
            }
        } finally {
            setIsAxiosOperationTakingPlace(false);
        }
    };
    return {updateJournalEntry, isAxiosOperationTakingPlace};
};