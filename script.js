  // Filmstrip generator
  function buildFilm(id) {
    const labels = ['Adobe Premiere', 'Python', 'Edición', 'Automatización', 'Visual Studio Code', 'Corel Draw', 'Google Drive', 'PyQt6', 'SQLite', 'Google Apps Scripts'];
    const el = document.getElementById(id);
    if (!el) return;
    let html = '';
    for (let r = 0; r < 2; r++) {
      for (let i = 0; i < labels.length; i++) {
        html += '<div class="filmstrip-hole"></div>';
        html += `<span class="filmstrip-label">${labels[i]}</span>`;
        html += '<div class="filmstrip-hole"></div>';
      }
    }
    el.innerHTML = html;
  }
  buildFilm('filmInner');
  buildFilm('filmInner2');

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => obs.observe(r));

  // Video open (placeholder for real links)
  function openVideo(card) {
    const url = card.dataset.url;
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('Próximamente: agregá la URL del video en el atributo data-url de esta card.');
    }
  }

  // --- LÓGICA PARA EL ZOOM DE IMÁGENES ---
    
    const modal = document.getElementById('image-modal');
    const imgAmpliada = document.getElementById('img-ampliada');
    // Usamos el contenedor que ya tenías declarado en el paso anterior
    const gridContenedor = document.getElementById('reviews-container'); 

    // 1. Detectar el clic en cualquier imagen de las reseñas
    gridContenedor.addEventListener('click', (evento) => {
        // Si el elemento clickeado tiene la clase 'review-screenshot'
        if (evento.target.classList.contains('review-screenshot')) {
            modal.classList.add('mostrar'); // Muestra el fondo oscuro
            imgAmpliada.src = evento.target.src; // Copia la ruta de la imagen original a la grande
        }
    });

    // 2. Cerrar el modal al hacer clic en el fondo oscuro, en la imagen grande o en la 'X'
    modal.addEventListener('click', () => {
        modal.classList.remove('mostrar'); // Oculta el modal
    });

    // --- LÓGICA BOTÓN VOLVER ARRIBA ---
    const btnScrollTop = document.getElementById('btn-scroll-top');

    // 1. Mostrar u ocultar el botón según la posición del scroll
    window.addEventListener('scroll', () => {
        // Si el usuario bajó más de 300 píxeles, mostramos el botón
        if (window.scrollY > 300) {
            btnScrollTop.classList.add('mostrar-btn');
        } else {
            // Si está arriba de todo, lo ocultamos
            btnScrollTop.classList.remove('mostrar-btn');
        }
    });

    // 2. Subir suavemente al hacer clic
    btnScrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Esto hace que el desplazamiento sea fluido, no de golpe
        });
    });
    
  document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Base de datos de tus reseñas
    const reviewsData = [
        {
            id: 1,
            project: "Video informe de Agentes de Barrido trabajando",
            text: " ",
            clientName: "Coordinación de Barrido",
            screenshot: "./1- CONTENIDO/1- REFERENCIA 1.png", // Reemplaza con tus imágenes
            clientRole: "Director General",
            initials: "VC"
        },
        {
            id: 2,
            project: "Recepción de Mercadería en Depósito",
            text: "",
            screenshot: "./1- CONTENIDO/2- REFERENCIA 2.png",
            clientName: "Coordinación de Barrido",
            clientRole: "Director General",
            initials: "FS"
        },
        {
            id: 3,
            project: "Diseño e Identidad Visual",
            text: "",
            screenshot: "./1- CONTENIDO/3- REFERENCIA 3.png",
            clientName: "Coordinación de Barrido",
            clientRole: "Director General",
            initials: "VC"
        }
    ];

    // 2. Seleccionar el contenedor principal
    const container = document.getElementById('reviews-container');

    // 3. Renderizar cada tarjeta
    reviewsData.forEach(review => {
        // Crear elemento <article>
        const card = document.createElement('article');
        // Agregar las clases (incluida tu clase 'reveal' para animaciones futuras)
        card.className = 'review-card';
        
        // Construir el contenido interno de la tarjeta
        card.innerHTML = `
            <p class="review-project">${review.project}</p>
            <img src="${review.screenshot}" alt="Captura del proyecto ${review.project}" class="review-screenshot" loading="lazy">
            <blockquote class="review-text">${review.text}</blockquote>
            <div class="client-info">
                <div class="client-avatar">${review.initials}</div>
                <div class="client-details">
                    <h4>${review.clientName}</h4>
                    <span>${review.clientRole}</span>
                </div>
            </div>
        `;
        
        // Inyectar en el DOM
        container.appendChild(card);
    });
});
