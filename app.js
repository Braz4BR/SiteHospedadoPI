class FormSubmit {
    constructor(settings) {
      this.settings = settings;
      this.form = document.querySelector(settings.form);
      this.formButton = document.querySelector(settings.button);
      if (this.form) {
        this.url = this.form.getAttribute("action");
      }
      this.sendForm = this.sendForm.bind(this);
    }
  
    displaySuccess() {
      this.form.innerHTML = this.settings.success;
    }
  
    displayError() {
      this.form.innerHTML = this.settings.error;
    }
  
    getFormObject() {
      const formObject = {};
      const fields = this.form.querySelectorAll("[name]");
      fields.forEach((field) => {
        formObject[field.getAttribute("name")] = field.value;
      });
      return formObject;
    }
  
    onSubmission(event) {
      event.preventDefault();
      event.target.disabled = true;
      event.target.innerText = "Enviando...";
    }
  
    async sendForm(event) {
      try {
        this.onSubmission(event);
        await fetch(this.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.getFormObject()),
        });
        this.displaySuccess();
      } catch (error) {
        this.displayError();
        throw new Error(error);
      }
    }
  
    init() {
      if (this.form) this.formButton.addEventListener("click", this.sendForm);
      return this;
    }
  }
  
  const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada!</h1>",
    error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
  });
  formSubmit.init();

  // ===== MENU HAMBÚRGUER =====
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu');

    hamburger.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
});

// ===== POP-UP PARA BOTÃO DO APP =====
document.addEventListener("DOMContentLoaded", function() {
  const appButtons = document.querySelectorAll('.apps img'); // todos ícones de app
  appButtons.forEach(btn => {
      btn.addEventListener('click', function() {
          alert("O aplicativo está em protótipo e será apresentado em breve!");
      });
  });
});
  // Botões "Entrar"
  const entrarButtons = document.querySelectorAll('.btn-entrar'); 
  entrarButtons.forEach(btn => {
      btn.addEventListener('click', function() {
          alert("O aplicativo está em protótipo e será apresentado em breve!");
      });
  });

  // ===== CARROSSEL MOBILE (features) =====
(function () {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (!isMobile) return;

  const track = document.querySelector(".feature-container");
  if (!track) return;

  const slides = Array.from(track.querySelectorAll(".feature-item"));
  if (slides.length === 0) return;

  // Controles (presentes no HTML, mas escondidos no desktop)
  const prevBtn = document.querySelector(".carousel-controls .prev");
  const nextBtn = document.querySelector(".carousel-controls .next");
  const dotsWrap = document.querySelector(".carousel-controls .dots");

  // Cria bolinhas para a quantidade REAL de slides (sem clones)
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.querySelectorAll("span"));

  // Clones para loop infinito suave
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  firstClone.classList.add("clone");
  lastClone.classList.add("clone");

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  const allSlides = Array.from(track.querySelectorAll(".feature-item")); // com clones
  let index = 1; // começamos no 1 (primeiro slide real)
  const SIZE = 100;

  function setTransform(withTransition = true) {
    track.style.transition = withTransition ? "transform .45s ease" : "none";
    track.style.transform = `translateX(-${index * SIZE}%)`;
  }

  function updateDots() {
    const logicalIndex = (index - 1 + slides.length) % slides.length; // 0..n-1
    dots.forEach(d => d.classList.remove("active"));
    if (dots[logicalIndex]) dots[logicalIndex].classList.add("active");
  }

  function goTo(i) {
    index = i;
    setTransform(true);
    updateDots();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  // posição inicial
  setTransform(false);

  // Correção ao fim/início da transição (salto invisível nos clones)
  track.addEventListener("transitionend", () => {
    const atLastClone = allSlides[index] && allSlides[index].classList.contains("clone") && index === allSlides.length - 1;
    const atFirstClone = allSlides[index] && allSlides[index].classList.contains("clone") && index === 0;

    if (atLastClone) {
      index = 1;              // volta para o primeiro real
      setTransform(false);    // sem transição (salto invisível)
    } else if (atFirstClone) {
      index = slides.length;  // vai para o último real
      setTransform(false);
    }
  });

  // Controles
  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  // Dots (clicáveis)
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goTo(i + 1)); // +1 por causa do clone inicial
  });

  // Autoplay
  let auto = setInterval(next, 4000);

  // Pausa ao tocar (mobile)
  track.addEventListener("touchstart", () => clearInterval(auto), { passive: true });
  track.addEventListener("touchend", () => { auto = setInterval(next, 4000); }, { passive: true });

})();


