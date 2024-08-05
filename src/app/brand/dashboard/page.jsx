'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const retrievedDataPoints = [
    {
        "first_name": "Karan",
        "last_name": "Soni",
        "email": "karan@gmail.com",
        "phone_number": "9313641762"
    }
]

const queries = [
    {
        'name': 'sneakers'
    },
    {
        'name': 'boots'
    },
    {
        'name': 'sandals'
    },
    {
        'name': 'loafers'
    },
    {
        'name': 'heels'
    },
    {
        'name': 'flats'
    },
]

const searchQueries = [
    {
        "name": 'white sneakers',
        'shares': '1,104 users in last 30 days'
    },
    {
        "name": 'white sneakers',
        'shares': '1,104 users in last 30 days'
    },
    {
        "name": 'white sneakers',
        'shares': '1,104 users in last 30 days'
    }
]

const searchQueriesByUser = [
    {
        "name": 'white sneakers',
        'shares': '1,104 users in last 30 days'
    },
    {
        "name": 'white sneakers',
        'shares': '1,104 users in last 30 days'
    },
    {
        "name": 'white sneakers',
        'shares': '1,104 users in last 30 days'
    }
]

const BrandUserAndEvents = () => {
    
    const [activeSection, setActiveSection] = useState('UserData')
    
    const selectSearchData = () => {
        setActiveSection('SearchData')
    }

    const [activeUserFilter, setActiveUserFilter] = useState('AllUsers')

    return (
        <div className='flex flex-col'>
            <div className="flex items-center justify-between border-b border-[#E4E4E4] px-8 ">
                <div className="flex items-center gap-9">
                    <div className="text-2xl leading-7 font-medium py-5">
                        Dashboard
                    </div>
                    <div className="">
                        <button
                            className={`px-4 text-sm font-medium h-full py-6 ${activeSection === 'UserData' ? "text-black border-b-2 border-black" : "text-[#727272]"}`}
                            onClick={() => setActiveSection('UserData')}
                        >User Data</button>
                        <button
                            className={`px-4 text-sm font-medium h-full py-6 ${activeSection === 'SearchData' ? "text-black border-b-2 border-black" : "text-[#727272]"}`}
                            onClick={selectSearchData}
                        >Search Data</button>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex gap-4 pr-4 border-r border-[#E4E4E4]">
                        <button className='px-3 py-2 text-sm font-medium border border-black rounded'>Sort By</button>
                        <button className='px-3 py-2 text-sm font-medium border border-black rounded'>Filter</button>
                    </div>
                    <div className="pl-4">
                        <button className='px-3 py-2 text-white text-sm font-medium bg-black rounded'>Add Data Point</button>
                    </div>
                </div>
            </div>

            {activeSection==='UserData' &&
                <div className="mx-8 flex flex-col mt-2 gap-7 w-[55.5rem]">
                    <div className="flex gap-8 items-center border-b border-[#DBE0E5]">
                        <button
                            onClick={()=>setActiveUserFilter('AllUsers')}
                            className={`py-4 text-sm font-bold ${activeUserFilter==='AllUsers' ? "text-[#121417] border-b-[3px] border-[#E5E8EB]" : "text-[#637587]"}`}
                        >All users</button>
                        <button
                            onClick={()=>setActiveUserFilter('EmailOnly')}
                            className={`py-4 text-sm font-bold ${activeUserFilter==='EmailOnly' ? "text-[#121417] border-b-[3px] border-[#E5E8EB]" : "text-[#637587]"}`}
                        >Email only</button>
                        <button
                            onClick={()=>setActiveUserFilter('PhoneOnly')}
                            className={`py-4 text-sm font-bold ${activeUserFilter==='PhoneOnly' ? "text-[#121417] border-b-[3px] border-[#E5E8EB]" : "text-[#637587]"}`}
                        >Phone only</button>
                    </div>

                    <div className="border rounded-lg border-[#D1DEE5] ">
                        <table className='w-full text-sm text-[#121417]'>
                            <thead>
                                <tr className='border-b border-[#E5E8EB]'>
                                    <th className="px-4 py-3 font-medium text-sm text-[#OD171C] text-left items-start">First Name</th>
                                    <th className="px-4 py-3 font-medium text-sm text-[#OD171C] text-left items-start">Last Name</th>
                                    <th className="px-4 py-3 font-medium text-sm text-[#OD171C] text-left items-start">Email</th>
                                    <th className="px-4 py-3 font-medium text-sm text-[#OD171C] text-left items-start">Phone Number</th>
                                    <th className="px-4 py-3 font-medium text-sm text-[#OD171C] text-left items-start">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    retrievedDataPoints?.map((dp) => {
                                        return (
                                            <tr key={dp.id} className='border-b border-[#E5E8EB]'>
                                                <td className="px-4 py-6 font-medium text-sm text-left items-center">{dp.first_name}</td>
                                                <td className="px-4 py-6 font-medium text-sm text-left items-center">{dp.last_name}</td>
                                                <td className="px-4 py-6 font-medium text-sm text-left items-center">{dp.email}</td>
                                                <td className="px-4 py-6 font-medium text-sm text-left items-center">
                                                    {dp.phone_number}
                                                </td>
                                                <td className="px-4 py-6 font-medium text-sm text-left flex items-center">
                                                    <button className='font-bold text-[#637587]'>View profile</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
               </div>
            }
            {activeSection === 'SearchData' &&
                <div className="px-8 flex flex-col gap-2">
                    <div className="py-4 flex flex-col gap-6">
                        <p>Trending search queries</p>
                        <div className="grid grid-cols-5 w-max gap-3">
                            {
                                queries.map((query) => {
                                    return (
                                        <div className="py-4 pr-6 pl-4 border border-[#DBE0E5] rounded-lg">
                                            {query.name}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <p className='text-[2rem] font-bold'>Search queries</p>
                            <p className='text-sm text-[#637587]'>Last 30 days</p>
                        </div>
                        <div className="flex">
                            <div className="flex flex-col gap-2">
                                <p className='text-lg font-bold'>Search queries</p>
                                <div className="">
                                    {
                                        searchQueries.map((obj) => {
                                            return (
                                                <div className="py-2 px-4 w-[18rem]">
                                                    <p className='text-[#121417] font-medium text-sm'>{obj.name}</p>
                                                    <p className='text-[#637587] text-sm'>{obj.shares}</p>
                                                </div>
                                            )
 
                                        })
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className='text-lg font-bold'>Search queries by user</p>
                                <div className="">
                                    {
                                        searchQueriesByUser.map((obj) => {
                                            return (
                                                <div className="py-2 px-4 w-[18rem]">
                                                    <p className='text-[#121417] font-medium text-sm'>{obj.name}</p>
                                                    <p className='text-[#637587] text-sm'>{obj.shares}</p>
                                                </div>
                                            )
 
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default BrandUserAndEvents