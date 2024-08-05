import React from 'react'

export const PurchaseCardPrimitive = ({ cards }) => {
    return (
        <div>
            {
                cards && cards.map((card, index) => {
                    return (
                        <div className="border border-x-0 border-t-0 py-4" key={index}>
                            <div className="">
                                <p>{card.question}</p>
                            </div>
                            <div className="">
                                <p>{card.answer}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
