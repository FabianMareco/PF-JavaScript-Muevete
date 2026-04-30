function abrirModalCompra(pack) {
    let inputOptions = {};
    if (pack.tipo === 'unidad' || pack.tipo === 'servicio') {
        Swal.fire({
            title: `Comprar ${pack.nombre}`,
            html: `
                <p>Precio: $${pack.precio.toLocaleString()}</p>
                <label><input type="checkbox" id="esRegalo"> Es un regalo</label>
                <div id="emailRegaloDiv" style="display:none; margin-top:10px;">
                    <input type="email" id="emailRegalo" class="swal2-input" placeholder="Email del destinatario">
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Agregar al carrito',
            preConfirm: () => {
                const esRegalo = document.getElementById('esRegalo').checked;
                let email = '';
                if (esRegalo) {
                    email = document.getElementById('emailRegalo').value;
                    if (!email) {
                        Swal.showValidationMessage('Debes ingresar un email para el regalo');
                        return false;
                    }
                }
                return { esRegalo, email };
            },
            didOpen: () => {
                const cb = document.getElementById('esRegalo');
                const divEmail = document.getElementById('emailRegaloDiv');
                cb.addEventListener('change', () => {
                    divEmail.style.display = cb.checked ? 'block' : 'none';
                });
            }
        }).then(result => {
            if (result.isConfirmed) {
                const { esRegalo, email } = result.value;
                const item = {
                    id: pack.id,
                    nombre: pack.nombre,
                    precio: pack.precio,
                    tipo: pack.tipo,
                    categoria: pack.categoria,
                    esRegalo: esRegalo,
                    emailRegalo: email || null
                };
                agregarAlCarrito(item);
            }
        });
    } else if (pack.tipo === 'paquete' || pack.tipo === 'suscripcion') {
        Swal.fire({
            title: `Comprar ${pack.nombre}`,
            html: `
                <p>Precio unitario: $${pack.precio.toLocaleString()}</p>
                <input id="cantidad" type="number" min="1" max="3" value="1" class="swal2-input" placeholder="Cantidad">
                <label><input type="checkbox" id="esRegalo"> Es un regalo</label>
                <div id="emailRegaloDiv" style="display:none; margin-top:10px;">
                    <input type="email" id="emailRegalo" class="swal2-input" placeholder="Email del destinatario">
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Agregar al carrito',
            preConfirm: () => {
                const cantidad = parseInt(document.getElementById('cantidad').value);
                if (isNaN(cantidad) || cantidad < 1 || cantidad > 3) {
                    Swal.showValidationMessage('Cantidad inválida (1-3)');
                    return false;
                }
                const esRegalo = document.getElementById('esRegalo').checked;
                let email = '';
                if (esRegalo) {
                    email = document.getElementById('emailRegalo').value;
                    if (!email) {
                        Swal.showValidationMessage('Debes ingresar un email para el regalo');
                        return false;
                    }
                }
                return { cantidad, esRegalo, email };
            },
            didOpen: () => {
                const cb = document.getElementById('esRegalo');
                const divEmail = document.getElementById('emailRegaloDiv');
                cb.addEventListener('change', () => {
                    divEmail.style.display = cb.checked ? 'block' : 'none';
                });
            }
        }).then(result => {
            if (result.isConfirmed) {
                const { cantidad, esRegalo, email } = result.value;
                for (let i = 0; i < cantidad; i++) {
                    const item = {
                        id: pack.id,
                        nombre: pack.nombre,
                        precio: pack.precio,
                        tipo: pack.tipo,
                        categoria: pack.categoria,
                        esRegalo: esRegalo,
                        emailRegalo: email || null
                    };
                    agregarAlCarrito(item);
                }
            }
        });
    }
}