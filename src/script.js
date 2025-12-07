// Script para adicionar interatividade aos botões de CTA
document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona todos os botões CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    // Adiciona evento de clique em cada botão
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Pega o título do curso
            const courseCard = this.closest('.course-card');
            const courseTitle = courseCard.querySelector('.course-title').textContent;
            
            // Pega a URL personalizada do atributo data-url
            const checkoutUrl = this.getAttribute('data-url');
            
            if (checkoutUrl) {
                // Redireciona para a URL específica do curso
                window.location.href = checkoutUrl;
            } else {
                // Caso não tenha URL configurada, mostra alerta
                alert('Por favor, configure a URL de checkout para: ' + courseTitle);
            }
        });
    });
    
    // Animação de scroll suave para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observa todos os cards de curso
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Observa os cards de benefícios
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Contador de visitantes (simulado para criar urgência)
    function updateVisitorCount() {
        const visitorCount = Math.floor(Math.random() * 50) + 150; // Entre 150-200
        const visitorElement = document.getElementById('visitor-count');
        if (visitorElement) {
            visitorElement.textContent = visitorCount;
        }
    }
    
    // Atualiza a contagem a cada 5 segundos
    setInterval(updateVisitorCount, 5000);
    
    // Rastreamento de eventos (Google Analytics, Facebook Pixel, etc)
    function trackEvent(eventName, courseTitle) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                'event_category': 'Curso',
                'event_label': courseTitle
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, {
                content_name: courseTitle
            });
        }
        
        console.log('Evento rastreado:', eventName, courseTitle);
    }
    
    // Rastreia visualização de curso
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const courseTitle = this.querySelector('.course-title').textContent;
            trackEvent('ViewContent', courseTitle);
        });
    });
    
    // Adiciona efeito de partículas no header (opcional)
    function createParticles() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 5px;
                height: 5px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${5 + Math.random() * 10}s infinite ease-in-out;
            `;
            header.appendChild(particle);
        }
    }
    
    // Adiciona CSS da animação de partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            50% {
                transform: translateY(-100px) translateX(50px);
                opacity: 1;
            }
        }
        .header {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    createParticles();
    
    // Scroll to top suave
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    // Timer de oferta (opcional - descomente para usar)
    /*
    function startTimer(duration, display) {
        let timer = duration, hours, minutes, seconds;
        setInterval(function () {
            hours = parseInt(timer / 3600, 10);
            minutes = parseInt((timer % 3600) / 60, 10);
            seconds = parseInt(timer % 60, 10);

            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = hours + ":" + minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }

    window.onload = function () {
        const twentyFourHours = 60 * 60 * 24;
        const display = document.querySelector('#timer');
        if (display) {
            startTimer(twentyFourHours, display);
        }
    };
    */
});

// Função para adicionar item ao carrinho (se implementar carrinho)
function addToCart(courseId, courseTitle) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const item = {
        id: courseId,
        title: courseTitle,
        addedAt: new Date().toISOString()
    };
    
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    console.log('Curso adicionado ao carrinho:', courseTitle);
}

// Previne clique duplo nos botões
let isProcessing = false;
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button')) {
        if (isProcessing) {
            e.preventDefault();
            return;
        }
        isProcessing = true;
        setTimeout(() => {
            isProcessing = false;
        }, 2000);
    }
});