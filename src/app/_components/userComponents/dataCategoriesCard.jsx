import React from 'react'
import { assets } from '../../../../public/assets'
import Link from 'next/link'

const DataCategoriesCard = ({ card }) => {
    return (
        <Link href={`/user/dashboard/datacategories/${card.card_id}`} key={card.brand_name}>
            <div className="border border-1 border-borderColour rounded-lg text-base font-bold w-full">
                <div className="flex gap-3 py-6 w-full pl-4">
                    <div className="">
                        {<assets.LockIcon />}
                    </div>
                    <div className="flex-1 text-wrap w-full">
                        {card.brand_name}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default DataCategoriesCard