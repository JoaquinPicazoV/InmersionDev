// ACCESO A LOS COMPONENTES DEL HTML
const elemento = document.getElementById("txt");
const botones = document.getElementById("buttons");
const texto = document.getElementById("long");
const opciones = document.getElementById("options");
const botongen = document.getElementById("gen");
const titulo = document.getElementById("title");
const zen = document.getElementById("zenitsu");
const input = document.getElementById('input');
const botoncopiar = document.getElementById("copy");
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const mensaje = document.getElementById("evaluacion");

// CARÁCTERES PARA LA GENERACIÓN DE CONTRASEÑA
const mayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const mayustam = mayus.length;
const minus = "abcdefghijklmnopqrstuvwxyz";
const minustam = minus.length;
const num = "0123456789";
const numtam = num.length;
const sim = "!@#$%&*()^";
const simtam = sim.length;

// VARIABLES A UTILIZAR A FUTURO PARA LA GENERACIÓN DE CONTRASEÑA Y OTRAS COSAS MÁS
const configurados = [];
let palabra = "";
let largo = 0;
let tieneMayus;
let tieneMinus;
let tieneNum;
let tieneSim;

// FUNCIÓN PARA GENERAR LA CONTRASEÑA
function GeneratePassword() {
    titulo.innerText = "Contraseña Generada";
    box1.style.display = "none";
    box2.style.display = "grid";
    largo = input.value;

    tieneMayus = document.getElementById("mayus").checked;
    tieneMinus = document.getElementById("minus").checked;
    tieneNum = document.getElementById("num").checked;
    tieneSim = document.getElementById("sim").checked;

    if (tieneMayus == true) {
        configurados.push(mayus);
    }
    if (tieneMinus == true) {
        configurados.push(minus);
    }
    if (tieneNum == true) {
        configurados.push(num);
    }
    if (tieneSim) {
        configurados.push(sim);
    }

    let tam = configurados.length;

    for (let i = 0; i < largo; i++) {
        let tipo = configurados[Math.floor(Math.random() * tam)];
        let caracter = tipo[Math.floor(Math.random() * tipo.length)];
        palabra += caracter;
    }

    elemento.innerText = palabra;
}

// FUNCIÓN PARA VALIDAR DATOS Y EVITAR ERRORES ANTES DE GENERAR UNA CONTRASEÑA
function validarInputs() {
    let aprobados = 0;
    largo = input.value.trim();
    const num = Number(largo);

    tieneMayus = document.getElementById("mayus").checked;
    tieneMinus = document.getElementById("minus").checked;
    tieneNum = document.getElementById("num").checked;
    tieneSim = document.getElementById("sim").checked;

    if (tieneMayus == true) {
        aprobados++;
    }
    if (tieneMinus == true) {
        aprobados++;
    }
    if (tieneNum == true) {
        aprobados++;
    }
    if (tieneSim == true) {
        aprobados++;
    }

    if (largo != " " && Number.isInteger(num) == true && aprobados >= 1 && num >= 6 && num <= 20) {
        GeneratePassword();
    }

    if (largo == " " || Number.isInteger(num) == false || num < 6 || num > 20 || aprobados < 1) {
        alert("Recuerde que:\n1) Debe ingresar obligatoriamente un largo para su contraseña entre 6 a 20 carácteres (NÚMERO ENTERO)\n2) Debe marcar al menos 1 de las opciones de los checkbox");
    }
}

// FUNCIÓN PARA COPIAR LA CONTRASEÑA GENERADA
function copy() {
    const pswrd = elemento.innerText;
    const aux = document.createElement("input");
    aux.style.position = "absolute";
    aux.style.opacity = "0";
    aux.value = pswrd;
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
}

// FUNCIÓN PARA "LIMPIAR" LA WEB Y PODER CREAR OTRA CONTRASEÑA
function limpiar() {
    titulo.innerText = "Generador de Contraseñas";
    box1.style.display = "grid";
    box2.style.display = "none";

    let tieneMayus2 = document.getElementById("mayus");
    let tieneMinus2 = document.getElementById("minus");
    let tieneNum2 = document.getElementById("num");
    let tieneSim2 = document.getElementById("sim");

    tieneMayus2.checked = false;
    tieneMinus2.checked = false;
    tieneNum2.checked = false;
    tieneSim2.checked = false;

    input.value = "";
    largo = 0;
    palabra = "";
    configurados.length = 0;
    mensaje.innerText = "";
}

// FUNCIÓN PARA VER QUE TAN SEGURA SERÁ LA CONTRASEÑA
function evaluar() {
    let mensaje = document.getElementById("evaluacion");
    let msj = " ";
    let ticks = 0;
    let tamActual = input.value.trim();
    let num = Number(tamActual);
    let color;

    let tieneMayus3 = document.getElementById("mayus").checked;
    let tieneMinus3 = document.getElementById("minus").checked;
    let tieneNum3 = document.getElementById("num").checked;
    let tieneSim3 = document.getElementById("sim").checked;

    if (tieneMayus3 == true) {
        ticks++;
    }
    if (tieneMinus3 == true) {
        ticks++;
    }
    if (tieneNum3 == true) {
        ticks++;
    }
    if (tieneSim3 == true) {
        ticks++;
    }

    if (num >= 6 && num <= 20) {
        if (ticks >= 3) {
            if (num >= 12) {
                msj = "Muy segura";
                color = "green"

            } else {
                msj = "Segura";
                color = "green"
            }
        } else if (ticks == 2) {
            if (num >= 10) {
                msj = "Segura";
                color = "green";
            } else {
                msj = "Poco segura";
                color = "yellow";
            }
        } else if (ticks == 1) {
            if (num >= 8) {
                msj = "Poco segura";
                color = "yellow";
            } else {
                msj = "Muy débil";
                color = "red"
            }
        }
    }

    mensaje.style.color = color;
    mensaje.innerText = msj;
}

// HACER UNA EVALUACIÓN CADA VEZ QUE ESTOS COMPONENTES CAMBIEN EN LA WEB POR RESPONSABILIDAD DEL USUARIO
document.getElementById("mayus").addEventListener("change", evaluar);
document.getElementById("minus").addEventListener("change", evaluar);
document.getElementById("num").addEventListener("change", evaluar);
document.getElementById("sim").addEventListener("change", evaluar);
input.addEventListener("input", evaluar);

