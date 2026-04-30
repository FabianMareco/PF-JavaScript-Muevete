📄 README – Proyecto JavaScript: Simulador de compra "MUEVETE"

🧩 Alcance del proyecto 

Este proyecto corresponde a la parte de JavaScript del trabajo final de la diplomatura. Se desarrolló una página web interactiva que simula la compra de packs de clases de movimiento y cursos de nutrición. Incluye:

Página clases.html con 15 cards de disciplinas.

Sección de packs cargados dinámicamente desde un archivo packs.json usando fetch.

Carrito de compras persistente en localStorage.

Opción de compra como regalo con generación de código de Gift Card.

Notificaciones con Toastify y modales con SweetAlert2.

Pestañas para alternar entre packs de movimiento y packs de nutrición.

Botones de "IR A UNA CLASE" que hacen scroll suave a la sección de packs.

Totalización correcta del carrito y finalización de compra con modal de pago simulado.

Formulario de contacto centrado y estilizado.

No incluye backend, solo frontend estático.

📁 Estructura de archivos (solo los creados/modificados)
text
Javascriptproyectofinalmareco/
├── index.html
├── pages/
│   ├── nosotros.html
│   ├── clases.html          ← principal (con packs y carrito)
│   ├── contactanos.html
│   └── ingreso a la plataforma.html
├── css/
│   └── estilos.css
├── js/
│   ├── packs.js
│   ├── carrito.js
│   └── main.js
├── data/
│   └── packs.json
├── multimedia/               (imágenes originales)
└── fonts/                    (fuentes originales)

⚙️ Requisitos para ejecutar
Navegador web moderno (Chrome, Firefox, Edge).

Servidor local (recomendado: Live Server de VSCode) para evitar problemas de CORS al cargar packs.json.


🚀 Pasos para ejecutar
Descargar o clonar la carpeta Javascriptproyectofinalmareco.

Abrir la carpeta en Visual Studio Code.

Instalar la extensión Live Server (si no está instalada).

Hacer clic derecho sobre pages/clases.html → Open with Live Server.

La página se abrirá en el navegador en http://127.0.0.1:5500/pages/clases.html.

Probar los packs, agregar al carrito, finalizar compra, etc.

Nota: No es necesario ejecutar ningún comando en terminal. Todo el código es HTML/CSS/JS puro.


🧪 ¿Cómo probar el flujo completo?
En la página clases.html, hacer clic en "COMPRAR CLASES PARA MOVERSE" o "COMPRAR CURSOS O ASESORÍAS".

En cualquier pack, hacer clic en "Comprar". Se abre un modal para elegir cantidad (si aplica) y marcarlo como regalo.

Confirmar. Aparece una notificación de "agregado al carrito".

Hacer clic en el botón flotante 🛒 (abajo a la derecha) para ver el carrito.

Eliminar ítems, vaciar carrito o finalizar compra.

Al finalizar, se muestra un modal de pago simulado. Si se cancela, el carrito se vacía.


✅ Cumplimiento de consignas de JavaScript
Objetos y arrays, métodos map, filter, find, reduce.

Funciones, condicionales, iteradores.

Manipulación dinámica del DOM (renderizado de packs y carrito).

Eventos (click, change).

Sintaxis avanzada (arrow functions, destructuring, spread, async/await).

Librerías: SweetAlert2, Toastify.

Promesas y fetch para cargar packs.json.

Datos desde JSON local.

