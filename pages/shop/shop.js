import { Carrito } from '../../components/carrito.js';
import { Header } from '../../components/header.js';
import { Footer } from '../../components/footer.js';
import { productos } from '../../productos.js';

const section = document.querySelector('.section');
const container = section.firstElementChild;

const carrito = document.getElementById('carrito');
const header = document.getElementById('header');
const footer = document.getElementById('footer');

carrito.innerHTML = Carrito();
header.innerHTML = Header();
footer.innerHTML = Footer();

let productosRender = null;

if (container.id === 'cafes-container') {
  productosRender = productos.filter(
    (producto) => producto.categoria === 'cafe',
  );
} else if (container.id === 'merchandising-container') {
  productosRender = productos.filter(
    (producto) => producto.categoria === 'merchandising',
  );
} else if (container.id === 'accesorios-container') {
  productosRender = productos.filter(
    (producto) => producto.categoria === 'accesorios',
  );
}

container.innerHTML = productosRender
  .map(
    (producto) => `
        <div
            class="flex flex-col border border-gray-300/50 overflow-hidden rounded-2xl gap-2 transition-transform duration-400 hover:-translate-y-4"
          >
            <div class="group card-container">
              <img class="w-full h-full object-contain transition duration-700 group-hover:scale-110" src="${producto.imagen}" />
              <div class="card-image-hoverColor"></div>
              <p class="card-image-hoverParagraph">
                ${producto.descripcion}
              </p>
            </div>
            <div
              class="flex h-40 justify-between items-center px-5 py-3 gap-6 md:gap-10 lg:gap-13 font-grotesque-mono"
            >
              <div class="h-50 flex flex-col justify-center items-start gap-1.5">
                <p class="uppercase text-xs">${producto.categoria === 'cafe' ? `Filtro - ${producto.origen?.region}` : `Marca: ${producto.marca}`}</p>
                <h3 class="text-xs font-semibold ${producto.categoria === 'cafe' ? '' : 'hidden'}">NOTAS: ${producto.notas?.join(', ') || ''}</h3>
                <h3 class="text-sm font-semibold uppercase">${producto.nombre}</h3>
                <p class="text-sm font-medium">${
                  producto.categoria === 'cafe'
                    ? `$${producto.precio?.['250g']?.toFixed(2)}`
                    : typeof producto.precio === 'number'
                      ? `$${producto.precio.toFixed(2)}`
                      : 'Sin Precio'
                }</p>
              </div>
              <a
                href="/pages/producto/producto.html?id=${producto.id}"
                class="text-xs text-center text-emerald-800 font-semibold border border-emerald-800 rounded-4xl px-4 py-2 transition duration-400 ease-out hover:bg-emerald-800 hover:text-white hover:scale-105"
              >
                ${producto.categoria === 'cafe' ? 'Escoge una Opción' : 'Añadir al Carrito'}
              </a>
            </div>
          </div>
`,
  )
  .join('');
