import CreateForm from "../forms/CreateForm.tsx";

export default function CreateJournalEntry() {

    return (
        <>
            <header>
                <h2>
                    Jot down your thoughts
                </h2>
            </header>
            <CreateForm operation={"Create"}/>
        </>
    )
}