'use client';
import React, { useEffect, useState } from 'react'
import { Box, FormControlLabel, Switch } from '@mui/material'
import { toast } from 'react-toastify';
import CookiesDataControlComponent from './CookiesDataControlComponent';
import Link from 'next/link';

const DataSharingControls = ({ userData }) => {
    const [cookieDataPresent, setCookieDataPresent] = useState(false)
    useEffect(() => {
        const checkUserData = async () => {
            if (!userData.cookiePreferences) {
                setCookieDataPresent(false)
            } else {
                setCookieDataPresent(true)
            }
        }

        checkUserData()
    })

    return (
        <div className='p-8 text-white flex flex-col gap-4 bg-dashBG rounded-xl'>
            <h1 className='text-xl font-bold'>Data sharing controls</h1>
            {
                cookieDataPresent &&
                <Link href='/user/dashboard/cookiescontrol'>
                    <div className="bg-gradient-to-r w-max from-gradientColor2 to-gradientColor1 rounded-lg p-[1px]">
                        <div className="py-4 px-3 bg-dashBG rounded-lg">
                            <p>Control your cookies data</p>
                        </div>
                    </div>
                </Link>
            }
        </div>
    )
}

export default DataSharingControls