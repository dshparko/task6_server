const ws = require('ws')

const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const routes = require('./routes/routes')
const corsModdleware = require('./middleware/cors.middleware')


const app = express()
const PORT = config.get('serverPort')

app.use(corsModdleware)
app.use(express.json())
app.use('/api/auth', routes)

const start = async () => {
    try {
        mongoose.connect(config.get('bdUrl'), {
                useNewUrlParser:true,
                useUnifiedTopology:true
            })

        


        app.listen(PORT, () => {
            console.log('Server is running on port', PORT);
            console.log(`http://localhost:${PORT}`);
        })
    } catch (error) {
        
    }
}

start()













/////////////////////////////////////////////////

// const wss = new ws.Server({
//     port: 5000,
// }, () => console.log(`server started on 5000`))



// wss.on('connection', function connection(ws) {
//     ws.on('message', function (message) {
//         message = JSON.parse(message)
//         switch (message.event) {
//             case 'message':
//                 messageToAll(message)
//                 break;
//             case 'connenction':
//                 messageToAll(message)
//                 break
// jasachatt6
        
//         }
//     })
// })

// function messageToAll(message) {
//     wss.clients.forEach(client => {
//         client.send(JSON.stringify(message))
//     })
// }

