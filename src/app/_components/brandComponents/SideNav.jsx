'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { assets } from '../../../../public/assets';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const SideNav = () => {
    const [activeLink, setActiveLink] = useState('');
    const [brandName, setBrandName] = useState()

    useEffect(() => {
        const getBrandName = () => {
            const brand_name = localStorage.getItem('brand_name')
            setBrandName(brand_name)
        }

        getBrandName()
    })

    const router = useRouter()
    const pathname = usePathname()

    const brandSignOut = () => {
        localStorage.removeItem('brand_tkn')
        localStorage.removeItem('api_key')
        localStorage.removeItem('brand_name')
        localStorage.removeItem('brand_id')
        router.push('/brand/login')
    }

    useEffect(() => {
        const setNavSelection = async () => {
            if (pathname === '/brand/dashboard') {
                setActiveLink('Dashboard')
            }
            if (pathname === '/brand/dashboard/data-points') {
                setActiveLink('Data Points')
            }
            if (pathname === '/brand/dashboard/analytics') {
                setActiveLink('Analytics')
            }
            if (pathname === '/brand/dashboard/contacts') {
                setActiveLink('Contacts')
            }
            if (pathname === '/brand/dashboard/integrations') {
                setActiveLink('Integrations')
            }
            if (pathname === '/brand/dashboard/settings') {
                setActiveLink('Settings')
            }
        }

        setNavSelection()
    })

    return (

        <div className='flex flex-col min-h-screen h-full w-full relative'>
            <div className="min-h-[4.5rem] border border-[#E4E4E4]">

            </div>

            <div className="w-full h-full border-r border-[#E4E4E4]">
                <div className="">
                    <div className="flex flex-col gap-1 w-full px-4 border-b  border-[#E4E4E4] py-5">
                        <Link
                            href='/brand/dashboard'
                            className={`${activeLink === 'Dashboard' ? 'bg-[#F2F2F2] text-black' : 'bg-[#F9F9F9] text-[#727272]'}  w-full h-full hover:bg-[#F2F2F2] active:bg-[#F2F2F2] rounded`}
                            onFocus={() =>
                                setActiveLink('Dashboard')}
                        >
                            <div className="flex p-2 gap-3 text-sm font-medium items-center">
                                <assets.BrandDashboardIcon className={`w-5 h-5 ${activeLink === 'Dashboard' ? 'fill-black' : "fill-[#727272]"}`} />
                                Dashboard
                            </div>
                        </Link>
                        <Link
                            href='/brand/dashboard/data-points'
                            className={`${activeLink === 'Data Points' ? 'bg-[#F2F2F2] text-black' : 'bg-[#F9F9F9] text-[#727272]'}  w-full h-full hover:bg-[#F2F2F2] active:bg-[#F2F2F2] rounded`}
                            onFocus={() =>
                                setActiveLink('Data Points')}
                        >
                            <div className="flex p-2 gap-3 text-sm font-medium items-center">
                                <assets.BrandDashboardIcon className={`w-5 h-5 ${activeLink === 'Data Points' ? 'fill-black' : "fill-[#727272]"}`} />
                                Data Points
                            </div>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-1 w-full px-4 border-b border-[#E4E4E4] py-5">
                        <p className='py-1 px-2 text-xs text-[#727272] font-semibold'>DATABASE</p>
                        <Link
                            href='/brand/dashboard'
                            className={`${activeLink === 'Analytics' ? 'bg-[#F2F2F2] text-black' : 'bg-[#F9F9F9] text-[#727272]'}  w-full h-full hover:bg-[#F2F2F2] active:bg-[#F2F2F2] rounded`}
                            onFocus={() =>
                                setActiveLink('Analytics')}
                        >
                            <div className="flex p-2 gap-3 text-sm font-medium items-center">
                                <assets.BrandDashboardIcon className={`w-5 h-5 ${activeLink === 'Analytics' ? 'fill-black' : "fill-[#727272]"}`} />
                                Analytics
                            </div>
                        </Link>
                        <Link
                            href='/brand/dashboard'
                            className={`${activeLink === 'Contacts' ? 'bg-[#F2F2F2] text-black' : 'bg-[#F9F9F9] text-[#727272]'}  w-full h-full hover:bg-[#F2F2F2] active:bg-[#F2F2F2] rounded`}
                            onFocus={() =>
                                setActiveLink('Contacts')}
                        >
                            <div className="flex p-2 gap-3 text-sm font-medium items-center">
                                <assets.BrandDashboardIcon className={`w-5 h-5 ${activeLink === 'Contacts' ? 'fill-black' : "fill-[#727272]"}`} />
                                Contacts
                            </div>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-1 w-full px-4 py-5">
                        <Link
                            href='/brand/dashboard'
                            className={`${activeLink === 'Integrations' ? 'bg-[#F2F2F2] text-black' : 'bg-[#F9F9F9] text-[#727272]'}  w-full h-full hover:bg-[#F2F2F2] active:bg-[#F2F2F2] rounded`}
                            onFocus={() =>
                                setActiveLink('Integrations')}
                        >
                            <div className="flex p-2 gap-3 text-sm font-medium items-center">
                                <assets.BrandDashboardIcon className={`w-5 h-5 ${activeLink === 'Integrations' ? 'fill-black' : "fill-[#727272]"}`} />
                                Integrations
                            </div>
                        </Link>
                        <Link
                            href='/brand/dashboard'
                            className={`${activeLink === 'Settings' ? 'bg-[#F2F2F2] text-black' : 'bg-[#F9F9F9] text-[#727272]'}  w-full h-full hover:bg-[#F2F2F2] active:bg-[#F2F2F2] rounded`}
                            onFocus={() =>
                                setActiveLink('Settings')}
                        >
                            <div className="flex p-2 gap-3 text-sm font-medium items-center">
                                <assets.BrandDashboardIcon className={`w-5 h-5 ${activeLink === 'Settings' ? 'fill-black' : "fill-[#727272]"}`} />
                                Settings
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="py-5 px-4 border-t border-[#E4E4E4] fixed bottom-0 w-1/5">
                    <div className="flex gap-3 items-center justify-center">
                        <div className="w-8 h-8 bg-[#f2f2f2] rounded flex items-center justify-center text-sm font-medium">M</div>
                        <p className='font-medium'>Marketing Team&apos;s</p>
                    </div>
                </div>




                {/* <Link
                        href='https://www.npmjs.com/package/hushh-button'

                        legacyBehavior
                    >
                        <a className='border border-black my-3 px-3 py-2.5 hover:bg-activeBG active:bg-activeBG rounded-xl text-sm text-center' href="" target='_blank' rel='noreferrer noopener'>
                            Hushh Button SDK
                        </a>
                    </Link> */}
                {/* <Link
                        href='/brand/dashboard/userandevents'
                        className={`${activeLink === 'User&Events' ? 'bg-activeBG' : 'bg-[#F9F9F9]'} w-full h-full px-3 py-2.5 hover:bg-activeBG active:bg-activeBG rounded-xl text-sm flex gap-3`}
                        onFocus={() => setActiveLink('User&Events')}
                    >
                        <assets.BrandUserAndEventsIcon />
                        User & Events
                    </Link>
                    <Link
                        href='/brand/dashboard/journeys'
                        className={`${activeLink === 'Journeys' ? 'bg-activeBG' : 'bg-white'} w-full h-full px-3 py-2.5 hover:bg-activeBG active:bg-activeBG rounded-xl text-sm flex gap-3`}
                        onFocus={() => setActiveLink('Journeys')}
                    >
                        <assets.BrandJourneysIcon />
                        Journeys
                    </Link>
                    <Link
                        href='/brand/dashboard/attribution'
                        className={`${activeLink === 'Attribution' ? 'bg-activeBG' : 'bg-white'} w-full h-full px-3 py-2.5 hover:bg-activeBG active:bg-activeBG rounded-xl text-sm flex gap-3`}
                        onFocus={() => setActiveLink('Attribution')}
                    >
                        <assets.BrandAttributionIcon />
                        Attribution
                    </Link>
                    <button className='w-full my-2 bg-buttonColor py-2.5 rounded-xl font-bold text-white text-sm'>New Query</button> */}
                {/* <Link
                    href='/brand/dashboard/help'
                    className={`${activeLink === 'Help' ? 'bg-activeBG' : 'bg-white'} mt-10 w-full h-full px-3 py-2.5 hover:bg-activeBG active:bg-activeBG rounded-xl text-sm flex gap-3`}
                    onFocus={() => setActiveLink('Help')}
                >
                    <assets.BrandHelpIcon />
                    Help
                </Link>
                <Link
                    href='/brand/dashboard/apidocs'
                    className={`${activeLink === 'APIDocs' ? 'bg-activeBG' : 'bg-white'} w-full h-full px-3 py-2.5 hover:bg-activeBG active:bg-activeBG rounded-xl text-sm flex gap-3`}
                    onFocus={() => setActiveLink('APIDocs')}
                >
                    <assets.BrandAPIDocsIcon />
                    API Docs
                </Link>

                <button onClick={brandSignOut} className='border border-black my-3 px-3 py-2.5 hover:bg-activeBG active:bg-activeBG rounded-xl text-sm text-center'>Sign out</button> */}

            </div>
        </div>
    )
}

export default SideNav