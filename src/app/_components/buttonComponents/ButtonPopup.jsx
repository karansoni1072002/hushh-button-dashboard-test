'use client';
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { hushhButtonAssets } from '../../../../public/HushhButtonAssets/hushhButtonAssets'
import ButtonPopupHeader from './ButtonPopupHeader'
import WelcomeScreen from './ButtonWelcomeScreen'
import LoginScreen from './ButtonLoginScreen';
import ButtonSignupScreen from './ButtonSignupScreen';
import WhatToDoToday from './WhatToDoToday.jsx';
import ButtonShareUserWalletDataScreen from './ButtonShareUserWalletDataScreen';
import ButtonCookiesPreferencesInput from './ButtonCookiesPreferencesInput';
import Link from 'next/link';

const ButtonPopup = ({ setButtonClicked, questionsArray }) => {
    const [isExistingUser, setIsExistingUser] = useState()
    const [activeScreen, setActiveScreen] = useState('welcome')
    const [userAuthenticated, setUserAuthenticated] = useState(false)
    const [hushh_button_user_tkn, setHushh_button_user_tkn] = useState('')
    const [buttonFlowCompleted, setButtonFlowCompleted] = useState(false)
    let buttonRef = useRef()

    useEffect(() => {
        const checkUserAuthentication = async () => {
            const hushh_button_user_tkn = await localStorage.getItem('hushh_button_user_tkn')
            if (hushh_button_user_tkn) {
                setHushh_button_user_tkn(hushh_button_user_tkn)
                setUserAuthenticated(true)
                setActiveScreen('share_user_wallet_data')
            }
        }

        checkUserAuthentication()
    }, [hushh_button_user_tkn])

    useEffect(() => {
        let handler = (e) => {
            if (!buttonRef.current?.contains(e.target)) {
                setButtonClicked(false);
            }
        };
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    return (
        <>

            <div className='shadow-lg shadow-slate-300 w-full max-h-[37.5rem] min-w-[25rem] overflow-y-scroll rounded-xl bg-white' ref={buttonRef}>
                <div className="absolute w-full z-10">
                    <ButtonPopupHeader />
                </div>
                {
                    buttonFlowCompleted ?
                        <div className=" py-32 px-10 mt-[4.5rem] text-center font-bold text-lg flex flex-col gap-5">
                            <p>You have already submitted your preferences</p>
                            <div className="font-medium text-base flex gap-2 justify-center">
                                <p>You can modify it by going to the</p><Link href='/user/dashboard' className='font-bold'>Dashboard</Link>
                            </div>
                        </div>
                        :
                        <div className="py-4 px-10 mt-[4.5rem]">
                            {!userAuthenticated && activeScreen === 'welcome' && <WelcomeScreen setIsExistingUser={setIsExistingUser} setActiveScreen={setActiveScreen} />}
                            {
                                !userAuthenticated && isExistingUser === true && activeScreen === 'login' &&
                                < LoginScreen
                                    setActiveScreen={setActiveScreen}
                                    setUserAuthenticated={setUserAuthenticated}
                                />
                            }
                            {
                                !userAuthenticated && isExistingUser === false && activeScreen === 'signup' &&
                                < ButtonSignupScreen
                                    setActiveScreen={setActiveScreen}
                                    setUserAuthenticated={setUserAuthenticated}
                                    setIsExistingUser={setIsExistingUser}
                                />
                            }
                            {
                                userAuthenticated && activeScreen === 'share_user_wallet_data' &&
                                <ButtonShareUserWalletDataScreen
                                    setActiveScreen={setActiveScreen}
                                    hushh_button_user_tkn={hushh_button_user_tkn}
                                    setUserAuthenticated={setUserAuthenticated}
                                />
                            }
                            {
                                userAuthenticated && activeScreen === 'cookies_selection' &&
                                <ButtonCookiesPreferencesInput
                                    hushh_button_user_tkn={hushh_button_user_tkn}
                                    setActiveScreen={setActiveScreen}
                                    setUserAuthenticated={setUserAuthenticated}
                                />
                            }
                            {
                                userAuthenticated && activeScreen === 'what_to_do_today' &&
                                <WhatToDoToday
                                    setButtonClicked={setButtonClicked}
                                    hushh_button_user_tkn={hushh_button_user_tkn}
                                    setUserAuthenticated={setUserAuthenticated}
                                    questions={questionsArray}
                                    setButtonFlowCompleted={setButtonFlowCompleted}
                                />
                            }
                        </div>
                }
            </div>
        </>
    )
}

export default ButtonPopup