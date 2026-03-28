export function Carrito() {
  const carritoJson = localStorage.getItem('user-carrito');
  const carrito = JSON.parse(carritoJson);
  let totalInicial = 0;
  const sumaTotal = carrito
    ? carrito
        .map((compra) => compra.cantidadCompra)
        .reduce((acc, a) => acc + a, totalInicial)
    : 0;

  return `
    <div class="rounded-full fixed bottom-20 right-5 z-50">
      <a href="/pages/carrito/carrito.html">
        <img
          class="w-14 h-14 rounded-4xl shadow-[0px_5px_15px_rgba(0,0,0,0.65)] bg-white p-2"
          src="/assets/Cart-Item.png"
          alt=""
        />
        <div
          class="absolute text-sm -left-1 -bottom-2.5 bg-amber-400 rounded-full w-5 h-5 p-3 flex justify-center items-center"
        >
          <span class="font-grotesque">${sumaTotal}</span>
        </div>
      </a>
    </div>
    `;
}
