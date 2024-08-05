'use client';
import React, { useState } from 'react'
import { hushhButtonAssets } from '../../../../public/HushhButtonAssets/hushhButtonAssets'
import Image from 'next/image'
import ButtonPopup from './ButtonPopup';

let questionsArray = [
    {
        question: "What do you want to explore today?",
        options: ["Our products", "Our team", "Get recruited at Hushh", "Partner with us"],
        answer: ""
    },
    {
        question: "What explains you the best?",
        options: ["User", "Agent", "Brand representative", "Fellow Developer", "Applicant"],
        answer: ""
    },
    {
        question: "What product you want to explore first?",
        options: ["Hushh Button (This very thing :)", "Hushh Wallet App", "Hushh For Students", "Browser Companion", "Vibe Search", "Concierge App", "Valet Chat", "Hushh Developer APIs"],
        answer: ""
    }
]

const HushhButton = () => {
    const [buttonClicked, setButtonClicked] = useState(false)

    const ButtonClickHandler = () => {
        setButtonClicked(!buttonClicked);
    }

    return (
        <div className=''>
            {buttonClicked &&
                <div className="w-max fixed bottom-28 right-10">
                    <ButtonPopup setButtonClicked={setButtonClicked} questionsArray={questionsArray} />
                </div>
            }
            <div className="w-12 h-12 bottom-10 right-10 fixed">
                <button onClick={ButtonClickHandler} className='w-full h-full object-cover'>
                    <Image src={hushhButtonAssets.HushhButtonIcon} alt='Hushh Button Icon' className='w-full h-full' />
                </button>
            </div>
        </div>
    )
}

export default HushhButton