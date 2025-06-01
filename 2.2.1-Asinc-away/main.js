// Simulando una base de datos de mesas
const mesasDisponibles = 5;  // Número de mesas disponibles para reservar

// Función que simula la verificación de disponibilidad de mesas
function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Completa la lógica aquí: Si hay suficientes mesas disponibles, resuelve la promesa, 
      // de lo contrario, recházala con un mensaje adecuado.
      if (mesasSolicitadas <= mesasDisponibles) {
        resolve(`¡Hay ${mesasDisponibles - mesasSolicitadas} mesas disponibles después de tu reserva!`);
      } else {
        reject(`Lo sentimos, solo tenemos ${mesasDisponibles} mesas disponibles. No podemos reservar ${mesasSolicitadas}.`);
      }
    }, 2000);  // Simula un retraso (2 segundos)
  });
}

// Función que simula el envío de un correo de confirmación
function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Completa la lógica aquí: Simula un envío de correo. Usa Math.random() 
      // para simular si el correo se envió correctamente o si ocurrió un error.
      const exitoEnvio = Math.random() > 0.3; // 70% de éxito, 30% de fallo simulado

      if (exitoEnvio) {
        resolve(`Correo de confirmación enviado exitosamente a ${nombreCliente}.`);
      } else {
        reject(`Fallo al enviar el correo de confirmación a ${nombreCliente}. Por favor, contacte al soporte.`);
      }
    }, 1500);  // Simula el envío de un correo (1.5 segundos)
  });
}

// Función principal para manejar una reserva
async function hacerReserva(nombreCliente, mesasSolicitadas) {
  try {
    console.log(`Verificando disponibilidad de mesas para <span class="math-inline">\{nombreCliente\} \(</span>{mesasSolicitadas} mesas)...`);
    // Esperamos a que la promesa de verificarDisponibilidad se resuelva.
    // Si se rechaza, el control pasará directamente al bloque catch.
    const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);
    console.log(disponibilidad); // Muestra el mensaje de éxito de la verificación

    console.log("Mesas disponibles. Confirmando reserva y enviando correo...");
    // Si la disponibilidad fue exitosa, procedemos a enviar el correo.
    // De nuevo, await esperará la resolución o el rechazo.
    const confirmacionCorreo = await enviarConfirmacionReserva(nombreCliente);
    console.log(confirmacionCorreo); // Muestra el mensaje de éxito del envío de correo

    console.log(`¡Reserva de ${nombreCliente} para ${mesasSolicitadas} mesas completada exitosamente!`);

  } catch (error) {
    console.error("Error en el proceso de reserva:", error); // Usamos console.error para destacar los errores
  } 
}


//1. Verificar funcionamiento
    
    hacerReserva("Ana Gómez", 2); 