export function resolverCalcu(m2, m3, m4, m5) {
    let cantidadMesh = 'No requiere';
    switch (m2) {
        case 1:
            cantidadMesh = 'No requiere'
            break;
        case 2:
            if (m5 == "en L") {
                cantidadMesh = 1;
            } else {
                cantidadMesh = 'No requiere';
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
                // esto lo inventé yo
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
                            cantidadMesh = "analizar";
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
                        cantidadMesh = "analizar";
                    }
                    break;
            }
            break;
        default:
            cantidadMesh = "analizar";
            break;
    }

    return (cantidadMesh);
}