// Takes a reference to document.cookie and the name of the desired cookie
function getCookie(docCookies, cookieName) {
    var re = new RegExp(cookieName + "=([^;]+)");
    var value = re.exec(docCookies);
    return (value != null) ? decodeURI(value[1]) : null;
}

export {
    getCookie
};