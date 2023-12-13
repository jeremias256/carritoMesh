function resolverCalcu(m2, m3, m4, m5) {
    let cantidadMesh = '1';
    switch (m2) {
        case 1:
            cantidadMesh = '1'
            break;
        case 2:
            if (m5 == "en L") {
                cantidadMesh = 1;
            } else {
                cantidadMesh = '1';
            }
            break;
        case 3:
            cantidadMesh = 1;
            break;
        case 4:
            if (m3 == 100) {
                if (m4 == 3) {
                    cantidadMesh = 2;
                } else {
                    cantidadMesh = 1;
                }
            } else {
                switch (m4) {
                    case 1:
                        cantidadMesh = 1;
                        break;
                    case 2:
                        cantidadMesh = 2;
                        break;
                    case 3:
                        cantidadMesh = 3;
                        break;
                    case 4:
                        cantidadMesh = 3;
                        break;
                }
            }
            break;
        case 5:
            switch (m3) {
                case 100:
                    cantidadMesh = 1;
                    break;
                case 200:
                    if (m4 != 3) {
                        cantidadMesh = 2;
                    } else {
                        cantidadMesh = 3;
                    }
                    break;
                case 300:
                    cantidadMesh = 3;
                    break;
                case 400:
                    cantidadMesh = 4;
                    break;
                case 500:
                    cantidadMesh = 4;
                    break;
            }
            break;
        case 6:
            switch (m3) {
                case 100:
                    cantidadMesh = 3;
                    break;
                case 200:
                    cantidadMesh = 3;
                    break;
                case 300:
                    if (m4 != 3) {
                        cantidadMesh = 3;
                    } else {
                        if (m5 != "en L") {
                            cantidadMesh = 3;
                        } else {
                            cantidadMesh = 4;
                        }
                    }
                    break;
                case 400:
                    if (m4 == 1) {
                        cantidadMesh = 4;
                    } else if (m4 != 1) {
                        if (m5 != "en L") {
                            cantidadMesh = "4";
                        } else {
                            cantidadMesh = 4;
                        }
                    }
                    break;
                // esto lo inventé yo
                case 500:
                    if (m4 == 1) {
                        cantidadMesh = 4;
                    } else {
                        cantidadMesh = "4";
                    }
                    break;
            }
            break;
        default:
            cantidadMesh = "4";
            break;
    }

    return (cantidadMesh);
}
function formatearNum(numero) {
    return '$' + numero.toLocaleString('es-US', { maximumFractionDigits: 0 }).replace(/,/g, '.');
}
function objToArray(objeto) {
    if (typeof objeto === 'object' && objeto !== null) {
        return [objeto];
    } else {
        return objeto;
    }
}
function validarInputContrasena(thePass) {
    let re1 = /[A-Z]/;
    let re2 = /[0-9]/;
    let re3 = /[#?!@$%^&*-.=:;,]/;
    let myMsgret = '';
    let qpasverb = [];

    if (thePass.search(re1) == -1) {
        qpasverb.push("1 mayúscula");
    }

    if (thePass.length < 8) {
        qpasverb.push("8 caracteres");
    }

    if (thePass.search(re2) == -1) {
        qpasverb.push("1 número");
    }

    if (thePass.search(re3) == -1) {
        qpasverb.push("1 símbolo (#?!@$%^&*-.=:;,)");
    }

    let qpaschek = qpasverb.length;

    if (qpaschek == 0) {
        return ("¡Cumple los requisitos!");
    } else {
        myMsgret = "Debe contener al menos ";

        if (qpaschek == 1) {
            myMsgret += qpasverb[0] + ".";
        }
        else {
            for (let i = 0; i < qpaschek; i++) {
                if (i < (qpaschek - 2)) {
                    myMsgret += qpasverb[i] + ", ";
                }
                else if (i < (qpaschek - 1)) {
                    myMsgret += qpasverb[i];
                }
                else {
                    myMsgret += " y " + qpasverb[i] + ".";
                }
            }
        }
    }

    return myMsgret;
}
export { resolverCalcu, formatearNum, objToArray, validarInputContrasena };