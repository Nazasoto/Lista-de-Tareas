// Obtener el botón de modo oscuro por su ID
const modoOscuroBtn = document.getElementById('modoOscuro');

// Variable para rastrear el estado del modo oscuro
let modoOscuroActivado = false;

// Agregar un event listener al botón
modoOscuroBtn.addEventListener('click', function() {
    // Cambiar el estado del modo oscuro
    modoOscuroActivado = !modoOscuroActivado;

    // Llamar a la función para activar o desactivar el modo oscuro
    activarDesactivarModoOscuro();
});

// Función para activar o desactivar el modo oscuro
function activarDesactivarModoOscuro() {
    // Obtener el elemento body
    const body = document.body;

    // Cambiar las clases del body según el estado del modo oscuro
    if (modoOscuroActivado) {
        // Modo oscuro activado
        body.classList.add('modo-oscuro');
        modoOscuroBtn.innerHTML = '☀️'; // Cambiar a emoji de sol
    } else {
        // Modo oscuro desactivado
        body.classList.remove('modo-oscuro');
        modoOscuroBtn.innerHTML = '🌑'; // Cambiar a emoji de luna
    }
}

// Inicializar el modo oscuro según el valor almacenado en localStorage
const modoOscuroGuardado = localStorage.getItem('modoOscuro');
if (modoOscuroGuardado) {
    modoOscuroActivado = JSON.parse(modoOscuroGuardado);
    activarDesactivarModoOscuro();
}
