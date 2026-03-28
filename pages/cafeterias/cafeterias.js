import { Carrito } from '../../components/carrito.js';
import { Header } from '../../components/header.js';
import { Footer } from '../../components/footer.js';

const carrito = document.getElementById('carrito');
const header = document.getElementById('header');
const footer = document.getElementById('footer');

carrito.innerHTML = Carrito();
header.innerHTML = Header();
footer.innerHTML = Footer();
