import ContainerMongo from "../container/containerMongo.js";

class chatDAO extends ContainerMongo {
  constructor() {
    super("chats", {
      author: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        age: { type: Number, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true },
      },
      text: { type: String, required: true },
      fecha: { type: String, required: true },
    });
  }
}

export default chatDAO;
