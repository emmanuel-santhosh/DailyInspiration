import {backendUrl, frontendUri, oauthGithubUri} from "../types/Redirection.ts";

export function oAuth2Github_login() {
    const host =
        window.location.host === frontendUri
            ? backendUrl
            : window.location.origin;
    window.open(host + oauthGithubUri, "_self");
}

export function oAuth2Github_logout() {
    const host =
        window.location.host === frontendUri
            ? backendUrl
            : window.location.origin;
    window.open(host + "/logout", "_self");

}