document.addEventListener("DOMContentLoaded", () => {
    // Espera a que el DOM esté completamente cargado antes de ejecutar el script.

    // --- Gestión del formulario ---
    const form = document.querySelector(".form");
    // Selecciona el formulario con la clase "form" para trabajar con él.

    const formEndpoint = "https://formspree.io/f/xdkkzklw"; // Reemplaza con tu ID de Formspree
    // Define la URL del servicio al que se enviarán los datos del formulario.

    const statusMessage = document.getElementById("form-status-message");
    // Selecciona el elemento que mostrará los mensajes de estado (éxito o error).

    form.addEventListener("submit", async (event) => {
        // Escucha el evento "submit" del formulario y ejecuta una función asincrónica.

        event.preventDefault();
        // Previene el comportamiento predeterminado del formulario (recargar la página al enviar).

        const formData = new FormData(form);
        // Crea un objeto `FormData` con los datos del formulario.

        const data = Object.fromEntries(formData.entries());
        // Convierte `FormData` en un objeto JSON para facilitar el envío al servidor.

        try {
            // Realizar el envío de datos con fetch
            const response = await fetch(formEndpoint, {
                method: "POST",
                // Usa el método POST para enviar los datos al servidor.

                headers: {
                    "Content-Type": "application/json",
                },
                // Configura los encabezados para enviar datos en formato JSON.

                body: JSON.stringify(data),
                // Convierte los datos del formulario a JSON y los incluye en el cuerpo de la solicitud.
            });

            if (response.ok) {
                // Si la respuesta del servidor es exitosa:
                statusMessage.textContent = "¡Mensaje enviado correctamente!";
                // Muestra un mensaje de éxito.

                statusMessage.className = "form-status-message success";
                // Cambia la clase del mensaje para aplicar estilos de éxito.

                statusMessage.style.display = "block";
                // Asegura que el mensaje sea visible.

                form.reset();
                // Limpia los campos del formulario.
            } else {
                // Si la respuesta del servidor es un error:
                statusMessage.textContent = "Error al enviar el mensaje. Intenta nuevamente.";
                // Muestra un mensaje de error.

                statusMessage.className = "form-status-message error";
                // Cambia la clase del mensaje para aplicar estilos de error.

                statusMessage.style.display = "block";
                // Asegura que el mensaje sea visible.
            }
        } catch (error) {
            // Si hay un problema de red o error inesperado:
            statusMessage.textContent = "Hubo un problema con la conexión. Intenta más tarde.";
            // Muestra un mensaje de error.

            statusMessage.className = "form-status-message error";
            // Cambia la clase del mensaje para aplicar estilos de error.

            statusMessage.style.display = "block";
            // Asegura que el mensaje sea visible.

            console.error(error);
            // Imprime el error en la consola para depuración.
        }

        // Ocultar el mensaje después de unos segundos
        setTimeout(() => {
            statusMessage.style.display = "none";
            // Oculta el mensaje después de 5 segundos.
        }, 5000);
    });

    // --- Interactividad de las preguntas frecuentes (FAQ) ---
    const faqItems = document.querySelectorAll('.faq-item');
    // Selecciona todos los elementos que tienen la clase "faq-item".

    faqItems.forEach(item => {
        // Itera sobre cada elemento de las preguntas frecuentes.

        const question = item.querySelector('.faq-question');
        // Selecciona la pregunta dentro del ítem de FAQ.

        const answer = item.querySelector('.faq-answer');
        // Selecciona la respuesta dentro del ítem de FAQ.

        const arrow = item.querySelector('.arrow');
        // Selecciona el ícono de flecha dentro del ítem de FAQ.

        question.addEventListener('click', () => {
            // Escucha un clic en la pregunta del ítem.

            answer.classList.toggle('active');
            // Alterna la clase "active" en la respuesta, para mostrarla u ocultarla.

            arrow.classList.toggle('rotate');
            // Alterna la clase "rotate" en la flecha, para rotarla visualmente.
        });
    });
});