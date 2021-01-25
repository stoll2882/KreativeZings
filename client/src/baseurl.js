export default function baseUrl() {
    var url = window.location.protocol + "//" + window.location.hostname;
    if (window.location.port != null && window.location.port != undefined && 
        window.location.port != 0 && window.location.port != "") {
        url = url + ":" + window.location.port
    }
    url = url + "/"
    return url;
}