import {Route, Routes} from "react-router-dom";
import OAuth2LoginGh from "./OAuth2LoginGh.tsx";
import HomePagePreLogin from "./HomePagePreLogin.tsx";

export default function RoutersPreLogin() {
    return (
        <>
            <Routes>
                <Route path={"/"}
                       element={<HomePagePreLogin/>}></Route>
                <Route path="/oauth2GitHub"
                       element={<OAuth2LoginGh/>}></Route>
            </Routes>
        </>
    )
}