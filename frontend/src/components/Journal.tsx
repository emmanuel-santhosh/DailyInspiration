type userProps = {
    user:string | undefined | null;
}

export default function Journal(props: Readonly<userProps>) {
    return(
        <>
            <header>
                <h2>Welcome, {props.user} !</h2>
            </header>
            <div className="pageContainerPostLogin">
                <button>Make new entry</button>
                <button>Retrieve existing entries</button>
                <button>Make changes to existing entry</button>
                <button>Delete entries</button>
            </div>
        </>
    )
}