import useJournalEntrySubmit from "../useJournalEntrySubmit.ts";
import {
    BASE_BACKEND_URI,
    type JournalEntryRequestDto,
    type JournalEntryResponseDto
} from "../../types/JournalEntryDto.ts";
import axios from "axios";

export const useJournalEntryUpdate = () => {
    const {isAxiosOperationTakingPlace, setIsAxiosOperationTakingPlace} = useJournalEntrySubmit();

    const updateJournalEntry = async (
        data: JournalEntryRequestDto,
        id: number,
        onUpdateSuccess: () => void,
        onJournalEntryUpdate: (updatedJournalEntry: JournalEntryResponseDto) => void) => {

        setIsAxiosOperationTakingPlace(true);

        try {
            const response = await axios.put(BASE_BACKEND_URI + "/" + id, data);
            console.log("Updated successfully:", response.data);
            alert("Data updated!");
            // Propagate success to modal
            onUpdateSuccess();
            // Transfer response DTO to update component
            onJournalEntryUpdate(response.data);
        } catch (error) {
            console.error("Failed to update:", error);
            alert("Failed to update data. Check console.");
        } finally {
            setIsAxiosOperationTakingPlace(false);
        }
    };
    return {update: updateJournalEntry, isAxiosOperationTakingPlace};
};