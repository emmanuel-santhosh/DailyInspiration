import JournalEntryForm from "../JournalEntryForm.tsx";

export default function CreateJournalEntry() {

    return (
        <>
            <header>
                <h2>
                    Jot down your thoughts
                </h2>
            </header>
            <JournalEntryForm operation={"Create"}/>
        </>
    )
}