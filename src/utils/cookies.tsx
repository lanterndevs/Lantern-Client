// Takes a reference to document.cookie and the name of the desired cookie
function getCookie(name) {
  var re = new RegExp(name + '=([^;]+)');
  var value = re.exec(document.cookie);
  return value != null ? decodeURI(value[1]) : null;
}

export { getCookie };
