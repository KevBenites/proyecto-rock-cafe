export function Footer() {
  return `
    <footer class="bg-[#271d15]/90 py-8">
      <div class="w-[90%] mx-auto">
        <div class="flex flex-col md:flex-row text-white mb-6 gap-8">
          <div class="flex flex-1 flex-col gap-2">
            <span class="text-3xl font-grotesque">Rock Café</span>
            <p>
              Café de especialidad tostado con pasión. Desde el origen hasta tu
              taza.
            </p>
          </div>
          <div class="flex flex-1 flex-col gap-1">
            <p class="uppercase tracking-[1px] text-base font-grotesque mb-1">
              Tienda
            </p>
            <ul>
              <li class="text-sm mb-1"><a href="">Café</a></li>
              <li class="text-sm mb-1"><a href="">Equipamiento</a></li>
              <li class="text-sm mb-1"><a href="">Merchandising</a></li>
            </ul>
          </div>
          <div class="flex flex-1 flex-col gap-1">
            <p class="uppercase tracking-[1px] text-base font-grotesque mb-1">
              Cursos
            </p>
            <ul>
              <li class="text-sm mb-1">Talleres</li>
              <li class="text-sm mb-1">Curso de Barista</li>
              <li class="text-sm">Catación</li>
            </ul>
          </div>
          <div class="flex flex-1 flex-col gap-1">
            <p class="uppercase tracking-[1px] text-base font-grotesque mb-1">
              Contacto
            </p>
            <ul>
              <li class="text-sm mb-1">hola@origencafe.com</li>
              <li class="text-sm mb-1">+51 999 555 234</li>
              <li class="text-sm">Lima, Perú</li>
            </ul>
          </div>
        </div>

        <hr class="text-white/40" />

        <p class="text-center text-white/50 text-xs py-3">
          © 2026 Rock Café - Todos los derechos reservados
        </p>
      </div>
    </footer>
    `;
}
