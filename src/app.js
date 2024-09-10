import express from "express";
//importar plantillas
import handlebars from "express-handlebars";
//importar dirname
import __dirname from "./utils.js";
import { Server } from "socket.io";
//importar vistas
import viewsRouter from "./routes/views.js";


const app = express();
const port = 8080;
//Motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
//Configuramos el public
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', viewsRouter);

let messages = [];

const server = app.listen(port, () => {
    console.log(`Servidor express escuchando en el puerto ${port}`);
});

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    
    socket.on('message', data => {
        messages.push(data);
        io.emit('messageLogs', messages);
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data)
        io.emit('messageLogs', messages)
    })
})  