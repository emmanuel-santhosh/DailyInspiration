import useJournalEntrySubmit from "../useJournalEntrySubmit.ts";
import axios from "axios";
import {BASE_BACKEND_URI} from "../../types/JournalEntryDto.ts";

export const useJournalEntryDelete = () => {
    const {
        isAxiosOperationTakingPlace,
        setIsAxiosOperationTakingPlace
    } = useJournalEntrySubmit();

    const deleteJournalEntry = async (
        id: number,
        onUpdateSuccess: () => void,
        onJournalEntryDelete: (deletedJournalEntryId: number) => void) => {
        setIsAxiosOperationTakingPlace(false);
        try {
            const response = await axios.delete(BASE_BACKEND_URI + "/" + id);
            console.log("Deleted successfully:", response.data);
            alert("Data deleted!");
            onUpdateSuccess();
            onJournalEntryDelete(id);
        } catch (error) {
            console.error("Failed to delete:", error);
            alert("Failed to delete data. Check console.");
        } finally {
            setIsAxiosOperationTakingPlace(false);
        }
    };
    return {deleteJournalEntry, isAxiosOperationTakingPlace};
};