import OAuth2Github from "./OAuth2Github.tsx";

type userProps = {
    setUser:(user: string | undefined | null) => void;
}

export default function Login(props: Readonly<userProps>) {
    return(
            <div className="pageContainerPreLogin">
                <OAuth2Github setUser={props.setUser}></OAuth2Github>
                <button>Create account</button>
                <button>Login with username and password</button>
                <button>Continue as Guest</button>
            </div>
    )
}