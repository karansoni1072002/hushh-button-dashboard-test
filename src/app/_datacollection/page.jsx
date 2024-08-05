'use client';
import React, { useState } from 'react'
import Link from 'next/link'

const DataCollection = () => {
    const [activeLink, setActiveLink] = useState('Data Collection');

    return (
        <div className='flex px-6 py-5 text-fontColor h-screen font-medium'>
            <div className="w-1/4 flex flex-col justify-between">
                <div className="p-4 flex flex-col gap-2 w-full">
                    <Link href='#' className='text-base'>Docs
                    </Link>
                    <Link
                        href='/userprofile'
                        className={`${activeLink === 'Dashboard' ? 'bg-activeBG' : 'bg-white'} w-full h-full px-3 py-2 hover:bg-activeBG active:bg-activeBG rounded-xl text-sm`}
                        onFocus={() =>
                            setActiveLink('Dashboard')}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href='#'
                        className={`${activeLink === 'Data Collection' ? 'bg-activeBG' : 'bg-white'} w-full h-full px-3 py-2 hover:bg-activeBG active:bg-activeBG rounded-xl text-sm`}
                        onFocus={() => setActiveLink('Data Collection')}
                    >
                        Data Collection
                    </Link>
                    <Link
                        href='#'
                        className={`${activeLink === 'Integrations' ? 'bg-activeBG' : 'bg-white'} w-full h-full px-3 py-2 hover:bg-activeBG active:bg-activeBG rounded-xl text-sm`}
                        onFocus={() => setActiveLink('Integrations')}
                    >
                        Integrations
                    </Link>
                    <Link
                        href='#'
                        className={`${activeLink === 'Settings' ? 'bg-activeBG' : 'bg-white'} w-full h-full px-3 py-2 hover:bg-activeBG active:bg-activeBG rounded-xl text-sm`}
                        onFocus={() => setActiveLink('Settings')}
                    >
                        Settings
                    </Link>
                </div>
                <div className="p-4 flex flex-col gap-2 w-full">
                    <button className=' bg-buttonColor text-white font-bold py-2.5 rounded-xl text-sm'>New Release</button>
                    <Link
                        href='/userprofile'
                        className={`${activeLink === 'Help Center' ? 'bg-activeBG' : 'bg-white'} w-full h-full px-3 py-2 hover:bg-activeBG active:bg-activeBG rounded-xl text-base`}
                        onFocus={() =>
                            setActiveLink('Help Center')}
                    >
                        Help Center
                    </Link>
                    <Link
                        href='#'
                        className={`${activeLink === 'Community' ? 'bg-activeBG' : 'bg-white'} w-full h-full px-3 py-2 hover:bg-activeBG active:bg-activeBG rounded-xl text-base`}
                        onFocus={() => setActiveLink('Community')}
                    >
                        Community
                    </Link>
                    <Link
                        href='#'
                        className={`${activeLink === 'API Docs' ? 'bg-activeBG' : 'bg-white'} w-full h-full px-3 py-2 hover:bg-activeBG active:bg-activeBG rounded-xl text-base`}
                        onFocus={() => setActiveLink('API Docs')}
                    >
                        API Docs
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DataCollection