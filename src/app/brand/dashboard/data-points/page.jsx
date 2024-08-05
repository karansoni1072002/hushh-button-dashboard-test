'use client';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const data = [
    {
        "id": 2,
        "created_at": "2024-07-11T12:00:55.207077+00:00",
        "data_point_title": "Company Size",
        "data_point_desc": "The size of a company in terms of the number of employees or annual revenue"
    },
    {
        "id": 3,
        "created_at": "2024-07-11T12:00:55.207077+00:00",
        "data_point_title": "Company Size",
        "data_point_desc": "The size of a company in terms of the number of employees or annual revenue"
    },
    {
        "id": 4,
        "created_at": "2024-07-11T12:00:55.207077+00:00",
        "data_point_title": "Company Size",
        "data_point_desc": "The size of a company in terms of the number of employees or annual revenue"
    },
    {
        "id": 5,
        "created_at": "2024-07-11T12:00:55.207077+00:00",
        "data_point_title": "Company Size",
        "data_point_desc": "The size of a company in terms of the number of employees or annual revenue"
    },
]

const DataPoints = () => {

    const [activeSection, setActiveSection] = useState('SelectDataPoints')

    // Data Points Section
    const [dataPoints, setDataPoints] = useState([])

    useEffect(() => {
        const getDataPoints = async () => {

            const postData = new URLSearchParams({})

            const res = await fetch('https://hushhdevenv.hushh.ai/button-Admin/v1/admin/get-all-data-points', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: postData
            })

            // console.log(res)
            if (res.status === 200) {
                if (res.ok) {
                    const response = await res.json()
                    // console.log(response.dataPoints)
                    setDataPoints(response.dataPoints)
                }
            }
        }

        getDataPoints()
    }, [])


    const [selectedDataPoints, setSelectedDataPoints] = useState([]);
    const handleDataPointClick = (id) => {
        const isSelected = selectedDataPoints.hasOwnProperty(id);
        console.log(isSelected)
        if (isSelected) {

            const newSelectedDataPoints = { ...selectedDataPoints };
            delete newSelectedDataPoints[id];
            setSelectedDataPoints(newSelectedDataPoints);
        } else {

            setSelectedDataPoints({ ...selectedDataPoints, [id]: true });
        }
    };

    const handleSaveDataPoints = async () => {
        const brand_id = localStorage.getItem('brand_id')
        console.log(brand_id)
        console.log(selectedDataPoints)
        const postData = new URLSearchParams({
            "brandID": brand_id,
            "dataPointIds": selectedDataPoints
        })
        const res = await fetch('https://hushhdevenv.hushh.ai/button-Admin/v1/admin/save-data-points', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: postData
        })

        if (res.status === 200) {
            if (res.ok) {
                await getSelectedDataPoints()
                toast.success('Data points saved successfully!')
                setActiveSection('Data Mapping')
            }
        }
    }

    // ========================================================

    // Data Mapping Section
    const [retrievedDataPoints, setRetrievedDataPoints] = useState()


    const getSelectedDataPoints = async () => {

        const brand_id = localStorage.getItem('brand_id')

        const postData = new URLSearchParams({
            "brandID": brand_id
        })

        const res = await fetch('https://hushhdevenv.hushh.ai/button-Admin/v1/admin/get-selected-data-points', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: postData
        })

        if (res.status === 200) {
            if (res.ok) {
                const response = await res.json()
                setRetrievedDataPoints(response.selected_data_Points)
            }
        }
    }


    const selectDataMappingSection = async () => {
        // await getSelectedDataPoints()
        setActiveSection('DataMapping')
    }

    const dataTypes = [
        "Text",
        "Number",
        "Boolean",
        "Date",
        "Time",
        "DateTime",
        "Email",
        "Phone Number",
        "URL",
        "Currency",
        "Percentage",
        "List",
        "File",
        "Image",
        "Address",
    ];

    const contactInformation = [
        "First Name",
        "Last Name",
        "Email Address",
        "Phone Number",
        "Job Title",
        "Company Name",
        "Website URL",
        "Address",
        "City",
        "State/Province",
        "Country",
        "Postal/Zip Code",
        "Other"
    ];

    const [selectedContactInfo, setSelectedContactInfo] = useState('');
    const [customOption, setCustomOption] = useState('');


    // =====================================================================
    // Reward Method Section

    const handleSaveRewardMethod = async () => {
        const postData = new URLSearchParams({
            "brand_id": localStorage.getItem('brand_id'),
            "reward_status": selectedRewardMethod,
            "reward_coins": rewardValue,
            "imageURL": ""
        })

        const res = await fetch('https://hushhdevenv.hushh.ai/button-Admin/v1/admin/set-brand-reward', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: postData
        })

        if (res.status === 200) {
            if (res.ok) {
                toast.success('Reward method saved successfully!')
            }
        }
    }

    const [selectedRewardMethod, setSelectedRewardMethod] = useState('')
    const [rewardValue, setRewardValue] = useState('')

    return (
        <>

            <div className=' flex flex-col gap-12' >
                <div className="flex items-center justify-between border-b border-[#E4E4E4] px-8 ">
                    <div className="flex items-center gap-9">
                        <div className="text-2xl leading-7 font-medium py-5">
                            Data Points
                        </div>
                        <div className="">
                            <button
                                className={`px-4 text-sm font-medium h-full py-6 ${activeSection === 'SelectDataPoints' ? "text-black border-b-2 border-black" : "text-[#727272]"}`}
                                onClick={() => setActiveSection('SelectDataPoints')}
                            >Select Data Points</button>
                            <button
                                className={`px-4 text-sm font-medium h-full py-6 ${activeSection === 'DataMapping' ? "text-black border-b-2 border-black" : "text-[#727272]"}`}
                                onClick={selectDataMappingSection}
                            >Data Mapping</button>
                            <button
                                className={`px-4 text-sm font-medium h-full py-6 ${activeSection === 'RewardMethod' ? "text-black border-b-2 border-black" : "text-[#727272]"}`}
                                onClick={() => setActiveSection('RewardMethod')}
                            >Reward Method</button>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex gap-4 pr-4 border-r border-[#E4E4E4]">
                            <button className='px-3 py-2 text-sm font-medium border border-black rounded'>Sort By</button>
                            <button className='px-3 py-2 text-sm font-medium border border-black rounded'>Filter</button>
                        </div>
                        <div className="pl-4">
                            <button className='px-3 py-2 text-white text-sm font-medium bg-black rounded'>Add Data Point</button>
                        </div>
                    </div>
                </div>
                {activeSection === 'SelectDataPoints' &&
                    <>
                        <div className="flex flex-col gap-5 px-8">
                            <div className="w-[53.75rem] border border-[#AFAFAF] rounded flex items-center gap-3 px-3 py-2.5">
                                <p className='text-sm leading-5 text-[#AFAFAF]'>Search</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="border rounded-xl text-sm leading-5 px-4 py-1.5 w-max border-black">All</div>
                                <div className="border rounded-xl text-sm leading-5 px-4 py-1.5 w-max border-black">Custom</div>
                                <div className="border rounded-xl text-sm leading-5 px-4 py-1.5 w-max border-black">Suggested</div>
                                <div className="border rounded-xl text-sm leading-5 px-4 py-1.5 w-max border-black">Featured</div>
                                <div className="border rounded-xl text-sm leading-5 px-4 py-1.5 w-max border-black">Categories</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 px-8 pb-6">
                            {/* <div className="flex flex-col gap-5">
                                <p className='text-lg font-semibold'>Upload Document</p>
                                <div className="flex flex-col gap-2">
                                    <p className='text-sm font-medium leading-5'>Description</p>
                                    <p className='text-sm leading-5 text-[#727272]'>Monthly Product Discussion by Design and Marketing Teams with CEO to Plan our<br />future products sales and reports</p>
                                </div>
                                <div className="">
                                    <button className='py-2 w-[35rem] border border-black rounded text-sm font-medium leading-5'>+ Upload your file</button>
                                </div>
                            </div> */}
                            <div className="flex flex-col gap-6 w-max">
                                <p>Suggested data points</p>
                                <div className="grid grid-cols-5 gap-3">
                                    {
                                        dataPoints?.map((datapoint) => {
                                            const isSelected = selectedDataPoints.hasOwnProperty(datapoint.id);
                                            // console.log(isSelected)
                                            // console.log(datapoint.id)
                                            return (
                                                <div key={datapoint.id} onClick={() => handleDataPointClick(datapoint.id)} className={`w-[10.375rem] cursor-pointer rounded-lg p-4 flex flex-col gap-3 ${isSelected ? "bg-gradient-to-r from-gradientColor1 to-gradientColor2 text-white shadow shadow-black" : "bg-white border border-[#D1DEE5]"}`}>
                                                    <div className="">

                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <p className='font-semibold leading-5'>{datapoint.data_point_title}</p>
                                                        <p className={`text-sm  ${isSelected ? "text-gray-200" : "text-[#4F7A94]"}`}>{datapoint.data_point_desc}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </div>
                            <div className="">
                                <button onClick={handleSaveDataPoints} className='px-5 py-2.5 bg-buttonColor text-white rounded-lg'>Save</button>
                            </div>
                        </div>
                    </>
                }
                {activeSection === 'DataMapping' &&
                    <div className="mx-8 border rounded-lg border-[#D1DEE5] w-max">
                        <table className='w-max'>
                            <thead>
                                <tr className='flex border-b border-[#E5E8EB]'>
                                    <th className="px-4 py-3 font-medium text-sm text-[#OD171C] w-[11.875rem] text-left flex items-start">Column Header from<br />File</th>
                                    <th className="px-4 py-3 font-medium text-sm text-[#OD171C] w-[13.5rem] text-left flex items-start">Preview Information</th>
                                    <th className="px-4 py-3 font-medium text-sm text-[#OD171C] w-[9.75rem] text-left flex items-start">Mapped</th>
                                    <th className="px-4 py-3 font-medium text-sm text-[#OD171C] w-[11rem] text-left flex items-start">Import As</th>
                                    <th className="px-4 py-3 font-medium text-sm text-[#OD171C] w-[11.875rem] text-left flex items-start">HubSpot Property</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    retrievedDataPoints?.map((dp) => {
                                        return (
                                            <tr key={dp.id} className='h-[4.5rem] flex border-b border-[#E5E8EB]'>
                                                <td className="px-4 font-medium text-sm text-[#4F7A94] w-[11.875rem] text-left flex items-center">{dp.data_point_title}</td>
                                                <td className="px-4 font-medium text-sm text-[#4F7A94] w-[13.5rem] text-left flex items-center">John</td>
                                                <td className="px-4 font-medium text-sm text-[#0D171C] w-[9.75rem] text-left flex items-center">Mapped</td>
                                                <td className="px-4 font-medium text-sm text-[#4F7A94] w-[11rem] text-left flex items-center">
                                                    <select id="dataType" name="dataType">
                                                        {dataTypes.map((type, index) => (
                                                            <option key={index} value={type}>
                                                                {type}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="px-4 font-medium text-sm text-[#4F7A94] w-[11.875rem] text-left flex items-center">
                                                    <div>
                                                        <label htmlFor="contactInfo">Select Contact Information: </label>
                                                        {selectedContactInfo === 'Other' ? (
                                                            <input
                                                                type="text"
                                                                id="contactInfo"
                                                                name="contactInfo"
                                                                value={customOption}
                                                                onChange={(e) => setCustomOption(e.target.value)}
                                                                placeholder="Enter custom option"
                                                            />
                                                        ) : (
                                                            <select id="contactInfo" name="contactInfo" value={selectedContactInfo} onChange={(e) => setSelectedContactInfo(e.target.value)}>
                                                                {contactInformation.map((info, index) => (
                                                                    <option key={index} value={info}>
                                                                        {info}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                }
                {
                    activeSection === 'RewardMethod' && 
                    <div className='px-8 py-6 flex flex-col gap-10'>
                        <div className="flex flex-col gap-2">
                            <p className='text-2xl leading-7 font-medium'>Customize Rewards</p>
                            <p className='text-sm text-[#4F7A94]'>Decide how you want to reward your customers for their feedback</p>
                        </div>
                        <div className="text-lg font-bold text-[#0D171C]">
                            How would you like to reward your customers?
                        </div>
                        <div className="w-[58rem] flex flex-col gap-3">
                            <div className="flex gap-4 py-4 px-4 items-center border rounded-xl border-[#D1DEE5]">
                                <div className="flex items-center">
                                    <input type="radio" name="reward_method" id="" className='w-5 h-5' />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className='text-sm font-medium'>Hushh Coins</p>
                                    <p className='text-sm text-[#4F7A94]'>Reward users with Hushh Coins. Easily set up amount for the reward.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 py-4 px-4 items-center border rounded-xl border-[#D1DEE5]">
                                <div className="flex items-center">
                                    <input type="radio" name="reward_method" id="" className='w-5 h-5' />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className='text-sm font-medium'>Loyalty Program</p>
                                    <p className='text-sm text-[#4F7A94]'>Reward users with loyalty points, making use of your existing Loyalty Program.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 py-4 px-4 items-center border rounded-xl border-[#D1DEE5]">
                                <div className="flex items-center">
                                    <input type="radio" name="reward_method" id="" className='w-5 h-5' />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className='text-sm font-medium'>Coupons</p>
                                    <p className='text-sm text-[#4F7A94]'>Reward users with Coupons that they can use to get benefits.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 py-4 px-4 items-center border rounded-xl border-[#D1DEE5]">
                                <div className="flex items-center">
                                    <input type="radio" name="reward_method" id="" className='w-5 h-5' />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className='text-sm font-medium'>Custom Reward</p>
                                    <p className='text-sm text-[#4F7A94]'>Reward users with some custom thing of your choice.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="px-4 text-lg font-bold">
                                Set up your reward
                            </div>
                            <div className="">
                                <div className="flex gap-7">
                                    <div className="px-4 py-3 w-[30rem] flex flex-col gap-2">
                                        <label htmlFor="">Reward amount</label>
                                        <input type="text" placeholder='$10' className='p-4 bg-[#F7FAFA] border border-[#D1DEE5] rounded-xl text-base w-full' />
                                    </div>
                                    <div className="px-4 py-3 w-[30rem] flex flex-col gap-2">
                                        <label htmlFor="">Hushh Coins</label>
                                        <input type="text" placeholder='100' className='p-4 bg-[#F7FAFA] border border-[#D1DEE5] rounded-xl text-base w-full' />
                                    </div>
                                </div>
                                <div className="flex gap-7 items-end">
                                    <div className="px-4 py-3 w-[30rem] flex flex-col gap-2">
                                        <label htmlFor="">Reward description</label>
                                        <input type="text" placeholder='$10  off any purchase' className='p-4 bg-[#F7FAFA] border border-[#D1DEE5] rounded-xl text-base w-full' />
                                    </div>
                                    <div className="px-4 py-6 flex flex-col gap-2">
                                        <button className='py-2.5 px-4 text-sm font-bold text-[#0D171C] bg-[#E8EDF2] rounded-xl'>Upload an image</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div >

        </>
    )
}

export default DataPoints