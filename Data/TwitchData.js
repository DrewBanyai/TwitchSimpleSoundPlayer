//  The TwitchJS library requires that these three variables be named "token", "username", and channel"
//  You can generate a token here: https://twitchapps.com/tmi/
let token = "";
let username = "";
let channel = "";

//  This value will be grabbed by TwitchJS once it connects using the token, and does not need to be set here.
let myUsername = "";

let getOptionsInURL = () => {
    let queryString = window.location.search;
    if (!queryString || (queryString.length <= 1) || (queryString[0] !== "?")) { return {}; }
    queryString = queryString.substr(1, queryString.length - 1);

    const queryList = queryString.split("&");
    let queryLibrary = {};
    for (let i = 0; i < queryList.length; ++i) {
        let queryParts = queryList[i].split("=");
        if (!queryParts || queryParts.length !== 2) { return; }
        queryLibrary[queryParts[0]] = queryParts[1];
    }

    return queryLibrary;
}

let URL_OPTIONS = getOptionsInURL();

//  If new URL arguments are put in the URL, this will grab those and override the ones set in code (if any)
if (URL_OPTIONS && URL_OPTIONS.token) { token = "oauth:" + URL_OPTIONS.token; }
if (URL_OPTIONS && URL_OPTIONS.username) { username = URL_OPTIONS.username; }
if (URL_OPTIONS && URL_OPTIONS.channel) { channel = URL_OPTIONS.channel; }