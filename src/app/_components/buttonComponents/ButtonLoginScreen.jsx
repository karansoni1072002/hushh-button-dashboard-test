'use client';
import React, { useState } from 'react'

const LoginScreen = ({ setActiveScreen, setUserAuthenticated }) => {
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

    const [responseMessage, setResponseMessage] = useState('')

    let fieldname, fieldvalue;
    const handleInputs = (e) => {
        fieldname = e.target.name;
        fieldvalue = e.target.value;

        setUserLoginDetails({ ...userLoginDetails, [fieldname]: fieldvalue });
    }

    const UserLoginHandler = async (e) => {
        e.preventDefault()

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

        const res = await fetch(' https://hushhdevenv.hushh.ai/user/v1/api/auth/sign_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: formDetails
        })

        const response = await res.json()
        console.log(response)
        if (response.status === 2) {
            setResponseMessage('Incorrect password!')
        } else if (response.status === 1) {
            console.log(response.status)
            setResponseMessage('Logged in successfully!')
            localStorage.setItem('hushh_button_user_tkn', response.data.userdata.email)
            setTimeout(() => {
                setUserAuthenticated(true)
                setActiveScreen('share_user_wallet_data')
            }, 3000)
        } else {
            setResponseMessage('Something went wrong, please try again')
        }

        setActiveScreen('what_to_shop_today')
    }

    return (
        <div className='max-w-96 px-5 py-5 flex flex-col gap-8'>
            <div className="text-center flex flex-col gap-2">
                <p className='font-semibold'>Log in to your account</p>
                <p className='text-sm text-fontColor2'>Hushh Button is a privacy-first service. We don&apos;t sell or share your data.</p>
            </div>
            <form action="" onSubmit={UserLoginHandler} className='flex flex-col gap-4'>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className='font-medium text-base'>Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={handleInputs}
                        className={`bg-inputBG p-4 rounded-xl placeholder:text-placeholderText placeholder:text-base placeholder:font-normal`}
                        placeholder='me@example.com'
                        autoComplete='off'
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className='font-medium text-base'>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleInputs}
                        className={`bg-inputBG p-4 rounded-xl placeholder:text-placeholderText placeholder:text-base placeholder:font-normal`}
                        placeholder=''
                        autoComplete='off'
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className=' bg-gradient-to-r from-gradientColor1 to-gradientColor2 w-max px-5 py-3.5 text-white font-bold text-sm leading-4 rounded-lg'>Log in</button>
                </div>
            </form>
            <p className='pt-4'>{responseMessage !== '' && responseMessage}</p>
        </div>
    )
}

export default LoginScreen