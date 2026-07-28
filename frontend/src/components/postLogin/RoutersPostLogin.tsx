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
                   element={<StartPagePostLogin/>}></Route>
            <Route path={"/create"}
                   element={<CreateJournalEntry/>}></Route>
            <Route path={"/read"}
                   element={<ReadJournalEntries/>}></Route>
            <Route path={"/update"}
                   element={<ModifyEntries/>}></Route>
            <Route path={"/delete"}
                   element={<DeleteEntries/>}></Route>
            <Route path={"/logout"}
                   element={<Logout/>}></Route>
        </Routes>
    )
}