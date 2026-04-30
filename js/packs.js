const contenedorMovimiento = document.getElementById('packs-container-movimiento');
const contenedorNutricion = document.getElementById('packs-container-nutricion');

async function cargarPacks() {
    try {
        const response = await fetch('../data/packs.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const packs = await response.json();
        window.packsData = packs;
        mostrarPacks(packs);
    } catch (error) {
        console.error('Error al cargar packs:', error);
        const errorMsg = '<p class="text-center text-danger">Error al cargar packs. Revisa la consola.</p>';
        contenedorMovimiento.innerHTML = errorMsg;
        contenedorNutricion.innerHTML = errorMsg;
    }
}

function mostrarPacks(packs) {
    const packsMovimiento = packs.filter(p => p.categoria === 'clases');
    const packsNutricion = packs.filter(p => p.categoria === 'nutricion');

    contenedorMovimiento.innerHTML = '';
    packsMovimiento.forEach(pack => contenedorMovimiento.appendChild(crearCardPack(pack, 'movimiento')));

    contenedorNutricion.innerHTML = '';
    packsNutricion.forEach(pack => contenedorNutricion.appendChild(crearCardPack(pack, 'nutricion')));

    // Reasignar eventos después de renderizar
    document.querySelectorAll('.btn-comprar').forEach(btn => {
        btn.removeEventListener('click', manejarCompra);
        btn.addEventListener('click', manejarCompra);
    });
}

function crearCardPack(pack, tipo) {
    const card = document.createElement('div');
    card.classList.add('pack-card');
    const icono = tipo === 'movimiento' ? '💃' : '🥗';
    card.innerHTML = `
        <h5>${icono} ${pack.nombre}</h5>
        <p>${pack.descripcion}</p>
        <div class="pack-price">$${pack.precio.toLocaleString()}</div>
        <button class="btn btn-success btn-comprar" data-id="${pack.id}">Comprar</button>
    `;
    return card;
}

function manejarCompra(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    if (window.packsData) {
        const pack = window.packsData.find(p => p.id === id);
        if (pack) abrirModalCompra(pack);
        else console.error('Pack no encontrado');
    } else {
        console.error('window.packsData no disponible');
    }
}

cargarPacks();