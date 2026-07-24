import {Route, Routes} from "react-router-dom";
import StartPagePostLogin from "./StartPagePostLogin.tsx";
import CreateJournalEntry from "./CreateJournalEntry.tsx";
import ReadJournalEntries from "./ReadJournalEntries.tsx";
import ModifyEntries from "./ModifyEntries.tsx";
import DeleteEntries from "./DeleteEntries.tsx";
import Logout from "./Logout.tsx";

export default function RoutersPostLogin() {
    return(
        <>
            <Routes>
                <Route path={"/"}
                element={<StartPagePostLogin/>}>Start</Route>
                <Route path={"/create"}
                       element={<CreateJournalEntry/>}>Create new journal entry</Route>
                <Route path={"/read"}
                       element={<ReadJournalEntries/>}>Read journal entries</Route>
                <Route path={"/update"}
                       element={<ModifyEntries/>}>Modify entries</Route>
                <Route path={"/delete"}
                       element={<DeleteEntries/>}>Delete entries</Route>
                <Route path={"/logout"}
                       element={<Logout/>}>Logout</Route>
            </Routes>
        </>
    )
}