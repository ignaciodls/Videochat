import React, { useState } from 'react'
import { useGlobalContext } from '../contexts/globalContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const MessageSender = () => {

    const {socket, myId, partnerId} = useGlobalContext()
    const [message, setMesasge] = useState('')

    const sendMessage = (e) => {
        e.preventDefault()
        if(message.length > 0 && partnerId){
            socket.emit('message', {from:myId, to:partnerId, message})            
        }
        setMesasge('')
    }

    return (
        <div className='messageSender'>
            <form className='messageSenderForm' onSubmit={sendMessage}>
                <input className='messageSenderInput' type="text" value={message} onChange={(e) => setMesasge(e.target.value)}/>
                <button className='sendMessageButton' type='submit'>
                    <FontAwesomeIcon icon={faPaperPlane}/>
                     <span>Send</span>
                </button>
            </form>
        </div>
    )
}

export default MessageSender
