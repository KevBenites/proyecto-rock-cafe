export function Header() {
  return `
    <header
      class="h-auto lg:fixed static top-0 left-0 right-0 z-50 bg-[#f9f7f5]/60 pt-4 pb-2 px-8 backdrop-blur-md"
    >
      <nav
        class="navbar flex flex-col lg:flex-row gap-2.5 lg:gap-0 justify-between items-center"
      >
        <a href="/pages/home/index.html" class="text-4xl font-grotesque">
          Rock Café
        </a>

        <ul
          class="flex flex-col lg:flex-row items-center justify-center text-center gap-1 xl:gap-22 lg:gap-10"
        >
          <!-- SHOP -->
          <li
            class="group flex flex-col font-bold font-grotesque-mono relative"
          >
            <a
              href="#productos-section"
              class="uppercase text-base tracking-[2px] p-4 text-[#5a4a42] hover:text-[#90775b]"
            >
              Shop
            </a>
            <ul
              class="overflow-hidden max-h-0 flex flex-col items-center transition-all duration-500 ease-in-out group-hover:max-h-40 group-hover:pt-2"
            >
              <li
                class="text-sm text-[#6b5b52] hover:text-[#6f4e37] py-2.5 cursor-pointer"
              >
                <a href="/pages/shop/cafes.html">Nuestros cafés</a>
              </li>
              <li
                class="text-sm text-[#6b5b52] hover:text-[#6f4e37] py-2.5 cursor-pointer"
              >
                <a href="/pages/shop/merchandising.html">Merchandising</a>
              </li>
              <li
                class="text-sm text-[#6b5b52] hover:text-[#6f4e37] py-2.5 cursor-pointer"
              >
                <a href="/pages/shop/accesorios.html">Accesorios</a>
              </li>
            </ul>
          </li>
          <!-- CURSOS -->
          <li
            class="group flex flex-col font-bold font-grotesque-mono relative"
          >
            <a
              href="#cursos-section"
              class="uppercase tracking-[2px] text-base p-4 text-[#5a4a42] hover:text-[#90775b]"
            >
              Cursos
            </a>
          </li>
          <!-- SEDES -->
          <li
            class="group flex flex-col font-bold font-grotesque-mono relative"
          >
            <a
              href="/pages/cafeterias/cafeterias.html"
              class="uppercase tracking-[2px] text-base p-4 text-[#5a4a42] hover:text-[#90775b]"
            >
              Cafeterias
            </a>
          </li>
          <!-- CONTACTO -->
          <li class="flex font-bold font-grotesque-mono">
            <a
              href="#contacto"
              class="uppercase tracking-[2px] text-base p-4 text-[#5a4a42] hover:text-[#90775b]"
            >
              Contacto
            </a>
          </li>
        </ul>
      </nav>
    </header>
  `;
}
