'use client';
import React, { useState } from 'react'
import Link from 'next/link'
import { assets } from '../../../../public/assets';
import { useRouter } from 'next/navigation';
const DashboardSideNav = () => {
    const [activeLink, setActiveLink] = useState('Your Digital Profile');
    const router = useRouter()
    const handleSignout = () => {
        localStorage.removeItem('user_tkn')
        router.push('/user/login')
    }
    return (

        <div className='flex h-full font-medium w-full '>
            <div className="flex flex-col gap-5 w-full p-4">
                <div className="p-4 flex flex-col gap-4 w-full bg-dashBG rounded-lg">
                    <Link
                        href='/user/dashboard'
                        className={`${activeLink === 'Your Digital Profile' ? ' bg-gradient-to-r from-gradientColor2 to-gradientColor1' : ' bg-signipPopupBG'} w-full h-full px-3 py-2.5 hover:bg-gradient-to-r hover:from-gradientColor2 hover:to-gradientColor1 active:bg-signipPopupBG rounded-xl text-sm flex gap-3`}
                        onFocus={() =>
                            setActiveLink('Your Digital Profile')}
                    >
                        <assets.OverviewIcon />
                        Your Digital Profile
                    </Link>
                    <Link
                        href='/user/dashboard/yourdata'
                        className={`${activeLink === 'Your Data' ? ' bg-gradient-to-r from-gradientColor2 to-gradientColor1' : ' bg-signipPopupBG'} w-full h-full px-3 py-2.5 hover:bg-gradient-to-r hover:from-gradientColor2 hover:to-gradientColor1 active:bg-signipPopupBG rounded-xl text-sm flex gap-3`}
                        onFocus={() => setActiveLink('Your Data')}
                    >
                        <assets.DataCategoriesIcon />
                        Your Data
                    </Link>
                    {/* <Link
                        href='/user/dashboard/datacontrol'
                        className={`${activeLink === 'Data Control' ? ' bg-signipPopupBG opacity-80' : 'bg-black'} w-full h-full px-3 py-2.5 hover:bg-signipPopupBG active:bg-signipPopupBG rounded-xl text-sm flex gap-3`}
                        onFocus={() => setActiveLink('Data Control')}
                    >
                        <assets.DataControlIcon />
                        Data Control
                    </Link>
                    <Link
                        href='/user/dashboard/brandaccess'
                        className={`${activeLink === 'Brand Access' ? ' bg-signipPopupBG opacity-80' : 'bg-black'} w-full h-full px-3 py-2.5 hover:bg-signipPopupBG active:bg-signipPopupBG rounded-xl text-sm flex gap-3`}
                        onFocus={() => setActiveLink('Brand Access')}
                    >
                        <assets.BrandsAccessIcon />
                        Brand Access
                    </Link>
                    <Link
                        href='/user/dashboard/settings'
                        className={`${activeLink === 'Settings' ? ' bg-signipPopupBG opacity-80' : 'bg-black'} w-full h-full px-3 py-2.5 hover:bg-signipPopupBG active:bg-signipPopupBG rounded-xl text-sm flex gap-3`}
                        onFocus={() => setActiveLink('Settings')}
                    >
                        <assets.SettingsIcon />
                        Settings
                    </Link> */}
                </div>

                <div onClick={handleSignout} className="p-[1px] w-full flex flex-col gap-4 bg-gradient-to-r from-gradientColor2 to-gradientColor1 rounded-lg">
                    <button className='bg-black py-2.5 px-10 rounded-lg'>Sign out</button>
                </div>

                {/* <div className="p-4 flex flex-col gap-2 w-full">
                        <button className=' bg-buttonColor text-white font-bold py-2.5 rounded-xl text-sm'>New Release</button>
                        <Link
                            href='/userprofile'
                            className={`${activeLink === 'Settings' ? ' bg-signipPopupBG opacity-80' : 'bg-black'} w-full h-full px-3 py-2 hover:bg-activeBG active:bg-activeBG rounded-xl text-base`}
                            onFocus={() =>
                                setActiveLink('Settings')}
                        >
                            Settings
                        </Link>
                        <Link
                            href='#'
                            className={`${activeLink === 'Community' ? ' bg-signipPopupBG opacity-80' : 'bg-black'} w-full h-full px-3 py-2 hover:bg-activeBG active:bg-activeBG rounded-xl text-base`}
                            onFocus={() => setActiveLink('Community')}
                        >
                            Community
                        </Link>
                        <Link
                            href='#'
                            className={`${activeLink === 'API Docs' ? ' bg-signipPopupBG opacity-80' : 'bg-black'} w-full h-full px-3 py-2 hover:bg-activeBG active:bg-activeBG rounded-xl text-base`}
                            onFocus={() => setActiveLink('API Docs')}
                        >
                            API Docs
                        </Link>
                    </div> */}
            </div>
        </div>
    )
}

export default DashboardSideNav