import React from 'react'
import Image from 'next/image'
import { hushhButtonAssets } from '../../../../public/HushhButtonAssets/hushhButtonAssets'

const ButtonPopupHeader = () => {
    return (
        <div className="w-full rounded-t-xl flex gap-4 py-5 pl-5 bg-gradient-to-r from-gradientColor1 to-gradientColor2 items-center">
            <Image src={hushhButtonAssets.HushhButtonIcon} alt='Hushh Button Icon' className='w-8 h-8' />
            <div className="">
                <p className='text-lg font-semibold w-full text-white'>Hushh Button</p>
            </div>
        </div>
    )
}

export default ButtonPopupHeader