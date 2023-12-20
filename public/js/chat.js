const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const remitente = document.getElementById('pruebaUSER');
 
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!remitente.value) {
    remitente.value="Invitado"
  }
  if (input.value) {    
    socket.emit('chat message', { contenido: input.value, remitente: remitente.value });
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  console.log(msg.remitente);
  
  let class_chat = msg.remitente == remitente.value ? 'message-me' : 'message-other'  
  let user_chat = msg.remitente == remitente.value ? remitente.value : msg.remitente
  // let  new_msg = `
  //   <div class="${class_chat}">
  //     <p class="message-content">${msg.contenido}</p>
  //     <div class="message-timestamp-left">${user_chat}</div>
  //   </div>
  //   `  
  
  //   messages.innerHTML += new_msg 
  let new_msg = document.createElement('div');
  new_msg.className = class_chat;
  let messageContent = document.createElement('p');
  messageContent.className = 'message-content';
  messageContent.textContent = msg.contenido;
  new_msg.appendChild(messageContent);

  let timestampLeft = document.createElement('div');
  timestampLeft.className = 'message-timestamp-left';
  timestampLeft.textContent = user_chat;
  new_msg.appendChild(timestampLeft);

  messages.appendChild(new_msg);

    var chatButton = document.querySelector('.text_msg');
    chatButton.scrollTop = chatButton.scrollHeight;  
  
});

