'use client';
import components from "./_components/userComponents/components";
import Link from "next/link";
import { HushhButton } from "hushh-button";


const questionsArray = [
  {
    question: "What are your plans for today?",
    options: ["https://res.cloudinary.com/divcrmitd/image/upload/v1712162988/Hushh%20Button/ov362mshdxl84jq4lqbe.svg",
      "https://res.cloudinary.com/divcrmitd/image/upload/v1712162906/Hushh%20Button/y8laqnqwa9kyygzhsudm.svg",
      "https://res.cloudinary.com/divcrmitd/image/upload/v1712162988/Hushh%20Button/ov362mshdxl84jq4lqbe.svg",
      "https://res.cloudinary.com/divcrmitd/image/upload/v1712162906/Hushh%20Button/y8laqnqwa9kyygzhsudm.svg"
    ],
    answer: ""
  },
  {
    question: "What explains you the best?",
    options: ["User", "Agent", "Brand representative", "Fellow Developer", "Applicant"],
    answer: ""
  },
  {
    question: "What product you want to explore first?",
    options: ["Hushh Button (This very thing :)", "Hushh Wallet App", "Hushh For Students", "Browser Companion", "Vibe Search", "Concierge App", "Valet Chat", "Hushh Developer APIs"],
    answer: ""
  }
];

export default function Home() {
  let component = new components()
  return (
    <div>
      <div className='flex justify-center'>
        <div className="my-5 w-2/5">
          <div className="mt-5 p-4">
            <h1 className='font-bold text-3xl'>Connect your wallet to your app or site</h1>
          </div>
          <h3 className='pt-4 pb-2 pl-4 font-bold text-lg'>New to Hushh?</h3>
          <p className='pt-1 pb-4 pl-4 text-base font-normal'>Get started by integrating the Hushh Wallet Connect SDK into your app or website. Users can then connect their wallets to interact with your brand.</p>
          <button className='my-3 mx-4 bg-buttonColor2 px-4 py-2.5 font-bold text-sm rounded-xl'>Learn More</button>
          <h3 className='pt-4 pb-2 pl-4 font-bold text-lg'>Returning user?</h3>
          <p className='pt-1 pb-4 pl-4 text-base font-normal'>If you&apos;ve already connected your wallet to a brand, you can simply scan the QR code they provide to start interacting with their app or site.</p>
          <div className="p-4 flex">
            <div className="flex flex-col gap-1">
              <h3 className='font-bold text-base'>Scan QR code</h3>
              <p className='font-normal text-sm text-fontColor2'>Scan the QR code with your wallet to connect</p>
            </div>
            <div className="">
              {/* Image */}
            </div>
          </div>
          <div className="py-3 px-4 flex gap-4">
            <Link href='/user/login'>
              <button className='bg-buttonColor px-8 py-2.5 text-white text-sm font-bold rounded-xl'>Login</button>
            </Link>
            <Link href='/user/signup'>
              <button className='bg-buttonColor px-8 py-2.5 text-white text-sm font-bold rounded-xl'>Signup</button>
            </Link>
          </div>
          <div className="py-3 px-4 flex flex-col gap-4">
            <p className="font-bold text-base">Want to get access to Hushh Button SDK and dashboard?</p>
            <Link href='/brand'>
              <button className='bg-buttonColor w-max px-8 py-2.5 text-white text-sm font-bold rounded-xl'>Brand dashboard</button>
            </Link>
          </div>
        </div>
        <HushhButton questions={questionsArray} />
      </div>
    </div>
  );
}
