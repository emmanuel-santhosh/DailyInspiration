import {Route, Routes} from "react-router-dom";
import StartPagePostLogin from "./StartPagePostLogin.tsx";
import CreateJournalEntry from "./CreateJournalEntry.tsx";
import ReadJournalEntries from "./ReadJournalEntries.tsx";
import ModifyEntries from "./ModifyEntries.tsx";
import DeleteEntries from "./DeleteEntries.tsx";
import Logout from "./Logout.tsx";

export default function RoutersPostLogin() {
    return (
        <Routes>
            <Route path={"/"}
                   element={<StartPagePostLogin/>}/>
            <Route path={"/create"}
                   element={<CreateJournalEntry/>}/>
            <Route path={"/read"}
                   element={<ReadJournalEntries/>}/>
            <Route path={"/update"}
                   element={<ModifyEntries/>}/>
            <Route path={"/delete"}
                   element={<DeleteEntries/>}/>
            <Route path={"/logout"}
                   element={<Logout/>}/>
        </Routes>
    )
}