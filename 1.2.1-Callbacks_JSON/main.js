// Datos iniciales de libros en formato JSON
let biblioteca = {
    "libros": [
        { "titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "genero": "Realismo mágico", "disponible": true },
        { "titulo": "1984", "autor": "George Orwell", "genero": "Distopía", "disponible": true }
    ]
};

// Función para simular la lectura de datos (asimilar la lectura de un archivo JSON)
function leerDatos(callback) {
    console.log("Simulando lectura de datos...");
    setTimeout(() => {
        // Aquí simulas leer el JSON con un retraso de 1 segundo
        callback(biblioteca);
    }, 1000);
}

// Función para simular la escritura de datos (asimilar la escritura en un archivo JSON)
function escribirDatos(nuevosDatos, callback) {
    console.log("Simulando escritura de datos...");
    setTimeout(() => {
        biblioteca = nuevosDatos;
        if (callback) {
            callback();
        }
    }, 1000);
}

// Función para mostrar todos los libros en consola
function mostrarLibros() {
    leerDatos((datos) => {
        console.log("\n--- Inventario de libros ---");
        if (datos.libros.length === 0) {
            console.log("No hay libros en la biblioteca.");
            return;
        }
        datos.libros.forEach((libro, index) => {
            console.log(`${index + 1}. **${libro.titulo}** - ${libro.autor} (${libro.genero}) [${libro.disponible ? 'Disponible' : 'Prestado'}]`);
        });
        console.log("----------------------------");
    });
}

// Función para agregar un nuevo libro
function agregarLibro(titulo, autor, genero, disponible) {
    const nuevoLibro = { titulo, autor, genero, disponible };
    leerDatos((datosActuales) => {
        datosActuales.libros.push(nuevoLibro);
        escribirDatos(datosActuales, () => {
            console.log(`\nLibro "${titulo}" agregado exitosamente.`);
            mostrarLibros(); // Mostrar el inventario actualizado
        });
    });
}

// Función para cambiar la disponibilidad de un libro
function actualizarDisponibilidad(titulo, nuevoEstado) {
    leerDatos((datosActuales) => {
        const libroEncontrado = datosActuales.libros.find(libro => libro.titulo === titulo);

        if (libroEncontrado) {
            libroEncontrado.disponible = nuevoEstado;
            escribirDatos(datosActuales, () => {
                console.log(`\nDisponibilidad de "${titulo}" actualizada a "${nuevoEstado ? 'Disponible' : 'Prestado'}".`);
                mostrarLibros(); // Mostrar el inventario actualizado
            });
        } else {
            console.log(`\nError: El libro "${titulo}" no fue encontrado.`);
        }
    });
}

// --- Ejemplo de cómo ejecutar la aplicación ---

console.log("--- Iniciando aplicación de biblioteca ---");

// 1. Mostrar libros iniciales
mostrarLibros();

// 2. Agregar un nuevo libro
setTimeout(() => {
    agregarLibro("El principito", "Antoine de Saint-Exupéry", "Fábula", true);
}, 2500); // Pequeño retraso para que no se mezclen las salidas iniciales

// 3. Actualizar la disponibilidad de un libro
setTimeout(() => {
    actualizarDisponibilidad("1984", false);
}, 5000); // Otro retraso para ver el efecto después de agregar

// 4. Intentar actualizar un libro que no existe
setTimeout(() => {
    actualizarDisponibilidad("Don Quijote de la Mancha", true);
}, 7500);

// 5. Mostrar el estado final después de todas las operaciones
setTimeout(() => {
    console.log("\n--- Estado final de la biblioteca ---");
    mostrarLibros();
}, 9000);