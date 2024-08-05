'use client';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { PurchaseCardPrimitive } from '../../../../_components/userComponents/purchaseCardPrimitive'
const PurchaseCard = () => {

    const [purchaseCardData, setPurchaseCardData] = useState([])
    const [cardClick, setCardClick] = useState(null)
    const router = useRouter()
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
                    setPurchaseCardData(response.data.purchase_card)
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

    const cardClickHandler = (index) => {
        if (cardClick) {
            setCardClick(null)
        } else {
            setCardClick(index)
        }
    }

    return (
        <div className='p-4 '>
            <div className="bg-dashBG rounded-xl p-8">
                <h1 className='text-2xl pb-10'>Your purchase card data</h1>
                {
                    purchaseCardData?.map((cardObj, index) => {
                        return (
                            <div className="text-white mb-8" key={index}>
                                <button onClick={() => cardClickHandler(index)} className='w-full text-left'>
                                    <h1 className='text-xl border-[1px] border-borderColour px-4 py-2 rounded-lg'>{cardObj.brand} Purchase Card</h1>
                                </button>
                                {
                                    cardClick !== null && cardClick === index &&
                                    <div className="border-[1px] border-borderColour px-4 pb-4 mx-4 rounded-lg border-t-0">
                                        <PurchaseCardPrimitive cards={cardObj.cards} />
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PurchaseCard
