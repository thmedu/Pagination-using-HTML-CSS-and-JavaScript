document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const btnMore = document.querySelectorAll('.btn-more');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.getElementById('close');
    const pageLinks = document.querySelectorAll('.page-link');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const itemsPerPage = 3;
    let currentPage = 1;

    // Expande ou contrai o texto do card
    btnMore.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            card.classList.toggle('expanded');
        });
    });

    // Abre o modal com a imagem
    document.querySelectorAll('.card-image').forEach(image => {
        image.addEventListener('click', () => {
            modalImg.src = image.src;
            modal.classList.add('show');
        });
    });

    // Fecha o modal
    modalClose.addEventListener('click', () => {
        modal.classList.remove('show');
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
