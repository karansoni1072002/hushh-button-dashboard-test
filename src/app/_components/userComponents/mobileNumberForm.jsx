// import Login from "../_components/Login/Login";
'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import phoneCodes from '../../_utilities/phone_code.json'
import '../../globals.css'
import { toast } from 'react-toastify';

const MobileNumberForm = ({ userSignupDetails, setUserSignupDetails, setMobileNumberFormSubmitted }) => {

    const [formErrors, setFormErrors] = useState({})

    const handleCountryCodeChange = (e) => {
        const newData = { ...userSignupDetails }
        newData.phone.code = e.target.value;
        setUserSignupDetails(newData);
    }
    const handlePhoneNumberChange = (e) => {
        const newData = { ...userSignupDetails }
        newData.phone.number = e.target.value;
        setUserSignupDetails(newData);
    }

    const validateFormInputs = (values) => {
        const errors = {}

        if (!values.phone.code) {
            errors.phone_code = "Please select your contry code!"
        }
        if (!values.phone.number) {
            errors.phone_number = "Please select your phone number!"
        }

        return errors;
    }

    const MobileNumberFormSubmit = (e) => {
        e.preventDefault();
        console.log(formErrors);
        const errorsForm = validateFormInputs(userSignupDetails)
        console.log(errorsForm)
        if (Object.keys(errorsForm).length === 0) {
            setMobileNumberFormSubmitted(true)
        } else {
            toast.error('Please check your input details')
            setFormErrors(errorsForm)
        }
    }


    return (
        <div className='flex justify-center text-white'>
            <div className="px-[4.5rem] flex flex-col gap-8 w-full">
                <div className="w-full flex justify-center">
                    <h1 className='text-[1.75rem] font-semibold'>Mobile Number</h1>
                </div>
                <div className="">
                    <form action="" onSubmit={MobileNumberFormSubmit} className='flex flex-col gap-6'>

                        {/* country code for phone number */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className='leading-4 text-base'>Country</label>
                            <input
                                list='phone[code]'
                                className={`bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal ${formErrors.phone_code ? 'border border-red-500' : ''}`}
                                onChange={handleCountryCodeChange}
                                autoComplete='off'
                            // required
                            />
                            <datalist id="phone[code]">
                                {phoneCodes.map((country) => <option key={country.name} value={country.dial_code}><div className="">{country.name}&#xa0; &#40;{country.dial_code}&#x29;</div></option>)}
                            </datalist>
                            <p className='text-sm text-red-500'>{formErrors.phone_code}</p>
                        </div>

                        {/* phone number input */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="phone[number]" className='leading-4 text-base'>Phone number</label>
                            <input
                                type="tel"
                                name="phone[number]"
                                id="phone[number]"
                                onChange={handlePhoneNumberChange}
                                className={`bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal ${formErrors.phone_number ? 'border border-red-500' : ''}`}
                                placeholder="Phone number"
                                // required
                                maxLength={10}
                                minLength={10}
                                autoComplete='off'
                            />
                            <p className='text-sm text-red-500'>{formErrors.phone_number}</p>
                        </div>

                        {/* submit button */}
                        <div className="w-full">
                            <button type="submit" className='w-full bg-gradient-to-r from-gradientColor2 to-gradientColor1 py-4 text-white text-sm font-bold rounded-xl leading-4'>Next</button>
                        </div>
                    </form>
                </div>
                <div className="px-4 pt-1 pb-3 flex gap-2 w-full justify-center items-center text-center text-placeholderText text-sm">
                    <p>Already have an account?</p>
                    <Link href='/user/login'>Log In</Link>
                </div>

            </div >
        </div >
    )
}

export default MobileNumberForm