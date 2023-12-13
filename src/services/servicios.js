import axios from "axios";
import { objToArray } from "../helpers/helpers";

export const fetchDirecciones = async () => {
    try {
        const requestData = {
            service: "consulta",
            data: {
                Codigo: "AC",
                Agrupador: "IL",
            },
        };
        const response = await axios.post(
            "https://portal2-des.iplan.com.ar/login_unificado/main/Calls/Tenfold/giveSubscription.php",
            requestData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // const result = await response.text();

        return objToArray(JSON.parse(response));
    } catch (error) {
        console.error("Error:", error);
        return "error";
    }
};
export const fetchMesh = async () => {
    try {
        const requestData = {
            service: "consulta",
            data: {
                Codigo: "AC",
                Agrupador: "WM",
            },
        };

        const response = await axios.post(
            "https://portal2-des.iplan.com.ar/login_unificado/main/Calls/Tenfold/giveSubscription.php",
            requestData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // const result = await response.text();
        return objToArray(JSON.parse(response));
    } catch (error) {
        console.error("Error:", error);
        return "error";
    }
};