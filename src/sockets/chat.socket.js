import DAO from "./../db/index.js";
import { normalizedData, compressionPercentage } from "../normalizar/index.js";

const socketsEventsChat = (io) => {
  io.on("connection",  (socket) => {

    const emit = async()=>{
      const chat = await DAO.chatDB.getAll()
      const newChat = normalizedData(chat)
      io.sockets.emit('chat',newChat)
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
