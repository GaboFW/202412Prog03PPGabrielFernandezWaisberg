class Persona
{
    constructor(id, nombre, apellido, edad)
    {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    toString()
    {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad Promedio: ${this.edad}`;
    }
}

class Heroe extends Persona
{
    constructor(id, nombre, apellido, edad, alterEgo, ciudad, publicado)
    {
        super(id, nombre, apellido, edad);
        this.alterEgo = alterEgo;
        this.ciudad = ciudad;
        this.publicado = publicado;
    }

    toString()
    {
        return `${super.toString()}, Cantidad Puertas: ${this.alterEgo}, Ciudad: ${this.ciudad}, Publicado: ${this.publicado}`;
    }
}

class Villano extends Persona
{
    constructor(id, nombre, apellido, edad, enemigo, robos, asesinatos)
    {
        super(id, nombre, apellido, edad);
        this.enemigo = enemigo;
        this.robos = robos;
        this.asesinatos = asesinatos;
    }

    toString()
    {
        return `${super.toString()}, Enemigo: ${this.enemigo}, Robos: ${this.robos}, Asesinatos: ${this.asesinatos}`;
    }
}

document.addEventListener("DOMContentLoaded", function (){
    mostrarDatos();
    filtrarSelect();
    mostrarOcultarTabla();
});

function $(id)
{
    return document.getElementById(id);
}

let punto2 = '[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterego":"Superman", "ciudad":"Metropolis","publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterego":"Batman", "ciudad":"Gotica","publicado":20012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterego":"Flash", "ciudad":"Central","publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500,"asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750,"asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25,"asesinatos":1}]';

let listaVehiculos = JSON.parse(punto2);

function mostrarDatos()
{
    let tbody = document.querySelector("#datosListado tbody");

    let tipo = $("tipoVehiculo");

    if (tipo.value === "Todos")
    {
        listaVisible = listaVehiculos;
    }
    else if (tipo.value === "Autos")
    {
        listaVisible = listaVehiculos.filter(auto => auto.carga == null && auto.autonomia == null);
    }
    else if (tipo.value === "Camiones")
    {
        listaVisible = listaVehiculos.filter(auto => auto.cantidadPuertas == null && auto.asientos == null);
    }

    borrarTd();

    listaVisible.forEach(function(vehiculo) {
        let fila = document.createElement("tr");

        let columnaId = document.createElement("td");
        columnaId.textContent = vehiculo.id;
        fila.appendChild(columnaId);

        let columnaModelo = document.createElement("td");
        columnaModelo.textContent = vehiculo.modelo;
        fila.appendChild(columnaModelo);

        let columnaAnoFabricacion = document.createElement("td");
        columnaAnoFabricacion.textContent = vehiculo.anioFabricacion;
        fila.appendChild(columnaAnoFabricacion);

        let columnaVelocidadMaxima = document.createElement("td");
        columnaVelocidadMaxima.textContent = vehiculo.velMax;
        fila.appendChild(columnaVelocidadMaxima);

        let columnaCantidadPuertas = document.createElement("td");
        columnaCantidadPuertas.textContent = vehiculo.cantidadPuertas;
        fila.appendChild(columnaCantidadPuertas);

        let columnaAsientos = document.createElement("td");
        columnaAsientos.textContent = vehiculo.asientos;
        fila.appendChild(columnaAsientos);

        let columnaCarga = document.createElement("td");
        columnaCarga.textContent = vehiculo.carga;
        fila.appendChild(columnaCarga);

        let columnaAutonomia = document.createElement("td");
        columnaAutonomia.textContent = vehiculo.autonomia;
        fila.appendChild(columnaAutonomia);

        fila.addEventListener("dblclick", function() {
            let selectABM = $("tipoSelect");

            $("ABMid").value = vehiculo.id;
            $("ABMmodelo").value = vehiculo.modelo;
            $("ABManioFabricacion").value = vehiculo.anioFabricacion;
            $("ABMvelMax").value = vehiculo.velMax;
            $("ABMcantPuertas").value = vehiculo.cantidadPuertas;
            $("ABMcantAsientos").value = vehiculo.asientos;
            $("ABMcarga").value = vehiculo.carga;
            $("ABMautonomia").value = vehiculo.autonomia;

            if (vehiculo.carga == null && vehiculo.autonomia == null)
            {
                selectABM.value = "Autos";
                $("divAutos").style.display = "block";
                $("divCamion").style.display = "none";
            }
            else if (vehiculo.cantidadPuertas == null && vehiculo.asientos == null)
            {
                selectABM.value = "Camiones";
                $("divAutos").style.display = "none";
                $("divCamion").style.display = "block";
            }

            selectABM.disabled = true;

            mostrarFormABM();
        });

        tbody.appendChild(fila);
    });
    
    mostrarOcultarTabla();
    $("inputCalcular").value = "";
}

function mostrarOcultarTabla()
{
    let checkboxes = document.querySelectorAll(".checkTabla");
    checkboxes.forEach((checkbox, index) => {
        let tabla = $("datosListado");
        let th = tabla.querySelectorAll("th");
        let tr = tabla.querySelectorAll("tr");

        if (checkbox.checked)
        {
            th[index].classList.remove("hidden");
        }
        else
        {
            th[index].classList.add("hidden");
        }

        tr.forEach(row => {
            if (row.cells[index])
            {
                if (checkbox.checked)
                {
                    row.cells[index].classList.remove("hidden");
                }
                else
                {
                    row.cells[index].classList.add("hidden");
                }
            }
        });
    });
}

function ordenarTabla(indexColumna)
{
    let bodyTabla = $("bodyTabla");
    let rows = Array.from(bodyTabla.rows);

    let ordenar = rows.sort(function (a, b) {
        let aText;
        let bText;
        
        if (a.cells[indexColumna])
        {
            aText = a.cells[indexColumna].textContent;
        }
        else
        {
            aText = "";
        }
        
        if (b.cells[indexColumna])
        {
            bText = b.cells[indexColumna].textContent;
        }
        else
        {
            bText = "";
        }

        let aValue;
        let bValue;

        if (isNaN(aText))
        {
            aValue = aText;
        }
        else
        {
            aValue = Number(aText);
        }

        if (isNaN(bText))
        {
            bValue = bText;
        }
        else
        {
            bValue = Number(bText);
        }

        if (aValue < bValue)
        {
            return -1;
        }
        if (aValue > bValue)
        {
            return 1;
        }

        return 0;
    });

    ordenar.forEach(row => {
        bodyTabla.appendChild(row);
    });
}

function filtrarSelect()
{
    let select = $("tipoVehiculo");
    select.addEventListener("change", function (){
        mostrarDatos();
        $("inputCalcular").value = "";
    });
}

//BOTON CALCULAR VELOCIDAD MAXIMA PROMEDIO
$("btnCalcular").addEventListener("click", function() {
    let tipo = $("tipoVehiculo");

    if (tipo.value === "Todos")
    {
        listaVisible = listaVehiculos;
    }
    else if (tipo.value === "Autos")
    {
        listaVisible = listaVehiculos.filter(auto => auto.carga == null && auto.autonomia == null);
    }
    else if (tipo.value === "Camiones")
    {
        listaVisible = listaVehiculos.filter(auto => auto.cantidadPuertas == null && auto.asientos == null);
    }

    let velocidadTotal = 0;
    listaVisible.forEach(vehiculo =>{
        velocidadTotal += vehiculo.velMax;
    });

    let velocidadPromedio = velocidadTotal / listaVisible.length;
    $("inputCalcular").value = velocidadPromedio.toFixed(2);
});

//BOTON AGREGAR LISTADO
$("agregar").addEventListener("click", function() {
    limpiarForm();

    let tipoSelect = $("tipoSelect");

    $("ABMid").value = "";
    $("ABMmodelo").value = "";
    $("ABManioFabricacion").value = "";
    $("ABMvelMax").value = "";
    $("ABMcantPuertas").value = "";
    $("ABMcantAsientos").value = "";
    $("ABMcarga").value = "";
    $("ABMautonomia").value = "";

    tipoSelect.disabled = false;

    mostrarFormABM();
});

//BOTON CREAR ABM
$("crear").addEventListener("click", function() {
    let selectTipo = $("tipoSelect").value;

    let id = numeroRandom();
    let modelo = $("ABMmodelo").value;
    let anioFabricacion = $("ABManioFabricacion").value;
    let velocidadMaxima = $("ABMvelMax").value;
    let cantidadPuertas = $("ABMcantPuertas").value;
    let asientos = $("ABMcantAsientos").value;
    let carga = $("ABMcarga").value;
    let autonomia = $("ABMautonomia").value;

    if (modelo == "" || anioFabricacion == "" || anioFabricacion < 1985 || velocidadMaxima == "" || velocidadMaxima < 0)
    {
        alert("Por favor complete los datos Modelo, Año de Fabricacion o Velocidad Maxima correctamente");

        return;
    }

    if(selectTipo == "Autos")
    {
        if (cantidadPuertas == "" || cantidadPuertas < 2 || asientos == "" || asientos < 2)
        {
            alert("Por favor complete los datos Cantidad de Puertas o Cantidad de Asientos correctamente");

            return;
        }
    }

    if(selectTipo == "Camiones")
    {
        if (carga == "" || carga < 0 || autonomia == "" || autonomia < 0)
        {
            alert("Por favor complete los datos Carga o Autonomia correctamente");

            return;
        }
    }

    if (selectTipo === "Autos")
    {
        nuevoVehiculo = {
            "id": id,
            "modelo": modelo,
            "anioFabricacion": anioFabricacion,
            "velMax": velocidadMaxima,
            "cantidadPuertas": cantidadPuertas,
            "asientos": asientos,
            "carga": null,
            "autonomia": null
        };
    }
    else if (selectTipo === "Camiones")
    {
        nuevoVehiculo = {
            "id": id,
            "modelo": modelo,
            "anioFabricacion": anioFabricacion,
            "velMax": velocidadMaxima,
            "cantidadPuertas": null,
            "asientos": null,
            "carga": carga,
            "autonomia": autonomia
        };
    }

    listaVehiculos.push(nuevoVehiculo);
    
    mostrarDatos();
    limpiarForm();
    mostrarFormListas();
});

//BOTON MODIFICAR ABM
$("modificar").addEventListener("click", function() {
    let selectTipo = $("tipoSelect").value;

    let id = $("ABMid").value;
    let modelo = $("ABMmodelo").value;
    let anioFabricacion = $("ABManioFabricacion").value;
    let velocidadMaxima = $("ABMvelMax").value;
    let cantidadPuertas = $("ABMcantPuertas").value;
    let asientos = $("ABMcantAsientos").value;
    let carga = $("ABMcarga").value;
    let autonomia = $("ABMautonomia").value;

    if (modelo == "" || anioFabricacion == "" || velocidadMaxima == "" || velocidadMaxima < 0)
    {
        alert("Por favor complete los datos Modelo, Año de Fabricacion o Velocidad Maxima correctamente");

        return;
    }

    if(selectTipo == "Autos")
    {
        if (cantidadPuertas == "" || cantidadPuertas < 2 || asientos == "" || asientos < 2)
        {
            alert("Por favor complete los datos Cantidad de Puertas o Cantidad de Asientos correctamente");

            return;
        }
    }

    if(selectTipo == "Camiones")
    {
        if (carga == "" || carga < 0 || autonomia == "" || autonomia < 0)
        {
            alert("Por favor complete los datos Carga o Autonomia correctamente");

            return;
        }
    }

    let index = listaVehiculos.findIndex(vehiculo => vehiculo.id == id);

    if (index !== -1)
    {
        listaVehiculos[index].modelo = modelo;
        listaVehiculos[index].anioFabricacion = anioFabricacion;
        listaVehiculos[index].velocidadMaxima = velocidadMaxima;

        if (selectTipo === "Autos")
        {
            listaVehiculos[index].cantidadPuertas = cantidadPuertas;
            listaVehiculos[index].asientos = asientos;
        }
        if (selectTipo === "Camiones")
        {
            listaVehiculos[index].carga = carga;
            listaVehiculos[index].autonomia = autonomia;
        }
    }

    mostrarDatos();
    limpiarForm();
    mostrarFormListas();
});

//BOTON ELIMINAR ABM
$("eliminar").addEventListener("click", function() {
    let id = $("ABMid").value;

    let index = listaVehiculos.findIndex(vehiculo => vehiculo.id == id);

    if (index !== -1)
    {
        listaVehiculos.splice(index, 1);
    }

    mostrarDatos();
    limpiarForm();
    mostrarFormListas();
});

//BOTON CANCELAR ABM
$("cancelar").addEventListener("click", mostrarFormListas);

function mostrarFormABM()
{
    let formListado = $("formListado");
    formListado.style.display = "none";
    
    let formABM = $("formABM");
    formABM.style.display = "block";

    let tipo = $("tipoSelect").value;
    actualizarVisibilidadCampos(tipo);

    $("inputCalcular").value = "";
}

function mostrarFormListas()
{
    limpiarForm();

    formListado.style.display = "block";

    formABM.style.display = "none";

    $("inputCalcular").value = "";
}

function actualizarVisibilidadCampos(tipo)
{
    let divAuto = $("divAutos");
    let divCamion = $("divCamion"); 

    if (tipo === "Autos")
    {
        divAuto.style.display = "block";
        divCamion.style.display = "none";
    }
    else
    {
        divCamion.style.display = "block";
        divAuto.style.display = "none";
    }
}

function borrarTd()
{
    document.querySelectorAll("tbody td").forEach(cell => {
        cell.remove();
    });
}

function limpiarForm()
{
    $("ABMid").value = "";
    $("ABMmodelo").value = "";
    $("ABManioFabricacion").value = "";
    $("ABMvelMax").value = "";
    $("ABMcantPuertas").value = "";
    $("ABMcantAsientos").value = "";
    $("ABMcarga").value = "";
    $("ABMautonomia").value = "";
}

function numeroRandom()
{
    return Math.floor(Math.random() * 1000 + 1);
}

let filas = document.querySelectorAll("#fila th button");
filas.forEach((boton, index) => {
    boton.addEventListener("click", function() {
        ordenarTabla(index);
    });
});

document.querySelectorAll(".checkTabla").forEach(checkbox => {
    checkbox.addEventListener("change", mostrarOcultarTabla);
});

$("tipoSelect").addEventListener("change", function (){
    let tipo = this.value;
    actualizarVisibilidadCampos(tipo);

    $("ABMcantPuertas").value = "";
    $("ABMcantAsientos").value = "";
    $("ABMcarga").value = "";
    $("ABMautonomia").value = "";
});
