export function updateLog(Estado, Observaciones) {
    if (Observaciones === undefined || Observaciones === null) {
        Observaciones = "";
    }

    return fetch('/cobertura/update_logMesh.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'Estado=' + encodeURIComponent(Estado) + '&Observaciones=' + encodeURIComponent(Observaciones),
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                return Promise.reject("ERROR1");
            }
        })
        .catch(error => {
            return Promise.reject("ERROR2");
        });
}