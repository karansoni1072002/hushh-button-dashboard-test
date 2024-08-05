'use client';
import React, { useEffect, useState } from 'react'
import { UserSingleBrandCardDetails } from '../../../../_components/userComponents/UserSingleBrandCardDetails'
const SeparateBrandCard = ({ params }) => {

    const [extensionDataPresent, setExtensionDataPresent] = useState(false)
    const [extensionData, setExtensionData] = useState()

    const [walletDataPresent, setWalletDataPresent] = useState(false)
    const [walletData, setWalletData] = useState()

    useEffect(() => {
        const getDetailedBrandCardData = async () => {

            const postData = new URLSearchParams({
                "UID": localStorage.getItem('hushh_id'),
                'brandName': params.brand_name
            })

            const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/get-detailed-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: postData
            })

            const response = await res.json()
            console.log(response)
            if (res.ok) {
                if (response.data.brandCardData) {
                    setWalletData(response.data.brandCardData)
                    setWalletDataPresent(true)
                }
            } else {
                console.log('something went wrong')
            }
        }

        getDetailedBrandCardData()
    }, [])
    useEffect(() => {
        const getExtensionData = async () => {
            const brandNameNormal = params.brand_name
            let brandNameCapital = brandNameNormal.toUpperCase()
            console.log(brandNameCapital)
            if (brandNameCapital === "LV") {
                brandNameCapital = "LOUIS VUITTON"
            }
            const postData = new URLSearchParams({
                "UID": localStorage.getItem('hushh_id'),
                'brandName': brandNameCapital
            })

            const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/get-detailed-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: postData
            })

            const response = await res.json()
            console.log(response)
            if (res.ok) {
                if (response.data.extensionData) {
                    setExtensionData(response.data.extensionData)
                    setExtensionDataPresent(true)
                }
            } else {
                console.log('something went wrong')
            }
        }

        getExtensionData()
    }, [])

    return (
        <div className='rounded-xl bg-dashBG mx-4 w-full'>
            <UserSingleBrandCardDetails walletData={walletData} walletDataPresent={walletDataPresent} extensionData={extensionData} extensionDataPresent={extensionDataPresent} />
        </div>
    )
}

export default SeparateBrandCard