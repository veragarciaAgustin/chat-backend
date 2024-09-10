const socket = io();

let user
let chatBox = document.getElementById('chatBox')

Swal.fire({
  title: 'Identificate',
  input: 'text',
  text: 'Ingresa tu nombre para identificarte',
  inputValidator: (value) => {
    return !value && 'Necesitas escribir un nombre de usuario!'
  },
  allowOutsideClick: false
}).then((result) => {
  user = result.value
  socket.emit('authenticated', user)
})

chatBox.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    if (chatBox.value.trim().length > 0) {
      console.log('User: ' + user + ' Message: ' + chatBox.value)
      socket.emit('message', { user, message: chatBox.value })
      chatBox.value = ''
    }
  }
})

socket.on('messageLogs', data => {
  if(!user){
    return
  }

  let log = document.getElementById('messageLogs')
  let messagesHTML = [];
  data.forEach(message => {
    messagesHTML += `${message.user} dice: ${message.message}<br/>`
  })

  log.innerHTML = messagesHTML
})

socket.on('newUserConnected', data => {
  if(!user){
    return
  }

  Swal.fire({
    toast: true,
    position: 'top-right',
    text: 'Nuevo usuario conectado',
    title: `${data} se ha unido al chat`,
    timer: 6000,
    showConfirmButton: false
  })
})
