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
    constructor(id, nombre, apellido, edad, alterego, ciudad, publicado)
    {
        super(id, nombre, apellido, edad);
        this.alterego = alterego;
        this.ciudad = ciudad;
        this.publicado = publicado;
    }

    toString()
    {
        return `${super.toString()}, Cantidad Puertas: ${this.alterego}, Ciudad: ${this.ciudad}, Publicado: ${this.publicado}`;
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

let listaPersonas = JSON.parse(punto2);

function mostrarDatos()
{
    let tbody = document.querySelector("#datosListado tbody");

    let tipo = $("tipoPersona");

    if (tipo.value === "Todos")
    {
        listaVisible = listaPersonas;
    }
    else if (tipo.value === "Heroe")
    {
        listaVisible = listaPersonas.filter(persona => persona.enemigo == null && persona.robos == null && persona.asesinatos == null);
    }
    else if (tipo.value === "Villano")
    {
        listaVisible = listaPersonas.filter(persona => persona.alterEgo == null && persona.ciudad == null && persona.publicado == null);
    }

    borrarTd();

    listaVisible.forEach(function(persona) {
        let fila = document.createElement("tr");

        let columnaId = document.createElement("td");
        columnaId.textContent = persona.id;
        fila.appendChild(columnaId);

        let columnaNombre = document.createElement("td");
        columnaNombre.textContent = persona.nombre;
        fila.appendChild(columnaNombre);

        let coumnaApellido = document.createElement("td");
        coumnaApellido.textContent = persona.apellido;
        fila.appendChild(coumnaApellido);

        let columnaEdad = document.createElement("td");
        columnaEdad.textContent = persona.edad;
        fila.appendChild(columnaEdad);

        let columnaAlterego = document.createElement("td");
        columnaAlterego.textContent = persona.alterego;
        fila.appendChild(columnaAlterego);

        let columnaCiudad = document.createElement("td");
        columnaCiudad.textContent = persona.ciudad;
        fila.appendChild(columnaCiudad);

        let columnaPublicado = document.createElement("td");
        columnaPublicado.textContent = persona.publicado;
        fila.appendChild(columnaPublicado);

        let columnaEnemigo = document.createElement("td");
        columnaEnemigo.textContent = persona.enemigo;
        fila.appendChild(columnaEnemigo);

        let columnaRobos = document.createElement("td");
        columnaRobos.textContent = persona.robos;
        fila.appendChild(columnaRobos);

        let columnaAsesinatos = document.createElement("td");
        columnaAsesinatos.textContent = persona.asesinatos;
        fila.appendChild(columnaAsesinatos);

        fila.addEventListener("dblclick", function() {
            let selectABM = $("tipoSelect");

            $("ABMid").value = persona.id;
            $("ABMnombre").value = persona.nombre;
            $("ABMapellido").value = persona.apellido;
            $("ABMedad").value = persona.edad;
            $("ABMalterego").value = persona.alterego;
            $("ABMciudad").value = persona.ciudad;
            $("ABMpublicado").value = persona.publicado;
            $("ABMenemigo").value = persona.enemigo;
            $("ABMrobos").value = persona.robos;
            $("ABMasesinatos").value = persona.asesinatos;

            if (persona.enemigo == null && persona.robos == null && persona.asesinatos == null)
            {
                selectABM.value = "Heroe";
                $("divHeroe").style.display = "block";
                $("divVillano").style.display = "none";
            }
            else if (persona.alterego == null && persona.ciudad == null && persona.publicado == null)
            {
                selectABM.value = "Villano";
                $("divHeroe").style.display = "none";
                $("divVillano").style.display = "block";
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
    let select = $("tipoPersona");
    select.addEventListener("change", function (){
        mostrarDatos();
        $("inputCalcular").value = "";
    });
}

//BOTON CALCULAR VELOCIDAD MAXIMA PROMEDIO
$("btnCalcular").addEventListener("click", function() {
    let tipo = $("tipoPersona");

    if (tipo.value === "Todos")
    {
        listaVisible = listaPersonas;
    }
    else if (tipo.value === "Heroe")
    {
        listaVisible = listaPersonas.filter(persona => persona.enemigo == null && persona.robos == null && persona.asesinatos == null);
    }
    else if (tipo.value === "Villano")
    {
        listaVisible = listaPersonas.filter(persona => persona.alterego == null && persona.ciudad == null && persona.publicado == null);
    }

    let edadTotal = 0;
    listaVisible.forEach(persona =>{
        edadTotal += persona.edad;
    });

    let edadPromedio = edadTotal / listaVisible.length;
    $("inputCalcular").value = edadPromedio.toFixed(2);
});

//BOTON AGREGAR LISTADO
$("agregar").addEventListener("click", function() {
    limpiarForm();

    let tipoSelect = $("tipoSelect");

    $("ABMid").value = "";
    $("ABMnombre").value = "";
    $("ABMapellido").value = "";
    $("ABMedad").value = "";
    $("ABMalterego").value = "";
    $("ABMciudad").value = "";
    $("ABMpublicado").value = "";
    $("ABMenemigo").value = "";
    $("ABMrobos").value = "";
    $("ABMasesinatos").value = "";

    tipoSelect.disabled = false;

    mostrarFormABM();
});

//BOTON CREAR ABM
$("alta").addEventListener("click", function() {
    let selectTipo = $("tipoSelect").value;

    let id = numeroRandom();
    let nombre = $("ABMnombre").value;
    let apellido = $("ABMapellido").value;
    let edad = $("ABMedad").value;
    let alterego = $("ABMalterego").value;
    let ciudad = $("ABMciudad").value;
    let publicado = $("ABMpublicado").value;
    let enemigo = $("ABMenemigo").value;
    let robos = $("ABMrobos").value;
    let asesinatos = $("ABMasesinatos").value;

    // if (nombre == "" || apellido == "" || apellido < 1985 || velocidadMaxima == "" || velocidadMaxima < 0)
    // {
    //     alert("Por favor complete los datos Modelo, Año de Fabricacion o Velocidad Maxima correctamente");

    //     return;
    // }

    // if(selectTipo == "Autos")
    // {
    //     if (cantidadPuertas == "" || cantidadPuertas < 2 || asientos == "" || asientos < 2)
    //     {
    //         alert("Por favor complete los datos Cantidad de Puertas o Cantidad de Asientos correctamente");

    //         return;
    //     }
    // }

    // if(selectTipo == "Camiones")
    // {
    //     if (carga == "" || carga < 0 || autonomia == "" || autonomia < 0)
    //     {
    //         alert("Por favor complete los datos Carga o Autonomia correctamente");

    //         return;
    //     }
    // }

    if (selectTipo === "Heroe")
    {
        nuevaPersona = {
            "id": id,
            "nombre": nombre,
            "apellido": apellido,
            "edad": edad,
            "alterego": alterego,
            "ciudad": ciudad,
            "publicado": publicado,
            "enemigo": null,
            "robos": null,
            "asesinatos": null
        };
    }
    else if (selectTipo === "Villano")
    {
        nuevaPersona = {
            "id": id,
            "nombre": nombre,
            "apellido": apellido,
            "edad": edad,
            "alterego": null,
            "ciudad": null,
            "publicado": null,
            "enemigo": enemigo,
            "robos": robos,
            "asesinatos": asesinatos
        };
    }

    listaPersonas.push(nuevaPersona);
    
    mostrarDatos();
    limpiarForm();
    mostrarFormListas();
});

//BOTON MODIFICAR ABM
$("modificar").addEventListener("click", function() {
    let selectTipo = $("tipoSelect").value;

    let id = $("ABMid").value;
    let nombre = $("ABMnombre").value;
    let apellido = $("ABMapellido").value;
    let edad = $("ABMedad").value;
    let alterego = $("ABMalterego").value;
    let ciudad = $("ABMciudad").value;
    let publicado = $("ABMpublicado").value;
    let enemigo = $("ABMenemigo").value;
    let robos = $("ABMrobos").value;
    let asesinatos = $("ABMasesinatos").value;

    // if (modelo == "" || anioFabricacion == "" || velocidadMaxima == "" || velocidadMaxima < 0)
    // {
    //     alert("Por favor complete los datos Modelo, Año de Fabricacion o Velocidad Maxima correctamente");

    //     return;
    // }

    // if(selectTipo == "Autos")
    // {
    //     if (cantidadPuertas == "" || cantidadPuertas < 2 || asientos == "" || asientos < 2)
    //     {
    //         alert("Por favor complete los datos Cantidad de Puertas o Cantidad de Asientos correctamente");

    //         return;
    //     }
    // }

    // if(selectTipo == "Camiones")
    // {
    //     if (carga == "" || carga < 0 || autonomia == "" || autonomia < 0)
    //     {
    //         alert("Por favor complete los datos Carga o Autonomia correctamente");

    //         return;
    //     }
    // }

    let index = listaPersonas.findIndex(persona => persona.id == id);

    if (index !== -1)
    {
        listaPersonas[index].nombre = nombre;
        listaPersonas[index].apellido = apellido;
        listaPersonas[index].edad = edad;

        if (selectTipo === "Heroe")
        {
            listaPersonas[index].alterego = alterego;
            listaPersonas[index].ciudad = ciudad;
            listaPersonas[index].publicado = publicado;
        }
        if (selectTipo === "Villano")
        {
            listaPersonas[index].enemigo = enemigo;
            listaPersonas[index].robos = robos;
            listaPersonas[index].asesinatos = asesinatos;
        }
    }

    mostrarDatos();
    limpiarForm();
    mostrarFormListas();
});

//BOTON ELIMINAR ABM
$("eliminar").addEventListener("click", function() {
    let id = $("ABMid").value;

    let index = listaPersonas.findIndex(persona => persona.id == id);

    if (index !== -1)
    {
        listaPersonas.splice(index, 1);
    }

    mostrarDatos();
    limpiarForm();
    mostrarFormListas();
});

//BOTON CANCELAR ABM
$("cancelar").addEventListener("click", mostrarFormListas);

function mostrarFormABM()
{
    $("formListado").style.display = "none";

    $("formABM").style.display = "block";

    let tipo = $("tipoSelect").value;
    actualizarVisibilidadCampos(tipo);

    $("inputCalcular").value = "";
}

function mostrarFormListas()
{
    limpiarForm();

    $("formListado").style.display = "block";

    $("formABM").style.display = "none";

    $("inputCalcular").value = "";
}

function actualizarVisibilidadCampos(tipo)
{
    let divHeroe = $("divHeroe");
    let divVillano = $("divVillano"); 

    if (tipo === "Heroe")
    {
        divHeroe.style.display = "block";
        divVillano.style.display = "none";
    }
    else
    {
        divHeroe.style.display = "none";
        divVillano.style.display = "block";
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
    $("ABMnombre").value = "";
    $("ABMapellido").value = "";
    $("ABMedad").value = "";
    $("ABMalterego").value = "";
    $("ABMciudad").value = "";
    $("ABMpublicado").value = "";
    $("ABMenemigo").value = "";
    $("ABMrobos").value = "";
    $("ABMasesinatos").value = "";
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

    $("ABMalterego").value = "";
    $("ABMciudad").value = "";
    $("ABMpublicado").value = "";
    $("ABMenemigo").value = "";
    $("ABMrobos").value = "";
    $("ABMasesinatos").value = "";
});
