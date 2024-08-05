'use client';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { WalletCardPrimitive } from '../../../../_components/userComponents/walletCardPrimitive'
const categoryData = [
    {
        'company': 'Louis Vuitton',
        'urlSlug': 'louis-vuitton'
    },
    {
        'company': 'Gucci',
        'urlSlug': 'gucci'
    },
    {
        'company': 'Chanel',
        'urlSlug': 'chanel'
    },
    {
        'company': 'Amazon',
        'urlSlug': 'amazon'
    },
    {
        'company': 'Flipkart',
        'urlSlug': 'flipkart'
    },
    {
        'company': 'Mont Blanc',
        'urlSlug': 'mont-blanc'
    },
    {
        'company': 'Four Seasons',
        'urlSlug': 'four-seasons'
    },
    {
        'company': 'Myntra',
        'urlSlug': 'myntra'
    },
]

const gmailData = [
    {

    }
]

const CategoryDataShow = ({ params }) => {
    console.log(params.card_id)
    const [categoryFound, setCategoryFound] = useState({})
    const [userCardsFromWallet, setUserCardsFromWallet] = useState([])
    const [cardClick, setCardClick] = useState(null)
    const cardClickHandler = (index) => {
        if (cardClick) {
            setCardClick(null)
        } else {
            setCardClick(index)
        }
    }
    useEffect(() => {
        const getUserCards = async () => {
            const user_tkn = localStorage.getItem('user_tkn')
            if (user_tkn) {

                const postData = new URLSearchParams({
                    'email': user_tkn
                })

                const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/get-user-card-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                    body: postData
                })

                const response = await res.json()
                // console.log(response)
                if (response) {
                    setUserCardsFromWallet(response)
                    const categoryMatch = response?.find(item => item.card_id === params.card_id)
                    console.log(categoryMatch)
                    setCategoryFound(categoryMatch)
                } else {
                    toast.error('Something went wrong!')
                }
            }
        }
        getUserCards()

    }, [params.card_id])

    return (
        <div className='py-4 px-4'>
            {
                categoryFound &&
                (
                    <div className="bg-dashBG rounded-xl p-8">
                        <h1 className=' text-white text-2xl font-bold pb-10'>Your {categoryFound.brand_name} Data</h1>
                        <div className="flex flex-col w-full gap-4">
                            {
                                categoryFound.answers?.map((object, index) => {
                                    const answer_str = object.answers.join(', ')
                                    return (
                                        <div className="" key={object.answers}>
                                            <div className="text-white mb-4">
                                                <button onClick={() => cardClickHandler(index)} className='w-full text-left'>
                                                    <p className='text-xl border-[1px] border-borderColour px-4 py-2 rounded-lg'>{object.question}</p>
                                                </button>
                                                {
                                                    cardClick !== null && cardClick === index &&
                                                    <div className="border-[1px] border-borderColour px-4 pb-4 mx-4 rounded-lg border-t-0">
                                                        <WalletCardPrimitive answers={object.answers} />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* <div className='p-4 '>
                            <div className="bg-dashBG rounded-xl p-8">
                                <h1 className='text-2xl pb-10'>Your purchase card data</h1>
                                {
                                    categoryFound?.answers?.map((cardObj, index) => {
                                        return (
                                            <div className="text-white mb-8" key={index}>
                                                <button onClick={() => cardClickHandler(index)} className='w-full text-left'>
                                                    <h1 className='text-xl border-[1px] border-borderColour px-4 py-2 rounded-lg'>{cardObj.brand} Purchase Card</h1>
                                                </button>
                                                {
                                                    cardClick !== null && cardClick === index &&
                                                    <div className="border-[1px] border-borderColour px-4 pb-4 mx-4 rounded-lg border-t-0">
                                                        <WalletCardPrimitive cards={cardObj} />
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> */}
                    </div>
                )
            }
        </div>
    )
}

export default CategoryDataShow