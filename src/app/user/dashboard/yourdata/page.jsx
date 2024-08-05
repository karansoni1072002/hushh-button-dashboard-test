'use client';
import React, { useEffect, useState } from 'react'
import DataCategoriesFolders from '../../../_components/userComponents/dataCategoriesFolders'
import DataSharingControls from '../../../_components/userComponents/dataSharingControls'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const YourData = () => {
    const router = useRouter()
    const [user_tkn, setUser_tkn] = useState('')
    const [userData, setUserData] = useState({})
    const [userCardsFromWallet, setUserCardsFromWallet] = useState([])
    useEffect(() => {
        const getUserData = async () => {
            const user_tkn = localStorage.getItem('user_tkn')

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
                } else if (response.status === -1) {
                    router.push('/user/login')
                } else {
                    toast.error('Something went wrong, please try again!')
                }
            } else {
                router.push('/user/login')
            }
        }
        getUserData()
    }, [])

    // useEffect(() => {
    //     const getUserCards = async () => {
    //         const user_tkn = localStorage.getItem('user_tkn')
    //         if (user_tkn) {

    //             const postData = new URLSearchParams({
    //                 'email': user_tkn
    //             })

    //             const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/get-user-card-data', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //                 },
    //                 body: postData
    //             })

    //             const response = await res.json()
    //             // console.log(response)
    //             if (response) {
    //                 setUserCardsFromWallet(response)
    //             } else {
    //                 toast.error('Something went wrong!')
    //             }
    //         }
    //     }
    //     getUserCards()

    // }, [])


    return (
        <div className="flex flex-col gap-8 w-full">
            {/* <component.dashboard></component.dashboard> */}
            <div className="p-4 flex flex-col gap-3">
                <h1 className='text-2xl font-bold'>Welcome, {userData.name}</h1>
                <p>This is your personal data dashboard. Here, you can see, organize, collect, control, manage and share your own data </p>
            </div>
            <DataCategoriesFolders userCardsFromWallet={userCardsFromWallet} userData={userData} />
            <DataSharingControls userData={userData} />
        </div>
    )
}

export default YourData