'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
export const WalletCardPrimitive = ({ answers }) => {
    console.log(answers)
    const [linkItIs, setLinkItIs] = useState(false)
    useEffect(() => {
        const checkIfLink = () => {
            const str = answers[0].slice(0, 6);
            if (str === "https:") {
                setLinkItIs(true)
            }
        }

        checkIfLink()
    })

    return (
        <div>
            {
                answers && answers.map((answer, index) => {
                    return (
                        <div className="border border-x-0 border-t-0 py-4" key={index}>
                            <div className="text-lg">
                                {
                                    linkItIs === true ?
                                        (
                                            <Image src={answer} width={100} height={100} alt='answer' />
                                        ) : (
                                            <p>{answer}</p>
                                        )
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
