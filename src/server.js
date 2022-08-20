import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import path from 'path';
import api from './routes/api.js'
import socketsEventsChat from './sockets/chat.socket.js';
import __dirname from './utils.js';
const HttpServer = http.Server
const IOserver = Server

//INITIALIZATIONS
const app = express()
const httpServer = new HttpServer(app)
const io = new IOserver(httpServer)

//SETTINGS
app.set("view engine",'ejs')
app.set("views", path.join(__dirname,"./views"))
app.set('port', process.env.PORT || 8080);
const PORT = app.get('port')

//STATIC FILES
app.use('/static', express.static(__dirname + '/public'));

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use('/api',api)
app.get('/',(req,res)=>{
    res.render("index")
})
socketsEventsChat(io)

httpServer.listen(PORT,(err) =>{
    if(err){
        console.log(`server error: ${err}`)
    }
    console.log(`Server listen PORT : ${PORT}`)
})