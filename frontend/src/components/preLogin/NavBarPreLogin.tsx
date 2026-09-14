import {Link} from "react-router-dom";

export default function NavBarPreLogin() {
    return (
        /*
        * Wrapper tags removed since only one child element is returned
        * */
        <nav
            className={"flex-no-wrap relative flex w-full items-center justify-between py-2 lg:flex-wrap lg:justify-start lg:py-4" +
                "bg-gray-800 text-amber-50"}>
            <div
            className={"flex w-full items-center justify-evenly px-3"}>
                <Link to={"/"}>Home</Link>
                <Link to={"/oauth2GitHub"}>Authenticate via GitHub</Link>
            </div>
        </nav>
    )
}