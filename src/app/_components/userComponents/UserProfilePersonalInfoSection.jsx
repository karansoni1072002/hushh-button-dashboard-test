import React from 'react'

const UserProfilePersonalInfoSection = ({ userData }) => {
    console.log(userData)
    return (
        <div className='flex flex-col gap-8'>
            <div className="flex gap-8">
                <div className="flex flex-col gap-8 flex-1 bg-dashBG p-8 rounded-xl">
                    <h1 className='text-xl font-semibold'>Basic Info</h1>
                    <div className="flex flex-col px-4">
                        <div className="flex items-center py-3 border border-x-0 border-t-0">
                            <p className='text-xs font-medium w-40'>Name</p>
                            <p className=' text-base'>{userData.name}</p>
                        </div>
                        <div className="flex items-center py-3 border border-x-0 border-t-0">
                            <p className='text-xs font-medium w-40'>Gender</p>
                            <p className=' text-base'>{userData.gender}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-8 flex-1 bg-dashBG p-8 rounded-xl">
                    <h1 className='text-xl font-semibold'>Contact Info</h1>
                    <div className="flex flex-col px-4">
                        <div className="flex items-center py-3 border border-x-0 border-t-0">
                            <p className='text-xs font-medium w-40'>Email</p>
                            <p className=' text-base'>{userData.email}</p>
                        </div>
                        <div className="flex items-center py-3 border border-x-0 border-t-0">
                            <p className='text-xs font-medium w-40'>Phone</p>
                            <p className=' text-base'>{userData.mobileNumber}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" bg-dashBG rounded-xl p-8">
                <h1 className='text-xl font-semibold'>Contact Info</h1>
                <div className="flex flex-col px-4">
                    <div className="flex items-center py-3 border border-x-0 border-t-0">
                        <p className='text-xs font-medium w-52'>Address</p>
                        <p className={` text-base ${userData.address !== "" ? `text-white` : 'text-placeholderText'}`}>{userData.address !== "" ? `${userData.address}` : 'Add your address by editing your profile'}</p>
                    </div>
                    <div className="flex items-center py-3 border border-x-0 border-t-0">
                        <p className='text-xs font-medium w-52'>City</p>
                        <p className=' text-base'>{userData.city}</p>
                    </div>
                    <div className="flex items-center py-3 border border-x-0 border-t-0">
                        <p className='text-xs font-medium w-52'>Country</p>
                        <p className=' text-base'>{userData.country}</p>
                    </div>
                    <div className="flex items-center py-3 border border-x-0 border-t-0">
                        <p className='text-xs font-medium w-52'>Zipcode</p>
                        <p className=' text-base'>{userData.zipcode}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfilePersonalInfoSection