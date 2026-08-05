import {useState} from "react";

export default function useJournalEntrySubmit() {
    const [loading, setLoading] = useState(false);

    return {
        loading, setLoading
    };
}