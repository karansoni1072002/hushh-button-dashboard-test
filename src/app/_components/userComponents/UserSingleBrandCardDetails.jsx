'use client';
import React, { useEffect, useState } from 'react'
import { assets } from '../../../../public/assets'
import Image from 'next/image'
import { Box, FormControlLabel, Switch } from '@mui/material'
import { useRouter } from 'next/navigation';
// const searchQueries = ["Accessories", "Bucket Hat", "Sweater", "Hoodie", "Loose Jeans"]
// const time = "30h 53min"
// const answers = [
//     {
//         "question": "Favorite iconic LV monogram print",
//         "answer": ["Monogram"]
//     },
//     {
//         "question": "preference of color for LV products",
//         "answer": ["Beige", "Beige"]
//     },
//     {
//         "question": "LV collection that resonates with your style?",
//         "answer": ["Spring 2019", "Spring 2019", "Spring 2019"]
//     },
//     {
//         "question": "Are there fashion icons who inspire your LV style?",
//         "answer": ["Audrey Hepburn"]
//     },
//     {
//         "question": "Where do you typically wear your Chanel pieces?",
//         "answer": ["To a party"]
//     },
//     {
//         "question": "attribute most important to you",
//         "answer": ["Brand heritage"]
//     }
// ]

export const UserSingleBrandCardDetails = ({ walletData, walletDataPresent, extensionData, extensionDataPresent }) => {

    const [sharing, setSharing] = useState(false)
    const [searchQueries, setSearchQueries] = useState([])
    const [visitTime, setVisitTime] = useState('')
    const [answers, setAnswers] = useState()
    const checkIfLink = (ans) => {
        const str = ans.slice(0, 6);
        if (str === "https:") {
            return true
        }
        return false
    }

    const router = useRouter()

    useEffect(() => {
        const setExtensionData = async () => {
            const sq = extensionData?.interest_keywords.split(',')
            setSearchQueries(sq)

            let time = new Date(extensionData?.visit_time)
            let hours = time.getHours()
            let minutes = time.getMinutes()
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            let timeString = `${hours}h ${minutes}min`
            setVisitTime(timeString)

            setAnswers(walletData?.answers)
        }

        setExtensionData()
    })

    const handleBackButtonClick = () => {
        router.push('/user/dashboard')
    }

    return (
        <div className='px-12 py-10'>
            <div className="flex items-center justify-between">
                <div className="flex gap-8">
                    <button onClick={handleBackButtonClick}><assets.ArrowLeftIcon /></button>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-black bg-opacity-40 rounded-full flex justify-center items-center">
                            {!walletDataPresent && <Image src={assets.DefaultBrandLogo} alt='Brand Logo' />}
                            <img src={walletData?.logo} alt='' />
                        </div>
                        <p className='text-xl font-medium text-dashGreyFont'>{walletData?.brand_name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <div className="">
                        <FormControlLabel label='' control={<Switch checked={sharing} onChange={() => { setSharing(!sharing) }} />} />
                    </div>
                    <div className="flex gap-5">
                        <button className='flex gap-3 items-center py-3 px-9 rounded bg-gradient-to-r from-gradientColor1 to-gradientColor2 text-sm font-bold leading-4'>
                            <assets.ReceiptIcon />
                            <p>Receipts</p>
                        </button>
                        <button className='py-4 px-11 bg-dashButton rounded text-sm font-bold leading-4'>View Vibes</button>
                    </div>
                </div>
            </div>
            {extensionDataPresent && <>
                <div className="mt-[3.75rem] ml-5 flex gap-3">
                    <div className="w-[11rem] h-[3.625rem] border border-dashBorder text-dashBorder p-4 font-bold leading-5 rounded-lg flex items-center">
                        <p>Standard</p>
                    </div>
                    <div className="w-[11rem] h-[3.625rem] border border-dashBorder text-dashBorder p-4 font-bold leading-5 rounded-lg flex items-center">
                        <p>Brands</p>
                    </div>
                    <div className="w-[11rem] h-[3.625rem] border border-dashBorder text-dashBorder p-4 font-bold leading-5 rounded-lg flex items-center">
                        <p>Budget</p>
                    </div>
                    <div className="w-[11rem] h-[3.625rem] border border-dashBorder text-dashBorder p-4 font-bold leading-5 rounded-lg flex items-center">
                        <p>Fit</p>
                    </div>
                </div>
                <div className="mt-9 ml-[1.5rem] flex flex-col gap-6">
                    <p className='text-lg leading-6 text-dashGreyFont'>Top Search Queries</p>
                    <div className="flex gap-6">
                        {
                            searchQueries?.map((query, index) => {
                                return (
                                    <div className="p-2 text-lg text-black leading-6 bg-white shadow rounded-xl" key={index}>
                                        <p>{query}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-6 ml-[1.5rem] mt-9">
                    <p className='text-lg leading-5 text-dashGreyFont'>Total Time spent on brand website</p>
                    <div className="text-5xl text-dashGreyFont">
                        {visitTime}
                    </div>
                </div>
            </>}
            {walletDataPresent && < div className="mt-11 ml-[1.5rem] flex flex-col gap-8">
                {
                    answers?.map((obj, index) => {
                        return (
                            <div className="flex flex-col gap-5" key={index}>
                                <p className='text-xs font-semibold leading-4 text-dashDarkGreyFont'>{obj.question.toUpperCase()}</p>
                                <p className='leading-5 font-extrabold text-dashGreyFont flex gap-5'>
                                    {
                                        !checkIfLink(obj.answers[0]) &&
                                        obj.answers.join(', ')
                                    }
                                    {
                                        checkIfLink(obj.answers[0]) &&
                                        obj.answers.map((ans, index) => {
                                            return (
                                                <div className="" key={index}>
                                                    <img src={ans} alt='ans' />
                                                </div>
                                            )
                                        })
                                    }
                                </p>
                            </div>
                        )
                    })
                }
            </div>}
        </div >
    )
}