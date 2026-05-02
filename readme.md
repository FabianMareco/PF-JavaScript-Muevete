# 🧘 MUEVETE – Simulador de compra con JavaScript vanilla

Aplicación web interactiva desarrollada con HTML, CSS y JavaScript puro,
orientada a la simulación de compra de packs de clases de movimiento y
cursos de nutrición.

## 🚀 Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 + CSS3 | Estructura y estilos |
| JavaScript (ES6+) | Lógica, DOM y manejo de datos |
| Fetch API | Carga dinámica desde `packs.json` |
| localStorage | Persistencia del carrito |
| SweetAlert2 | Modales de confirmación y pago |
| Toastify | Notificaciones de usuario |
| Live Server | Servidor local de desarrollo |

## ✨ Funcionalidades

- 🏋️ 15 cards de disciplinas en `clases.html`
- 📦 Packs cargados dinámicamente desde `data/packs.json` vía `fetch`
- 🛒 Carrito persistente con `localStorage`
- 🎁 Opción de compra como regalo con generación de código de Gift Card
- 🔀 Pestañas para alternar entre packs de movimiento y nutrición
- 🔽 Scroll suave hacia la sección de packs desde los botones de disciplina
- 💳 Modal de pago simulado al finalizar la compra
- 📬 Formulario de contacto estilizado

> Sin backend — todo el código es HTML/CSS/JS estático.

## 📁 Estructura del proyecto
```
Javascriptproyectofinalmareco/
├── index.html
├── pages/
│   ├── nosotros.html
│   ├── clases.html
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
├── multimedia/
└── fonts/
```

## ⚙️ Requisitos

- Navegador moderno (Chrome, Firefox, Edge)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
  para evitar errores de CORS al cargar el JSON local

## 🔧 Cómo ejecutar

1. Clonar o descargar el repositorio
2. Abrir la carpeta en Visual Studio Code
3. Click derecho sobre `pages/clases.html` → **Open with Live Server**
4. La app se abre en `http://127.0.0.1:5500/pages/clases.html`

> No requiere instalación de dependencias ni comandos en terminal.

## 🧪 Flujo de prueba

1. Desde `clases.html`, hacer clic en **"COMPRAR CLASES PARA MOVERSE"**
   o **"COMPRAR CURSOS O ASESORÍAS"** para ir a los packs
2. En cualquier pack, clic en **"Comprar"** → elegir cantidad y si es regalo
3. Confirmar → aparece notificación de ítem agregado
4. Abrir el carrito con el botón flotante 🛒 (esquina inferior derecha)
5. Desde el carrito: eliminar ítems, vaciar o finalizar compra
6. Al finalizar se muestra el modal de pago simulado
