export const updateLog = async (estado = '', observaciones = '') => {
    const url = "/cobertura/update_logMesh.php";
    const data = { Estado: estado, Observaciones: observaciones };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.text();
        if (responseData.indexOf("OK") !== -1) {
            return "OK";
        } else {
            return "ERROR1";
        }
    } catch (error) {
        console.error("Error:", error);
        return "ERROR2";
    }
}