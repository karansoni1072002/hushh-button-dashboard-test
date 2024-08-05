'use client';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
const UserProfileVideoSection = ({ userData }) => {
    const router = useRouter()
    const [profileVideoBlob, setProfileVideoBlob] = useState()
    const [profileVideoPresent, setProfileVideoPresent] = useState(false)
    const [moreVideos, setMoreVideos] = useState()
    const [moreVideosPresent, setMoreVideosPresent] = useState(false)
    useEffect(() => {
        const getUserData = async () => {
            const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            await delay(5000)


            const hushh_id = localStorage.getItem('hushh_id')

            if (hushh_id) {
                const postData = new URLSearchParams({
                    'UID': hushh_id
                })
                const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/get_user_all_videos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                    body: postData
                })

                const response = await res.json()
                // console.log(response)
                if (res.ok) {
                    const UserVideos = response.userVideos
                    if (UserVideos.profileVideo.profileVideo) {
                        setProfileVideoBlob(UserVideos.profileVideo.profileVideo)
                        setProfileVideoPresent(true)
                    }
                    // console.log(UserVideos.uploadedVideos.uploadedVideos)
                    if (UserVideos.uploadedVideos.uploadedVideos?.length) {
                        setMoreVideos(UserVideos.uploadedVideos.uploadedVideos)
                        setMoreVideosPresent(true)
                    }
                } else {
                    toast.error('Something went wrong, please try again!')
                }
            } else {
                router.push('/user/login')
            }
        }
        getUserData()
    }, [])

    const createVideoHandler = () => {
        router.push('/user/recordvideo')
    }

    return (
        <>
            <div className="p-8 flex flex-col gap-10">
                <div className="grid grid-cols-3 ">
                    {profileVideoPresent &&

                        <div className=" w-full h-full flex items-center justify-center">
                            <iframe src={profileVideoBlob} allowFullScreen frameborder="0"></iframe>
                        </div>

                    }
                    {
                        moreVideosPresent && moreVideos.map((video, index) => {
                            console.log(video)
                            return (
                                <div className="w-full h-full flex items-center justify-center" key={index}>
                                    <iframe src={video} allowFullScreen frameborder="0"></iframe>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="">
                    {profileVideoPresent && moreVideosPresent &&
                        <div className="w-full flex justify-center">
                            <button onClick={createVideoHandler} className='py-3 px-[4.688rem] bg-dashButton rounded'>Create Video</button>
                        </div>
                    }
                </div>
            </div>
            {
                !profileVideoPresent &&
                <div className="px-8">
                    <div className="pt-20 pb-32 w-full flex flex-col items-center gap-8">
                        <p className=' text-dashDarkFont'>You can add in an intro video that people can see to learn about you</p>
                        <div className="">
                            <button onClick={createVideoHandler} className='py-3 px-[4.688rem] bg-dashButton rounded'>Create Video</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default UserProfileVideoSection