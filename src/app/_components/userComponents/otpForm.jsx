import React from 'react'
import OTPField from './otpFieldInput'
import { toast } from 'react-toastify'

const OTPForm = ({ otp, handleOtpChange, setOtpVerified }) => {

    const handleOTPVerification = () => {
        // Verification logic yet to be added
        if (!otp) {
            toast.error('Enter OTP')
        } else if (otp.length < 6) {
            toast.error('Enter the whole number')
        } else {
            setOtpVerified(true)
        }
    }

    return (
        <div>
            <div className="px-4 pt-1 pb-3 flex flex-col gap-5 items-center text-center text-placeholderText text-sm">
                <p>or</p>
                <p>By continuing, you agree to Private Share&apos;s Privacy Policy and Terms of Service.</p>
                <p>We&apos;ll email or text you a verification code. Standard message rates apply.</p>
                <OTPField onChange={handleOtpChange} />
                <div className="w-full">
                    <button type="submit" className='w-full bg-buttonColor py-2.5 text-white text-sm font-bold rounded-xl' onClick={handleOTPVerification}>Verify</button>
                </div>
            </div>
        </div>
    )
}

export default OTPForm