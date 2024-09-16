document.addEventListener("DOMContentLoaded", () => {
    // Selecionar todos os botões "Ver Mais"
    const btnMoreButtons = document.querySelectorAll('.btn-more');
    // Selecionar todas as descrições completas
    const fullDescriptions = document.querySelectorAll('.full-description');
    // Selecionar todos os elementos "card"
    const cards = document.querySelectorAll('.card');
    // Selecionar elementos de paginação
    const pageLinks = document.querySelectorAll('.page-link');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const itemsPerPage = 3;
    let currentPage = 1;

    // Função para mostrar/esconder descrição completa
    btnMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.parentElement;
            const fullDescription = card.querySelector('.full-description');
            const isVisible = !fullDescription.classList.contains('hidden');
            fullDescription.classList.toggle('hidden', isVisible);
            button.textContent = isVisible ? 'Ver Mais' : 'Ver Menos';
        });
    });

    // Função para exibir a página selecionada
    const showPage = (page) => {
        cards.forEach((card, index) => {
            const start = (page - 1) * itemsPerPage;
            const end = page * itemsPerPage;
            card.style.display = (index >= start && index < end) ? 'block' : 'none';
        });
        updatePagination();
    };

    // Função para atualizar a navegação de paginação
    const updatePagination = () => {
        pageLinks.forEach(link => {
            link.classList.remove('active');
            if (parseInt(link.dataset.page) === currentPage) {
                link.classList.add('active');
            }
        });
        prevButton.style.display = currentPage === 1 ? 'none' : 'inline';
        nextButton.style.display = currentPage === pageLinks.length ? 'none' : 'inline';
    };

    // Eventos de navegação
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = parseInt(link.dataset.page);
            showPage(currentPage);
        });
    });

    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < pageLinks.length) {
            currentPage++;
            showPage(currentPage);
        }
    });

    // Mostrar a primeira página ao carregar
    showPage(currentPage);
});
