'use client';
import components from "./components"
import styles from "../../styles/dashboard.module.css"
import { useEffect } from "react";
export default function Dashboard() {
    let options = [
        {
            'title': 'Gmail',
            'active': true
        },
        {
            'title': 'Google History',
            'active': false
        },
    ]
    let component = new components()

    return (
        <div className={`${styles.dashboard}`}>
            <div className={`${styles.dashboard__container} px-4`}>
                <div className={`${styles.dashboard__heading} manrope fontWeight700 py-4 flex flex-col gap-3`}>
                    <div className={`${styles.heading__title} manrope fontWeight700`}>
                        Welcome to your private data dashboard
                    </div>
                    <div className={`${styles.heading__description} manrope fontWeight400`}>
                        Here, you can see the data that&apos;s been collected about you and how it&apos;s being used. You can also control the data that&apos;s shared with us.
                    </div>
                </div>
                <div className={`${styles.dashboard__options}`}>
                    {
                        options.map((option) => {
                            return (
                                <div key={option.title} className="py-3.5">
                                    {component.dashboardOption(option)}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}