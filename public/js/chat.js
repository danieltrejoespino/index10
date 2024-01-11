const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const remitente = document.getElementById('user_chat');
const remitente_save = localStorage.getItem('nameUserChat');
 
document.addEventListener("DOMContentLoaded", function() {
  // getEXT()
  getUser()
  
});

function getUser() {
  if (remitente_save) {
    remitente.value=remitente_save
  } else {
    remitente.value='invitado'
  }
}

remitente.addEventListener('change', (event) =>{
  if (remitente.value) {
    localStorage.setItem('nameUserChat', remitente.value);
  } else {
    console.log('selecciona un nombre');
  }
})

form.addEventListener('submit', (e) => {
  e.preventDefault();  
  if (input.value) {    
    socket.emit('chat message', { contenido: input.value, remitente: remitente.value });
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
   
  let class_chat = msg.remitente == remitente.value ? 'message-me' : 'message-other'  
  let user_chat = msg.remitente == remitente.value ? remitente.value : msg.remitente
 


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
  

  //ir al final de los mensajes
  const chatButton = document.querySelector('.text_msg');
  chatButton.scrollTop = chatButton.scrollHeight;  
  
  if (user_chat !== remitente.value) {    
    showNotification(msg);    
  }
});


socket.on('chat history', (msg_history) => {
  msg_history.forEach(element => {
    console.log(element.contenido);

    let class_chat = element.remitente == remitente.value ? 'message-me' : 'message-other'  
    let user_chat = element.remitente == remitente.value ? remitente.value : element.remitente
    
    let new_msg = document.createElement('div');
    new_msg.className = class_chat;
    let messageContent = document.createElement('p');
    messageContent.className = 'message-content';
    messageContent.textContent = element.contenido;
    new_msg.appendChild(messageContent);

    let timestampLeft = document.createElement('div');
    timestampLeft.className = 'message-timestamp-left';
    timestampLeft.textContent = user_chat;
    new_msg.appendChild(timestampLeft);

    messages.appendChild(new_msg);
      // //ir al final de los mensajes
  const chatButton = document.querySelector('.text_msg');
  chatButton.scrollTop = chatButton.scrollHeight;  

 });
  
})


function showNotification(message) {
  // Verificar si las notificaciones son compatibles con el navegador
  if ('Notification' in window) {
    // Verificar el estado de las notificaciones
    if (Notification.permission === 'granted') {
      // Si las notificaciones están permitidas, mostrar una notificación
      new Notification(`Nuevo mensaje de ${message.remitente}`, { body: message.contenido });
    } else if (Notification.permission !== 'denied') {
      // Si las notificaciones no están permitidas ni denegadas, solicitar permiso
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          new Notification('Nuevo mensaje', { body: message });
        }
      });
    }
  }
}