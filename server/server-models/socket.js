
const queue = []

class Socket {

    constructor( io ) {

        this.io = io;

        this.socketEvents();

    }

    socketEvents() {

        setInterval(() => {
            console.log(queue.length)
            while(queue.length >= 2){

                let s1 = queue.splice(Math.floor(Math.random() * queue.length),1)[0]
                let s2 = queue.splice(Math.floor(Math.random() * queue.length),1)[0]

                if(!s1.connected && !s2.connected){

                    continue

                }
                else if(s1.connected && s2.connected){
                    
                    this.io.to(s1.handshake.query['myId']).emit('match-initiator',s2.handshake.query['myId'])
                    this.io.to(s2.handshake.query['myId']).emit('match',s1.handshake.query['myId'])
                    
                }
                else{
                    if(s1.connected){
                        queue.push(s1)
                    }
                    else{
                        queue.push(s2)
                    }
                }
            }

        }, 4000);

        this.io.on('connection', (socket) => {

            socket.join(socket.handshake.query['myId'])

            socket.on('in-queue', () => {
                
                queue.push(socket)
                
            })

            socket.on('send-signal', (partner, signal) => {
                this.io.to(partner).emit('signal',signal)
            })

            socket.on('message', ({from, to, message}) => {
                this.io.to(from).to(to).emit('message', {from, to, message})
            })

            socket.on('clear-messages', (me, partner) => {
                this.io.to(me).to(partner).emit('clear-messages')
            })


            socket.on('disconnect', () =>{
            })

        })

    }
}

module.exports = Socket