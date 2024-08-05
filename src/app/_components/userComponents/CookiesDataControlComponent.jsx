'use client';
import React, { useEffect, useState } from 'react'
import { Box, FormControlLabel, Switch } from '@mui/material'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CookiesDataControlComponent = () => {

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

    const router = useRouter()
    const [user_tkn, setUser_tkn] = useState('')
    const [noCookiesSet, setNoCookiesSet] = useState(false)
    useEffect(() => {
        const getUserCookiesData = async () => {
            const userToken = await localStorage.getItem('user_tkn')
            if (!userToken) {
                router.push('/user/login')
            } else {
                setUser_tkn(userToken)
                const postData = new URLSearchParams({
                    "email": userToken
                })

                const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/get-user-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                    body: postData
                })

                const response = await res.json()
                if (response.status === 1) {
                    if (response.data.cookiePreferences) {
                        const cookiesData = response.data.cookiePreferences
                        setExistingUserCookiesPreferences(cookiesData)
                        setNoCookiesSet(false)
                    }
                    else {
                        setNoCookiesSet(true)
                    }
                } else {
                    if (response.data === 'User not found') {
                        router.push('/user/login')
                    }
                }
            }
        }

        getUserCookiesData()
    }, [])

    const setExistingUserCookiesPreferences = (cookiesData) => {

        if (cookiesData.strictly_necessary_cookies === "false" || cookiesData.strictly_necessary_cookies === "0") {
            setStrictly_necessary_cookies(false)
        } else if (cookiesData.strictly_necessary_cookies === "true" || cookiesData.strictly_necessary_cookies === "1") {
            setStrictly_necessary_cookies(true)
        }

        if (cookiesData.functional_cookies === "false" || cookiesData.functional_cookies === "0") {
            setFunctional_cookies(false)
        } else if (cookiesData.functional_cookies === "true" || cookiesData.functional_cookies === "1") {
            setFunctional_cookies(true)
        }

        if (cookiesData.analytical_cookies === "false" || cookiesData.analytical_cookies === "0") {
            setAnalytical_cookies(false)
        } else if (cookiesData.analytical_cookies === "true" || cookiesData.analytical_cookies === "1") {
            setAnalytical_cookies(true)
        }

        if (cookiesData.marketing_cookies === "false" || cookiesData.marketing_cookies === "0") {
            setMarketing_cookies(false)
        } else if (cookiesData.marketing_cookies === "true" || cookiesData.marketing_cookies === "1") {
            setMarketing_cookies(true)
        }

        if (cookiesData.session_cookies === "false" || cookiesData.session_cookies === "0") {
            setSession_cookies(false)
        } else if (cookiesData.session_cookies === "true" || cookiesData.session_cookies === "1") {
            setSession_cookies(true)
        }

        if (cookiesData.permanent_cookies === "false" || cookiesData.permanent_cookies === "0") {
            setPermanent_cookies(false)
        } else if (cookiesData.permanent_cookies === "true" || cookiesData.permanent_cookies === "1") {
            setPermanent_cookies(true)
        }

        if (cookiesData.social_media_cookies === "false" || cookiesData.social_media_cookies === "0") {
            setSocial_media_cookies(false)
        } else if (cookiesData.social_media_cookies === "true" || cookiesData.social_media_cookies === "1") {
            setSocial_media_cookies(true)
        }

        if (cookiesData.affiliate_cookies === "false" || cookiesData.affiliate_cookies === "0") {
            setAffiliate_cookies(false)
        } else if (cookiesData.affiliate_cookies === "true" || cookiesData.affiliate_cookies === "1") {
            setAffiliate_cookies(true)
        }

        if (cookiesData.third_party_cookies === "false" || cookiesData.third_party_cookies === "0") {
            setThird_party_cookies(false)
        } else if (cookiesData.third_party_cookies === "true" || cookiesData.third_party_cookies === "1") {
            setThird_party_cookies(true)
        }

        if (cookiesData.networking_cookies === "false" || cookiesData.networking_cookies === "0") {
            setNetworking_cookies(false)
        } else if (cookiesData.networking_cookies === "true" || cookiesData.networking_cookies === "1") {
            setNetworking_cookies(true)
        }

        if (cookiesData.super_cookies === "false" || cookiesData.super_cookies === "0") {
            setSuper_cookies(false)
        } else if (cookiesData.super_cookies === "true" || cookiesData.super_cookies === "1") {
            setSuper_cookies(true)
        }

        if (cookiesData.zombie_cookies === "false" || cookiesData.zombie_cookies === "0") {
            setZombie_cookies(false)
        } else if (cookiesData.zombie_cookies === "true" || cookiesData.zombie_cookies === "1") {
            setZombie_cookies(true)
        }
    }

    const handleCookieUpdate = async (cookieName, cookieValue) => {

        const cookieDetails = new URLSearchParams({
            "cookies": cookieName,
            "status": `${cookieValue}`,
            "email": user_tkn
        })

        const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/update-user-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: cookieDetails
        })
        console.log(res)
        const response = await res.json()
        console.log(response)
        if (response.status === 1) {
            console.log('function is working')
            location.reload()
            setNoCookiesSet(false)
            toast.success('Cookie updated successfully')
        } else if (res.status === -1) {
            toast.error(response.data)
        } else {
            toast.error('Something went wrong, please try again')
        }
    }
    const clickHereHandler = () => {
        router.push('/user/cookiepreferences')
    }
    return (
        <>
            {
                noCookiesSet ?
                    <div className="w-full h-full py-4 text-white flex flex-col pl-32 pr-80 gap-5 text-center pt-10">
                        <p className='font-bold text-4xl'>You have not set your cookies yet</p>
                        <div className="flex flex-col gap-3 items-center">
                            <p>You can start by selecting the cookies you want to share</p>
                            <button onClick={clickHereHandler} className='py-2.5 px-5 w-max font-bold rounded-lg bg-gradient-to-r from-gradientColor1 to-gradientColor2'>Click Here</button>
                        </div>
                    </div>
                    :
                    <div className='p-4 flex text-white flex-col gap-4'>
                        <h1 className='text-xl font-bold'>Your Cookies Data</h1>

                        <div className="flex justify-between items-center">
                            <div className="">
                                <p className='text-base font-medium'>Strictly Necessary Cookies</p>
                                <p className='text-sm font-normal text-fontColorLight2'>Essential for website functionality, such as navigation and access to secure areas.</p>
                            </div>
                            <div className="">
                                <Box>
                                    <FormControlLabel label='' control={<Switch checked={strictly_necessary_cookies} onChange={() => { handleCookieUpdate('strictly_necessary_cookies', !strictly_necessary_cookies) }} />} />
                                </Box>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <p className='text-base font-medium'>Functional Cookies</p>
                                <p className='text-sm font-normal text-fontColorLight2'>Enhance website usability by remembering user preferences, such as language or region settings.</p>
                            </div>
                            <div className="">
                                <Box>
                                    <FormControlLabel label='' control={<Switch checked={functional_cookies} onChange={() => { handleCookieUpdate('functional_cookies', !functional_cookies) }} />} />
                                </Box>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <p className='text-base font-medium'>Analytical Cookies</p>
                                <p className='text-sm font-normal text-fontColorLight2'>Collect data on website usage to analyze and improve performance, typically used by website owners to understand how users interact with their site.</p>
                            </div>
                            <div className="">
                                <Box>
                                    <FormControlLabel label='' control={<Switch checked={analytical_cookies} onChange={() => { handleCookieUpdate('analytical_cookies', !analytical_cookies) }} />} />
                                </Box>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <p className='text-base font-medium'>Marketing Cookies</p>
                                <p className='text-sm font-normal text-fontColorLight2'>Track user behavior across websites to display targeted advertisements, often used by advertising networks.</p>
                            </div>
                            <div className="">
                                <Box>
                                    <FormControlLabel label='' control={<Switch checked={marketing_cookies} onChange={() => { handleCookieUpdate('marketing_cookies', !marketing_cookies) }} />} />
                                </Box>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <p className='text-base font-medium'>Session Cookies</p>
                                <p className='text-sm font-normal text-fontColorLight2'>Temporarily store information during a user&apos;s browsing session and are deleted once the session ends, used for maintaining user state.</p>
                            </div>
                            <div className="">
                                <Box>
                                    <FormControlLabel label='' control={<Switch checked={session_cookies} onChange={() => { handleCookieUpdate('session_cookies', !session_cookies) }} />} />
                                </Box>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <p className='text-base font-medium'>Permanent Cookies</p>
                                <p className='text-sm font-normal text-fontColorLight2'>Remain on the user&apos;s device even after the browsing session ends, storing user preferences and login information for future visits.</p>
                            </div>
                            <div className="">
                                <Box>
                                    <FormControlLabel label='' control={<Switch checked={permanent_cookies} onChange={() => { handleCookieUpdate('permanent_cookies', !permanent_cookies) }} />} />
                                </Box>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <p className='text-base font-medium'>Social Media Cookies</p>
                                <p className='text-sm font-normal text-fontColorLight2'>Enable social media integration on websites, allowing users to share content or interact with social media platforms.</p>
                            </div>
                            <div className="">
                                <Box>
                                    <FormControlLabel label='' control={<Switch checked={social_media_cookies} onChange={() => { handleCookieUpdate('social_media_cookies', !social_media_cookies) }} />} />
                                </Box>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <p className='text-base font-medium'>Affiliate Cookies</p>
                                <p className='text-sm font-normal text-fontColorLight2'>Track referrals from other websites and affiliate marketing efforts, used to credit affiliate partners for referred customers.</p>
                            </div>
                            <div className="">
                                <Box>
                                    <FormControlLabel label='' control={<Switch checked={affiliate_cookies} onChange={() => { handleCookieUpdate('affiliate_cookies', !affiliate_cookies) }} />} />
                                </Box>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <p className='text-base font-medium'>Third-party Cookies</p>
                                <p className='text-sm font-normal text-fontColorLight2'>Set by domains other than the one the user is visiting, often used for advertising and tracking across multiple websites.</p>
                            </div>
                            <div className="">
                                <Box>
                                    <FormControlLabel label='' control={<Switch checked={third_party_cookies} onChange={() => { handleCookieUpdate('third_party_cookies', !third_party_cookies) }} />} />
                                </Box>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <p className='text-base font-medium'>Networking Cookies</p>
                                <p className='text-sm font-normal text-fontColorLight2'>Facilitate communication between different parts of a network, typically used in distributed systems or for load balancing.</p>
                            </div>
                            <div className="">
                                <Box>
                                    <FormControlLabel label='' control={<Switch checked={networking_cookies} onChange={() => { handleCookieUpdate('networking_cookies', !networking_cookies) }} />} />
                                </Box>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <p className='text-base font-medium'>Super Cookies</p>
                                <p className='text-sm font-normal text-fontColorLight2'>Advanced tracking mechanisms that combine various techniques to persistently track users across multiple sites and devices.</p>
                            </div>
                            <div className="">
                                <Box>
                                    <FormControlLabel label='' control={<Switch checked={super_cookies} onChange={() => { handleCookieUpdate('super_cookies', !super_cookies) }} />} />
                                </Box>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <p className='text-base font-medium'>Zombie Cookies</p>
                                <p className='text-sm font-normal text-fontColorLight2'>Persistent cookies that are automatically recreated after deletion, often used for tracking purposes without user consent.</p>
                            </div>
                            <div className="">
                                <Box>
                                    <FormControlLabel label='' control={<Switch checked={zombie_cookies} onChange={() => { handleCookieUpdate('zombie_cookies', !zombie_cookies) }} />} />
                                </Box>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default CookiesDataControlComponent