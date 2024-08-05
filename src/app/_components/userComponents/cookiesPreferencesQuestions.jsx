'use client';
import React, { useState } from 'react'
import { Modal } from '../primitives/modal'
import { Box, FormControlLabel, Switch } from '@mui/material'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CookiesPreferencesQuestionsSection = () => {

    const [strictly_necessary_cookies, setStrictly_necessary_cookies] = useState(false)
    const [functional_cookies, setFunctional_cookies] = useState(false)
    const [analytical_cookies, setAnalytical_cookies] = useState(false)
    const [marketing_cookies, setMarketing_cookies] = useState(false)
    const [session_cookies, setSession_cookies] = useState(false)
    const [permanent_cookies, setPermanent_cookies] = useState(false)
    const [social_media_cookies, setSocial_media_cookies] = useState(false)
    const [affiliate_cookies, setAffiliate_cookies] = useState(false)
    const [third_party_cookies, setThird_party_cookies] = useState(false)
    const [networking_cookies, setNetworking_cookies] = useState(false)
    const [super_cookies, setSuper_cookies] = useState(false)
    const [zombie_cookies, setZombie_cookies] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(true)

    const router = useRouter()

    const handleAcceptAllCookies = (e) => {
        e.preventDefault()
        setStrictly_necessary_cookies(true)
        setFunctional_cookies(true)
        setAnalytical_cookies(true)
        setMarketing_cookies(true)
        setSession_cookies(true)
        setPermanent_cookies(true)
        setSocial_media_cookies(true)
        setAffiliate_cookies(true)
        setThird_party_cookies(true)
        setNetworking_cookies(true)
        setSuper_cookies(true)
        setZombie_cookies(true)
    }

    const handleSaveCookiePreferences = async (e) => {
        e.preventDefault()

        const cookieDetails = new URLSearchParams({
            "cookies_preferences[strictly_necessary_cookies]": `${strictly_necessary_cookies}`,
            "cookies_preferences[functional_cookies]": `${functional_cookies}`,
            "cookies_preferences[analytical_cookies]": `${analytical_cookies}`,
            "cookies_preferences[marketing_cookies]": `${marketing_cookies}`,
            "cookies_preferences[session_cookies]": `${session_cookies}`,
            "cookies_preferences[permanent_cookies]": `${permanent_cookies}`,
            "cookies_preferences[social_media_cookies]": `${social_media_cookies}`,
            "cookies_preferences[affiliate_cookies]": `${affiliate_cookies}`,
            "cookies_preferences[third_party_cookies]": `${third_party_cookies}`,
            "cookies_preferences[networking_cookies]": `${networking_cookies}`,
            "cookies_preferences[super_cookies]": `${super_cookies}`,
            "cookies_preferences[zombie_cookies]": `${zombie_cookies}`,
            "email": "karansoni1072002@gmail.com",
            "source": "Hushh Button"
        })

        const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/add-user-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: cookieDetails
        })

        const response = await res.json()
        if (response.status === 1) {
            toast.success(response.data)
            router.push('/user/dashboard')
        } else if (res.status === -1) {
            toast.error(response.data)
        } else {
            toast.error('Something went wrong, please try again')
        }
    }

    return (
        <div className="flex justify-center bg-black text-white">
            <div className='w-2/3'>
                <Box>
                    <div className="flex flex-col gap-4 py-4">
                        <div className="flex items-center justify-between">
                            <p>Strictly Necessary Cookies</p>
                            <FormControlLabel label='' control={<Switch checked={strictly_necessary_cookies} onChange={() => { setStrictly_necessary_cookies(!strictly_necessary_cookies) }} />} />
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Functional Cookies</p>
                            <FormControlLabel label='' control={<Switch checked={functional_cookies} onChange={() => { setFunctional_cookies(!functional_cookies) }} />} />
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Analytical Cookies</p>
                            <FormControlLabel label='' control={<Switch checked={analytical_cookies} onChange={() => { setAnalytical_cookies(!analytical_cookies) }} />} />
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Marketing Cookies</p>
                            <FormControlLabel label='' control={<Switch checked={marketing_cookies} onChange={() => { setMarketing_cookies(!marketing_cookies) }} />} />
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Session Cookies</p>
                            <FormControlLabel label='' control={<Switch checked={session_cookies} onChange={() => { setSession_cookies(!session_cookies) }} />} />
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Permanent Cookies</p>
                            <FormControlLabel label='' control={<Switch checked={permanent_cookies} onChange={() => { setPermanent_cookies(!permanent_cookies) }} />} />
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Social Media Cookies</p>
                            <FormControlLabel label='' control={<Switch checked={social_media_cookies} onChange={() => { setSocial_media_cookies(!social_media_cookies) }} />} />
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Affiliate Cookies</p>
                            <FormControlLabel label='' control={<Switch checked={affiliate_cookies} onChange={() => { setAffiliate_cookies(!affiliate_cookies) }} />} />
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Third Party Cookies</p>
                            <FormControlLabel label='' control={<Switch checked={third_party_cookies} onChange={() => { setThird_party_cookies(!third_party_cookies) }} />} />
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Networking Cookies</p>
                            <FormControlLabel label='' control={<Switch checked={networking_cookies} onChange={() => { setNetworking_cookies(!networking_cookies) }} />} />
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Super Cookies</p>
                            <FormControlLabel label='' control={<Switch checked={super_cookies} onChange={() => { setSuper_cookies(!super_cookies) }} />} />
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Zombie Cookies</p>
                            <FormControlLabel label='' control={<Switch checked={zombie_cookies} onChange={() => { setZombie_cookies(!zombie_cookies) }} />} />
                        </div>
                    </div>
                </Box>
                <div className="flex justify-between">
                    <button onClick={handleSaveCookiePreferences} type='submit' className='px-4 py-3 bg-gradient-to-r from-gradientColor1 to-gradientColor2 text-white rounded-lg'>Save Cookie Preferences</button>
                    <button onClick={handleAcceptAllCookies} className='px-4 py-3 bg-gradient-to-r from-gradientColor1 to-gradientColor2 text-white rounded-lg'>Accept All Cookies</button>
                </div>
            </div>
        </div>
    )
}

export default CookiesPreferencesQuestionsSection