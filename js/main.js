// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // Microinteracción para tarjetas interactivas (Efecto de iluminación interna)
    const activeCards = document.querySelectorAll('.card-glow, .card-hover');
    
    activeCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
/**
 * ========================================================
 * CONTROLADOR DE FORMULARIOS - REDIRECCIÓN A WHATSAPP
 * ========================================================
 */

// Teléfono global (Reemplázalo con tu número real, con código de país y sin el +)
const TELEFONO_WHATSAPP = "573025277150"; 

// 1. LÓGICA DEL MODAL DE COTIZACIÓN (Para index.html)
const initQuoteModal = () => {
    const modal = document.getElementById('quote-modal');
    const modalContainer = document.getElementById('modal-container');
    const closeBtn = document.getElementById('close-modal');
    const serviceNameText = document.getElementById('modal-service-name');
    const serviceInput = document.getElementById('modal-service-input');
    const quoteForm = document.getElementById('modal-quote-form');
    const triggerButtons = document.querySelectorAll('.trigger-quote-modal');

    if (!modal || !closeBtn || !modalContainer) return;

    const openModal = (serviceName) => {
        if (serviceNameText) serviceNameText.textContent = serviceName;
        if (serviceInput) serviceInput.value = serviceName;
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modalContainer.classList.remove('scale-95');
        modalContainer.classList.add('scale-100');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modalContainer.classList.remove('scale-100');
        modalContainer.classList.add('scale-95');
        document.body.style.overflow = '';
    };

    triggerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const service = button.getAttribute('data-service') || 'Servicio General';
            openModal(service);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const servicio = document.getElementById('modal-service-input').value;
            const nombre = quoteForm.querySelector('input[type="text"]').value;
            const correo = quoteForm.querySelector('input[type="email"]').value;
            
            const mensaje = `Hola, mi nombre es *${nombre}*.\n\nMe interesa solicitar una cotización para el servicio de: *${servicio}*.\n\nMi correo de contacto es: _${correo}_\n\n¡Quedo atento a tu respuesta!`;
            const urlWhatsApp = `https://api.whatsapp.com/send?phone=${TELEFONO_WHATSAPP}&text=${encodeURIComponent(mensaje)}`;
            
            window.open(urlWhatsApp, '_blank');
            quoteForm.reset();
            closeModal();
        });
    }
};

// 2. LÓGICA DEL FORMULARIO PRINCIPAL DE CONTACTO (Para contacto.html)
const initContactForm = () => {
    // Busca el formulario en la página de contacto (asegúrate de que tu <form> en contacto.html tenga un id o usa selectores)
    const contactForm = document.querySelector('form'); 

    if (!contactForm || contactForm.id === 'modal-quote-form') return; // Si no existe o es el del modal, salir

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Extraer los datos de las entradas basándonos en tu diseño visual
        const nombre = contactForm.querySelector('input[type="text"]').value;
        const correo = contactForm.querySelector('input[type="email"]').value;
        const mensajeUsuario = contactForm.querySelector('textarea').value;

        // Construir un mensaje estructurado y limpio para leer en WhatsApp
        const mensajeWhatsApp = `¡Hola JamDev!\n\nUn usuario ha enviado un mensaje desde el formulario de contacto de tu portafolio:\n\n👤 *Nombre:* ${nombre}\n📧 *Email:* _${correo}_\n\n💬 *Mensaje:* \n"${mensajeUsuario}"`;

        // Generar URL segura
        const urlWhatsApp = `https://api.whatsapp.com/send?phone=${TELEFONO_WHATSAPP}&text=${encodeURIComponent(mensajeWhatsApp)}`;

        // Abrir chat en nueva pestaña
        window.open(urlWhatsApp, '_blank');

        // Opcional: Limpiar el formulario
        contactForm.reset();
    });
};

// Inicializar componentes al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    initQuoteModal();
    initContactForm();
});

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (menuBtn && mobileMenu && menuIcon) {
        menuBtn.addEventListener('click', () => {
            // Alterna la visibilidad del menú móvil
            mobileMenu.classList.toggle('hidden');
            
            // Cambia el icono de hamburguesa (menu) a una cruz (close) dinámicamente
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.textContent = 'menu';
            } else {
                menuIcon.textContent = 'close';
            }
        });
    }
});
// Botón flotante de WhatsApp en todas las páginas
document.addEventListener('DOMContentLoaded', () => {
    const texto = encodeURIComponent('Hola, vengo de jamdev.store y quiero cotizar una página web');
    const boton = document.createElement('a');
    boton.className = 'wa-float';
    boton.href = `https://wa.me/${TELEFONO_WHATSAPP}?text=${texto}`;
    boton.target = '_blank';
    boton.rel = 'noopener';
    boton.setAttribute('aria-label', 'Escribir por WhatsApp');
    boton.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.3Z"/></svg><span>Cotizar por WhatsApp</span>';
    document.body.appendChild(boton);
});
