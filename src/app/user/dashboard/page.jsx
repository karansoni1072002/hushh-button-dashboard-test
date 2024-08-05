'use client';
import React, { useEffect, useState } from 'react'
import components from '../../_components/userComponents/components'
import DataCategoriesFolders from '../../_components/userComponents/dataCategoriesFolders'
import DataSharingControls from '../../_components/userComponents/dataSharingControls'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import DigitalProfileComponent from '../../_components/userComponents/DigitalProfileComponent';
import { Services } from '../../../../actions/services';
const Dashboard = () => {
    let component = new components()
    const router = useRouter()
    const [userdata, setUserData] = useState({})
    const getUserData = async () => {
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const checkForToken = () => localStorage.getItem('sb-rpmzykoxqnbozgdoqbpc-auth-token');

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
                        reject(new Error('Token not found within timeout period'));
                    }
                }, 100); // Check every 100 milliseconds
            });
        };

        try {
            const str_data = await waitForToken()
            console.log(str_data)
            const data = await JSON.parse(str_data)
            if (data) {
                console.log(data.user)
                localStorage.setItem('hushh_id', data.user.id)

                const hushh_id = await localStorage.getItem('hushh_id')
                if (hushh_id) {

                    const userData = await Services.getUserDetails(hushh_id)
                    setUserData(userData.userDetails[0])
                    // const postData = new URLSearchParams({
                    //     'UID': hushh_id
                    // })
                    // const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/get-user-data', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    //     },
                    //     body: postData
                    // })

                    // const response = await res.json()
                    // console.log(response)
                    // if (res.ok) {
                    //     setUserData(response.userData.userDetails[0])
                    // } else {
                    //     toast.error('Something went wrong, please try again!')
                    // }
                }
            }
        } catch (error) {
            router.push('/user/login')
        }

    }

    useEffect(() => {

        getUserData()
    }, [router])

    return (
        <div className="">
            <DigitalProfileComponent userData={userdata} />
        </div>
    )
}

export default Dashboard