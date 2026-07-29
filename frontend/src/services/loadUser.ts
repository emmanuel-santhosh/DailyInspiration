import {oauthGithubMeEndpoint} from "../types/Redirection.ts";
import axios from "axios";
import type {userType} from "../types/User.ts";

type userProps = {
    setUser: (user: userType) => void,
}

export const loadUser = (props: Readonly<userProps>) => {
    axios.get(oauthGithubMeEndpoint)
        .then(response => {
                props.setUser(response.data);
            }
        )
        .catch(() => props.setUser(undefined));
}