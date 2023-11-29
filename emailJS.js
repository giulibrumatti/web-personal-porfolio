const btn = document.getElementById('button');
const messAlert = document.getElementById('alert_id');

document.getElementById('form')
  .addEventListener('submit', function (event) {

    event.preventDefault();

    const email = document.getElementById('email_id').value.trim();

    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_bf5mgbc';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      messAlert.textContent = 'Por favor, ingresa un correo electrónico válido.';
      messAlert.style.color = 'red';
      btn.value = 'Enviar';
      form.reset();
    }else{
    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Enviar';
        messAlert.textContent = 'Correo enviado!';
        messAlert.style.color = 'green';
        form.reset();
      }) 
      .catch((err) => {
        messAlert.textContent = `Error: ${JSON.stringify(err)}`;
        messAlert.style.color = 'red';
        btn.value = 'Enviar';
        form.reset();
      });
    }  
  });