'use client';
import React, { useEffect, useState } from 'react'
import LoginForm from '../../_components/userComponents/loginForm'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Modal } from '../../_components/brandComponents/Modal';
import UpdateUserProfile from '../../_components/userComponents/updateUserProfile';

const UserLoginPage = () => {
    useEffect(() => {
        const reloadPage = () => {
            window.location.reload()
        }

        reloadPage
    }, [])
    const [userLoginDetails, setUserLoginDetails] = useState({
        email: "",
        password: "",
        version: "v1",
        device_token: "test12345",
        device_os: "17",
        device_type: "Android",
        model: "Samsung S23",
        platform: "website"
    })
    const [loginFormSubmitted, setLoginFormSubmitted] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem("hushh_id")) {
            router.push('/user/dashboard')
        }
    }, [])

    const LoginFormSubmitHandler = async (e) => {
        // e.preventDefault()
        console.log('request sent');

        const formDetails = new URLSearchParams({
            "email": userLoginDetails.email,
            "password": userLoginDetails.password,
            "version": "v1",
            "device_token": "test12345",
            "device_os": "17",
            "device_type": "Android",
            "model": "Samsung S23",
            "platform": "website"
        })


        const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/api/auth/sign_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: formDetails,
        })
        console.log(res);

        const response = await res.json();
        console.log(response);

        if (response.status === 2) {
            toast.error(response.data)
        } else if (response.status == 1) {
            const data = response.data.userdata
            localStorage.setItem('user_tkn', data.email)
            toast.success(response.response)
            setLoginFormSubmitted(true)
        } else {
            toast.error("Something went wrong!")
        }
        // if (res.ok) {
        //     window.alert(response.message)
        // }
    }

    const profileUpdateHandler = (e) => {
        // e.preventDefault()
        toast.success("Information updated successfully")
        router.push('/user/recordvideo')
    }

    return (
        <div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {
                    !loginFormSubmitted && <LoginForm userLoginDetails={userLoginDetails} setUserLoginDetails={setUserLoginDetails} setLoginFormSubmitted={setLoginFormSubmitted} />
                }
                {
                    loginFormSubmitted && <UpdateUserProfile profileUpdateHandler={profileUpdateHandler} />
                }
            </Modal>
        </div>
    )
}

export default UserLoginPage