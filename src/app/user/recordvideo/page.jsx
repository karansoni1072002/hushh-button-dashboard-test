'use client';
import React, { useState } from 'react'
import VideoRecorder from '../../_components/userComponents/VideoRecorder'
import { Modal } from '../../_components/brandComponents/Modal'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const VideoRecordingPage = () => {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(true)

    const videoSaveHandler = () => {
        toast.success('Video saved successfully!')
        router.push('/user/dashboard')
    }

    return (
        <div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <VideoRecorder videoSaveHandler={videoSaveHandler} />
            </Modal>
        </div>
    )
}

export default VideoRecordingPage