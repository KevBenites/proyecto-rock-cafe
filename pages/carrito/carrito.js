import { Header } from '../../components/header.js';
import { Footer } from '../../components/footer.js';

const header = document.getElementById('header');
const footer = document.getElementById('footer');
const carritoSection = document.getElementById('carrito-section');

header.innerHTML = Header();
footer.innerHTML = Footer();

const carritoJson = localStorage.getItem('user-carrito');
const productosJson = localStorage.getItem('productos-bd');
const carrito = JSON.parse(carritoJson);
const productos = JSON.parse(productosJson);

const subTotalCarrito = carrito
  ? carrito
      .map((compra) => compra.cantidadCompra * compra.precioCompra)
      .reduce((acc, a) => acc + a, 0)
  : 0;

let totalCarrito = subTotalCarrito;

carritoSection.innerHTML = `
    <!-- Tabla Mi Carrito -->
        <div class="flex-1">
          <h1 class="mb-6 font-grotesque-mono text-4xl font-bold">
            Mi Carrito
          </h1>
          ${
            subTotalCarrito === 0
              ? `
            <h2 class="text-center text-lg font-grotesque-mono">El carrito esta vacio</h2>
            `
              : `
            <table class="hidden lg:table border border-[#d3ced2] border-t-3 border-t-[#8c7373]">
                <thead class="border border-[#d3ced2]">
                <tr>
                    <th class="py-3 px-5 uppercase text-sm"></th>
                    <th class="py-3 px-5 uppercase text-sm hidden 2xl:table-cell"></th>
                    <th class="py-3 px-5 uppercase text-sm">Producto</th>
                    <th class="py-3 px-5 uppercase text-sm">Precio</th>
                    <th class="py-3 px-5 uppercase text-sm">Cantidad</th>
                    <th class="py-3 px-5 uppercase text-sm">Subtotal</th>
                </tr>
                </thead>
                <tbody class="font-grotesque-mono">
                ${carrito
                  .map((compra) => {
                    const productoComprado = productos.find(
                      (producto) => producto.id === compra.idProducto,
                    );

                    return `
                    <tr class="border-dashed border-b border-[#d3ced2]">
                        <td class="text-center py-3 px-5">
                            <p
                                class="btn-eliminar text-gray-400 text-xl hover:text-red-600/50 hover:font-bold cursor-pointer"
                                data-id="${productoComprado.id}"
                                >
                                x
                            </p>
                        </td>
                        <td class="text-center hidden 2xl:table-cell">
                            <img
                                class="w-26 h-38"
                                src="${productoComprado.imagen}"
                                alt=""
                            />
                        </td>
                        <td class="text-center py-3 px-5">
                            <p>${productoComprado.nombre}</p>
                            <p class="text-sm font-semibold text-gray-700/60">${compra.moliendaCompra === 'sin molienda' ? '' : compra.moliendaCompra}</p>
                        </td>
                        <td class="text-center py-3 px-5 font-bold">$${compra.precioCompra}</td>
                        <td class="text-center py-3 px-5">${compra.cantidadCompra}</td>
                        <td class="text-center py-3 px-5 font-bold">$${compra.precioCompra * compra.cantidadCompra}</td>
                    </tr>
                    `;
                  })
                  .join('')}
                </tbody>
          </table>
          <table class=" lg:hidden w-full border border-[#d3ced2] border-t-3 border-t-[#8c7373]">
            <tbody class="font-grotesque-mono">
                ${carrito
                  .map((compra) => {
                    const productoComprado = productos.find(
                      (producto) => producto.id === compra.idProducto,
                    );

                    return `
                    <tr>
                        <th 
                        class="btn-eliminar py-3 px-5 text-start text-gray-400 text-xl hover:text-red-600/50 hover:font-bold cursor-pointer"
                        data-id="${productoComprado.id}"
                            x
                        </th>
                        <td></td>
                    </tr>
                    <tr>
                        <th class="py-3 pr-5 uppercase text-sm text-gray-600">Producto</th>
                        <td><p>${productoComprado.nombre}</p>
                        <p class="text-sm font-semibold text-gray-700/60">${compra.moliendaCompra === 'sin molienda' ? '' : compra.moliendaCompra}</p></td>
                    </tr>
                    <tr>
                        <th class="py-3 pr-5 uppercase text-sm text-gray-600">Precio</th>
                        <td class="font-bold">$${compra.precioCompra}</tr>
                    </tr>
                    <tr>
                        <th class="py-3 pr-5 uppercase text-sm text-gray-600">Cantidad</th>
                        <td>${compra.cantidadCompra}</tr>
                    <tr class="border-dashed border-b border-[#d3ced2]">
                        <th class="py-3 pr-5 uppercase text-sm text-gray-600">Subtotal</th>
                        <td class="font-bold">$${compra.precioCompra * compra.cantidadCompra}</tr>
                    </tr>
                    `;
                  })
                  .join('')}
            </tbody>
          </table>
            `
          }
          
          </div>
        <!-- Tabla de Totales -->
        <div class="flex-1 mt-10 lg:mt-0.5">
          <h2 class="mb-6 font-grotesque-mono text-2xl font-bold">
            Total del Carrito
          </h2>
          <table class="w-full xl:w-120 border border-[#d3ced2] border-t-3 border-t-[#8c7373] mb-4">
            <tbody class="font-grotesque-mono">
              <tr>
                <th class="py-3 px-5 uppercase text-sm text-gray-600">
                  SubTotal
                </th>
                <td class="font-bold">$${subTotalCarrito}</td>
              </tr>
              ${
                subTotalCarrito === 0
                  ? ``
                  : `<tr>
                <th class="py-3 px-5 uppercase text-sm text-gray-600">Envio</th>
                <td>
                  <ul>
                    <li>
                      <input
                        type="radio"
                        id="op1"
                        name="envio"
                        value="10"
                        
                      />
                      <label for="op1">Envío a Lima Metropolitana (+$10)</label>
                    </li>
                    <li>
                      <input type="radio" id="op2" name="envio" value="15" />
                      <label for="op2">Envío a Provincia (+$15)</label>
                    </li>
                    <li>
                      <input type="radio" id="op3" name="envio" value="0" checked/>
                      <label for="op3">Recojo en Local (Gratis)</label>
                    </li>
                  </ul>
                </td>
              </tr>`
              }
              <tr>
                <th class="py-3 px-5 uppercase text-sm text-gray-600">Total</th>
                <td id="precioTotalCarrito" class="font-bold">$${totalCarrito}</td>
              </tr>
            </tbody>
          </table>
          <button id="btn-finalizar" class="cursor-pointer w-full bg-green-700 text-white border-4 border-white shadow-[0px_3px_8px_rgba(0,0,0,0.24)] font-grotesque-mono font-bold text-base xl:w-120 py-2 rounded-2xl transition duration-300 ease-in active:scale-105 ${subTotalCarrito === 0 ? `hidden` : ``}">Finalizar Compra</button>
        </div>
`;

