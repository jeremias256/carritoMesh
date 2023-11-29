function readCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }
    return null;
}
function delete_cookie(name) {
    document.cookie = name + "=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
function setExpireCookie(name, value, expire) {
    var expires = "";
    if (expire) {
        let date = new Date();
        date.setTime(date.getTime() + expire);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
//setExpireCookie("CupoAgendado", fecha_agendamiento.id, 24 * 60 * 60000);//nombre, valor, exp, 

export { readCookie, delete_cookie, setExpireCookie };