const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  let new_msg = `
    <div class="message-blue">
      <p class="message-content">${msg}</p>
      <div class="message-timestamp-left">Dani 13:37</div>
    </div>
  `
  messages.innerHTML += new_msg
  

  
  // const item = document.createElement('li');
  // item.classList.add('li_chat');
  // item.textContent = msg;
  // messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});