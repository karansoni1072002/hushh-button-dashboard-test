import React from 'react'

const WelcomeScreen = ({ setIsExistingUser, setActiveScreen }) => {

    const yesButtonHandler = () => {
        setIsExistingUser(true)
        setActiveScreen('login')
    }
    const noButtonHandler = () => {
        setIsExistingUser(false)
        setActiveScreen('signup')
    }

    return (
        <div className="flex flex-col gap-8 py-5 px-5 mb-10 text-center">
            <p className='font-semibold'>Welcome to Hushh Button!</p>
            <div className="flex flex-col gap-4">
                <p className='font-semibold'>Are you an existing Hushh User?</p>
                <div className="flex gap-4 items-start justify-center">
                    <button onClick={yesButtonHandler} className='px-6 py-3.5 text-sm leading-4 text-white font-bold rounded-md bg-gradient-to-r from-gradientColor1 to bg-gradientColor2'>Yes</button>
                    <button onClick={noButtonHandler} className='px-6 py-3.5 text-sm leading-4 text-white font-bold rounded-md bg-gradient-to-r from-gradientColor1 to bg-gradientColor2'>No</button>
                </div>
            </div>
        </div>
    )
}

export default WelcomeScreen