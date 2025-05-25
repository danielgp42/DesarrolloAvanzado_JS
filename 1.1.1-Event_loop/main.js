const orderList = document.getElementById('orderList');
const addOrderBtn = document.getElementById('addOrderBtn');

let orderId = 1; // Para identificar los pedidos

addOrderBtn.addEventListener('click', () => {
    const order = { id: orderId++, status: 'En Proceso' };
    addOrder(order);        // Añade el pedido a la interfaz con estado 'En Proceso'
    processOrder(order);    // Inicia el procesamiento asincrónico del pedido
});

/**
 * Agrega visualmente un nuevo pedido a la lista.
 * @param {object} order - El objeto del pedido con id y status.
 */
function addOrder(order) {
    const listItem = document.createElement('li');
    listItem.id = `order-${order.id}`;
    listItem.textContent = `Pedido #${order.id}: ${order.status}`;
    // Añadimos una clase para estilos si es necesario, aunque aquí no afecta el 'En Proceso'
    orderList.appendChild(listItem);
}

/**
 * @param {object} order - El objeto del pedido a actualizar.
 * @param {string} status - El nuevo estado del pedido ('En Proceso' o 'Completado').
 */
function updateOrderStatus(order, status) {
    const listItem = document.getElementById(`order-${order.id}`);
    if (listItem) {
        listItem.textContent = `Pedido #${order.id}: ${status}`;
        if (status === 'Completado') {
            listItem.classList.add('completed');
        } else {
            listItem.classList.remove('completed');
        }
    }
}

/**
 * Simula la preparación de un pedido de manera asincrónica.
 * @param {object} order - El objeto del pedido a procesar.
 */
async function processOrder(order) {
    const preparationTime = Math.random() * 3000 + 1000; // entre 1 y 4 segundos

    console.log(`Pedido #${order.id}: Empezando preparación (${(preparationTime / 1000).toFixed(1)}s)`);

    try {
        await new Promise(resolve => setTimeout(resolve, preparationTime));

        // 2. Después del tiempo simulado, actualizamos el estado
        await updateOrderStatus(order, 'Completado'); // Actualizamos el DOM usando async/await
        console.log(`Pedido #${order.id}: Completado`);

    } catch (error) {
        console.error(`Error al procesar el Pedido #${order.id}:`, error);
        await updateOrderStatus(order, 'Error'); // O un estado de error
    }
}