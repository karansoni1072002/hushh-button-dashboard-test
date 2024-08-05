'use client';
import React, { useState } from 'react'
import ButtonSignupForm from './ButtonSignupForm';
import ButtonUserProfileForm from './ButtonUserProfileForm';

const ButtonSignupScreen = ({ setActiveScreen, setUserAuthenticated, setIsExistingUser }) => {
    const [signupFormSubmitted, SetSignupFormSubmitted] = useState(false)
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
        dob: "",
        dob_string: "",
        zipcode: "",
        city: "",
        country: "",
        password: ""
    })
    const [responseMessage, setResponseMessage] = useState('')

    let fieldname, fieldvalue;
    const handleInputs = (e) => {
        fieldname = e.target.name;
        fieldvalue = e.target.value;

        setUserSignupDetails({ ...userSignupDetails, [fieldname]: fieldvalue });
    }

    const UserSignupHandler = async (e) => {
        e.preventDefault()

        const formDetails = new FormData()
        formDetails.append('email', userSignupDetails.email);
        formDetails.append('first_name', userSignupDetails.first_name);
        formDetails.append('last_name', userSignupDetails.last_name);
        formDetails.append('gender', userSignupDetails.gender);
        formDetails.append('phone[code]', userSignupDetails.phone.code);
        formDetails.append('phone[number]', userSignupDetails.phone.number);
        formDetails.append('device_model', userSignupDetails.device_model);
        formDetails.append('device_make', userSignupDetails.device_make);
        formDetails.append('device_os_version', userSignupDetails.device_os_version);
        formDetails.append('app_version', userSignupDetails.app_version);
        formDetails.append('fcmtoken', userSignupDetails.fcmtoken);
        formDetails.append('role', userSignupDetails.role);
        formDetails.append('registration_mode', userSignupDetails.registration_mode);
        formDetails.append('dob_string', userSignupDetails.dob_string);
        formDetails.append('dob', userSignupDetails.dob);
        formDetails.append('zipcode', userSignupDetails.zipcode);
        formDetails.append('city', userSignupDetails.city);
        formDetails.append('country', userSignupDetails.country);
        formDetails.append('password', userSignupDetails.password);
        const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/api/auth/sign_up', {
            method: 'POST',
            body: formDetails
        })
        const response = await res.json();
        console.log(response)
        if (response.status === 200) {
            setResponseMessage('Signed up successfully!')
            setTimeout(() => {
                localStorage.setItem('hushh_button_user_tkn', userSignupDetails.email)
                setActiveScreen('share_user_wallet_data')
                setUserAuthenticated(true)
            }, 2000)
        } else if (response.status === 400) {
            setResponseMessage(`You are already registered!`)
            setTimeout(() => {
                setActiveScreen('login')
                setIsExistingUser(true)
            }, 2000)

        }
    }

    return (
        <div className="">
            {
                signupFormSubmitted ?
                    <ButtonUserProfileForm userSignupDetails={userSignupDetails} setUserSignupDetails={setUserSignupDetails} UserSignupHandler={UserSignupHandler} responseMessage={responseMessage} setActiveScreen={setActiveScreen} />
                    :
                    <ButtonSignupForm userSignupDetails={userSignupDetails} setUserSignupDetails={setUserSignupDetails} handleInputs={handleInputs} SetSignupFormSubmitted={SetSignupFormSubmitted} />
            }

        </div>
    )
}

export default ButtonSignupScreen