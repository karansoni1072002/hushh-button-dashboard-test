'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export const UserBrandCardsSection = () => {

    const [walletCardsData, setWalletCardsData] = useState()
    const [walletCardsDataPresent, setWalletCardsDataPresent] = useState()
    const router = useRouter()
    useEffect(() => {
        const getUserCards = async () => {
            const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            await delay(5000)

            const hushh_id = localStorage.getItem('hushh_id')
            if (hushh_id) {

                const postData = new URLSearchParams({
                    'UID': hushh_id
                })

                const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/get-user-card-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                    body: postData
                })

                const response = await res.json()
                console.log(response)
                if (response.status === 1) {
                    if (response.data.length > 0) {
                        console.log('workingggg')
                        console.log(response)
                        setWalletCardsData(response.data)
                        setWalletCardsDataPresent(true)
                    }
                } else {
                    toast.error('Something went wrong!')
                }
            }
        }
        getUserCards()

    }, [])

    const handleCardClick = (brand_name) => {
        router.push(`/user/dashboard/brandcard/${brand_name}`)
    }

    return (
        <div className='px-6 py-4'>
            <div className="grid grid-cols-5 gap-8">
                {
                    walletCardsDataPresent && walletCardsData?.map((card, index) => {
                        return (
                            <div onClick={() => handleCardClick(card.brand_name)} className=" cursor-pointer object-cover w-full h-[7.5rem] relative rounded" key={index}>
                                <div className="absolute top-0 z-50 w-full h-full flex flex-col rounded justify-between">
                                    <div className="ml-2 mt-1 flex flex-col gap-1">
                                        <p className=''>{card.brand_name}</p>
                                        <p className='text-xs'>{card.name}</p>
                                    </div>
                                    <div className="max-h-[2.5rem] w-[3.125rem] object-contain m-2 rounded">
                                        <img src={card.logo} alt={card.brand_name} className='max-h-full max-w-full' />
                                    </div>
                                </div>
                                <div className="relative w-full h-full object-cover rounded">
                                    <div className="w-full h-full absolute top-0 z-10 bg-black bg-opacity-20 rounded"></div>
                                    <img src={card.body_image} alt={card.brand_name} className='h-full w-full object-cover rounded' />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                !walletCardsDataPresent &&
                <div className="w-full pb-16 pt-8 flex justify-center">
                    <p className='text-dashDarkFont'>No cards added in wallet. Start by adding some cards in wallet!</p>
                </div>
            }
        </div>
    )
}
