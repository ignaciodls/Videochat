import React, { useEffect, useState } from 'react'
import Chat from '../components/Chat'
import VideoMeet from '../components/VideoMeet'
import { useGlobalContext } from '../contexts/globalContext'
import '../styles/meeting.css'

const Metting = () => {

    const [started, setStarted] = useState(false)
    const {peerConnection} = useGlobalContext()

    useEffect(() => {
        window.addEventListener('unload', () => {
            if(peerConnection.current){
                peerConnection.current.destroy()
            }
        })

    },[peerConnection])

    return (
        <>
        {started?
        <div className='root'>
            <VideoMeet/>
            <Chat/>
        </div>:
        <div className='root2'>
            <div className='introductionBox'>
                <div className='introductionTitle'>
                    Videochat
                </div>
                <div className='introductionText'>
                    Click start to talk and chat with a stranger from anywhere in the world.
                </div>
                <div onClick={() => setStarted(true)} className='startButton'>Start!</div>
            </div>
        </div>
        }
        </>
    )
}

export default Metting
