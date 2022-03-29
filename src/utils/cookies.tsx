// Takes a reference to document.cookie and the name of the desired cookie
<<<<<<< HEAD
function getCookie(name) {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? decodeURI(value[1]) : null;
=======
function getCookie(docCookies, cookieName) {
  var re = new RegExp(cookieName + '=([^;]+)');
  var value = re.exec(docCookies);
  return value != null ? decodeURI(value[1]) : null;
>>>>>>> 227b0347e5296bf117eab61de5dd63141335060f
}

export { getCookie };
