import React, { memo } from 'react'
import { useGlobalContext } from '../contexts/globalContext'

const Message = memo(({message}) => {

    const {myId} = useGlobalContext()

    return (
        <>
        {
            message.from === myId?
            <div className='message'><div style={{color:'blue'}}>Me:</div><div className='messageText'>{message.message}</div></div>:
            <div className='message'><div style={{color:'red'}}>Partner:</div><div className='messageText'>{message.message}</div></div>
        }
        </>
    
     )
})

export default Message
