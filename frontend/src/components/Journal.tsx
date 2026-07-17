import {oAuth2Github_logout} from "../services/oAuth2Github.ts";
import type {userType} from "../types/User.ts";

type userProps = {
    user: userType
}

export default function Journal(props: Readonly<userProps>) {
    return(
        <>
            <header>
                <h1>Welcome, {props.user} !</h1>
            </header>
            <div className="pageContainerPostLogin">
                <button className={"firstChild"}>Make new entry</button>
                <button>Retrieve existing entries</button>
                <button>Make changes to existing entry</button>
                <button>Delete entries</button>
                <button onClick={oAuth2Github_logout}>Logout</button>
            </div>
        </>
    )
}