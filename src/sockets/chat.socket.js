import DAO from './../db/index.js'

const socketsEventsChat = io =>{
    io.on('connection',async(socket) =>{
        console.log(`New connection ID: ${socket.id}`)

        const chat = await DAO.chatDB.getAll()
        io.sockets.emit('chat',chat)
        socket.emit('chat',chat)

        socket.on('new-message',async(newMessage)=>{
            await DAO.chatDB.addObject(newMessage)
            io.sockets.emit('chat',chat)
            socket.emit('chat',chat)
        })
        
    })
}
export default socketsEventsChat
