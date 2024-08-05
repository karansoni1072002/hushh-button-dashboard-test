import React from 'react'

const BrandSignupDetailsScreen = () => {
    return (
        <div><div className="">
            <form action="" onSubmit={brandFormSubmitHandler} className='flex flex-col gap-2'>

                {/* Brand Name */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="email" className='text-base leading-4'>Brand Name</label>
                    <input
                        type="text"
                        name="brandName"
                        id="brandName"
                        onChange={handleInputs}
                        className={` bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal ${formErrors.email ? 'border border-red-500' : ''}`}
                        placeholder='Hushh'
                        autoComplete='off'
                    // required
                    />
                    <p className='text-sm text-red-500'>{formErrors.brandName}</p>
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="email" className='text-base leading-4'>Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={handleInputs}
                        className={` bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal ${formErrors.email ? 'border border-red-500' : ''}`}
                        placeholder='you@example.com'
                        autoComplete='off'
                    // required
                    />
                    <p className='text-sm text-red-500'>{formErrors.email}</p>
                </div>

                {/* Category input */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="password" className='font-medium text-base'>Category</label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        onChange={handleInputs}
                        className={` bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal ${formErrors.password ? 'border border-red-500' : ''}`}
                        placeholder="Ex: Luxury"
                        autoComplete='off'
                    // required
                    />
                    <p className='text-sm text-red-500'>{formErrors.category}</p>
                </div>

                {/* Password input */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="password" className='font-medium text-base'>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleInputs}
                        className={` bg-signipPopupBG bg-opacity-80 border border-borderColour p-4 text-white rounded-xl leading-[14px] placeholder:text-placeholderText placeholder:text-base placeholder:font-normal ${formErrors.password ? 'border border-red-500' : ''}`}
                        placeholder="Create a password"
                        autoComplete='off'
                    // required
                    />
                    <p className='text-sm text-red-500'>{formErrors.password}</p>
                </div>

                {/* submit button */}
                <div className="w-full">
                    <button type="submit" className='w-full bg-gradient-to-r from-gradientColor2 to-gradientColor1 py-4 text-white text-sm font-bold rounded-xl leading-4'>Create account</button>
                </div>

            </form>
        </div></div>
    )
}

export default BrandSignupDetailsScreen