'use clent';
import React, { useEffect, useState } from 'react'
import { hushhButtonAssets } from '../../../../public/HushhButtonAssets/hushhButtonAssets'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const ButtonShareUserWalletDataScreen = ({ setActiveScreen, hushh_button_user_tkn, setUserAuthenticated }) => {
    const [responseMessage, setResponseMessage] = useState('')
    const [userData, setUserData] = useState({})
    const router = useRouter()
    useEffect(() => {
        const getUserData = async () => {
            const user_tkn = localStorage.getItem('hushh_button_user_tkn')

            if (user_tkn) {
                const postData = new URLSearchParams({
                    'email': user_tkn
                })
                const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/get-user-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                    body: postData
                })

                const response = await res.json()
                console.log(response)
                if (response.status === 1) {
                    setUserData(response.data)
                    localStorage.setItem('user_id', response.data.user_id)


                    //call user wallet cards here


                } else if (response.status === -1) {
                    setUserAuthenticated(false)
                    setActiveScreen('login')
                } else {
                    toast.error('Something went wrong, please try again!')
                }
            } else {
                setUserAuthenticated(false)
                setActiveScreen('login')
            }
        }
        getUserData()
    }, [])

    const ShareData = async (e) => {
        e.preventDefault()
        const dataToSend = new URLSearchParams({
            'email': hushh_button_user_tkn,
            'flag': true
        })
        const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/set-user-card-data-permission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: dataToSend
        })

        const response = await res.json()
        console.log(response)
        if (response.status == 1) {
            setResponseMessage('Data shared successfully, you can monitor it on your dashboard')
            setTimeout(() => {
                if (userData.cookiePreferences) {
                    setActiveScreen('what_to_do_today')
                } else {
                    setActiveScreen('cookies_selection')
                }
            }, 2000)
        } else {
            setResponseMessage('Failed to share the data')
            setActiveScreen('login')
            setUserAuthenticated(false)
        }


    }

    const DontShareData = async (e) => {
        e.preventDefault()
        setResponseMessage('We respect your privacy, we will not share your data. However you can change this anytime by visiting your dashboard')
        setTimeout(() => {
            if (userData.cookiePreferences) {
                setActiveScreen('what_to_do_today')
            } else {
                setActiveScreen('cookies_selection')
            }
        }, 2000)
    }

    return (
        <div className='max-w-96 px-5 py-5 flex flex-col gap-4 text-center'>
            <div className="text-center flex flex-col gap-2">
                <p className='font-semibold'>Hey, {userData.name}!</p>
                <p className='font-medium'>We found that you have saved some data in your wallet</p>
            </div>
            <div className="w-full object-cover h-full">
                <Image src={hushhButtonAssets.HushhDataCard} alt='Hushh Data Card' className='w-full h-full' />
            </div>
            <div className="">
                Do you want to share this data with brand?
            </div>
            <div className="w-full flex gap-4 px-4">
                <button
                    className=' bg-gradient-to-r from-gradientColor1 to-gradientColor2 w-full px-5 py-3.5 text-white font-bold text-sm leading-4 rounded-lg'
                    onClick={ShareData}
                >Yes</button>
                <button
                    className=' bg-gradient-to-r from-gradientColor1 to-gradientColor2 w-full px-5 py-3.5 text-white font-bold text-sm leading-4 rounded-lg'
                    onClick={DontShareData}
                >No</button>
            </div>
            <div className="mt-2">
                {responseMessage !== '' && <p>{responseMessage}</p>}
            </div>
        </div>
    )
}

export default ButtonShareUserWalletDataScreen