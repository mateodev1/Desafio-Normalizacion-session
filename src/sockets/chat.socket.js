import DAO from "./../db/index.js";

const socketsEventsChat = (io) => {
  io.on("connection",  (socket) => {

    const emit =async()=>{
      const chat = await DAO.chatDB.getAll();
      io.sockets.emit('chat',chat)
      socket.emit('chat',chat)
    }

    console.log(`New connection ID: ${socket.id}`);

    emit()

    socket.on("new-message", async (newMessage) => {
      await DAO.chatDB.addObject(newMessage);
      emit()
    });

  });
};
export default socketsEventsChat;
