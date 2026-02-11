let carbonoAtmosfera = 0;
let carbonoPlanta = 0;
let carbonoAnimal = 0;
let carbonoSuelo = 0;
let ciclo = 1;

function iniciarSimulacion() {

    carbonoAtmosfera = parseFloat(document.getElementById("carbonoInicial").value);

    if (isNaN(carbonoAtmosfera) || carbonoAtmosfera <= 0) {
        alert("Ingrese una cantidad válida");
        return;
    }

    carbonoPlanta = 0;
    carbonoAnimal = 0;
    carbonoSuelo = 0;
    ciclo = 1;

    document.getElementById("estado").innerHTML = "";
    document.querySelector("#tablaCiclos tbody").innerHTML = "";

    mostrarEstado("Simulación iniciada");
    agregarFila();
}

function ejecutarCiclo() {

    // 🔥 NUEVO: CO2 adicional ingresado por el usuario en ESTE ciclo
    let ingresoUsuario = document.getElementById("carbonoNuevo").value;

    if (ingresoUsuario === "" || isNaN(parseFloat(ingresoUsuario))) {
        ingresoUsuario = 0;
    } else {
        ingresoUsuario = parseFloat(ingresoUsuario);
    }

    // 🔥 SUMAR antes de hacer el ciclo natural
    carbonoAtmosfera += ingresoUsuario;

    let hayDepredador = document.getElementById("depredador").checked;

    // 1️⃣ Fotosíntesis (Robles absorben 30%)
    let carbonoAbsorbido = carbonoAtmosfera * 0.30;
    carbonoAtmosfera -= carbonoAbsorbido;
    carbonoPlanta += carbonoAbsorbido;

    // 2️⃣ Herbívoros (Ciervos comen 15%)
    if (carbonoPlanta > 0) {
        let carbonoConsumido = carbonoPlanta * 0.15;
        carbonoPlanta -= carbonoConsumido;
        carbonoAnimal += carbonoConsumido;
    }

    // 3️⃣ Depredador
    if (hayDepredador && carbonoAnimal > 0) {
        let carbonoTransferido = carbonoAnimal * 0.80;
        carbonoAnimal -= carbonoTransferido;
        carbonoSuelo += carbonoTransferido;
    }

    // 4️⃣ Muerte natural
    if (!hayDepredador && carbonoAnimal > 0) {
        let muerteNatural = carbonoAnimal * 0.20;
        carbonoAnimal -= muerteNatural;
        carbonoSuelo += muerteNatural;
    }

    // 5️⃣ Descomposición
    if (carbonoSuelo > 0) {
        let carbonoDevuelto = carbonoSuelo * 0.40;
        carbonoSuelo -= carbonoDevuelto;
        carbonoAtmosfera += carbonoDevuelto;
    }

    mostrarEstado(
        "Ciclo ejecutado<br>" +
        "Ingreso humano este ciclo: " + ingresoUsuario.toFixed(2)
    );

    agregarFila();

    ciclo++;

    // limpiar campo
    document.getElementById("carbonoNuevo").value = "";
}

function mostrarEstado(mensaje) {

    let estado = `
        <strong>${mensaje}</strong><br><br>
        Ciclo: ${ciclo}<br>
        Atmósfera: ${carbonoAtmosfera.toFixed(2)}<br>
        Robles: ${carbonoPlanta.toFixed(2)}<br>
        Ciervos: ${carbonoAnimal.toFixed(2)}<br>
        Suelo: ${carbonoSuelo.toFixed(2)}<br>
    `;

    if (carbonoAtmosfera > 100) {
        estado += "<br><strong style='color:red'>PELIGRO: Exceso</strong>";
    } else if (carbonoAtmosfera < 30) {
        estado += "<br><strong style='color:orange'>PELIGRO: Escasez</strong>";
    } else {
        estado += "<br><strong style='color:green'>Estable</strong>";
    }

    document.getElementById("estado").innerHTML = estado;
}

function agregarFila() {

    let tabla = document.querySelector("#tablaCiclos tbody");

    let fila = `
        <tr>
            <td>${ciclo}</td>
            <td>${carbonoAtmosfera.toFixed(2)}</td>
            <td>${carbonoPlanta.toFixed(2)}</td>
            <td>${carbonoAnimal.toFixed(2)}</td>
            <td>${carbonoSuelo.toFixed(2)}</td>
        </tr>
    `;

    tabla.innerHTML += fila;
}

function reiniciarSimulacion(){
    location.reload();
}
