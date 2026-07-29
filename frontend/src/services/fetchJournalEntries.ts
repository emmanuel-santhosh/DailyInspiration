import axios from "axios";
import {BASE_BACKEND_URI, type JournalEntryResponseDto} from "../types/JournalEntryDto.ts";

type fetchJournalEntriesProps = {
    setJournalEntries: (JournalEntries: JournalEntryResponseDto[]) => void,
    setLoading: (loading: boolean) => void
}
        /*
        * async is wrapped in a function because it is an expression.
        * useEffect expects either assignment or function call.
        * */
export const fetchJournalEntries =
    async (props: Readonly<fetchJournalEntriesProps>) => {
        try {
            const response = await axios.get(BASE_BACKEND_URI);
            props.setJournalEntries(response.data);
        } catch (error) {
            console.log(error);
            alert("Failed to receive data. \nPlease check console.");
        } finally {
            props.setLoading(false);
        }
    };