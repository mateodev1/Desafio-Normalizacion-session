import { container,message,email,name,lastName,age,alias,avatar,divChat } from './selectors.js'
import { socket } from './index.js';

const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });
const mensajeSchema = new normalizr.schema.Entity('mensaje', { author: authorSchema }, { idAttribute: 'id' });
const schemaMensajes = new normalizr.schema.Entity('mensajes', { mensajes: [mensajeSchema] }, { idAttribute: 'id' });


export const sendMessage = (e) => {
  e.preventDefault();
  const newMessage = {
    author: {
      id: email.value,
      name: name.value,
      lastName: lastName.value,
      age: age.value,
      alias: alias.value,
      avatar: avatar.value,
    },
    text: message.value,
    fecha: new Date().toISOString(),
  };
  // console.log(newMessage);
  socket.emit("new-message", newMessage);
  return false;
};

export const renderChat = (mess) => {
  // console.log(mess);
  const denormalizedData = normalizr.denormalize(
    mess.result,
    schemaMensajes,
    mess.entities
  );
  console.log(denormalizedData)
  limpiarHTML(divChat);
  denormalizedData.mensajes.forEach(item => {
    const { author, fecha ,text } = item._doc
    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = `
              <div>
                  <strong style="color: blue;" >${author.id}</strong>[
                  <span style="color: brown;">${fecha}</span>]:
                  <em style="color: green;font-style: italic;">${text}</em>
              </div>
          `;
    divChat.appendChild(messageDiv);
  });
};

export const logout = (e)=>{
  e.preventDefault()
  limpiarHTML(container)
  const div = document.createElement("div");
    div.innerHTML = `<h1> Hasta luego </h1>`;
    container.appendChild(div);
    setTimeout(()=> window.location.replace("http://localhost:8080/logout"),3000)

   
}


const limpiarHTML = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};
