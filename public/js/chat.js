const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('inp_chat');
const messages = document.getElementById('messages');
const btn_actions_ = document.getElementById('btn_actions_');
const remitente = document.getElementById('user_chat');
const remitente_save = localStorage.getItem('nameUserChat');
const inp_file = document.getElementById('inp_file');

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
    socket.emit('chat message', { contenido: input.value, remitente: remitente.value, type : 'text' });
    input.value = '';
  }
  const file_upload = inp_file.files[0];
  

  if (file_upload) {
    let extension = file_upload.name.split('.').pop().toLowerCase();
    console.log(extension);
    
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageData = e.target.result.split(',')[1];
      // socket.emit('image', imageData);      
      socket.emit('image', { contenido: imageData, remitente: remitente.value, type : extension });

    };
    reader.readAsDataURL(file_upload);
    
    inp_file.value=''
    // const newFileInput = inp_file.cloneNode(true);        
    // inp_file.parentNode.replaceChild(newFileInput, inp_file);
  }
});

socket.on('chat message', (msg) => { 
   
  let class_chat = msg.remitente == remitente.value ? 'message-me' : 'message-other'  
  let user_chat = msg.remitente == remitente.value ? remitente.value : msg.remitente

  let height_msg = msg.type === 'text' ? (msg.contenido.length < 50 ? 50 : msg.contenido.length) : 300;
  let width_msg = msg.type === 'text' ? 200 : 300;

  let contentHTML;
  console.warn(msg.type);
  if (msg.type === 'text') {
    contentHTML = `<p class="message-content">${msg.contenido}</p>`;
  } else {
    contentHTML = `<img class="message-content" style="height: 250px; width: 250px; border-radius: 50px;" src="./uploads/img/${msg.contenido}" alt="Imagen" />`;
  }

let new_msg_html = `
  <div class="${class_chat}" style="height: ${height_msg}px; width: ${width_msg};">
    ${contentHTML}
    <div class="message-timestamp-left">${user_chat}</div>
  </div>
`;

messages.innerHTML += new_msg_html;
      

  //ir al final de los mensajes
  const chatButton = document.querySelector('.text_msg');
  chatButton.scrollTop = chatButton.scrollHeight;  
  
  if (user_chat !== remitente.value) {    
    showNotification(msg);    
  }
});


socket.on('chat history', (msg_history) => {
  msg_history.forEach(element => {    

    let class_chat = element.remitente == remitente.value ? 'message-me' : 'message-other';
    let user_chat = element.remitente == remitente.value ? remitente.value : element.remitente;    
  
    let height_msg = element.contenido.length < 50 ? 50 : element.contenido.length;
    let width_msg = element.type === 'text' ? 200 : 300;

  
    if (element.type === 'text') {
      contentHTML = `<p class="message-content">${element.contenido}</p>`;
    } else {
      contentHTML = `<img class="message-content" style="height: 250px; width: 250px; border-radius: 50px;" src="./uploads/img/${element.contenido}" alt="Imagen" />`;
    }

    let new_msg_html = `
      <div class="${class_chat}" style="height: ${height_msg}px; width: ${width_msg};">
        ${contentHTML}
      <div class="message-timestamp-left">${user_chat}</div>
      </div>
    `;

    messages.innerHTML += new_msg_html;

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

btn_actions_.addEventListener('click', () => {  
  inp_file.click()
})



