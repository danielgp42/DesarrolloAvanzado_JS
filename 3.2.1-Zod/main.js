// Esquema para validar los datos del formulario
    const registerSchema = z.object({
      // PISTA: Define que el nombre debe ser una cadena no vacía.
      name: z.string().min(1, { message: "El nombre no puede estar vacío." }),

      // PISTA: Valida que el correo tenga el formato correcto.
      email: z.string().email({ message: "El correo electrónico no es válido." }),

      // PISTA: La contraseña debe tener al menos 6 caracteres.
      password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
    });

    document.getElementById("registerForm").addEventListener("submit", (event) => {
      event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada.
      
      // Capturamos los valores ingresados
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };

      const errorsDisplay = document.getElementById("errors"); // Referencia al párrafo de errores
      errorsDisplay.textContent = ""; // Limpia los mensajes de error anteriores

      try {
        // PISTA: Usa el método correcto de Zod para validar el esquema.
        registerSchema.parse(formData); // Usamos .parse() para validar y lanzará un error si falla.
        alert("¡Registro exitoso!");
      } catch (error) {
        // PISTA: Muestra los mensajes de error en la página.
        // Zod lanza un ZodError con una propiedad .errors que es un array de objetos con mensajes.
        errorsDisplay.textContent = error.errors.map(e => e.message).join(" | ");
      }
    });