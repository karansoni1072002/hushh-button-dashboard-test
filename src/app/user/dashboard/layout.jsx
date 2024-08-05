'use client';
import DashboardSideNav from "../../_components/userComponents/dashboardSideNav";
import { DashboardHeader } from '../../_components/userComponents/DashboardHeader'
import Image from "next/image";
import { assets } from "../../../../public/assets";
import { ModalDashbaord } from "../../_components/userComponents/ModalDashboard";
import UpdateUserProfile from "../../_components/userComponents/updateUserProfile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Services } from "../../../../actions/services";
export default function DashboardLayout({ children }) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const profileUpdateHandler = async () => {
        toast.success('Profile updated successfully!')
        setIsModalOpen(false)
    }
    const router = useRouter()
    const [data, setUserData] = useState({})
    useEffect(() => {
        const getUserData = async () => {

            const checkForToken = () => localStorage.getItem('hushh_id');

            const waitForToken = async (timeout = 5000) => {
                return new Promise((resolve, reject) => {
                    const startTime = Date.now();
                    const intervalId = setInterval(() => {
                        const token = checkForToken();
                        if (token) {
                            clearInterval(intervalId);
                            resolve(token);
                        } else if (Date.now() - startTime > timeout) {
                            clearInterval(intervalId);
                            // reject(new Error('Token not found within timeout period'));
                        }
                    }, 100); // Check every 100 milliseconds
                });
            };

            const hushh_id = await waitForToken()
            if (hushh_id) {
                const userData = await Services.getUserDetails(hushh_id)
                console.log(userData)
                setUserData(userData.userDetails[0])
            } else {
                router.push('/user/login')
            }

            // if (hushh_id) {
            //     const postData = new URLSearchParams({
            //         'UID': hushh_id
            //     })
            //     const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/get-user-data', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            //         },
            //         body: postData
            //     })

            //     const response = await res.json()

            //     if (res.ok) {
            //         setUserData(response.userData.userDetails[0])
            //         console.log(response.userData.userDetails[0])
            //         // localStorage.setItem('user_id', response.userData.userDetails.hushh_id)
            //     } else {
            //         toast.error('Something went wrong, please try again!')
            //     }
            // } else {
            //     router.push('/user/login')
            // }
        }
        getUserData()
    }, [])

    return (
        <div className=" bg-black text-white h-full">
            <div className="">
                <DashboardHeader />
                <div className="pt-8 px-44">
                    <div className='p-4 flex flex-col gap-8 w-full'>
                        <div className="">
                            <h1 className='text-2xl font-semibold'>My Profile</h1>
                        </div>
                        <div className=" bg-dashBG w-full h-[18.75rem] rounded-xl flex flex-col">
                            <div className="relative">
                                <div className="w-full object-cover">
                                    <Image src={assets.DefaultUserProfileCoverImage} alt='default image' className="w-full" />
                                </div>
                                {/* <div className="absolute right-6 py-2 px-3 bg-white bg-opacity-40 bottom-6 rounded-3xl">
                                    <button>Edit Cover</button>
                                </div> */}
                            </div>
                            {/* <div className="px-6 justify-between flex items-end -translate-y-20"> */}
                            <div className="px-6 justify-between flex h-full items-center">
                                <div className=" flex gap-8 items-end">
                                    {/* <div className="">
                                        <Image src={assets.DefaultUserProfileImage} alt='default profile image' />
                                    </div> */}
                                    <div className="flex flex-col gap-2">
                                        <div className="text-2xl font-bold">{data?.name}</div>
                                        {/* <div className="text-2xl font-bold">Testing</div> */}
                                        <div className=" text-white text-opacity-50 text-sm font-light">User</div>
                                    </div>
                                </div>
                                <div className="rounded-lg">
                                    <button className='py-3 px-5 bg-dashButton rounded-lg' onClick={() => setIsModalOpen(true)}>Edit Profile</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-8 px-44">
                {children}
            </div>
            <ModalDashbaord isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <UpdateUserProfile profileUpdateHandler={profileUpdateHandler} />
            </ModalDashbaord>
        </div>
    );
}
