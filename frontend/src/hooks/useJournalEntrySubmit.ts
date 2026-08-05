import {useState} from "react";

export default function useJournalEntrySubmit() {
    const [isAxiosOperationTakingPlace, setIsAxiosOperationTakingPlace] = useState(false);

    return {
        isAxiosOperationTakingPlace,
        setIsAxiosOperationTakingPlace
    };
}