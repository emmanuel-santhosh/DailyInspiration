import useJournalEntrySubmit from "../useJournalEntrySubmit.ts";
import {
    BASE_BACKEND_URI,
    type JournalEntryRequestDto,
    type JournalEntryResponseDto,
} from "../../types/JournalEntryDto.ts";
import axios, {AxiosError} from "axios";
import type {ApiErrorResponse, JournalEntryCreateResult} from "../../types/AxiosToBackend.ts";

export const useJournalEntryCreate = () => {
    const {isAxiosOperationTakingPlace, setIsAxiosOperationTakingPlace} = useJournalEntrySubmit();

    const createJournalEntry = async (
        data: JournalEntryRequestDto
    ):Promise<JournalEntryCreateResult> => {
        setIsAxiosOperationTakingPlace(true);
        try {
            // await PAUSES here, waiting for server response
            // Meanwhile, the UI stays responsive
            const response = await axios.post<JournalEntryResponseDto>(BASE_BACKEND_URI, data);

            // Once server responds, this line runs
            console.log("Saved successfully:", response.data);
            return {data:response.data, success:true};
        } catch (error) {
            const axiosError = error as AxiosError<ApiErrorResponse>;

            // Extract meaningful error message from backend
            const errorMessage =
                axiosError.response?.data?.message ||
                axiosError.message ||
                "An unknown error occurred";
            // If network error or server error occurs
            console.error("Failed to save:", error);
            return {success:false, error:errorMessage};
        } finally {
            setIsAxiosOperationTakingPlace(false);
        }
    };

    return {createJournalEntry, isAxiosOperationTakingPlace};
};