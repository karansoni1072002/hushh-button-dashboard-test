
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "./_utilities/toast";
import { Manrope } from "next/font/google"
import "react-toastify/dist/ReactToastify.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-manrope'
})
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hushh Button",
  description: "Hushh Button | hushh.ai",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={`${manrope.variable} font-sans manrope`}>
      <body>
        {children}
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}
