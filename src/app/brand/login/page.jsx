'use client';
import React, { useState } from 'react'
import SignupForm from '../../_components/userComponents/signupForm'
import UserProfilePage from '../../_components/userComponents/userprofile';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import MobileNumberForm from '../../_components/userComponents/mobileNumberForm';
import { Modal } from '../../_components/brandComponents/Modal'
import Link from 'next/link'

const BrandLogin = () => {
    const [brandLoginDetails, setBrandLoginDetails] = useState({
        email: "",
        password: ""
    })
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(true)

    const [formErrors, setFormErrors] = useState({})

    let fieldname, fieldvalue;
    const handleInputs = (e) => {
        fieldname = e.target.name;
        fieldvalue = e.target.value;

        setBrandLoginDetails({ ...brandLoginDetails, [fieldname]: fieldvalue });
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
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 8 characters";
        } else if (values.password.length > 16) {
            errors.password = "Password cannot exceed more than 16 characters";
        }

        return errors;
    }


    const brandFormSubmitHandler = async (e) => {
        e.preventDefault()
        const errorsForm = validateFormInputs(brandLoginDetails)

        if (Object.keys(errorsForm).length === 0) {
            const formDetails = new URLSearchParams({
                "email": brandLoginDetails.email,
                "password": brandLoginDetails.password
            })

            const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/api/brand/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: formDetails
            })
            const response = await res.json();
            console.log(res)
            console.log(response)
            if (response.status === 1) {
                localStorage.setItem('brand_tkn', brandLoginDetails.email)
                toast.success(response.data)
                localStorage.setItem('brand_id', response.data._id)
                localStorage.setItem('brand_name', response.data.Name)
                localStorage.setItem('api_key', response.data.APIKey)
                setIsModalOpen(false)
                router.push('/brand/dashboard')
            } else {
                toast.error("Something went wrong! Please try again")
            }
        } else {
            toast.error('Check your input details')
            setFormErrors(errorsForm)
        }
    }
    return (
        <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }}>
            <div className="py-12">
                <div className='flex justify-center px-[4.5rem] w-full text-white'>
                    <div className="flex flex-col gap-8 w-full">
                        <div className="w-full flex justify-start">
                            <h1 className='text-[1.75rem] font-semibold'>Login into your account</h1>
                        </div>
                        <div className="">
                            <form action="" onSubmit={brandFormSubmitHandler} className='flex flex-col gap-6'>

                                {/* Email Input */}
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="email" className='text-base leading-4'>Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        onChange={handleInputs}
                                        className={` bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal ${formErrors.email ? 'border border-red-500' : ''}`}
                                        placeholder='you@example.com'
                                        autoComplete='off'
                                    // required
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
                                        onChange={handleInputs}
                                        className={` bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal ${formErrors.password ? 'border border-red-500' : ''}`}
                                        autoComplete='off'
                                    // required
                                    />
                                    <p className='text-sm text-red-500'>{formErrors.password}</p>
                                </div>

                                {/* submit button */}
                                <div className="w-full">
                                    <button type="submit" className='w-full bg-gradient-to-r from-gradientColor2 to-gradientColor1 py-4 text-white text-sm font-bold rounded-xl leading-4'>Log in</button>
                                </div>

                            </form>
                        </div>
                        <div className="px-4 pt-1 pb-3 flex gap-2 w-full justify-center items-center text-center text-placeholderText">
                            <p>Don&apos;t have an account?</p>
                            <Link href='/brand/signup' className='text-[#A0A0AB]'>Sign up</Link>
                        </div>
                    </div >
                </div >
            </div>
        </Modal>
    )

}


export default BrandLogin