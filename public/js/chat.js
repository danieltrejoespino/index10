const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const remitente = document.getElementById('pruebaUSER');
 
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    // socket.emit('chat message', input.value);
    socket.emit('chat message', { contenido: input.value, remitente: remitente.value });
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  console.log(msg.remitente);
  let new_msg = ''
  if (msg.remitente == remitente.value) {    
    new_msg = `
    <div class="message-blue">
      <p class="message-content">${msg.contenido}</p>
      <div class="message-timestamp-left">Dani 13:37</div>
    </div>
    `
  }else{
    new_msg =`
    <div class="message-orange">
    <p class="message-content">${msg.contenido}</p>
    <div class="message-timestamp-right">Dani</div>
    </div>

    `

  }
 
  messages.innerHTML += new_msg  

  
  // const item = document.createElement('li');
  // item.classList.add('li_chat');
  // item.textContent = msg;
  // messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});