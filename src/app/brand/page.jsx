import React from 'react'
import Link from 'next/link'

const BrandMainPage = () => {
    return (
        <div>
            <div>
                <div className='flex justify-center'>
                    <div className="my-5 w-2/5">
                        <div className="mt-5 p-4">
                            <h1 className='font-bold text-3xl'>Welcome to Hushh Button</h1>
                        </div>
                        <h3 className='pt-4 pb-2 pl-4 font-bold text-lg'>New to Hushh Button?</h3>
                        <p className='pt-1 pb-4 pl-4 text-base font-normal'>Get started by integrating the Hushh Wallet Connect SDK into your app or website. Users can then connect their wallets to interact with your brand.</p>
                        <Link href='/brand/signup'>
                            <button className='bg-buttonColor my-3 mx-4 px-8 py-2.5 text-white text-sm font-bold rounded-xl'>Signup</button>
                        </Link>
                        <h3 className='pt-4 pb-2 pl-4 font-bold text-lg'>Returning user?</h3>
                        <p className='pt-1 pb-4 pl-4 text-base font-normal'>If you&apos;ve already connected your wallet to a brand, you can simply scan the QR code they provide to start interacting with their app or site.</p>
                        <div className="py-3 px-4 flex gap-4">
                            <Link href='/brand/login'>
                                <button className='bg-buttonColor px-8 py-2.5 text-white text-sm font-bold rounded-xl'>Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrandMainPage