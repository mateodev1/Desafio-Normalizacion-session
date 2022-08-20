const { default:chatDAO } = await import("./DAO/chatDAO.js")

const chatDB = new chatDAO()

export default {chatDB}