const radios = document.querySelectorAll('input[name="envio"]');
const precioTotalCarrito = document.getElementById('precioTotalCarrito');

const btnFinalizar = document.getElementById('btn-finalizar');

radios.forEach((radio) => {
  radio.addEventListener('change', (e) => {
    const envio = Number(e.target.value);
    totalCarrito = subTotalCarrito + envio;
    precioTotalCarrito.textContent = `$${totalCarrito}`;
  });
});

function eliminarProducto(id) {
  const index = carrito.findIndex((item) => item.idProducto === id);

  if (index === -1) return;

  const compraEliminada = carrito[index];

  const producto = productos.find((p) => p.id === compraEliminada.idProducto);

  if (producto) {
    producto.stock += compraEliminada.cantidadCompra;
  }

  const nuevoCarrito = carrito.filter((item) => item.idProducto !== id);

  localStorage.setItem('user-carrito', JSON.stringify(nuevoCarrito));
  localStorage.setItem('productos-bd', JSON.stringify(productos));
  window.location.reload();
}

function finalizarCompra() {
  alert('Compra exitosa 🎆🎉');

  localStorage.removeItem('user-carrito');

  window.location.href = '/index.html';
}

carritoSection.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-eliminar')) {
    const id = Number(e.target.dataset.id);
    eliminarProducto(id);
  }
});

btnFinalizar?.addEventListener('click', finalizarCompra);
