import React from 'react'
import { assets } from '../../../../public/assets'
import Image from 'next/image'
import { Services } from '../../../../actions/services'
import { useRouter } from 'next/navigation'
export const DashboardHeader = () => {
    const router = useRouter()
    const logoutHandler = async () => {
        const res = await Services.logout()
        router.push('/user/login')
        // if (res === 1) {
        //     router.push('/user/login')
        // } else {
        //     router.refresh()
        // }
    }

    return (
        // <div className='bg-dashBG h-[7.25rem]'>
        //     <div className="flex items-center h-full justify-between px-10">
        //         <div className="ml-[14.375rem] px-5 bg-dashDarkBG rounded-lg flex items-center gap-4">
        //             <assets.SearchIcon />
        //             <input type="text" className=' bg-dashDarkBG placeholder:text-white placeholder:text-opacity-25 py-3.5 w-[17.125rem] focus:outline-none ' placeholder='Search' />
        //         </div>
        //         <div className="flex gap-5">
        //             <div className=" bg-dashDarkBG p-3.5 rounded-xl">
        //                 <assets.NotificationIcon />
        //             </div>
        //             <div className="">
        //                 <Image src={assets.DefaultHeaderProfileImage} alt='default user profile' />
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="bg-dashBG">
            <div className="px-20 py-4 flex justify-end">
                <button
                    className='px-5 py-2.5 bg-dashDarkBG rounded-lg text-dashDarkGreyFont hover:text-white hover:bg-dashButton'
                    onClick={logoutHandler}
                >Logout</button>
            </div>
        </div>
    )
}
