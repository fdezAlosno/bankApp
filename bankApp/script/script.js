const popUpLogin = document.getElementById("popup-login");
const txtLogin = document.getElementById("form-txt-name");
const txtPass = document.getElementById("form-txt-pass");
const errMsg = document.getElementById("form-alert");
const btnSubmit = document.getElementById("form-btn");
const mainScreen = document.getElementById("main-screen");
const listaExtractos = document.getElementById("main-account");
const pantallaIngreso = document.getElementById("main-account-ingreso");
const pantallaGasto = document.getElementById("main-account-gasto");
const btnIngresar = document.getElementById("nav-item-ingresar-btn");
const btnRetirar = document.getElementById("nav-item-retirar-btn");
const btnExtracto = document.getElementById("nav-item-extracto-btn");
const lblUsuario = document.getElementById("txt-nombre-usuario");
const lblCuenta = document.getElementById("txt-info-cuenta");
const lblTipo = document.getElementById("txt-info-cuenta-tipo");
const lblSaldo = document.getElementById("txt-saldo");
const lblExtracto = document.getElementById("lbl-extracto-importe");
const txtImporte = document.getElementById("txt-importe");
const txtConcepto = document.getElementById("txt-concepto");
const txtFecha = document.getElementById("txt-fecha");
const txtImporteGasto = document.getElementById("txt-importe-gasto");
const txtConceptoGasto = document.getElementById("txt-concepto-gasto");
const txtFechaGasto = document.getElementById("txt-fecha-gasto");
const btnGasto = document.getElementById("btn-gasto");
const btnIngreso = document.getElementById("btn-ingreso");

let usuario;
let numeroCuenta;
let tipoCuenta;
let saldoTotal = 0.00;
let importeTemporal = 0.00;
let extracto = [ {"tipo":"ingreso", "fecha":getFecha(), "contexto":"Nomina","importe":"1500.00"},{"tipo":"gasto", "fecha":getFecha(), "contexto":"Compras","importe":"-175.05"},{"tipo":"gasto", "fecha":getFecha(), "contexto":"Internet","importe":"-75.99"},{"tipo":"gasto", "fecha":getFecha(), "contexto":"Gastos Varios","importe":"-300.50"} ];
let extractoTemporal = [];
let tipoTransaccion;
let contextoTransaccion;
let importeTransaccion=0.00;
let fechaOperacion;

const navBtn = document.querySelectorAll(".nav-item");

// let operaciones = []; reservado para localStorage


// Inicio de sesion

btnSubmit.addEventListener("click", function (event) {
   
    event.preventDefault();
    
    // Lógica para inicio de sesion //
    // ***

    // Lógica para demo //

    if (txtLogin.value === "demo" && txtPass.value === "demo") {
        usuario = "demo";
        numeroCuenta = "Demo";
        tipoCuenta="Demo";
        lblUsuario.textContent = "Usuario: " + usuario;
        lblCuenta.textContent = "Nº Cuenta: " + numeroCuenta;
        lblTipo.textContent = "Tipo de Cuenta : " + tipoCuenta;
        lblSaldo.textContent = "Saldo: " + saldoTotal + " €";
        
        inicioPrograma();
        rellenarExtractos();
        calcularSaldo();
    } else {
        errMsg.style.display="flex";
    }
});

// Inicia el programa

function inicioPrograma () {

    mainScreen.style.filter="none";
    popUpLogin.style.display="none";

    btnExtracto.classList.add("nav-item-seleccionado");
    pantallaIngreso.style.display="none";
    pantallaGasto.style.display="none";
    listaExtractos.style.display="flex";
}


// Cierra el login y quita filtro a la App principal

function getFecha() {

    let fechaTemporal = new Date;

    let diaTransaccion = fechaTemporal.getDate();
    let mesTransaccion = fechaTemporal.getMonth() + 1;
    let anioTransaccion =  fechaTemporal.getFullYear();

    let fechaTransaccion = `${diaTransaccion}/${mesTransaccion}/${anioTransaccion}`;

    return fechaTransaccion;
}


// Crea los objetos de los extractos

function rellenarExtractos () {

    listaExtractos.innerHTML=
    "<h2>Historial de operaciones</h2>"

    extracto.forEach((element, index) => {
        let nuevoExtracto = document.createElement("div");
        let simbolo;
        
        if(element.tipo === "ingreso") {
            simbolo = "download";
        } else {
            simbolo="upload";
        }
        
        nuevoExtracto.className = "item-extracto";
        nuevoExtracto.innerHTML = 
            `
            <div class="item-extracto-icon" id="item-extracto-icon">
                <span class="material-symbols-outlined">${simbolo}</span>
            </div>
            <div class="item-extracto-info" id="item-extracto-info">
                <h3 id="lbl-extracto-importe">${element.importe} €</h3>
                <small>${element.fecha}</small>
                <p>${element.contexto}</p>
            </div>
            <button class="btn-eliminar"><span class="material-symbols-outlined">delete</span></button>
            `
            
        let btnEliminar = nuevoExtracto.querySelector(".btn-eliminar");

        btnEliminar.addEventListener("click", () => {
        funcionEliminar(index);
        });

        listaExtractos.appendChild(nuevoExtracto);
    });
}


