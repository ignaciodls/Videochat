import React, {useState, useEffect} from 'react'
import { useGlobalContext } from '../contexts/globalContext'
import Message from './Message';
import { animateScroll } from 'react-scroll'

const ChatMessages = () => {

    const {socket} = useGlobalContext()

    const [messages, setMessages] = useState([]);

    useEffect(() => {

        socket?.on('message', (message) => {

            setMessages(messages => [...messages, message])
            animateScroll.scrollToBottom({
                containerId:'messages',
                duration:0
            })

        })

    },[socket])

    useEffect(() => {

        socket?.on('clear-messages', () => {

            setMessages([])

        })

    },[socket])

    return (
            
        <div className='chatMessages' id='messages'>
            {
                messages.map((message, idx) => {
                    
                    return(
                        <Message
                        message={message}
                        key={idx}/>
                    )

                })
            }
        </div>
    )
}

export default ChatMessages
