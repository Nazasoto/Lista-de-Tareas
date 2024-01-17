// Array de frases motivadoras
const frasesMotivadoras = [
    "¡Bien ahí, sigue así!",
    "Cada pequeño paso te acerca a grandes logros.",
    "La perseverancia es la clave del éxito.",
    "Viste que pudiste!",
    "Seguí así que vas a encontrar el éxito muy pronto!",
    "Hoy es tu día!",
    "No hay límites para lo que podés lograr."
];

// Obtener el objeto JSON almacenado en localStorage o inicializar uno nuevo
let listaTareasJSON = localStorage.getItem('tareas') ? JSON.parse(localStorage.getItem('tareas')) : { tareas: [] };

// Obtener el array de tareas del objeto JSON
let listTareas = listaTareasJSON.tareas || [];

document.getElementById('tareaForm').addEventListener('submit', function(event) {
    // Evitar que el formulario se envíe de manera predeterminada
    event.preventDefault();

    // Obtener el valor del campo de entrada con el ID "tarea"
    let tareaGuardada = document.getElementById("tarea").value;

    // Verificar si el campo de tarea está vacío
    if (tareaGuardada.trim() === "") {
        // Mostrar una alerta si el campo está vacío
        alert("Tenés agregar una tarea antes de enviarla.");
        return; // Salir de la función si el campo está vacío
    }

    // Llamar a la función para agregar la tarea a la lista
    agregarTarea(tareaGuardada);

    // Limpiar el campo de entrada después de agregar la tarea
    document.getElementById("tarea").value = "";
});

// Agregar evento al botón de borrar tareas
document.getElementById('borrarTareas').addEventListener('click', borrarTodasLasTareas);

// Función para agregar una tarea
function agregarTarea(tarea) {
    // Asegurarse de que listTareas sea un array antes de usar push
    listTareas = listTareas || [];

    // Agregar la nueva tarea al array
    listTareas.push(tarea);

    // Imprimir en la consola la lista actualizada de tareas
    console.log('Lista de tareas:', listTareas);

    // Actualizar la lista en el HTML
    mostrarTareasEnHTML();

    // Guardar el objeto JSON actualizado en el almacenamiento local
    guardarTareas();
}

// Función para borrar todas las tareas
function borrarTodasLasTareas() {
    // Confirmar la acción con el usuario
    const confirmacion = window.confirm("¿Estás seguro de que querés borrar todas las tareas?");
    
    // Salir de la función si el usuario cancela la confirmación
    if (!confirmacion) {
        return;
    }

    // Limpiar el array de tareas
    listTareas = [];

    // Actualizar la lista en el HTML
    mostrarTareasEnHTML();

    // Guardar el objeto JSON actualizado en el almacenamiento local
    guardarTareas();
}

// Función para mostrar una frase motivadora al azar
function mostrarFraseMotivadora(index) {
    // Obtener un índice aleatorio para seleccionar una frase
    const indiceAleatorio = Math.floor(Math.random() * frasesMotivadoras.length);

    // Seleccionar la frase motivadora correspondiente al índice
    const fraseMotivadora = frasesMotivadoras[indiceAleatorio];

    // Mostrar la frase en una alerta (puedes personalizar cómo deseas mostrar la frase)
    alert(fraseMotivadora);
}

// Función para mostrar las tareas en el HTML
function mostrarTareasEnHTML() {
    // Obtener el elemento ul donde se mostrarán las tareas
    let ulElemento = document.getElementById("listaTareas");

    // Limpiar el contenido actual de la lista
    ulElemento.innerHTML = "";

    // Iterar sobre la lista de tareas y agregar elementos li a la lista
    listTareas.forEach(function(tarea, index) {
        let liElemento = document.createElement("li");

        // Agregar el texto de la tarea
        liElemento.textContent = tarea;

        // Agregar un botón de "Borrar" para cada tarea
        let btnBorrar = document.createElement("button");
        btnBorrar.textContent = "❌";
        btnBorrar.addEventListener("click", function() {
            borrarTarea(index);
        });

        // Agregar el botón de "Borrar" al elemento li
        liElemento.appendChild(btnBorrar);

        // Agregar un botón motivador para cada tarea
        let btnMotivar = document.createElement("button");
        btnMotivar.textContent = "✅";
        btnMotivar.addEventListener("click", function() {
            // Mostrar la frase motivadora al hacer clic en el botón de motivación
            mostrarFraseMotivadora(index);
            
            // Borrar la tarea después de mostrar la frase
            borrarTarea(index);
        });

        // Agregar el botón motivador al elemento li
        liElemento.appendChild(btnMotivar);

        // Agregar el elemento li a la lista
        ulElemento.appendChild(liElemento);
    });

    // Mostrar el botón de "Borrar todas las tareas" solo si hay más de dos tareas
    if (listTareas.length > 1) {
        let btnBorrarTodas = document.createElement("button");
        btnBorrarTodas.textContent = "Borrar todo";
        btnBorrarTodas.addEventListener("click", borrarTodasLasTareas);

        // Agregar el botón de "Borrar todas las tareas" al elemento ul
        ulElemento.appendChild(btnBorrarTodas);
    }
}

// Función para borrar una tarea específica
function borrarTarea(index) {
    // Eliminar la tarea del array usando el índice
    listTareas.splice(index, 1);

    // Actualizar la lista en el HTML
    mostrarTareasEnHTML();

    // Guardar el objeto JSON actualizado en el almacenamiento local
    guardarTareas();
}

// Función para guardar las tareas en el almacenamiento local
function guardarTareas() {
    // Actualizar la propiedad "tareas" del objeto JSON y guardarlo en el almacenamiento local
    localStorage.setItem('tareas', JSON.stringify({ tareas: listTareas }));
}

// Inicializar la lista en el HTML cuando se carga la página
mostrarTareasEnHTML();

