import react, { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid';
import Peer from 'simple-peer'

const globalContext = react.createContext()

export const ContextProvider = ({children}) => {
    
    const [socket, setSocket] = useState(null)
    const [stream, setStream] = useState(null)
    const myId = useMemo(() => uuidv4(),[])
    const [partnerId, setPartnerId] = useState(null)
    const peerConnection = useRef()
    const partnerVideo = useRef()

    const createPeer = useCallback((initiator = false, partner) =>{

        const peer = new Peer({
            initiator,
            stream
        })

        peer.on('signal', (data) => {
            socket.emit('send-signal',partner, data)
        })

        peer.on('stream', (partnerStream) =>{ 
            partnerVideo.current.srcObject = partnerStream
        })

        peer.on('close', () => {
            setPartnerId(null)
            socket.emit('clear-messages', myId, partnerId)
            socket.emit('in-queue')
        })

        peer.on('error',() => {
            
        })

        peerConnection.current = peer

    },[socket,stream, myId, partnerId])

    useEffect(() => {
        
        setSocket(io('http://localhost:8000/',{
            query:{
                myId
            }
        }))
        navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true
     
        })
        .then(mediaStream => {
            setStream(mediaStream)
        })

    },[myId])

    useEffect(() => {

        socket?.on('match-initiator', (partner) => {
            createPeer(true, partner)
            setPartnerId(partner)

        })

        return () => socket?.off('match-initiator')

    },[socket, createPeer])

    useEffect(() => {

        socket?.on('match', (partner) => {
            createPeer(false, partner)
            setPartnerId(partner)

        })

        return () => socket?.off('match')

    },[socket, createPeer])

    useEffect(() => {

        socket?.on('signal', (signal) => {
            peerConnection.current.signal(signal)
        })

    },[socket])

    return (
        <globalContext.Provider value={{socket,stream,myId, peerConnection, partnerVideo, partnerId, setPartnerId}}>
            {children}
        </globalContext.Provider>
    )

}

export const useGlobalContext = () =>{

    const context = react.useContext(globalContext)
    return context

}