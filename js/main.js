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
 * ==========================================
 * COMPONENT: MODAL COTIZACIÓN CONTROLLER (WHATSAPP)
 * ==========================================
 */
const initQuoteModal = () => {
    const modal = document.getElementById('quote-modal');
    const modalContainer = document.getElementById('modal-container');
    const closeBtn = document.getElementById('close-modal');
    const serviceNameText = document.getElementById('modal-service-name');
    const serviceInput = document.getElementById('modal-service-input');
    const quoteForm = document.getElementById('modal-quote-form');
    
    // Captura todos los botones de cotizar
    const triggerButtons = document.querySelectorAll('.trigger-quote-modal');

    if (!modal || !closeBtn || !modalContainer) return;

    // Abrir Modal
    const openModal = (serviceName) => {
        if (serviceNameText) serviceNameText.textContent = serviceName;
        if (serviceInput) serviceInput.value = serviceName;
        
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modalContainer.classList.remove('scale-95');
        modalContainer.classList.add('scale-100');
        document.body.style.overflow = 'hidden'; // Bloquea el scroll del fondo
    };

    // Cerrar Modal
    const closeModal = () => {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modalContainer.classList.remove('scale-100');
        modalContainer.classList.add('scale-95');
        document.body.style.overflow = ''; // Libera el scroll
    };

    // Asignar eventos de clic a los botones
    triggerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const service = button.getAttribute('data-service') || 'Servicio General';
            openModal(service);
        });
    });

    // Eventos de cierre
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Procesar el formulario enviando la data a WhatsApp
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 1. Obtener los valores ingresados por el usuario
            const servicio = document.getElementById('modal-service-input').value;
            const nombre = quoteForm.querySelector('input[type="text"]').value;
            const correo = quoteForm.querySelector('input[type="email"]').value;
            
            // 2. número de WhatsApp con código de país (ej: 57 para Colombia)
            const telefono = "573151287187"; 
            
            // 3. Estructurar el mensaje con formato de negritas para WhatsApp (*texto*)
            const mensaje = `Hola, mi nombre es *${nombre}*.\n\nMe interesa solicitar una cotización para el servicio de: *${servicio}*.\n\nMi correo de contacto es: _${correo}_\n\n¡Quedo atento a tu respuesta!`;
            
            // 4. Codificar el texto para que sea seguro en una URL
            const urlWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(mensaje)}`;
            
            // 5. Redireccionar al usuario a WhatsApp en una nueva pestaña
            window.open(urlWhatsApp, '_blank');
            
            // 6. Limpiar y cerrar el modal para cuando el usuario regrese a la web
            quoteForm.reset();
            closeModal();
        });
    }
};

// Inicializar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    initQuoteModal();
});