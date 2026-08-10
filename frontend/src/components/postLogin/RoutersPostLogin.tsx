import {Route, Routes} from "react-router-dom";
import StartPagePostLogin from "./StartPagePostLogin.tsx";
import CreateJournalEntry from "./crud/CreateJournalEntry.tsx";
import ReadJournalEntries from "./crud/ReadJournalEntries.tsx";
import Logout from "./Logout.tsx";
import ChangeJournalEntries from "./crud/ChangeJournalEntries.tsx";
import DeleteJournalEntries from "./crud/DeleteJournalEntries.tsx";

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
                   element={<ChangeJournalEntries/>}/>
            <Route path={"/delete"}
                   element={<DeleteJournalEntries/>}/>
            <Route path={"/logout"}
                   element={<Logout/>}/>
        </Routes>
    )
}