'use client';
import React, { useState } from 'react'
import { Modal } from '../../_components/brandComponents/Modal'
import { useRouter } from 'next/navigation';
const APIKey = () => {

    const [isModalOpen, setIsModalOpen] = useState(true)
    const [keyGenerated, setKeyGenerated] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')
    const [redirectionMessage, setRedirectionMessage] = useState('')

    const router = useRouter()

    const generateAPIKey = async () => {
        const brand_tkn = localStorage.getItem('brand_tkn')
        console.log(brand_tkn)
        const formDetails = new URLSearchParams({
            "email": brand_tkn
        })
        const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/api/brand/create_Keys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: formDetails
        })
        const response = await res.json()
        console.log(res)
        console.log(response)
        if (response.statsu === 1) {
            setResponseMessage('API Key is Generated Successfully!')
            setRedirectionMessage('Redirecting you to dashboard!')
            localStorage.setItem('api_key', response.apiKey)
            setKeyGenerated(true)
            setTimeout(() => {
                router.push('/brand/dashboard')
            }, 3000)
        } else if (response.statsu === -1) {
            if (response.data === "API key Already Created!") {
                setResponseMessage('API key already created!')
                setRedirectionMessage('Redirecting you to dashboard!')
                setKeyGenerated(true)
                setTimeout(() => {
                    router.push('/brand/dashboard')
                }, 3000)
            } else {
                setResponseMessage('Server error!')
                setRedirectionMessage('Please try again later')
                setKeyGenerated(false)
                setTimeout(() => {
                    router.refresh()
                }, 3000)
            }
        } else {
            setResponseMessage("Brand doesn't exist")
            setRedirectionMessage('Redirecting you to login!')
            setKeyGenerated(true)
            setTimeout(() => {
                router.push('/brand/login')
            }, 3000)
        }
    }

    return (
        <div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {keyGenerated &&
                    <div className="py-36 text-white flex flex-col gap-10">
                        <div className="text-center flex justify-center font-bold text-2xl">
                            <p>{responseMessage}</p>
                        </div>
                        <div className="text-center flex justify-center font-medium text-lg">
                            <p>{redirectionMessage}</p>
                        </div>
                    </div>
                }
                {!keyGenerated &&
                    <div className="py-56">
                        <div className="w-full px-32">
                            <button onClick={generateAPIKey} type="submit" className='w-full bg-gradient-to-r from-gradientColor2 to-gradientColor1 py-5 text-white text-sm font-bold rounded-xl leading-4'>Generate API Key</button>
                        </div>
                    </div>
                }
            </Modal>
        </div>
    )
}

export default APIKey