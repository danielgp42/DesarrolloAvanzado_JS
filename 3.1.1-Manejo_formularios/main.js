document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroEvento');

    // Función para mostrar mensajes de error
    function showError(elementId, message) {
        const errorDiv = document.getElementById(elementId);
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
    }

    // Función para ocultar mensajes de error
    function hideError(elementId) {
        const errorDiv = document.getElementById(elementId);
        errorDiv.textContent = '';
        errorDiv.classList.remove('show');
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío automático del formulario

        let isValid = true; // Flag para controlar la validez del formulario

        document.querySelectorAll('.error-message').forEach(errorDiv => {
            errorDiv.classList.remove('show');
            errorDiv.textContent = '';
        });

        // 1. Validación de Nombre Completo
        const nombre = document.getElementById('nombre').value.trim();
        if (nombre.length < 3) {
            showError('error-nombre', 'El nombre debe tener al menos 3 caracteres.');
            isValid = false;
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
            showError('error-nombre', 'El nombre solo puede contener letras y espacios.');
            isValid = false;
        } else {
            hideError('error-nombre');
        }

        // 2. Validación de Correo Electrónico
        const correo = document.getElementById('correo').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            showError('error-correo', 'Por favor, introduce un correo electrónico válido.');
            isValid = false;
        } else {
            hideError('error-correo');
        }

        // 3. Validación de Teléfono (ej. 10 dígitos numéricos)
        const telefono = document.getElementById('telefono').value.trim();
        const phoneRegex = /^\d{10}$/; // Asume un número de 10 dígitos exactos
        if (!phoneRegex.test(telefono)) {
            showError('error-telefono', 'El teléfono debe ser un número de 10 dígitos.');
            isValid = false;
        } else {
            hideError('error-telefono');
        }

        // 4. Validación de Intereses (al menos uno seleccionado)
        const intereses = document.querySelectorAll('input[name="intereses"]:checked');
        if (intereses.length === 0) {
            showError('error-intereses', 'Por favor, selecciona al menos un interés.');
            isValid = false;
        } else {
            hideError('error-intereses');
        }

        // 5. Validación de Horario Preferido (uno seleccionado)
        const horario = document.querySelector('input[name="horario"]:checked');
        if (!horario) {
            showError('error-horario', 'Por favor, selecciona tu horario preferido.');
            isValid = false;
        } else {
            hideError('error-horario');
        }

        // 6. Validación de Fecha del Evento (no puede ser en el pasado)
        const fechaInput = document.getElementById('fecha');
        const fechaSeleccionada = new Date(fechaInput.value);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Establece la hora a 0 para comparar solo la fecha

        if (!fechaInput.value) { // Verifica si el campo está vacío
            showError('error-fecha', 'Por favor, selecciona una fecha para el evento.');
            isValid = false;
        } else if (fechaSeleccionada < hoy) {
            showError('error-fecha', 'La fecha del evento no puede ser en el pasado.');
            isValid = false;
        } else {
            hideError('error-fecha');
        }

        // 7. Validación de Hora Preferida
        const horaInput = document.getElementById('hora');
        if (!horaInput.value) {
            showError('error-hora', 'Por favor, selecciona una hora preferida.');
            isValid = false;
        } else {
            hideError('error-hora');
        }



        // Si todas las validaciones pasan
        if (isValid) {
            alert('¡Registro exitoso! Gracias por registrarte.');
            form.reset(); // Limpia el formulario después del envío exitoso
        } else {
            console.log('El formulario contiene errores. Por favor, corrígelos.');
        }
    });
});