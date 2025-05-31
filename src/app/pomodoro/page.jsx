"use client";

import { useEffect, useState } from "react";
import '../globals.css';
import OnboardingModal from "../Components/OnboardingModal";
import CircularTimer from "../Components/CircularTimer";

export default function PomodoroPage() {

    const [userActive, setUserActive] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const checkUser = localStorage.getItem("userexists");
        if (checkUser) {
            setUserActive(true);
            return;
        }
    });

    const handleOnComplete = (data) => {
        setUserActive(true);
        setUserData(data);
    }

    return (
        <>
            {!userActive ? (
                <OnboardingModal onComplete={handleOnComplete}/>
            ) : (
                <div className="focus-dashboard">
                    <CircularTimer data={userData}/>
                </div>
            )}
        </>
    );
}
