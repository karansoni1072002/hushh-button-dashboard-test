import React from 'react'
import phoneCodes from '../../_utilities/phone_code.json'

const ButtonSignupForm = ({ userSignupDetails, setUserSignupDetails, handleInputs, SetSignupFormSubmitted }) => {

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

    const SignupFormSubmitHandler = () => {
        SetSignupFormSubmitted(true)
    }

    return (
        <div className='max-w-96 px-5 py-5 flex flex-col gap-4'>
            <div className="text-center flex flex-col gap-2">
                <p className='font-semibold'>Welcome to Hushh Button</p>
                <p className='text-sm text-fontColor2'>We&apos;re excited to have you here. First, let&apos;s get you set up.</p>
            </div>
            <form action="" className='flex flex-col gap-4' onSubmit={SignupFormSubmitHandler}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className='font-medium text-base'>Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={handleInputs}
                        className={`bg-inputBG p-4 rounded-xl placeholder:text-placeholderText placeholder:text-base placeholder:font-normal`}
                        placeholder='me@example.com'
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
                        placeholder='me@example.com'
                    />
                </div>
                <div className="flex w-full gap-2">
                    <div className="flex flex-col flex-1 gap-2">
                        <label htmlFor="password" className='font-medium text-base'>Country</label>
                        <input
                            list='phone[code]'
                            className={`bg-inputBG w-24 py-4 px-3.5 rounded-xl placeholder:text-placeholderText placeholder:text-base placeholder:font-normal`}
                            onChange={handleCountryCodeChange}
                        />
                        <datalist id="phone[code]">
                            {phoneCodes.map((country) => <option key={country.name} value={country.dial_code}><div className="">{country.name}&#xa0; &#40;{country.dial_code}&#x29;</div></option>)}
                        </datalist>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone[number]" className='font-medium text-base'>Phone number</label>
                        <input
                            type="tel"
                            name="phone[number]"
                            id="phone[number]"
                            onChange={handlePhoneNumberChange}
                            className={`bg-inputBG p-4 w-full rounded-xl placeholder:text-placeholderText placeholder:text-base placeholder:font-normal`}
                            placeholder="Phone number"
                            maxLength={10}
                            minLength={10}
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        className=' bg-gradient-to-r from-gradientColor1 to-gradientColor2 w-max px-5 py-3.5 text-white font-bold text-sm leading-4 rounded-lg'
                    >Next</button>
                </div>
            </form>
        </div>
    )
}

export default ButtonSignupForm