'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify';
import '../../globals.css'
import { useRouter } from 'next/navigation';
import { Services } from '../../../../actions/services';
const UpdateUserProfile = ({ profileUpdateHandler }) => {

    const [activeLink, setActiveLink] = useState('Profile')
    const [formErrors, setFormErrors] = useState({})
    const [userData, setUserData] = useState({})
    console.log(userData)
    const router = useRouter()
    useEffect(() => {
        const getUserData = async () => {
            const hushh_id = localStorage.getItem('hushh_id')

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
                // if (response.status === 1) {
                //     setUserData(response.data)
                //     localStorage.setItem('user_id', response.data.user_id)
                // } else if (response.status === -1) {
                //     router.push('/user/login')
                // } else {
                //     toast.error('Something went wrong, please try again!')
                // }
            } else {
                router.push('/user/login')
            }
        }
        getUserData()
    }, [])

    let fieldname, fieldvalue;
    const handleInput = (e) => {
        fieldname = e.target.name;
        fieldvalue = e.target.value;

        setUserData({ ...userData, [fieldname]: fieldvalue })
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


        return errors;
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        // const errorsForm = validateFormInputs(userSignupDetails);
        // console.log(errorsForm);

        const hushh_id = localStorage.getItem('hushh_id')

        if (hushh_id) {
            const postData = new URLSearchParams({
                'email': userData.email,
                'first_name': userData.first_name,
                'last_name': userData.last_name,
                'zipcode': userData.zipcode,
                'city': userData.city,
                'country': userData.country,
                'address': userData.address
            })
            const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/update-user-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: postData
            })
            const response = await res.json()
            console.log(response)
            if (res.ok) {
                toast.success('Details updated successfully!')
                router.push('/user/dashboard')
            }
        } else {
            router.push('/user/login')
        }


        // profileUpdateHandler()
        // if (Object.keys(errorsForm).length === 0) {
        // } else {
        //     toast.error('Please check your input details')
        //     setFormErrors(errorsForm)
        // }
    }


    return (
        <div className=' text-white py-10'>

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
                    <h1 className='text-[1.75rem] font-semibold'>Update Profile</h1>
                </div>
            </div>
            {/* Profile info form section */}
            <div className="">

                <form action="" onSubmit={submitHandler} className=' w-full px-4 py-3 '>
                    <div className="w-full flex flex-col gap-6 text-base">
                        <div className="flex gap-4 items-center">

                            {/* First Name Input */}
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor='first_name' className='text-base'>First Name</label>
                                <input
                                    type="text"
                                    className={`bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal ${formErrors.first_name ? 'border border-red-500' : ''}`}
                                    name='first_name'
                                    id='first_name'
                                    value={userData.first_name}
                                    onChange={handleInput}
                                    autoComplete='off'
                                    placeholder='First Name'
                                />
                                <p className='text-sm text-red-500'>{formErrors.first_name}</p>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="last_name" className='text-base'>Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    value={userData.last_name}
                                    onChange={handleInput}
                                    className={`bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal ${formErrors.phone_number ? 'border border-red-500' : ''}`}
                                    placeholder="Last Name"
                                    // required
                                    autoComplete='off'
                                />
                                <p className='text-sm text-red-500'>{formErrors.phone_number}</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">

                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor='city'>Address</label>
                                <input
                                    type="text"
                                    value={userData?.address}
                                    onChange={handleInput}
                                    name='city'
                                    id='city'
                                    autoComplete='off'
                                    className='bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal'
                                />
                            </div>

                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor='city'>City</label>
                                <input
                                    type="text"
                                    value={userData?.city}
                                    onChange={handleInput}
                                    name='city'
                                    id='city'
                                    autoComplete='off'
                                    className='bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal'
                                />
                            </div>


                        </div>

                        <div className="flex gap-4">
                            {/* zipcode input */}
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor='zipcode'>Zipcode</label>
                                <input
                                    type="number"
                                    onChange={handleInput}
                                    name='zipcode'
                                    id='zipcode'
                                    value={userData?.zipcode}
                                    autoComplete='off'
                                    className='bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal'
                                />
                            </div>
                            <div className="flex w-full flex-col gap-2">
                                <label htmlFor='country'>Country</label>
                                <input
                                    type="text"
                                    value={userData?.country}
                                    onChange={handleInput}
                                    name='country'
                                    id='country'
                                    autoComplete='off'
                                    className={`bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal ${formErrors.country ? 'border border-red-500' : ''}`}
                                />
                                <p className='text-sm text-red-500'>{formErrors.country}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center w-full gap-4">
                            {/* Country input */}

                            <div className=" h-full pb-3">
                                <button type="submit" onClick={submitHandler} className='text-sm font-bold px-6 py-4 h-full bg-gradient-to-r from-gradientColor2 to-gradientColor1 text-white rounded-lg'>Update</button>
                            </div>
                        </div>
                    </div>


                </form>
            </div >
        </div >

    )
}

export default UpdateUserProfile