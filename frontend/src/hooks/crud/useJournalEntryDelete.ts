import useJournalEntrySubmit from "../useJournalEntrySubmit.ts";
import axios from "axios";
import {BASE_BACKEND_URI} from "../../types/JournalEntryDto.ts";
import type {JournalEntryDeleteResult} from "../../types/backend/BackendToAxios.ts";

export const useJournalEntryDelete = () => {
    const {
        isAxiosOperationTakingPlace,
        setIsAxiosOperationTakingPlace
    } = useJournalEntrySubmit();

    const deleteJournalEntry = async (
        id: number): Promise<JournalEntryDeleteResult> => {
        setIsAxiosOperationTakingPlace(false);
        try {
            const response = await axios.delete(BASE_BACKEND_URI + "/" + id);
            console.log("Deleted successfully:", response.data);
            return {
                success: true,
                successMessage: response.data
            }
        } catch (error) {
            console.error("Failed to delete:", error);
            return {
                success:false
            };
        } finally {
            setIsAxiosOperationTakingPlace(false);
        }
    };
    return {deleteJournalEntry, isAxiosOperationTakingPlace};
};