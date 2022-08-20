
const socket = io.connect()


const message = document.querySelector("#message")
const divChat = document.querySelector("#chat")
const btnChat = document.querySelector("#btn-chat")

const email = document.querySelector("#email")
const name = document.querySelector("#name")
const lastName = document.querySelector("#lastName")
const age = document.querySelector("#age")
const alias = document.querySelector("#alias")
const avatar = document.querySelector("#avatar")

// Fecha

const newfecha = new Date().toISOString()

socket.on('chat',chat =>renderChat(chat))

btnChat.addEventListener('click', e=>{
    e.preventDefault()
    const newMessage = {
        author:{
            id: email.value,
            name: name.value,
            lastName: lastName.value,
            age: age.value,
            alias: alias.value,
            avatar: avatar.value
        },
        text:message.value,
        fecha: new Date().toISOString()
    }
    console.log(newMessage)
    socket.emit('new-message',newMessage)
    return false
})

const renderChat = chat=>{
    limpiarHTML(divChat)
    chat.forEach(newMessage => {
        const { author ,text,fecha } = newMessage
        const messageDiv = document.createElement('div')
        messageDiv.innerHTML = `
            <div>
                <strong style="color: blue;" >${author.id}</strong>[
                <span style="color: brown;">${fecha}</span>]:
                <em style="color: green;font-style: italic;">${text}</em>
            </div>
        `
        divChat.appendChild(messageDiv)
    });
    
}

const limpiarHTML=(element)=> {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}



// const list = document.querySelector("#products")
// const btnProduct = document.querySelector("#btn-product")
// const title = document.querySelector("#title")
// const price = document.querySelector("#price")
// const url = document.querySelector("#url")

// socket.on('product',product =>renderProduct(product))

// btnProduct.addEventListener('click', e=>{
//     e.preventDefault()
//     const newProduct = {
//         title:title.value,
//         price:price.value,
//         url:url.value
//     }
//     socket.emit('new-product',newProduct)
//     return false
// })

// const renderProduct = (data)=>{
//     limpiarHTML(list)
//     data.forEach(data => {
//         const { title , price , url } = data
//         const productDiv = document.createElement('div')
//         productDiv.innerHTML = `
//             <div class="box">
//                 <h2>${title}</h2>
//                 <p>Precio:${price}</p>
//                 <img src='${url}' alt="">
//             </div>
//         `
//         list.appendChild(productDiv)
//     });
// }