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
 * ==========================================
 * CONTROLLER: CONTACT MODULE
 * ==========================================
 */
const initContactModule = () => {
    const contactForm = document.getElementById('portfolio-contact-form');
    
    // Cláusula de guarda para evitar que el script falle en index.html
    if (!contactForm) return; 

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const form = event.target;
        const submitBtn = form.querySelector('.dynamic-submit-btn');
        const btnText = submitBtn.querySelector('span:not(.material-symbols-outlined)');
        const btnIcon = submitBtn.querySelector('.material-symbols-outlined');
        
        const originalText = btnText.textContent;
        const originalIcon = btnIcon.textContent;
        
        // 1. ESTADO DE CARGA (Respeta el estilo actual del botón)
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7"; 
        btnText.textContent = 'Enviando...';
        btnIcon.textContent = 'sync';
        btnIcon.classList.add('animate-spin');

        const formData = {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            message: document.getElementById('contact-message').value,
            timestamp: new Date().toISOString()
        };

        try {
            // Pasarela lógica asíncrona del proyecto anterior
            await handleFormSubmission(formData);

            // 2. ESTADO DE ÉXITO (Mantiene tus tokens visuales intactos)
            btnText.textContent = '¡Mensaje Recibido!';
            btnIcon.textContent = 'check_circle';
            btnIcon.classList.remove('animate-spin');
            
            form.reset(); 

        } catch (error) {
            console.error('Error en el envío:', error);
            
            // 3. ESTADO DE ERROR 
            btnText.textContent = 'Error al enviar';
            btnIcon.textContent = 'error';
            btnIcon.classList.remove('animate-spin');
        } finally {
            // 4. RESTAURACIÓN LIMPIA
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
                btnText.textContent = originalText;
                btnIcon.textContent = originalIcon;
            }, 3500);
        }
    });
};

/**
 * Función de persistencia de datos (Lógica asíncrona del proyecto)
 */
async function handleFormSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(); 
        }, 1500);
    });
}

// Inicializador global
document.addEventListener('DOMContentLoaded', () => {
    initContactModule();
});
/**
 * ==========================================
 * COMPONENT: INFINITE LOOP SERVICES CAROUSEL
 * ==========================================
 */
const initInfiniteCarousel = () => {
    const carousel = document.getElementById('services-carousel');
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-service');
    const nextBtn = document.getElementById('next-service');

    if (!carousel || !track || !prevBtn || !nextBtn) return;

    const originalCards = Array.from(track.querySelectorAll('.service-card'));
    const totalOriginals = originalCards.length;
    if (totalOriginals === 0) return;

    // 1. Clonación dinámica para evitar duplicar código manual en el HTML
    originalCards.forEach(card => {
        const cloneBefore = card.cloneNode(true);
        const cloneAfter = card.cloneNode(true);
        cloneBefore.classList.add('carousel-clone');
        cloneAfter.classList.add('carousel-clone');
        
        track.appendChild(cloneAfter); // Clones al final
        track.insertBefore(cloneBefore, track.firstChild); // Clones al inicio
    });

    let isTransitioning = false;

    const getCardWidth = () => {
        const card = track.querySelector('.service-card');
        // Retorna el ancho real de la tarjeta más el gap de Tailwind (24px por defecto en gap-gutter)
        return card ? card.clientWidth + 24 : carousel.clientWidth;
    };

    // 2. Posicionar inicialmente el scroll en el primer elemento real (saltándose los primeros clones)
    const initialSetup = () => {
        carousel.scrollTo({
            left: getCardWidth() * totalOriginals,
            behavior: 'instant'
        });
    };

    // 3. Verificación de límites para el salto infinito invisible
    const handleLoop = () => {
        const currentScroll = carousel.scrollLeft;
        const cardWidth = getCardWidth();
        const startThreshold = cardWidth * totalOriginals;
        const endThreshold = cardWidth * totalOriginals * 2;

        // Si llegó al bloque de clones del inicio
        if (currentScroll <= (startThreshold - cardWidth)) {
            carousel.scrollTo({
                left: currentScroll + startThreshold,
                behavior: 'instant'
            });
        } 
        // Si llegó al bloque de clones del final
        else if (currentScroll >= endThreshold) {
            carousel.scrollTo({
                left: currentScroll - startThreshold,
                behavior: 'instant'
            });
        }
        isTransitioning = false;
    };

    // 4. Manejadores de eventos para los botones con bloqueo de spam-click
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        carousel.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        carousel.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
    });

    // Escucha el fin del scroll para validar la posición del loop
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleLoop, 150);
    }, { passive: true });

    // Ajustar posición si se cambia el tamaño de la ventana (responsive resize)
    window.addEventListener('resize', () => {
        clearTimeout(scrollTimeout);
        initialSetup();
    }, { passive: true });

    // Inicializar posición de ejecución
    setTimeout(initialSetup, 50);
};

// Inicializador global
document.addEventListener('DOMContentLoaded', () => {
    initInfiniteCarousel();
});
/**
 * ========================================================
 * CONTROLADOR DE FORMULARIOS - REDIRECCIÓN A WHATSAPP
 * ========================================================
 */

// Teléfono global (Reemplázalo con tu número real, con código de país y sin el +)
const TELEFONO_WHATSAPP = "573151287187"; 

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