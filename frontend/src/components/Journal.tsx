type userProps = {
    user:string | undefined | null;
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
                <button>Logout</button>
            </div>
        </>
    )
}