/*
 * REFERENCE: Web Dev Simplified, “Build a Real Time Chat App With Node.js And Socket.io,”
 * YouTube, 25-May-2019. [Online]. Available: 
 * https://www.youtube.com/watch?v=rxzOqP9YwmM&amp;list=LL1zZq3zJgIA_4RteZLzEvyw&amp;index=2. 
 *[Accessed: 08-Apr-2021]. 
 */
/*
 * We did not complete editing and modifying this base code due to struggles
 * with Beanstalk
 */
const socket = io('http://chatmessenger-env.eba-hbn44qms.us-east-1.elasticbeanstalk.com/')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')


const name = prompt('What is your name?')
appendMessage('You joined the chat.')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} joined the chat.`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} left the chat.`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}