//Modal Forms
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // impede envio real
    var modal = new bootstrap.Modal(document.getElementById("agradecimentoModal"));
    modal.show();
    this.reset(); // limpa o formulário
});

//Modal Workshop
 const form = document.getElementById('formInscricao');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Fechar modal workshop
    const modalWorkshop = bootstrap.Modal.getInstance(document.getElementById('workshopsmodal'));
    modalWorkshop.hide();

    // Abrir modal confirmação
    const modalConfirmacao = new bootstrap.Modal(document.getElementById('modalConfirmacao'));
    modalConfirmacao.show();
    form.reset();
  });

  //Animações
  const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.4
});

fadeEls.forEach(el => observer.observe(el));



