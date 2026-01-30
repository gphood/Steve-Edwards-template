function ERYC_CookieHide_setCookie(cname, cvalue, exdays, exmins) {
	var d = new Date();
	exdays = exdays * 24 * 60 * 60 * 1000;
	if (exmins > 0) {
		exdays = exmins * 1000 * 60;
	}
	d.setTime(d.getTime() + exdays);
	var expires = "expires="+d.toUTCString();
	if (exdays == 0) {
		expires = "";
	}
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function ERYC_CookieHide_getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
function ERYC_CookieHide_deleteCookie(cname) {
	document.cookie = cname + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}