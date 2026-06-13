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