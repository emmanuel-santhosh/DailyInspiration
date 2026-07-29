import {Link} from "react-router-dom";

export default function NavBarPreLogin() {
    return (
        /*
        * Wrapper tags removed since only one child element is returned
        * */
        <nav className={"nav__Bar__Pre__Login"}>
            <Link to={"/"}>Home</Link>
            <Link to={"/oauth2GitHub"}>Authenticate via GitHub</Link>
        </nav>
    )
}