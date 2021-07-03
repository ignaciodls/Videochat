import React from 'react'
import ChatMessages from './ChatMessages'
import MessageSender from './MessageSender'

const Chat = () => {


    return (
        <div className={'chat'}>
            <ChatMessages/>
            <MessageSender/>
        </div>
    )
}

export default Chat
