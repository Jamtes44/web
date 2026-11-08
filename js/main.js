// js/main.js

// Número de WhatsApp con código de país y sin el +
const TELEFONO_WHATSAPP = "573025277150";
const enlaceWhatsApp = (texto) => `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(texto)}`;

document.addEventListener('DOMContentLoaded', () => {
    // Menú móvil
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    if (menuBtn && mobileMenu && menuIcon) {
        menuBtn.addEventListener('click', () => {
            const abierto = mobileMenu.classList.toggle('hidden') === false;
            menuIcon.textContent = abierto ? 'close' : 'menu';
            menuBtn.setAttribute('aria-expanded', String(abierto));
        });
    }

    // Formulario de contacto: abre WhatsApp con el mensaje listo
    const contactForm = document.getElementById('portfolio-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = contactForm.querySelector('#contact-name').value;
            const correo = contactForm.querySelector('#contact-email').value;
            const mensaje = contactForm.querySelector('#contact-message').value;
            const texto = `¡Hola JamDev!\n\n👤 *Nombre:* ${nombre}\n📧 *Correo:* _${correo}_\n\n💬 *Mensaje:*\n"${mensaje}"`;
            window.open(enlaceWhatsApp(texto), '_blank');
            contactForm.reset();
        });
    }

    // Botón flotante de WhatsApp en todas las páginas
    const boton = document.createElement('a');
    boton.className = 'wa-float';
    boton.href = enlaceWhatsApp('Hola, vengo de jamdev.store y quiero cotizar una página web');
    boton.target = '_blank';
    boton.rel = 'noopener';
    boton.setAttribute('aria-label', 'Escribir por WhatsApp');
    boton.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.3Z"/></svg><span>Cotizar por WhatsApp</span>';
    document.body.appendChild(boton);
});
