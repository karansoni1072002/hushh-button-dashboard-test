'use client';
import React, { useEffect, useState } from 'react'
import SignupForm from '../../_components/userComponents/signupForm'
import UserProfilePage from '../../_components/userComponents/userprofile';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import MobileNumberForm from '../../_components/userComponents/mobileNumberForm';
import { Modal } from '../../_components/brandComponents/Modal'
const UserSignUp = () => {

    const router = useRouter()

    const [userSignupDetails, setUserSignupDetails] = useState({
        email: "",
        first_name: "",
        last_name: "",
        gender: "",
        phone: {
            code: "",
            number: ""
        },
        device_model: "13",
        device_make: "",
        device_os_version: "16.3",
        app_version: "0.1",
        fcmtoken: "",
        role: "user",
        registration_mode: "hushh_button",
        zipcode: "",
        address: "",
        city: "",
        country: "",
        password: ""
    })
    const [dob, setDob] = useState("")
    const [dob_string, setDob_string] = useState("")

    const [signupFormSubmitted, setSignupFormSubmitted] = useState(false)
    const [otp, setOtp] = useState('');
    const [otpVerified, setOtpVerified] = useState(false)
    const [mobileNumberFormSubmitted, setMobileNumberFormSubmitted] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(true)
    const handleOtpChange = (otpValue) => {
        setOtp(otpValue);
    };

    const sendOtpToUser = () => {
        console.log('otp', otp);
    }

    const userFormSubmitHandler = async (e) => {
        // e.preventDefault();
        console.log('request sent');
        const postData = new URLSearchParams({
            'email': userSignupDetails.email,
            'first_name': userSignupDetails.first_name,
            'last_name': userSignupDetails.last_name,
            'gender': userSignupDetails.gender,
            'phone[code]': userSignupDetails.phone.code,
            'phone[number]': userSignupDetails.phone.number,
            'device_model': userSignupDetails.device_model,
            'device_make': userSignupDetails.device_make,
            'device_os_version': userSignupDetails.device_os_version,
            'app_version': userSignupDetails.app_version,
            'fcmtoken': userSignupDetails.fcmtoken,
            'role': userSignupDetails.role,
            'registration_mode': userSignupDetails.registration_mode,
            'dob_string': dob_string,
            'dob': dob,
            'zipcode': userSignupDetails.zipcode,
            'address': userSignupDetails.address,
            'city': userSignupDetails.city,
            'country': userSignupDetails.country,
            'password': userSignupDetails.password,
            'uid': localStorage.getItem('hushh_id'),
            'DoB': dob_string
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
        if (response.status === 1) {
            toast.success(response.data)
            setIsModalOpen(false)
            router.push('/user/recordvideo')
        } else {
            toast.error("Something went wrong! Please try again")
        }
    }
    return (
        <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }}>
            <div className="py-12">
                {
                    !signupFormSubmitted && !mobileNumberFormSubmitted &&
                    <SignupForm
                        userSignupDetails={userSignupDetails}
                        setUserSignupDetails={setUserSignupDetails}
                        setSignupFormSubmitted={setSignupFormSubmitted}
                        sendOtpToUser={sendOtpToUser}
                    />
                }
                {signupFormSubmitted && !mobileNumberFormSubmitted &&

                    < MobileNumberForm
                        userSignupDetails={userSignupDetails}
                        setUserSignupDetails={setUserSignupDetails}
                        setMobileNumberFormSubmitted={setMobileNumberFormSubmitted}
                    />
                }
                {
                    mobileNumberFormSubmitted &&
                    <UserProfilePage
                        userSignupDetails={userSignupDetails}
                        setUserSignupDetails={setUserSignupDetails}
                        userFormSubmitHandler={userFormSubmitHandler}
                        setDob={setDob}
                        setDob_string={setDob_string}
                    />
                }
            </div>
        </Modal>
    )

}


export default UserSignUp