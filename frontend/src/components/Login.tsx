import {oAuth2Github_login} from "../services/oAuth2Github.ts";

export default function Login() {

    return (
        <>
            <header>
                <h1>Welcome !</h1>
            </header>
            <div className="pageContainerPreLogin">
                <button className={"firstChild"}
                        onClick={oAuth2Github_login}>Authenticate via GitHub
                </button>
                <button>Create account</button>
                <button>Login with username and password</button>
                <button>Continue as Guest</button>
            </div>
        </>

    )
}