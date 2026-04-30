let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function actualizarContadorCarrito() {
    const countSpan = document.getElementById('cart-count');
    if (countSpan) {
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        countSpan.textContent = totalItems;
    }
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function agregarAlCarrito(item) {
    const existente = carrito.find(i => i.id === item.id && i.esRegalo === item.esRegalo);
    if (existente) existente.cantidad += 1;
    else carrito.push({ ...item, cantidad: 1 });
    guardarCarrito();
    Toastify({
        text: `✅ ${item.nombre} agregado al carrito`,
        duration: 2000,
        gravity: "bottom",
        position: "right",
        style: { background: "linear-gradient(to right, #00b09b, #96c93d)" }
    }).showToast();
}

function eliminarDelCarrito(id, esRegalo) {
    carrito = carrito.filter(item => !(item.id === id && item.esRegalo === esRegalo));
    guardarCarrito();
    refrescarModalSiAbierto();
}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    refrescarModalSiAbierto();
}

function calcularTotal() {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

function refrescarModalSiAbierto() {
    const modalElement = document.getElementById('cartModal');
    if (modalElement && modalElement.classList.contains('show')) {
        mostrarCarritoModal(true);
    }
}

function mostrarCarritoModal(refresh = false) {
    if (!refresh) {
        const existingModal = document.getElementById('cartModal');
        if (existingModal) {
            const modal = bootstrap.Modal.getInstance(existingModal);
            if (modal) modal.hide();
            existingModal.remove();
        }
    }

    const modalContent = `
        <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="cartModalLabel">Tu Carrito</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${carrito.length === 0 ? '<p>No hay productos en el carrito.</p>' : `
                            <table class="table">
                                <thead><tr><th>Producto</th><th>Cantidad</th><th>Precio unit.</th><th>Subtotal</th><th></th></tr></thead>
                                <tbody>
                                    ${carrito.map(item => `
                                        <tr>
                                            <td>${item.nombre}${item.esRegalo ? ' (Regalo)' : ''}</td>
                                            <td>${item.cantidad}</td>
                                            <td>$${item.precio.toLocaleString()}</td>
                                            <td>$${(item.precio * item.cantidad).toLocaleString()}</td>
                                            <td><button class="btn btn-sm btn-danger eliminar-item" data-id="${item.id}" data-regalo="${item.esRegalo}">🗑️</button></td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                                <tfoot><tr><td colspan="3"><strong>Total</strong></td><td><strong>$${calcularTotal().toLocaleString()}</strong></td><td></td></tr></tfoot>
                            </table>
                            <button id="vaciar-carrito" class="btn btn-warning">Vaciar carrito</button>
                            <button id="finalizar-compra" class="btn btn-success">Finalizar compra</button>
                        `}
                    </div>
                </div>
            </div>
        </div>
    `;

    if (!refresh) {
        document.body.insertAdjacentHTML('beforeend', modalContent);
        const modal = new bootstrap.Modal(document.getElementById('cartModal'));
        modal.show();
    } else {
        const modalBody = document.querySelector('#cartModal .modal-body');
        if (modalBody) {
            modalBody.innerHTML = carrito.length === 0 ? '<p>No hay productos en el carrito.</p>' : `
                <table class="table">
                    <thead><tr><th>Producto</th><th>Cantidad</th><th>Precio unit.</th><th>Subtotal</th><th></th></tr></thead>
                    <tbody>
                        ${carrito.map(item => `
                            <tr>
                                <td>${item.nombre}${item.esRegalo ? ' (Regalo)' : ''}</td>
                                <td>${item.cantidad}</td>
                                <td>$${item.precio.toLocaleString()}</td>
                                <td>$${(item.precio * item.cantidad).toLocaleString()}</td>
                                <td><button class="btn btn-sm btn-danger eliminar-item" data-id="${item.id}" data-regalo="${item.esRegalo}">🗑️</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot><tr><td colspan="3"><strong>Total</strong></td><td><strong>$${calcularTotal().toLocaleString()}</strong></td><td></td></tr></tfoot>
                </table>
                <button id="vaciar-carrito" class="btn btn-warning">Vaciar carrito</button>
                <button id="finalizar-compra" class="btn btn-success">Finalizar compra</button>
            `;
        }
    }
    asignarEventosModal();
}

function asignarEventosModal() {
    document.querySelectorAll('.eliminar-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const esRegalo = btn.dataset.regalo === 'true';
            eliminarDelCarrito(id, esRegalo);
        });
    });
    const vaciarBtn = document.getElementById('vaciar-carrito');
    if (vaciarBtn) vaciarBtn.addEventListener('click', vaciarCarrito);
    const finalizarBtn = document.getElementById('finalizar-compra');
    if (finalizarBtn) finalizarBtn.addEventListener('click', mostrarModalPago);
}

function mostrarModalPago() {
    if (carrito.length === 0) {
        Swal.fire('Carrito vacío', 'Agrega productos antes de finalizar', 'info');
        return;
    }

    // Cerrar modal del carrito
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        const modal = bootstrap.Modal.getInstance(cartModal);
        if (modal) modal.hide();
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
        document.body.classList.remove('modal-open');
    }

    // Mostrar modal de pago simulado
    Swal.fire({
        title: 'Serás redirigido a la página para pagar las clases',
        text: 'Selecciona una opción',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Pagar compra',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#dc3545'
    }).then(result => {
        if (result.isConfirmed) {
            // Simula pago, no hace nada real
            Swal.fire('¡Gracias por tu compra!', 'En breve recibirás un email con los detalles.', 'success');
            vaciarCarrito();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Cancelar: vaciar carrito y cerrar todo
            vaciarCarrito();
            Swal.fire('Carrito vaciado', 'Puedes comenzar de nuevo cuando quieras.', 'info');
        }
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    const viewCartBtn = document.getElementById('view-cart-btn');
    if (viewCartBtn) viewCartBtn.addEventListener('click', () => mostrarCarritoModal(false));
    actualizarContadorCarrito();
});