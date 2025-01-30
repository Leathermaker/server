import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);
    const id = socket.id;
    io.to(socket.id).emit('currentUser', socket.id);

    socket.on('message', (msg) => {
        let obj = {
            msg: msg,
            senderId: id
        };
        io.emit('receive', { obj }); // Broadcast the message to all clients
    });

    socket.on('file', (fileData) => {
        console.log('File received:', fileData.fileName);
        // Broadcast the file to all clients
        io.emit('receive', { obj: { msg: `File: ${fileData.fileName}`, senderId: id } });
        // You can save the file or process it further here
    });
	socket.on('send-file',(data)=>{
		let fileObj = {
		  fileName:	data.fileName,
			fileData :  data.fileData,
			senderId : socket.id
		}
		console.log("hello")
		io.emit('file-receive',(fileObj))
	})
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});