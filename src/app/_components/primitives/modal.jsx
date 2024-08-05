import React from 'react'

export const Modal = ({ isOpen, onClose, children }) => {
    return (
        <div>
            {isOpen ? (
                <div className="w-full h-full fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
                    <div className="bg-black opacity-20 w-full h-full fixed top-0 left-0 right-0 bottom-0 cursor-pointer" onClick={onClose}></div>
                    <div className="relative z-10 bg-white">
                        {children}
                    </div>
                </div>
            ) : null}
        </div>
    )
}