// Elimina el objeto del extracto

function funcionEliminar(index) {
    
    extracto.splice(index, 1);

    listaExtractos.innerHTML=
    "<h2>Historial de operaciones</h2>"
    
    rellenarExtractos();
    calcularSaldo();
}


// Calcula el saldo total

function calcularSaldo() {
    
    if(extracto.length > 0) {
        extractoTemporal=[];
        
        extracto.forEach(element => {
            let agregado = parseFloat(element.importe);
            extractoTemporal.push(agregado);
        });
        
        importeTemporal = extractoTemporal.reduce((a, b) => a + b);
        saldoTotal = importeTemporal;
        lblSaldo.textContent = "Saldo: " + saldoTotal.toFixed(2) + " €";
        
        if (saldoTotal >= 0) {
            lblSaldo.style.color = "#003C43"
        }else{
            lblSaldo.style.color = "#ff0000"
        }
        
    }else{
        saldoTotal=0;
        lblSaldo.textContent = "Saldo: " + saldoTotal.toFixed(2) + " €";
    }
}


// Limita la entrada a numeros en el campo "importe"

function valideKey(evt){
    
    var code = (evt.which) ? evt.which : evt.keyCode;
    
    if(code==8) { 
        return true;
    } else if(code>=48 && code<=57) { 
        return true;
    } else if (code==46){
        return true;
    }else{
        return false;
    }
}


// Programa Principal

mainScreen.style.filter="blur(4px)";

navBtn.forEach(element => {
    element.addEventListener("click", (element) => {
        navBtn.forEach(element => {
            element.classList.remove("nav-item-seleccionado");
        });
        let btnSeleccionado = element.target;
        btnSeleccionado.classList.add("nav-item-seleccionado");
    });
});

btnIngresar.addEventListener("click", () => {
    pantallaIngreso.style.display="flex";
    pantallaGasto.style.display="none";
    listaExtractos.style.display="none";
    txtFecha.value = getFecha();
    tipoTransaccion = "ingreso";
});

btnRetirar.addEventListener("click", () => {
    pantallaIngreso.style.display="none";
    pantallaGasto.style.display="flex";
    listaExtractos.style.display="none";
    txtFechaGasto.value = getFecha();
    tipoTransaccion = "gasto";
});

btnExtracto.addEventListener("click", () => {
    pantallaIngreso.style.display="none";
    pantallaGasto.style.display="none";
    listaExtractos.style.display="flex";
});


// Logica para el boton de ingreso

btnIngreso.addEventListener("click", () => {

    importeTransaccion = txtImporte.value;
    importeTransaccion = parseFloat(importeTransaccion).toFixed(2);

    if(txtImporte.value <= 0) {
            alert("El importe no puede ser menor o igual a '0'")
    } else {
        
        let nuevoRegistro = {
            "tipo":"ingreso", 
            "fecha":txtFecha.value, 
            "contexto":txtConcepto.value,
            "importe":importeTransaccion
            }   
        
        extracto.unshift(nuevoRegistro);
        rellenarExtractos();
        calcularSaldo();
    
        txtConcepto.value="";
        txtFecha.value="";
        txtImporte.value=""
    
        btnIngresar.classList.remove("nav-item-seleccionado");
        btnRetirar.classList.remove("nav-item-seleccionado");
        btnExtracto.classList.add("nav-item-seleccionado");
    
        pantallaIngreso.style.display="none";
        pantallaGasto.style.display="none";
        listaExtractos.style.display="flex";
    }
});


// Logica para el boton de gasto

btnGasto.addEventListener("click", () => {

    importeTransaccion = txtImporteGasto.value;
    importeTransaccion = parseFloat(importeTransaccion).toFixed(2)*(-1);

    if(txtImporteGasto.value <= 0) {
        alert("El importe no puede ser menor o igual a '0'")
    } else {

        let nuevoRegistro = {
            "tipo":"gasto", 
            "fecha":txtFechaGasto.value, 
            "contexto":txtConceptoGasto.value,
            "importe":importeTransaccion
        }

        extracto.unshift(nuevoRegistro);
        rellenarExtractos();
        calcularSaldo();

        txtConceptoGasto.value="";
        txtFechaGasto.value="";
        txtImporteGasto.value=""

        btnIngresar.classList.remove("nav-item-seleccionado");
        btnRetirar.classList.remove("nav-item-seleccionado");
        btnExtracto.classList.add("nav-item-seleccionado");

        pantallaIngreso.style.display="none";
        pantallaGasto.style.display="none";
        listaExtractos.style.display="flex";
    }
});

fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
.then(Response => Response.json())
.then(data => {
    console.log(data)
})