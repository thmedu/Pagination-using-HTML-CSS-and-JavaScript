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

    // Remove a classe 'active' de todos os elementos da página
    pageLinks.forEach((link) => {
        link.classList.remove('active');
    });
    
    // Adiciona a classe 'active' ao link da página atual
    pageLinks[currentPage - 1].classList.add('active');
}

prevButton.addEventListener('click', () => {
    currentPage > 1 && displayPage(--currentPage) && updatePagination();
});

nextButton.addEventListener('click', () => {
    currentPage < totalPages && displayPage(++currentPage) && updatePagination();
});

pageLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = index + 1;
        if (page !== currentPage) {
            displayPage(page);
            currentPage = page;
            updatePagination();
        }
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

        // Adiciona temporizador para fechar a imagem após 10 segundos
        setTimeout(() => {
            const img = card.querySelector('img');
            img.classList.remove('expanded');
        }, 10000); // Fechar após 10 segundos
    });

    // Adiciona um evento de clique para cada botão "Ver Mais"
    card.querySelector('.btn-more').addEventListener('click', () => {
        const fullDescription = card.querySelector('.full-description');
        
        // Alternar a visibilidade da descrição completa
        fullDescription.classList.toggle('visible');
    });
});

// Adicionar a lógica fornecida para destacar a página atual na paginação
function updatePagination() {
    // Remove a classe 'active' de todos os links de página
    pageLinks.forEach((link) => {
        link.classList.remove('active');
    });
    
    // Adiciona a classe 'active' ao link da página atual
    const currentPageLink = document.querySelector(`.page-link[data-page="${currentPage}"]`);
    currentPageLink.classList.add('active');
}

// Inicialize a paginação e a lógica de destaque da página atual
updatePagination();
displayPage(currentPage);
