'use client';
import React, { useEffect, useState } from 'react'
import SignupForm from '../../_components/userComponents/signupForm'
import UserProfilePage from '../../_components/userComponents/userprofile';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import MobileNumberForm from '../../_components/userComponents/mobileNumberForm';
import { Modal } from '../../_components/brandComponents/Modal'
import Link from 'next/link'
import OTPInput from 'react-otp-input';
import '../../globals.css'
import { assets } from '../../../../public/assets';
import Image from 'next/image';

const BrandSignup = () => {
    // const [brandSignupDetails, setBrandSignupDetails] = useState({
    //     email: "",
    //     brandName: "",
    //     password: "",
    //     category: ""
    // })
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(true)

    // const [formErrors, setFormErrors] = useState({})



    // const validateFormInputs = (values) => {
    //     const errors = {}
    //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //     if (!values.email) {
    //         errors.email = "Email is required!";
    //     } else if (!regex.test(values.email)) {
    //         errors.email = "This is not a valid email format!";
    //     }

    //     if (!values.password) {
    //         errors.password = "Password is required!";
    //     } else if (values.password.length < 8) {
    //         errors.password = "Password must be more than 8 characters";
    //     } else if (values.password.length > 16) {
    //         errors.password = "Password cannot exceed more than 16 characters";
    //     }

    //     if (!values.brandName) {
    //         errors.brandName = "Brand name is required!"
    //     }

    //     if (!values.category) {
    //         errors.category = "Brand category is required!"
    //     }

    //     return errors;
    // }


    // const brandFormSubmitHandler = async (e) => {
    //     e.preventDefault()
    //     const errorsForm = validateFormInputs(brandSignupDetails)

    //     if (Object.keys(errorsForm).length === 0) {
    //         const formDetails = new URLSearchParams({
    //             "email": brandSignupDetails.email,
    //             "brandName": brandSignupDetails.brandName,
    //             "password": brandSignupDetails.password,
    //             "category": brandSignupDetails.category
    //         })

    //         const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/api/brand/sign_up', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //             },
    //             body: formDetails
    //         })
    //         const response = await res.json();
    //         console.log(res)
    //         console.log(response)
    //         if (response.status === 1) {
    //             toast.success(response.data)
    //             setIsModalOpen(false)
    //             localStorage.setItem('brand_tkn', brandSignupDetails.email)
    //             localStorage.setItem('brand_name', brandSignupDetails.brandName)
    //             router.push('/brand/apikey')
    //         } else {
    //             toast.error(response.data)
    //         }
    //     } else {
    //         toast.error('Check your input details')
    //         setFormErrors(errorsForm)
    //     }
    // }


    const [oAuthSelected, setOAuthSelected] = useState(false)
    const [emailSignUpSelected, setEmailSignUpSelected] = useState(false)

    const [emailValue, setEmailValue] = useState('')

    const [otpSent, setOtpSent] = useState(false)

    const sendOTPHandler = async () => {

        const postData = new URLSearchParams({
            "email": emailValue
        })

        const res = await fetch('https://hushhdevenv.hushh.ai/button-Admin/v1/api/auth/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: postData
        })

        if (res.status === 200) {
            if (res.ok) {
                const response = await res.json()
                setOtpSent(true)
                toast.success('OTP sent successfully')
            }
        }
    }

    const [otpValue, setOtpValue] = useState('')
    const [otpVerified, setOtpVerified] = useState(false)

    const verifyOTPHandler = async () => {

        const postData = new URLSearchParams({
            "email": emailValue,
            "OTP": otpValue
        })

        const res = await fetch('https://hushhdevenv.hushh.ai/button-Admin/v1/api/auth/verifyOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: postData
        })

        if (res.status === 200) {
            if (res.ok) {
                const response = await res.json()
                setOtpVerified(true)
                toast.success('OTP verified successfully')
            }
        }
    }

    const [adminDetailsSubmitted, setAdminDetailsSubmitted] = useState(false)
    const [adminDetails, setAdminDetails] = useState({
        first_name: "", middle_name: "", last_name: "", gender: ""
    })
    const [birthMonth, setBirthMonth] = useState('January')
    const [birthYear, setBirthYear] = useState('')
    const [birthDate, setBirthDate] = useState('')


    let fieldname, fieldvalue;
    const handleAdminInputs = (e) => {
        fieldname = e.target.name;
        fieldvalue = e.target.value;

        setAdminDetails({ ...adminDetails, [fieldname]: fieldvalue });
    }

    const [brandDetailsSubmitted, setBrandDetailsSubmitted] = useState(false)
    const [brandDetails, setBrandDetails] = useState({
        brand_name: "", brand_category: "", brand_website: ""
    })
    const [brandNumberOfMembers, setBrandNumberOfMembers] = useState('')
    const handleBrandDetailsInputs = (e) => {
        fieldname = e.target.name;
        fieldvalue = e.target.value;

        setBrandDetails({ ...brandDetails, [fieldname]: fieldvalue });
    }

    const years = [];
    const months = [
        { name: 'January', days: 31 },
        { name: 'February', days: 29 }, // Always considering 29 days for February
        { name: 'March', days: 31 },
        { name: 'April', days: 30 },
        { name: 'May', days: 31 },
        { name: 'June', days: 30 },
        { name: 'July', days: 31 },
        { name: 'August', days: 31 },
        { name: 'September', days: 30 },
        { name: 'October', days: 31 },
        { name: 'November', days: 30 },
        { name: 'December', days: 31 },
    ];
    const days = [];

    const startYear = 1924;
    const endYear = 2024;


    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }


    const getDaysInMonth = (month) => {
        const monthObj = months.find((m) => m.name === month);
        return monthObj ? monthObj.days : 31;
    };

    for (let day = 1; day <= getDaysInMonth(birthMonth); day++) {
        days.push(day);
    }

    const [adminID, setAdminID] = useState('')
    const handleAdminDetailsSubmit = async () => {

        const postData = new URLSearchParams({
            "first_name": adminDetails.first_name,
            "middle_name": adminDetails.middle_name,
            "last_name": adminDetails.last_name,
            "gender": adminDetails.gender,
            "DOB_string": `${birthDate} ${birthMonth} ${birthYear}`,
            "email": emailValue
        })

        const res = await fetch('https://hushhdevenv.hushh.ai/button-Admin/v1/admin/add-Personal-Data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: postData
        })

        if (res.status === 200) {
            if (res.ok) {
                const response = await res.json()
                console.log(response.admin[0].admin_id)
                setAdminID(response.admin[0].admin_id)
                setAdminDetailsSubmitted(true)
                toast.success('Your details added successfully!')
            }
        }
    }

    const handleBrandDetailsSubmit = async () => {

        const postData = new URLSearchParams({
            "brand_name": brandDetails.brand_name,
            "brand_category": brandDetails.brand_category,
            "brand_website": brandDetails.brand_website,
            "number_of_members": brandNumberOfMembers,
            "admin_id": adminID
        })

        const res = await fetch('http://localhost:3001/button-Admin/v1/admin/add-Brand-Data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: postData
        })

        if (res.status === 200) {
            if (res.ok) {
                setBrandDetailsSubmitted(true)
                const response = await res.json()
                localStorage.setItem('brand_id', response.brandId)
                toast.success('Brand details added successfully!')
                router.push('/brand/dashboard')
            }
        }
    }

    return (
        <div className='h-screen flex flex-col'>
            <div className="px-10 py-4 flex justify-between border-b border-opacity-25 border-[#666666]">
                <div className="w-10 h-10 bg-[#C4C4C4] rounded-full"></div>
                <div>
                    <button className="py-2 px-6 border border-fontColor3 rounded-lg text-fontColor3">Log in</button>
                </div>
            </div>

            <div className="flex-grow">
                {!oAuthSelected && !emailSignUpSelected &&
                    <div className="h-full flex">
                        <div className="w-7/12 flex justify-center items-center">
                            <div className="w-[28.75rem] flex flex-col gap-14">
                                <div className="flex flex-col gap-2">
                                    <div className="text-5xl font-semibold flex flex-col items-center leading-[3.5rem]">
                                        <h1>Explore the world</h1>
                                        <h1>to experience the</h1>
                                        <h1>beauty of nature</h1>
                                    </div>
                                    <div className="text-[#666666] flex justify-center text-center">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus
                                    </div>
                                </div>
                                <div className="flex flex-col gap-12">
                                    <div className="w-full items-center justify-center flex flex-col gap-6">
                                        <button className="text-lg leading-6 flex gap-4 w-full items-center justify-center py-3 border border-[#333333] rounded-full">
                                            <Image src={assets.GoogleLogo} alt='Google Logo' className='w-8 h-8' />
                                            <p>Continue with Google</p>
                                        </button>
                                        <button className="text-lg leading-6 flex gap-4 w-full items-center justify-center py-3 border border-[#333333] rounded-full">
                                            <Image src={assets.FacebookLogo} alt='Google Logo' className='w-8 h-8' />
                                            <p>Continue with Facebook</p>
                                        </button>
                                        <button className="text-lg leading-6 flex gap-4 w-full items-center justify-center py-3 border border-[#333333] rounded-full">
                                            <Image src={assets.AppleLogo} alt='Google Logo' className='w-8 h-8' />
                                            <p>Continue with Apple</p>
                                        </button>
                                    </div>
                                    <div className="w-full items-center justify-center flex gap-6">
                                        <hr className='w-full border-2 border-[#666666] border-opacity-25' />
                                        <p className='leading-5 text-[#666666]'>OR</p>
                                        <hr className='w-full border-2 border-[#666666] border-opacity-25' />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="w-full items-center justify-center">
                                            <button onClick={() => setEmailSignUpSelected(true)} className="text-lg leading-7 flex gap-4 w-full items-center justify-center py-3.5 bg-[#111111] text-white border border-[#333333] rounded-full">
                                                Sign up with email
                                            </button>
                                        </div>
                                        <div className="p-2 text-center items-center">
                                            By signing up, you agree to the <span className='underline cursor-pointer'>Terms of Service</span> and <span className='underline cursor-pointer'>Privacy Policy</span>, including <span className='underline cursor-pointer'>cookie use</span>.
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div>
                        <div className="w-5/12 h-full bg-[#D9D9D9]">
                        </div>
                    </div>
                }

                {
                    emailSignUpSelected && !otpSent && !otpVerified &&
                    <div className="h-full flex">
                        <div className="w-7/12 flex justify-center items-center">
                            <div className="w-[28.75rem] flex flex-col gap-16">
                                <div className="text-5xl font-medium flex flex-col items-center leading-[4.5rem]">
                                    <h1>Sign up</h1>
                                </div>
                                <div className="flex flex-col">
                                    <form action="" className='flex flex-col gap-6'>
                                        <div className="flex flex-col gap-2">
                                            <p className='text-[#666666]'>Email</p>
                                            <input type="text" onChange={(e) => setEmailValue(e.target.value)} className='border border-[#666666] border-opacity-35 w-full h-[3.5rem] px-2 rounded-xl' />
                                        </div>
                                        <button onClick={sendOTPHandler} className='text-lg py-3.5 bg-[#111111] text-white rounded-full'>Sign up</button>
                                    </form>
                                </div>
                                <div className="py-2 text-[#333333] text-opacity-70">
                                    <p>By signing up, you agree to the Terms of use and Privacy Policy.</p>
                                </div>
                                <div className="flex justify-center">
                                    <p>Already have an ccount? <span className='underline cursor-pointer'>Log in</span></p>
                                </div>
                            </div >
                        </div>
                        <div className="w-5/12 h-full bg-[#D9D9D9]">
                        </div>
                    </div>
                }

                {!otpVerified && otpSent && emailSignUpSelected &&
                    <div className="h-full flex">
                        <div className="w-7/12 flex justify-center items-center">
                            <div className="w-[28.75rem] flex flex-col gap-16">
                                <div className="text-5xl font-medium flex flex-col items-center leading-[4.5rem]">
                                    <h1>Enter OTP</h1>
                                </div>
                                <div className="flex flex-col gap-6">
                                    {/* <form action="" className='flex flex-col gap-6'>
                                        <div className="flex flex-col gap-2">
                                            <p className='text-[#666666]'>Email</p>
                                            <input type="text" className='border border-[#666666] border-opacity-35 w-full h-[3.5rem] px-2 rounded-xl' />
                                        </div>
                                        <button className='text-lg py-3.5 bg-[#111111] text-white rounded-full'>Sign up</button>
                                    </form> */}
                                    <div className="py-2 text-[#333333] text-opacity-70 flex flex-col items-center gap-8 justify-center">
                                        <OTPInput
                                            value={otpValue}
                                            onChange={setOtpValue}
                                            numInputs={6}
                                            renderSeparator={<span> </span>}
                                            renderInput={(props) => <input {...props} />}
                                            inputStyle='inputStyle'
                                        />
                                        <button onClick={verifyOTPHandler} className='bg-[#111111] text-lg text-white leading-7 py-3.5 w-full rounded-full'>Proceed</button>
                                        <div className="text-[#666666] gap-2 flex">
                                            <button>Resend OTP</button>
                                            <span>30 sec</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <p>Already have an account? <span className='underline cursor-pointer'>Log in</span></p>
                                    </div>
                                </div>
                            </div >
                        </div>
                        <div className="w-5/12 h-full bg-[#D9D9D9]">
                        </div>
                    </div>
                }

                {!brandDetailsSubmitted && otpVerified && !adminDetailsSubmitted &&
                    <div className="h-full flex px-10 py-14">
                        <div className="w-[45%]">
                            {/* Progress Bar */}
                            <div className="flex w-full">
                                <div className="flex flex-col gap-2 justify-center items-center">
                                    <div className="w-5 h-5 rounded-full text-xs font-medium text-white bg-[#333333] flex justify-center items-center">1</div>
                                    <p>Basic info</p>
                                </div>
                                <hr className='border border-[#333333] border-opacity-35 w-[13.3rem]' />
                                <div className="flex opacity-35 flex-col gap-2 justify-center items-center">
                                    <div className="w-5 h-5 rounded-full text-xs font-medium text-white bg-[#333333] flex justify-center items-center">2</div>
                                    <p>Brand info</p>
                                </div>
                                <hr className='border border-[#333333] border-opacity-35 w-[13.3rem]' />
                                <div className="flex flex-col opacity-35 gap-2 justify-center items-center">
                                    <div className="w-5 h-5 rounded-full text-xs font-medium text-white bg-[#333333] flex justify-center items-center">3</div>
                                    <p>Dashboard</p>
                                </div>
                            </div>


                            <div className="flex flex-col gap-6 p-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-6 h-6 rounded-full text-xs font-medium text-white bg-[#333333] flex justify-center items-center">1</div>
                                        <p className='text-2xl leading-9'>Basic info</p>
                                    </div>
                                    <div className="font-light text-[#666666]">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
                                    </div>
                                    <div className="text-[#111111]">
                                        *All fields required unless noted.
                                    </div>
                                </div>
                                <div className="">
                                    <form action="" className='flex flex-col gap-6'>
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="first_name" className='text-sm leading-5 text-[#666666]'>*First name</label>
                                            <input type="text" id='first_name' onChange={handleAdminInputs} name='first_name' className='p-5 border border-[#666666] border-opacity-35 w-full rounded-xl' />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="middle_name" className='text-sm leading-5 text-[#666666]'>Middle name (as applicable)</label>
                                            <input type="text" id='middle_name' onChange={handleAdminInputs} name='middle_name' className='p-5 border border-[#666666] border-opacity-35 w-full rounded-xl' />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="last_name" className='text-sm leading-5 text-[#666666]'>*Last name</label>
                                            <input type="text" id='last_name' onChange={handleAdminInputs} name='last_name' className='p-5 border border-[#666666] border-opacity-35 w-full rounded-xl' />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <p htmlFor="" className='text-sm leading-5 text-[#666666]'>What’s your gender? (optional)</p>
                                            <div className="flex gap-8">
                                                <div className="flex gap-2 px-2">
                                                    <input type="radio" className='' value='Female' onChange={handleAdminInputs} id='gender' name='gender' />
                                                    <p className='text=[#111111] leading-6'>Female</p>
                                                </div>
                                                <div className="flex gap-2 px-2">
                                                    <input type="radio" className='' value='Male' onChange={handleAdminInputs} id='gender' name='gender' />
                                                    <p className='text=[#111111] leading-6'>Male</p>
                                                </div>
                                                <div className="flex gap-2 px-2">
                                                    <input type="radio" className='' value='Non-binary' onChange={handleAdminInputs} id='gender' name='gender' />
                                                    <p className='text=[#111111] leading-6'>Non-binary</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <p htmlFor="" className='text-sm leading-5 text-[#666666]'>What’s your date of birth?</p>
                                            <div className="flex gap-5">
                                                <div className="flex flex-col gap-1.5">
                                                    <label htmlFor="" className='text-[#666666]'>Month</label>
                                                    {/* <input type="text" className='p-5 border border-[#666666] border-opacity-35 w-full rounded-xl' /> */}
                                                    <select name="" id="" onChange={(e) => setBirthMonth(e.target.value)} className='p-5 border border-[#666666] border-opacity-35 w-full rounded-xl'>
                                                        {months.map((month) => (
                                                            <option key={month.name} value={month.name}>{month.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <label htmlFor="" className='text-[#666666]'>Date</label>
                                                    {/* <input type="text" className='p-5 border border-[#666666] border-opacity-35 w-full rounded-xl' /> */}
                                                    <select name="" id="" onChange={(e) => setBirthDate(e.target.value)} className='p-5 border border-[#666666] border-opacity-35 w-full rounded-xl'>
                                                        {days.map((day) => (
                                                            <option key={day} value={day}>{day}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <label htmlFor="" className='text-[#666666]'>Year</label>
                                                    {/* <input type="text" className='p-5 border border-[#666666] border-opacity-35 w-full rounded-xl' /> */}
                                                    <select name="" id="" onChange={(e) => setBirthYear(e.target.value)} className='p-5 border border-[#666666] border-opacity-35 w-full rounded-xl'>
                                                        {years.map((year) => (
                                                            <option key={year} value={year}>{year}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <button onClick={handleAdminDetailsSubmit} className={`text=[1.375rem] ${birthYear === '' ? 'bg-[#111111] opacity-25' : ' bg-gradient-to-r from-[#A342FF] to-[#E54D60] shadow-lg'} text-white py-4 w-full rounded-full `}>Next</button>
                            </div>
                        </div>
                    </div>
                }

                {!brandDetailsSubmitted && otpVerified && adminDetailsSubmitted &&
                    <div className="h-full flex px-10 py-14">
                        <div className="w-[45%]">
                            {/* Progress Bar */}
                            <div className="flex w-full">
                                <div className="flex flex-col gap-2 justify-center items-center">
                                    <div className="w-5 h-5 rounded-full text-xs font-medium text-white bg-[#333333] flex justify-center items-center">1</div>
                                    <p>Basic info</p>
                                </div>
                                <hr className='border border-[#333333] border-opacity-35 w-[13.3rem]' />
                                <div className="flex flex-col gap-2 justify-center items-center">
                                    <div className="w-5 h-5 rounded-full text-xs font-medium text-white bg-[#333333] flex justify-center items-center">2</div>
                                    <p>Brand info</p>
                                </div>
                                <hr className='border border-[#333333] border-opacity-35 w-[13.3rem]' />
                                <div className="flex flex-col opacity-35 gap-2 justify-center items-center">
                                    <div className="w-5 h-5 rounded-full text-xs font-medium text-white bg-[#333333] flex justify-center items-center">3</div>
                                    <p>Dashboard</p>
                                </div>
                            </div>


                            <div className="flex flex-col gap-6 p-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-6 h-6 rounded-full text-xs font-medium text-white bg-[#333333] flex justify-center items-center">1</div>
                                        <p className='text-2xl leading-9'>Brand info</p>
                                    </div>
                                    <div className="font-light text-[#666666]">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
                                    </div>
                                    <div className="text-[#111111]">
                                        *All fields required unless noted.
                                    </div>
                                </div>
                                <div className="">
                                    <form action="" className='flex flex-col gap-6'>
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="brand_name" className='text-sm leading-5 text-[#666666]'>*Brand name</label>
                                            <input onChange={handleBrandDetailsInputs} type="text" id='brand_name' name='brand_name' className='p-5 border border-[#666666] border-opacity-35 w-full rounded-xl' />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="brand_website" className='text-sm leading-5 text-[#666666]'>Brand Website</label>
                                            <input onChange={handleBrandDetailsInputs} type="text" id='brand_website' name='brand_website' className='p-5 border border-[#666666] border-opacity-35 w-full rounded-xl' />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="brand_category" className='text-sm leading-5 text-[#666666]'>*Category</label>
                                            <input onChange={handleBrandDetailsInputs} type="text" id='brand_category' name='brand_category' className='p-5 border border-[#666666] border-opacity-35 w-full rounded-xl' />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <p htmlFor="" className='text-sm leading-5 text-[#666666]'>Total members in organization</p>
                                            <div className="flex flex-col gap-1.5">
                                                <label htmlFor="" className='text-[#666666]'>Members</label>
                                                {/* <input type="text" className='p-5 border border-[#666666] border-opacity-35 w-full rounded-xl' /> */}
                                                <select name="" onChange={(e) => setBrandNumberOfMembers(e.target.value)} id="" className='p-5 border border-[#666666] border-opacity-35 w-full rounded-xl'>
                                                    <option value="">0-2</option>
                                                    <option value="">2-10</option>
                                                    <option value="">10-50</option>
                                                    <option value="">50-500</option>
                                                    <option value="">&gt; 500</option>
                                                </select>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                                <button onClick={handleBrandDetailsSubmit} className='text=[1.375rem] text-white py-4 w-full rounded-full bg-[#111111] opacity-25'>Next</button>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    )

}


export default BrandSignup