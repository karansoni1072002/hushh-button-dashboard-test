'use client';
import React, { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify';

const ButtonUserProfileForm = ({ userSignupDetails, setUserSignupDetails, UserSignupHandler, responseMessage, setActiveScreen }) => {

    // const [formErrors, setFormErrors] = useState({})

    let fieldname, fieldvalue;
    const handleInputs = (e) => {
        fieldname = e.target.name;
        fieldvalue = e.target.value;

        setUserSignupDetails({ ...userSignupDetails, [fieldname]: fieldvalue });
    }

    // const validateFormInputs = (values) => {
    //     const errors = {}
    //     if (!values.first_name) {
    //         errors.first_name = "Please enter your first name!"
    //     }
    //     if (!values.last_name) {
    //         errors.last_name = "Please enter your last name!"
    //     }
    //     if (!values.country) {
    //         errors.country = "Please select your country name"
    //     }

    //     return errors;
    // }

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     const errorsForm = validateFormInputs(userSignupDetails);
    //     console.log(errorsForm);

    //     if (Object.keys(errorsForm).length === 0) {
    //         userFormSubmitHandler()
    //     } else {
    //         toast.error('Please check your input details')
    //         setFormErrors(errorsForm)
    //     }
    // }

    return (
        <div className='max-w-96 px-5 py-5 flex flex-col gap-4'>
            {/* Profile info form section */}
            <div className="w-full text-center mb-4">
                <h1 className='font-semibold'>Please enter your details</h1>
            </div>
            <div className="">
                <form action="" onSubmit={UserSignupHandler} className=' w-full'>
                    <div className="flex flex-col gap-2 text-base">
                        <div className="flex gap-4">

                            {/* First Name Input */}
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor='first_name'>First name</label>
                                <input
                                    type="text"
                                    className={`w-full border border-borderColour h-14 rounded-xl focus:border-0 active:border-0 focus:border-borderColour p-4 `}
                                    name='first_name'
                                    id='first_name'
                                    onChange={handleInputs}
                                />
                                {/* <p className='text-sm text-red-500'>{formErrors.first_name}</p> */}
                            </div>

                            {/* Last name input */}
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor='last_name'>Last name</label>
                                <input
                                    type="text"
                                    className={`w-full border border-borderColour h-14 rounded-xl focus:border-0 active:border-0 focus:border-borderColour p-4 `}
                                    name='last_name'
                                    id='last_name'
                                    onChange={handleInputs}
                                />
                                {/* <p className='text-sm text-red-500'>{formErrors.last_name}</p> */}
                            </div>
                        </div>

                        <div className="flex justify-center mt-4 w-full">
                            <button type="submit" className='text-sm font-bold px-6 py-3.5 bg-gradient-to-r from-gradientColor1 to-gradientColor2 leading-4 text-white rounded-lg'>Sign up</button>
                        </div>
                    </div>
                </form>
                <div className="pt-4">
                    <p>{responseMessage !== '' && responseMessage}</p>
                </div>
            </div>
        </div >
    )
}

export default ButtonUserProfileForm