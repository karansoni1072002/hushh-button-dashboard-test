import React from 'react'
import Link from 'next/link'
import { UsersListInUserAndEvents } from './UsersListInUserAndEvents'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'
const BrandPeopleSection = () => {

    const [activeUserFilter, setActiveUserFilter] = useState('all')
    const [allUsersData, setAllUsersData] = useState([])
    const [usersFound, setUsersFound] = useState(null)
    const router = useRouter()
    // useEffect(() => {

    //     const fetchAllUsers = async () => {
    //         const brand_tkn = localStorage.getItem("brand_tkn")
    //         if (brand_tkn) {
    //             const brand_id = localStorage.getItem('brand_id')
    //             const brand_name = localStorage.getItem('brand_tkn')
    //             const api_key = localStorage.getItem('api_key')
    //             if (!api_key) {
    //                 router.push('/brand/login')
    //             } else {
    //                 const brandDetails = new URLSearchParams({
    //                     "brand": brand_name
    //                 })
    //                 const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/get-alluser-data', {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //                         'Authorization': `Bearer ${api_key}`
    //                     },
    //                     body: brandDetails
    //                 })
    //                 const response = await res.json()
    //                 // console.log(response)
    //                 if (response.status === 1) {
    //                     setAllUsersData(response.data)
    //                     setUsersFound(true)
    //                 } else if (response.status === 0) {
    //                     setUsersFound(false)
    //                 } else if (response.status === -1) {
    //                     toast.error('Something went wrong, please try again later!')
    //                 }
    //             }
    //         } else {
    //             router.push('/brand/login')
    //         }

    //     }

    //     fetchAllUsers()
    // }, [])
    return (
        <div>
            <div className="px-4">
                <div className="py-4 flex justify-between items-center">
                    <p className='text-[32px] font-bold'>People</p>
                    {/* <button className='py-1.5 px-6 h-max text-sm font-medium bg-buttonColor2 rounded-xl'>Filter</button> */}
                </div>
                <div className="flex gap-8 pb-3 text-sm font-bold">
                    <Link href='#'>
                        <div
                            className={`h-full pt-4 pb-3.5 ${activeUserFilter === 'all' ? 'text-fontColor border border-b-4 border-borderColour border-x-0 border-t-0' : 'text-fontColor2'}`}
                            onClick={() => setActiveUserFilter('all')}
                        >
                            <p>
                                All users
                            </p>
                        </div>
                    </Link>
                    <Link href='#'>
                        <div
                            className={`h-full pt-4 pb-3.5 ${activeUserFilter === 'anonymous' ? 'text-fontColor border border-b-4 border-borderColour border-x-0 border-t-0' : 'text-fontColor2'}`}
                            onClick={() => setActiveUserFilter('anonymous')}
                        >
                            <p>Anonymous</p>
                        </div>
                    </Link>
                    <Link href='#'>
                        <div
                            className={`h-full pt-4 pb-3.5 ${activeUserFilter === 'loggedin' ? 'text-fontColor border border-b-4 border-borderColour border-x-0 border-t-0' : 'text-fontColor2'}`}
                            onClick={() => setActiveUserFilter('loggedin')}
                        >
                            <p>Logged in</p>
                        </div>
                    </Link>
                    <Link href='#'>
                        <div
                            className={`h-full pt-4 pb-3.5 ${activeUserFilter === 'emailonly' ? 'text-fontColor border border-b-4 border-borderColour border-x-0 border-t-0' : 'text-fontColor2'}`}
                            onClick={() => setActiveUserFilter('emailonly')}
                        >
                            <p>Email only</p>
                        </div>
                    </Link>
                    <Link href='#'>
                        <div
                            className={`h-full pt-4 pb-3.5 ${activeUserFilter === 'phoneonly' ? 'text-fontColor border border-b-4 border-borderColour border-x-0 border-t-0' : 'text-fontColor2'}`}
                            onClick={() => setActiveUserFilter('phoneonly')}
                        >
                            <p>Phone only</p>
                        </div>
                    </Link>
                </div>
                <div className="py-3">
                    <UsersListInUserAndEvents activeUserFilter={activeUserFilter} allUsersData={allUsersData} usersFound={usersFound} />
                </div>
            </div>
        </div>
    )
}

export default BrandPeopleSection