const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_bf5mgbc';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
        btn.value = 'Enviar';
      alert('Correo enviado!');
      form.reset();
    }, (err) => {
        btn.value = 'Enviar';
      alert(JSON.stringify(err));
    });
});