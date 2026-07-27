export default function CreateJournalEntry() {
    return (
        <>
            <header>
                <h2>
                    Jot down your thoughts
                </h2>
            </header>
            <form>
                <label htmlFor={"quote"}>Quote:</label>
                <input id={"quote"}
                       name={"quote"}
                       type={"text"}
                       required={true}
                       maxLength={500}
                       size={50}
                />
                <br/>
                <label htmlFor={"topic"}>Topic:</label>
                <input id={"topic"}
                       name={"topic"}
                       type={"text"}
                       required={true}
                       maxLength={50}
                       size={20}
                />
                <br/>
                <input className={"create__Journal__Entry"}
                       type={"submit"}
                value={"Create"}></input>
            </form>
        </>
    )
}