import SideNav from "../../_components/brandComponents/SideNav";
import Link from "next/link";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex ">
            <div className="w-1/5 bg-[#F9F9F9]">
                <SideNav />
            </div>
            <div className="flex-1">
                <div className="h-[4.5rem] border-b border-[#E4E4E4] px-8 py-4 flex justify-between items-center">
                    <div className="w-[22.5rem] border border-[#AFAFAF] h-full rounded px-3">
                        <input type="text" className="w-full h-full rounded" placeholder="Search" />
                    </div>
                    <div className="flex gap-8 items-center">
                        <div className="">
                            <Link href='#' className="font-medium text-sm text-[#727272]">Help Center</Link>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className=""></div>
                            <div className="text-sm font-medium">Brian F.</div>
                            <div className=""></div>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}