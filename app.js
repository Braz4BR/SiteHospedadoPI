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
  const navbarToggle = document.createElement('div'); // cria botão hambúrguer
  navbarToggle.classList.add('navbar-toggle');
  navbarToggle.innerHTML = '<span></span><span></span><span></span>';

  const navegacao = document.querySelector('.navegacao');
  const menu = document.querySelector('.menu');
  navegacao.appendChild(navbarToggle); // adiciona botão na navbar

  navbarToggle.addEventListener('click', function() {
      menu.classList.toggle('active'); // abre/fecha menu
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