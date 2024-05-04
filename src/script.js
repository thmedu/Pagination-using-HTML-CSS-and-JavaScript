//script.js
const cardsPerPage = 3;
const dataContainer = document.querySelector('.card-container');
const pagination = document.getElementById('pagination');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pageNumbers = document.getElementById('page-numbers');
const pageLinks = document.querySelectorAll('.page-link');
const cards = Array.from(dataContainer.querySelectorAll('.card'));
const totalPages = Math.ceil(cards.length / cardsPerPage);
let currentPage = 1;

function displayPage(page) {
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = page * cardsPerPage;
    cards.forEach((card, index) => {
        card.style.display = (index >= startIndex && index < endIndex) ? 'block' : 'none';
    });
}

function updatePagination() {
    pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    pageLinks.forEach((link) => {
        const page = parseInt(link.dataset.page);
        link.classList.toggle('active', page === currentPage);
    });
}

prevButton.addEventListener('click', () => {
    currentPage > 1 && displayPage(--currentPage) && updatePagination();
});

nextButton.addEventListener('click', () => {
    currentPage < totalPages && displayPage(++currentPage) && updatePagination();
});

pageLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = parseInt(link.dataset.page);
        page !== currentPage && displayPage(page) && updatePagination();
    });
});

function expandImage(card) {
    const img = card.querySelector('img');
    img.classList.add('expanded');
    setTimeout(() => {
        img.classList.remove('expanded');
    }, 2000); // Fechar após 2 segundos
}

cards.forEach((card) => {
    card.addEventListener('click', () => {
        expandImage(card);
    });

    // Adiciona um evento de clique para cada botão "Ver Mais"
    card.querySelector('.btn-more').addEventListener('click', () => {
        const shortDescription = card.querySelector('.short-description');
        const fullDescription = card.querySelector('.full-description');
        
        // Alternar a visibilidade dos parágrafos
        shortDescription.classList.add('hidden');
        fullDescription.classList.remove('hidden');
    });
});

displayPage(currentPage);
updatePagination();
//script.js

cards.forEach((card) => {
    card.addEventListener('click', () => {
        expandImage(card);
    });

    // Adiciona um evento de clique para cada botão "Ver Mais"
    card.querySelector('.btn-more').addEventListener('click', () => {
        const fullDescription = card.querySelector('.full-description');
        
        // Alternar a visibilidade da descrição completa
        fullDescription.classList.toggle('visible');
    });
});
