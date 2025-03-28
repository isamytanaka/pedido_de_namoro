document.addEventListener('DOMContentLoaded', () => {
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const particlesContainer = document.getElementById('particles-container');
    const backgroundSvg = document.getElementById('background-svg');

    // Dynamic SVG Background
    function generateSVGBackground() {
        const svgns = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgns, 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');

        for (let i = 0; i < 50; i++) {
            const circle = document.createElementNS(svgns, 'circle');
            circle.setAttribute('cx', Math.random() * 100 + '%');
            circle.setAttribute('cy', Math.random() * 100 + '%');
            circle.setAttribute('r', Math.random() * 30);
            circle.setAttribute('fill', `rgba(255, 100, 100, ${Math.random() * 0.2})`);
            svg.appendChild(circle);
        }

        backgroundSvg.appendChild(svg);
    }
    generateSVGBackground();

    // No Button Movement
    function moveNoButton(event) {
        const container = event.target.parentElement;
        const containerRect = container.getBoundingClientRect();
        const btnRect = event.target.getBoundingClientRect();

        const maxX = containerRect.width - btnRect.width;
        const maxY = containerRect.height - btnRect.height;

        const angleToTarget = Math.atan2(
            event.clientY - (containerRect.top + containerRect.height / 2),
            event.clientX - (containerRect.left + containerRect.width / 2)
        );

        const distance = Math.random() * 200 + 100;
        const newX = event.target.offsetLeft + Math.cos(angleToTarget) * distance;
        const newY = event.target.offsetTop + Math.sin(angleToTarget) * distance;

        event.target.style.position = 'absolute';
        event.target.style.left = `${Math.max(0, Math.min(maxX, newX))}px`;
        event.target.style.top = `${Math.max(0, Math.min(maxY, newY))}px`;
    }

    // Particle Explosion
    function createParticleExplosion(x, y) {
        const colors = ['#ff4365', '#ff6b6b', '#ff99ac'];
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particlesContainer.appendChild(particle);

            gsap.to(particle, {
                duration: 1,
                x: (Math.random() - 0.5) * 500,
                y: (Math.random() - 0.5) * 500,
                opacity: 0,
                scale: 0,
                ease: 'power2.out',
                onComplete: () => particle.remove()
            });
        }
    }

    // Event Listeners
    btnYes.addEventListener('click', (e) => {
        const rect = e.target.getBoundingClientRect();
        createParticleExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2);
        successModal.classList.remove('hidden');
    });

    btnNo.addEventListener('mousemove', moveNoButton);

    closeModalBtn.addEventListener('click', () => {
        successModal.classList.add('hidden');
    });

    // Add Particle Styles
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        .particle {
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            pointer-events: none;
        }
    `;
    document.head.appendChild(particleStyle);
});