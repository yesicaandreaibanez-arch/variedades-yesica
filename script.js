
const productos = {
    "Blusas estampadas": 80000,
    "Blusas sencillas": 40000,
    "Bermuda de jean rígida": 70000,
    "Bermuda licrada": null,
    "Pantalón azul oscuro": 85000,
    "Pantalón negro": 85000,
    "Pantalón azul claro": 85000
};

let carrito = [];

function agregarProducto(nombre) {
    const existente = carrito.find(item => item.nombre === nombre);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: productos[nombre],
            cantidad: 1
        });
    }

    actualizarCarrito();
    alert(nombre + " agregado a tu pedido.");
}

function actualizarCarrito() {
    const contador = document.getElementById("contador");
    const lista = document.getElementById("listaCarrito");
    const totalTexto = document.getElementById("total");

    const cantidadTotal = carrito.reduce(
        (suma, item) => suma + item.cantidad, 0
    );

    contador.textContent = cantidadTotal;

    lista.innerHTML = "";

    let total = 0;

    carrito.forEach((item, indice) => {
        if (item.precio !== null) {
            total += item.precio * item.cantidad;
        }

        const precioTexto = item.precio === null
            ? "Precio por confirmar"
            : "$" + item.precio.toLocaleString("es-CO");

        const elemento = document.createElement("div");
        elemento.className = "item-carrito";

        elemento.innerHTML = `
            <div>
                <strong>${item.nombre}</strong>
                <p>Cantidad: ${item.cantidad}</p>
                <small>${precioTexto}</small>
            </div>

            <button onclick="eliminarProducto(${indice})">
                Quitar
            </button>
        `;

        lista.appendChild(elemento);
    });

    totalTexto.textContent =
        "Total conocido: $" + total.toLocaleString("es-CO");
}

function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}

function mostrarCarrito() {
    document.getElementById("fondoCarrito")
        .classList.add("activo");
}

function cerrarCarrito() {
    document.getElementById("fondoCarrito")
        .classList.remove("activo");
}

function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert("Primero agrega productos a tu pedido.");
        return;
    }

    let mensaje = "¡Hola! Quiero realizar este pedido en Variedades Yesica:\n\n";

    let total = 0;

    carrito.forEach(item => {
        mensaje += `- ${item.nombre}\n`;
        mensaje += `  Cantidad: ${item.cantidad}\n`;

        if (item.precio !== null) {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            mensaje += `  Subtotal: $${subtotal.toLocaleString("es-CO")}\n`;
        } else {
            mensaje += "  Precio: Por confirmar\n";
        }

        mensaje += "\n";
    });

    mensaje += `Total conocido: $${total.toLocaleString("es-CO")}\n\n`;
    mensaje += "Quedo pendiente de confirmar mi pedido. ¡Gracias!";

    const numero = "573113308802";

    const enlace = "https://wa.me/" + numero +
        "?text=" + encodeURIComponent(mensaje);

    window.open(enlace, "_blank");
}
