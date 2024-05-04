const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    const img = card.querySelector('img');
    img.addEventListener('click', () => {
        expandImage(img);
    });
});

function expandImage(img) {
    img.classList.toggle('expanded'); // Adiciona ou remove a classe de expansão
    
    // Centraliza a imagem quando expandida
    if (img.classList.contains('expanded')) {
        // Adiciona uma classe ao body para permitir o overflow hidden
        document.body.classList.add('modal-open');
    } else {
        // Remove a classe do body quando a imagem é recolhida
        document.body.classList.remove('modal-open');
    }
}
