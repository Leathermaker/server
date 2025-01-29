import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";


const app = express()
const port = 3000
const server = createServer(app)
const io = new Server(server,{cors:true})


  let  i = 1
  let sockets = []
  
io.on('connection',(socket)=>{
	console.log(socket.id,i)
	socket.broadcast.emit('new-user',"new user joined")
	i++

	sockets.push(socket.id)
	console.log(sockets.length)

	socket.on('message',(msg=>{
		console.log(msg)
		io.emit('receive',msg)
	}))

	// socket.on('room', (data) => {
    //     console.log(data.room)rs; 
    //     io.to(data.room).emit('room', { msg: data.text }); // Emit back to the client
    // });
})

server.listen(port,()=>{
	console.log(`Sussfully connected with ${port}`)
})


