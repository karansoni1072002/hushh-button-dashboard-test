// import Login from "../_components/Login/Login";
'use client';
import React, { useState } from 'react'
import Link from 'next/link'
import '../../globals.css'
import { toast } from 'react-toastify';
import { Services } from '../../../../actions/services'
import Image from 'next/image';
import { assets } from '../../../../public/assets';
import { useRouter } from 'next/navigation';
const LoginForm = ({ userLoginDetails, setUserLoginDetails, setLoginFormSubmitted }) => {

    const [formErrors, setFormErrors] = useState({})

    let fieldname, fieldvalue;
    const handleInputs = (e) => {
        fieldname = e.target.name;
        fieldvalue = e.target.value;

        setUserLoginDetails({ ...userLoginDetails, [fieldname]: fieldvalue });
    }

    const validateFormInputs = (values) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }

        if (!values.password) {
            errors.password = "Password is required!";
        } else if (values.password.length < 5) {
            errors.password = "Password must be more than 5 characters";
        } else if (values.password.length > 16) {
            errors.password = "Password cannot exceed more than 16 characters";
        }

        return errors;
    }

    const router = useRouter()

    const submitHandler = async (e) => {
        e.preventDefault();

        const errorsForm = validateFormInputs(userLoginDetails);
        console.log(errorsForm)

        if (Object.keys(errorsForm).length === 0) {
            const res = await Services.passwordLogIn(userLoginDetails.email, userLoginDetails.password)
            if (res === 1) {
                setLoginFormSubmitted(true)
            }
        } else {
            toast.error('Please check your input details')
            setFormErrors(errorsForm);
        }
    }

    const hangleGoogleSignin = async (e) => {
        e.preventDefault()
        await Services.googleSignIn()
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
                        // reject(new Error('Token not found within timeout period'));
                    }
                }, 100); // Check every 100 milliseconds
            });
        };

        const str_data = await waitForToken()
        const data = await JSON.parse(str_data)
        console.log(data)
        if (data) {
            const fullName = data?.user?.user_metadata?.full_name;
            const [first_name, last_name] = fullName ? fullName.split(' ') : ['', ''];
            const email = data.user.email
            const postData = new URLSearchParams({
                'email': email,
                'first_name': first_name,
                'last_name': last_name,
                'gender': 'NULL',
                'phone[code]': '+00',
                'phone[number]': '0000000000',
                'device_model': 'NULL',
                'device_make': 'NULL',
                'device_os_version': 'NULL',
                'app_version': 'NULL',
                'fcmtoken': 'NULL',
                'role': 'user',
                'registration_mode': 'NULL',
                'zipcode': '000000',
                'address': 'NULL',
                'city': 'NULL',
                'country': 'NULL',
                'password': 'NULL',
                'uid': localStorage.getItem('hushh_id'),
                'DoB': 'NULL'
            })
            const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/user-Signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: postData
            })
            const response = await res.json();
            console.log(response)
        }
        // if (res === 1) {
        //     router.push('/user/dashboard')
        // } else if (res === -1) {
        //     router.push('/user/login')
        // }
    }

    return (
        <div className='flex justify-center py-12 px-[4.5rem] w-full text-white'>
            <div className="flex flex-col gap-8 w-full">
                <div className="w-full flex">
                    <h1 className='text-[1.75rem] font-semibold'>Log in to your account</h1>
                </div>
                <div className="w-full">
                    <div onClick={hangleGoogleSignin} className="w-1/2 py-3.5 bg-dashLightBG rounded-lg shadow-lg cursor-pointer flex justify-center gap-2 items-center">
                        <Image src={assets.GoogleLogo} alt='Google Logo' />
                        <p className='leading-4 text-dashLightFont font-semibold'>Google</p>
                    </div>
                </div>
                <div className="">
                    <form action="" onSubmit={submitHandler} className='flex flex-col gap-6'>

                        {/* Email Input */}
                        <div className="flex flex-col gap-3">
                            <label htmlFor="email" className='font-medium text-base'>Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                onChange={handleInputs}
                                autoComplete='off'
                                className={`bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal ${formErrors.email ? 'border border-red-500' : ''}`}
                                placeholder='me@example.com'
                            />
                            <p className='text-sm text-red-500'>{formErrors.email}</p>
                        </div>

                        {/* Password input */}
                        <div className="flex flex-col gap-3">
                            <label htmlFor="password" className='font-medium text-base'>Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autoComplete='off'
                                onChange={handleInputs}
                                className={`bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal ${formErrors.password ? 'border border-red-500' : ''}`}
                                placeholder=""
                            />
                            <p className='text-sm text-red-500'>{formErrors.password}</p>
                        </div>


                        {/* submit button */}
                        <div className="">
                            <button type="submit" className='w-full bg-gradient-to-r from-gradientColor2 to-gradientColor1 py-4 text-white text-sm font-bold rounded-xl leading-4'>Log in</button>
                        </div>
                    </form>
                </div>
                <div className="items-center text-center flex gap-2 justify-center text-placeholderText">
                    <p>Don&apos;t have an account?</p>
                    <Link href='/user/signup' className='text-[#A0A0AB]'>Sign Up</Link>
                </div>

            </div >
            {/* <div className="w-3/4">
                <div className="px-5 py-10 flex flex-col gap-6 text-base font-normal text-fontColor2">
                    <div className="flex">
                        <div className="flex-1 flex justify-center">
                            <Link href='#'>Terms of Service</Link>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <Link href='#'>Privacy Policy</Link>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <p>© 2023 Hushh Technology, Inc. All rights reserved.</p>
                    </div>
                </div>
            </div> */}
        </div >
    )
}

export default LoginForm