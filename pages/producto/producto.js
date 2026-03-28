import { Carrito } from '../../components/carrito.js';
import { Header } from '../../components/header.js';
import { Footer } from '../../components/footer.js';

const carrito = document.getElementById('carrito');
const header = document.getElementById('header');
const footer = document.getElementById('footer');

carrito.innerHTML = Carrito();
header.innerHTML = Header();
footer.innerHTML = Footer();

const params = new URLSearchParams(window.location.search);
const idProducto = params.get('id');
const idProductoNumber = Number(idProducto);

const productoSeccion = document.getElementById('producto-section');

const productosJson = localStorage.getItem('productos-bd');
const productos = JSON.parse(productosJson);
const producto = productos.find((producto) => producto.id === idProductoNumber);

let precioProducto =
  producto.categoria === 'cafe' ? producto.precio['250g'] : producto.precio;

// Renderizacion de producto-section
productoSeccion.innerHTML = `
        <!-- Imagen de Producto -->
        <div class="flex-1 flex justify-center items-center">
          <img class="h-auto lg:h-170" src="${producto.imagen}" alt="" />
        </div>
        <!-- Descripción del Producto -->
        <div class="flex-1 flex flex-col gap-6 font-grotesque-mono">
          <h1 class="text-4xl">${producto.nombre} - ${producto.proceso}</h1>
          <p class="text-sm">
           ${producto.descripcion}
          </p>
          <ul class="text-sm flex flex-col gap-1.5">
            ${
              producto.categoria === 'cafe'
                ? `<li>
                    <strong>Origen:</strong>
                    ${producto.origen.finca} - ${producto.origen.region} - ${producto.origen.pais}
                    </li>
                    <li>
                        <strong>Altitud:</strong>
                        ${producto.altitud}
                    </li>
                    <li>
                        <strong>Notas:</strong>
                        ${producto.notas.map((nota) => nota.charAt(0).toUpperCase() + nota.slice(1)).join(', ')}
                    </li>
                    <li>
                        <strong>Presentación:</strong>
                        ${producto.presentacion.map((tipo) => tipo.charAt(0).toUpperCase() + tipo.slice(1)).join(' o ')}
                    </li>
                    <li>
                        <strong>Tueste:</strong>
                        ${producto.tueste.charAt(0).toUpperCase() + producto.tueste.slice(1)}
                    </li>
                    <li>
                        <strong>Puntaje:</strong>
                        ${producto.puntajeCata} puntos
                    </li>
                    <li>
                        <strong>Peso:</strong>
                        ${Object.keys(producto.precio).join(' - ')}
                    </li>
                    
                `
                : `
                    <li>
                        <strong>Marca:</strong>
                        ${producto.marca}
                    </li>
                `
            }
          </ul>

          <p id="precio" class="text-2xl font-bold">$${precioProducto.toFixed(2)}</p>

          <p class="text-lg font-bold ${
            producto.stock === 0
              ? 'text-red-800'
              : producto.stock <= 5
                ? 'text-red-600/70'
                : producto.stock <= 10
                  ? 'text-orange-600/70'
                  : 'text-black'
          }">
            ${producto.stock === 0 ? 'Sin stock' : `${producto.stock} unidades`}
          </p>

          ${
            producto.categoria === 'cafe'
              ? `
                <div class="flex flex-col gap-2">
                    <p class="text-sm uppercase font-bold">
                        Elige la molienda
                    </p>
                    <div class="text-sm flex gap-1.5">
                        <p>Molienda:</p>
                        <select class="border border-black/80 rounded-lg" name="moliendaCompra" id="moliendaCompra">
                            ${producto.presentacion.map(
                              (tipo) => `
                                <option value="${tipo}">${tipo}</option>
                                `,
                            )}
                        </select>
                    </div>
                </div>
                `
              : ``
          }

          <div class="flex justify-start gap-6">
            <input
              class="border border-gray-700/60 w-12 text-center rounded-md"
              type="number"
              value="1"
              min="1"
              name="cantidadCompra"
              id="cantidadCompra"
            />
            <a
              class="text-xs text-center bg-emerald-800 text-white font-semibold border-2 border-black rounded-4xl px-4 py-2 transition-transform hover:scale-110 cursor-pointer"
              id="btn-agregar"
              >
              Añadir al carrito
            </a>
          </div>
        </div>
`;

const btnAgregar = document.getElementById('btn-agregar');
const cantidadProducto = document.getElementById('cantidadCompra');
const moliendaProducto = document.getElementById('moliendaCompra');
const getCartItems = localStorage.getItem('user-carrito');

let carritoProducto = getCartItems ? JSON.parse(getCartItems) : [];
let productoAgregado = {
  cantidadCompra: Number(cantidadCompra.value),
  moliendaCompra: moliendaProducto ? moliendaCompra.value : 'sin molienda',
};

cantidadProducto.addEventListener('change', (e) => {
  productoAgregado[e.target.name] = Number(e.target.value);
});

moliendaProducto?.addEventListener('change', (e) => {
  productoAgregado[e.target.name] = e.target.value;
});

function agregarAlCarrito() {
  if (producto.stock < productoAgregado['cantidadCompra']) {
    alert('Stock insuficiente');
    return;
  }

  const existeEnCarrito = carritoProducto.find(
    (compra) => compra.idProducto === producto.id,
  );

  if (
    existeEnCarrito &&
    existeEnCarrito.moliendaCompra === productoAgregado['moliendaCompra']
  ) {
    existeEnCarrito.cantidadCompra += productoAgregado['cantidadCompra'];
  } else {
    const idCompra = crypto.randomUUID();

    carritoProducto.push({
      idProducto: producto.id,
      idCompra,
      ...productoAgregado,
      precioCompra: precioProducto,
    });
  }

  producto.stock -= productoAgregado['cantidadCompra'];
  const index = productos.findIndex((p) => p.id === producto.id);
  productos[index] = producto;

  localStorage.setItem('productos-bd', JSON.stringify(productos));
  localStorage.setItem('user-carrito', JSON.stringify(carritoProducto));

  window.location.href = '/pages/carrito/carrito.html';
}

btnAgregar.addEventListener('click', () => {
  agregarAlCarrito();
});
