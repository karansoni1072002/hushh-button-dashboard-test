'use client';
import React, { useEffect, useState } from 'react'
import { assets } from '../../../../public/assets'
import DataCategoriesCard from './dataCategoriesCard'
import Link from 'next/link';

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

const DataCategoriesFolders = ({ userCardsFromWallet, userData }) => {
  const [cookiesData, setCookiesData] = useState({})
  const [cookiesDataPresent, setCookiesDataPresent] = useState(false)
  const [shoppingCardData, setShoppingCardData] = useState([])
  const [shoppingCardDataPresent, setShoppingCardDataPresent] = useState(false)
  const [walletCardsData, setWalletCardsData] = useState([])
  const [walletCardsDataPresent, setWalletCardsDataPresent] = useState(false)

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
          if (response.length > 0) {
            console.log('workingggg')
            console.log(response)
            setWalletCardsData(response)
            setWalletCardsDataPresent(true)
          }
          if (userData.cookiePreferences) {
            setCookiesData(userData.cookiePreferences)
          }
          setCookiesDataPresent(true)
          if (userData.purchase_card !== 0) {
            setShoppingCardData(userData.purchase_card)
            setShoppingCardDataPresent(true)
          }
          // setWalletCardsData(response)
        } else {
          toast.error('Something went wrong!')
        }
      }
    }
    getUserCards()

  }, [])

  // useEffect(() => {
  //   console.log("userCardsFromWallet:", userCardsFromWallet);
  //   const setData = () => {
  //     if (userCardsFromWallet.length > 0) {
  //       console.log('workingggg')
  //       setWalletCardsData(userCardsFromWallet)
  //       setWalletCardsDataPresent(true)
  //     }
  //     if (userData.cookiePreferences) {
  //       setCookiesData(userData.cookiePreferences)
  //     }
  //     setCookiesDataPresent(true)
  //     if (userData.purchase_card !== 0) {
  //       setShoppingCardData(userData.purchase_card)
  //       setShoppingCardDataPresent(true)
  //     }
  //   }

  //   setData()

  // }, [])

  // console.log(userCardsFromWallet)

  return (
    <div className='p-8 bg-dashBG rounded-xl flex flex-col gap-6'>
      <div className="flex flex-col gap-2">
        <h1 className='font-bold text-xl'>Data Categories</h1>
        <p>Here you can see all your data you have saved</p>
      </div>
      <div className=" grid grid-cols-5 gap-3 w-full">

        {cookiesDataPresent &&
          <Link href={`/user/dashboard/cookiescontrol`}>
            <div className="border border-1 border-borderColour rounded-lg text-base font-bold w-full">
              <div className="flex gap-3 py-6 w-full pl-4">
                <div className="">
                  {<assets.LockIcon className='fill-white' />}
                </div>
                <div className="flex-1 text-wrap w-full">
                  Cookies Card
                </div>
              </div>
            </div>
          </Link>
        }
        {shoppingCardDataPresent &&
          <Link href={`/user/dashboard/yourdata/purchase_card`}>
            <div className="border border-1 border-borderColour rounded-lg text-base font-bold w-full">
              <div className="flex gap-3 py-6 w-full pl-4">
                <div className="">
                  {<assets.LockIcon className='fill-white' />}
                </div>
                <div className="flex-1 text-wrap w-full">
                  Purchase Card
                </div>
              </div>
            </div>
          </Link>
        }

        {
          walletCardsDataPresent && walletCardsData.map((card, index) => {
            return (
              <DataCategoriesCard card={card} key={index} />
            )
          })
        }
      </div>
    </div>
  )
}

export default DataCategoriesFolders