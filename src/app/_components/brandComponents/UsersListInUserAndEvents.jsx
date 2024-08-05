'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify';
import { Modal } from './Modal';
import SingleUserData from './SingleUserData';

export const UsersListInUserAndEvents = ({ activeUserFilter, allUsersData, usersFound }) => {
    console.log(allUsersData)

    const [singleUserData, setSingleUserData] = useState({})
    const [userDataStatus, setUserDataStatus] = useState(-10)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleViewProfileClick = async (email) => {

        const postData = new URLSearchParams({
            'email': email
        })

        const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/get-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: postData
        })
        console.log(res);

        const response = await res.json()
        console.log(response);

        if (response.status === 1) {
            setSingleUserData(response.data)
            setUserDataStatus(1)
            setIsModalOpen(true)
        } if (response.status === 0) {
            if (response.data === 'Data not found for the user') {
                setUserDataStatus(2)
                setIsModalOpen(true)
            } else if (response.data === 'User Not Found!') {
                setUserDataStatus(0)
                toast.error('User not found!')
            }
        } else {
            toast.error('Something went wrong, try again')
        }
    }

    return (
        <div className="border rounded-xl">
            {usersFound === true &&
                <>
                    <div className="flex justify-between text-sm font-medium px-4 py-3">
                        <div className="w-2/5">
                            <p className=''>User</p>
                        </div>
                        <div className="w-2/5">
                            <p className=''>Last seen</p>
                        </div>
                        <div className="w-1/5">
                            <p className=''>Actions</p>
                        </div>
                    </div>
                    {
                        allUsersData?.map((user) => {
                            const date = new Date(user.last_seen)
                            return (
                                <div key={user.name} className="flex justify-between text-sm font-normal border border-b-0 border-x-0 p-4">
                                    <p className='w-2/5'>{user.name}</p>
                                    <p className='w-2/5'>{date}</p>
                                    <Link href='#' onClick={() => handleViewProfileClick(user.email)} className='w-1/5 font-bold text-fontColor2'>View profile</Link>
                                </div>
                            )
                        })
                    }
                    <div className="w-1/2">
                        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
                            <SingleUserData singleUserData={singleUserData} userDataStatus={userDataStatus} />
                        </Modal>
                    </div>
                    {/* <div className="flex justify-between text-sm font-normal border border-b-0 border-x-0 p-4">
                        <p className='w-2/5'>John Doe</p>
                        <p className='w-2/5'>12/12/2021</p>
                        <button onClick={handleViewProfileClick} className='w-1/5 text-left font-bold text-fontColor2'>View profile</button>
                    </div>
                    <div className="flex justify-between text-sm font-normal border border-b-0 border-x-0 p-4">
                        <p className='w-2/5'>John Doe</p>
                        <p className='w-2/5'>12/12/2021</p>
                        <button onClick={handleViewProfileClick} className='w-1/5 text-left font-bold text-fontColor2'>View profile</button>
                    </div>
                    <div className="flex justify-between text-sm font-normal border border-b-0 border-x-0 p-4">
                        <p className='w-2/5'>John Doe</p>
                        <p className='w-2/5'>12/12/2021</p>
                        <button onClick={handleViewProfileClick} className='w-1/5 text-left font-bold text-fontColor2'>View profile</button>
                    </div> */}
                </>
            }
            {
                usersFound === false &&
                <div className="py-12 flex justify-center">
                    <p>No users found. Start by integrating the Hushh Button SDK to your website!</p>
                </div>
            }
        </div>
    )
}
