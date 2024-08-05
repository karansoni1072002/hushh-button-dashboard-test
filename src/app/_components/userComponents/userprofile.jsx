'use client';
import React, { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify';
import '../../globals.css'

const UserProfilePage = ({ userSignupDetails, setUserSignupDetails, userFormSubmitHandler, setDob, setDob_string }) => {

    const [activeLink, setActiveLink] = useState('Profile')
    const [formErrors, setFormErrors] = useState({})

    let fieldname, fieldvalue;
    const handleInputs = (e) => {
        fieldname = e.target.name;
        fieldvalue = e.target.value;

        setUserSignupDetails({ ...userSignupDetails, [fieldname]: fieldvalue });
    }
    const handleDateOfBirthInput = async (e) => {
        const dateObj = new Date(e.target.value);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        setDob(e.target.value)
        setDob_string(formattedDate)
    }
    const validateFormInputs = (values) => {
        const errors = {}
        if (!values.first_name) {
            errors.first_name = "Please enter your first name!"
        }
        if (!values.last_name) {
            errors.last_name = "Please enter your last name!"
        }
        if (!values.country) {
            errors.country = "Please select your country name"
        }
        if (!values.gender) {
            errors.gender = "Please select your gender"
        }

        return errors;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const errorsForm = validateFormInputs(userSignupDetails);
        console.log(errorsForm);

        if (Object.keys(errorsForm).length === 0) {
            userFormSubmitHandler()
        } else {
            toast.error('Please check your input details')
            setFormErrors(errorsForm)
        }
    }


    return (
        <div className=' text-white'>

            {/* Vertical Nav Menu */}
            {/* <div className="w-1/4">
                <div className="p-4 flex flex-col gap-2 w-full">
                    <Link href='/userprofile' className={`${activeLink === 'Profile' ? 'bg-activeBG' : 'bg-white'} w-full h-full px-3 py-2 hover:bg-activeBG active:bg-activeBG rounded-xl text-sm`} onFocus={() => setActiveLink('Profile')}>Profile</Link>
                    <Link href='#' className={`${activeLink === 'Consent Preferences' ? 'bg-activeBG' : 'bg-white'} w-full h-full px-3 py-2 hover:bg-activeBG active:bg-activeBG rounded-xl text-sm`} onFocus={() => setActiveLink('Consent Preferences')}>Consent Preferences</Link>
                    <Link href='#' className={`${activeLink === 'Data Sharing History' ? 'bg-activeBG' : 'bg-white'} w-full h-full px-3 py-2 hover:bg-activeBG active:bg-activeBG rounded-xl text-sm`} onFocus={() => setActiveLink('Data Sharing History')}>Data Sharing History</Link>
                    <Link href='#' className={`${activeLink === 'Multilingual Support' ? 'bg-activeBG' : 'bg-white'} w-full h-full px-3 py-2 hover:bg-activeBG active:bg-activeBG rounded-xl text-sm`} onFocus={() => setActiveLink('Multilingual Support')}>Multilingual Support</Link>
                </div>
            </div> */}

            <div className="flex flex-col gap-8 w-full">
                <div className="w-full flex justify-center">
                    <h1 className='text-[1.75rem] font-semibold'>Profile</h1>
                </div>
            </div>
            {/* Profile info form section */}
            <div className="">

                <form action="" onSubmit={submitHandler} className=' w-full px-4 py-3 '>
                    <div className="w-full flex flex-col gap-6 text-base">
                        <div className="flex gap-4">

                            {/* First Name Input */}
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor='first_name'>First name</label>
                                <input
                                    type="text"
                                    className={`bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal ${formErrors.first_name ? 'border border-red-500' : ''}`}
                                    name='first_name'
                                    id='first_name'
                                    onChange={handleInputs}
                                    autoComplete='off'
                                />
                                <p className='text-sm text-red-500'>{formErrors.first_name}</p>
                            </div>

                            {/* Last name input */}
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor='last_name'>Last name</label>
                                <input
                                    type="text"
                                    className={`bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal ${formErrors.last_name ? 'border border-red-500' : ''}`}
                                    name='last_name'
                                    id='last_name'
                                    onChange={handleInputs}
                                    autoComplete='off'
                                />
                                <p className='text-sm text-red-500'>{formErrors.last_name}</p>
                            </div>
                        </div>

                        <div className="flex gap-4">

                            {/* Gender Input */}
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor='gender'>Gender</label>
                                <select id='gender' autoComplete='off' name='gender' value={userSignupDetails.gender} onChange={handleInputs} className={`bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 ${userSignupDetails.gender === "" ? 'text-placeholderText' : "text-white"} rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal ${formErrors.gender ? ' border border-red-500' : ''}`}>
                                    <option value="" className=' text-placeholderText' disabled selected hidden>Select Gender</option>
                                    <option value="Male" className='text-white'>Male</option>
                                    <option value="Female" className='text-white'>Female</option>
                                    <option value="Other" className='text-white'>Other</option>
                                </select>
                                <p className='text-sm text-red-500'>{formErrors.gender}</p>
                            </div>

                            {/* Date of Birth input */}
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor='dob'>Date of Birth</label>
                                <input
                                    type="date"
                                    className={`bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 ${userSignupDetails.dob === "" ? 'text-placeholderText' : "text-white"} rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal`}
                                    name='dob'
                                    id='dob'
                                    autoComplete='off'
                                    onChange={handleDateOfBirthInput}
                                />
                            </div>
                        </div>


                        <div className="flex gap-4">

                            {/* City input */}
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor='city'>City</label>
                                <input
                                    type="text"
                                    onChange={handleInputs}
                                    name='city'
                                    id='city'
                                    autoComplete='off'
                                    className='bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal'
                                />
                            </div>

                            {/* zipcode input */}
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor='zipcode'>Zipcode</label>
                                <input
                                    type="number"
                                    onChange={handleInputs}
                                    name='zipcode'
                                    id='zipcode'
                                    autoComplete='off'
                                    className='bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal'
                                />
                            </div>
                        </div>

                        <div className="flex items-end gap-4">
                            {/* Country input */}
                            <div className="flex w-full flex-col gap-2">
                                <label htmlFor='country'>Country</label>
                                <input
                                    type="text"
                                    onChange={handleInputs}
                                    name='country'
                                    id='country'
                                    autoComplete='off'
                                    className={`bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal ${formErrors.country ? 'border border-red-500' : ''}`}
                                />
                                <p className='text-sm text-red-500'>{formErrors.country}</p>
                            </div>
                            <div className="flex justify-end h-full pb-3">
                                <button type="submit" onClick={handleInputs} className='text-sm font-bold px-6 py-4 h-full bg-gradient-to-r from-gradientColor2 to-gradientColor1 text-white rounded-lg'>Save</button>
                            </div>
                        </div>
                    </div>


                </form>
            </div >
        </div >

    )
}

export default UserProfilePage