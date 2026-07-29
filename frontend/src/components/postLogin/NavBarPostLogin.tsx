import {Link} from "react-router-dom";

export default function NavBarPostLogin() {
    return(
        <nav className={"nav__Bar__Post__Login"}>
            <Link to={"/"}>Start</Link>
            <Link to={"/create"}>Create new journal entry</Link>
            <Link to={"/read"}>Read journal entries</Link>
            <Link to={"/update"}>Change journal entries</Link>
            <Link to={"/logout"}>Logout</Link>
        </nav>
    )
}