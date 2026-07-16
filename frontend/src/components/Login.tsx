import {useEffect} from "react";
import oAuth2Github, {loadUser} from "../services/oAuth2Github.ts";

type userProps = {
    setUser: (user: string | undefined | null) => void;
}

export default function Login(props: Readonly<userProps>) {

    useEffect(() => {
        loadUser(props);
    }, []);

    return (
        <>
            <header>
                <h1>Welcome !</h1>
            </header>
            <div className="pageContainerPreLogin">
                <button className={"firstChild"}
                        onClick={oAuth2Github}>Authenticate via GitHub
                </button>
                <button>Create account</button>
                <button>Login with username and password</button>
                <button>Continue as Guest</button>
            </div>
        </>

    )
}