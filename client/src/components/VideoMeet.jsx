import React, { useEffect, useRef } from 'react'
import { useGlobalContext } from '../contexts/globalContext'
import SearchingPartner from './SearchingPartner'

const VideoMeet = () => {

    const {stream, partnerVideo, partnerId, socket, peerConnection} = useGlobalContext()
    const myVideo = useRef()

    useEffect(() => {

        myVideo.current.srcObject = stream

    },[stream])

    const next = () => {

        if(partnerId){
            peerConnection.current.destroy()
        }
    }

    useEffect(()=>{
        socket?.emit('in-queue')
    },[socket])

    return (
    
        <div className='rootLeftBox'>

                {
                    partnerId?
                    <div className='videoBox'>
                        <video className='video'autoPlay ref={partnerVideo}/>
                    </div>:
                    <SearchingPartner/>
                }

                <div className='videoBox'>
                    <video className='video' autoPlay ref={myVideo} muted={true}/>
                </div>

            <div className='nextButton' onClick={next}>
                NEXT
            </div>
        </div>

    )
}

export default VideoMeet
