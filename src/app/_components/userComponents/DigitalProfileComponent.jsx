'use client';
import React, { useState } from 'react'
import { assets } from '../../../../public/assets'
import Image from 'next/image'
import UserProfileVideoSection from './UserProfileVideoSection';
import UserProfilePersonalInfoSection from './UserProfilePersonalInfoSection';
import { ModalDashbaord } from './ModalDashboard';
import UpdateUserProfile from './updateUserProfile';
import { toast } from 'react-toastify';
import { UserBrandCardsSection } from './UserBrandCardsSection'
import { UserSingleBrandCardDetails } from './UserSingleBrandCardDetails'
import { UserControlDashboard } from './UserControlDashboard'
const DigitalProfileComponent = ({ userData }) => {

    const [activeFilter, setActiveFilter] = useState('Videos')

    // console.log(userData)


    return (
        <div className='px-4 w-full'>
            {/* <div className="">
                <h1 className='text-2xl font-semibold'>My Profile</h1>
            </div>
            <div className=" bg-dashBG w-full h-[18.75rem] rounded-xl flex flex-col gap-4">
                <div className="relative">
                    <Image src={assets.DefaultUserProfileCoverImage} alt='default image' />
                    <div className="absolute right-6 py-2 px-3 bg-white bg-opacity-40 bottom-6 rounded-3xl">
                        <button>Edit Cover</button>
                    </div>
                </div>
                <div className="px-6 justify-between flex items-end -translate-y-20">
                    <div className=" flex gap-8 items-end">
                        <div className="">
                            <Image src={assets.DefaultUserProfileImage} alt='default profile image' />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-2xl font-bold">{userData.name}</div>
                            <div className=" text-white text-opacity-50 text-sm font-light">User</div>
                        </div>
                    </div>
                    <div className="rounded-lg">
                        <button className='py-3 px-5 bg-dashButton rounded-lg' onClick={() => setIsModalOpen(true)}>Edit Profile</button>
                    </div>
                </div>
            </div> */}
            <div className="rounded-xl bg-dashBG">
                <div className=" p-8 flex flex-col gap-10">
                    <div className="flex gap-5">
                        <button
                            className={`px-8 py-3.5 ${activeFilter === 'Videos' ? 'bg-dashButton text-white' : 'bg-[#111315] text-[#535557]'} rounded-lg hover:bg-dashButton hover:text-white`} onClick={() => setActiveFilter('Videos')}>Videos</button>
                        <button
                            className={`px-8 py-3.5 ${activeFilter === 'Brand Cards' ? 'bg-dashButton text-white' : 'bg-[#111315] text-[#535557]'} rounded-lg hover:bg-dashButton hover:text-white`} onClick={() => setActiveFilter('Brand Cards')}>Brand Cards</button>
                    </div>
                </div>
                <div className="">
                    {
                        activeFilter === 'Videos' && <UserProfileVideoSection userData={userData} />
                    }
                    {
                        activeFilter === 'Brand Cards' && <UserBrandCardsSection userData={userData} />
                    }
                    {/* <UserControlDashboard /> */}
                    {/* {
                        activeFilter === 'Dashboard' && 
                    } */}


                    {/* <UserSingleBrandCardDetails /> */}

                </div>

            </div>
        </div >
    )
}

export default DigitalProfileComponent