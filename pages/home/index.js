import { Carrito } from '../../components/carrito.js';
import { Header } from '../../components/header.js';
import { Footer } from '../../components/footer.js';
import { productos as productosBase } from '../../productos.js';

const carrito = document.getElementById('carrito');
const header = document.getElementById('header');
const footer = document.getElementById('footer');

carrito.innerHTML = Carrito();
header.innerHTML = Header();
footer.innerHTML = Footer();

localStorage.setItem('productos-bd', JSON.stringify(productosBase));

const productosJson = localStorage.getItem('productos-bd');
const productos = JSON.parse(productosJson);

const productosContainer = document.getElementById('productos-container');
const todosBtn = document.getElementById('btn-todos');
const cafesBtn = document.getElementById('btn-cafes');
const merchandisingBtn = document.getElementById('btn-merchandising');
const accesoriosBtn = document.getElementById('btn-accesorios');

const clasesActivas = ['bg-[#9a5326]', 'text-white'];
const clasesInactivas = ['bg-[#EEEBE8]', 'text-[#8c7373]'];
const botones = [todosBtn, cafesBtn, merchandisingBtn, accesoriosBtn];

function activarBoton(btnActivo) {
  botones.forEach((btn) => {
    if (btn === btnActivo) {
      btn.classList.add(...clasesActivas);
      btn.classList.remove(...clasesInactivas);
    } else {
      btn.classList.add(...clasesInactivas);
      btn.classList.remove(...clasesActivas);
    }
  });
}

function eventButtonAction(btnAction) {
  let productosRender = null;

  if (btnAction.id === 'btn-todos') {
    productosRender = productos;
  } else if (btnAction.id === 'btn-cafes') {
    productosRender = productos.filter(
      (producto) => producto.categoria === 'cafe',
    );
  } else if (btnAction.id === 'btn-merchandising') {
    productosRender = productos.filter(
      (producto) => producto.categoria === 'merchandising',
    );
  } else if (btnAction.id === 'btn-accesorios') {
    productosRender = productos.filter(
      (producto) => producto.categoria === 'accesorios',
    );
  }

  btnAction.addEventListener('click', () => {
    activarBoton(btnAction);

    productosContainer.innerHTML = productosRender
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
                <span
                  class="uppercase text-xs font-medium ${producto.categoria === 'cafe' ? 'bg-amber-700/80' : producto.categoria === 'merchandising' ? 'bg-amber-500/70' : 'bg-cyan-700/70'} rounded-full py-1.5 px-2"
                >
                  ${producto.categoria}
                </span>
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
                href="/producto.html?id=${producto.id}"
                class="text-xs text-center text-emerald-800 font-semibold border border-emerald-800 rounded-4xl px-4 py-2 transition duration-400 ease-out hover:bg-emerald-800 hover:text-white hover:scale-105"
              >
                ${producto.categoria === 'cafe' ? 'Escoge una Opción' : 'Añadir al Carrito'}
              </a>
            </div>
          </div>
`,
      )
      .join('');
  });
}

productosContainer.innerHTML = productos
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
                <span
                  class="uppercase text-xs font-medium ${producto.categoria === 'cafe' ? 'bg-amber-700/80' : producto.categoria === 'merchandising' ? 'bg-amber-500/70' : 'bg-cyan-700/70'} rounded-full py-1.5 px-2"
                >
                  ${producto.categoria}
                </span>
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

eventButtonAction(todosBtn);
eventButtonAction(cafesBtn);
eventButtonAction(merchandisingBtn);
eventButtonAction(accesoriosBtn);
