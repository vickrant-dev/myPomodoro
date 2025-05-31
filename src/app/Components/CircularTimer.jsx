import { ChevronDown, Pause, Play, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import TaskChecklist from "./TaskChecklist";
import SettingsPanel from "./SettingsPanel";

export default function CircularTimer({ data }) {

    const [activeMode, setActiveMode] = useState("Classic");
    const [isRunning, setIsRunning] = useState(false);
    const [isBreakTime, setIsBreakTime] = useState(false);
    const [tasksActive, setTasksActive] = useState(false);
    const [settingsModal, setSettingsModal] = useState(false);
    
    const breakPoint = 968;
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakPoint);
    
    const [open, setOpen] = useState(false);

    const modes = ["Long Break", "Short Break", "Classic", "Deepwork", "Zen"];

    const getTimerDuration = (mode) => {
        switch (mode) {
            case "Classic":
                return 25;
            case "Deepwork":
                return 50;
            case "Zen":
                return 15;
            case "Short Break":
                return 5;
            case "Long Break":
                return 15;
            default:
                return 25;
        }
    };

    const [timeLeft, setTimeLeft] = useState(
        getTimerDuration(data.selectedTimer || "Classic") * 60
    );

    useEffect(() => {
        let timerId;

        if (isRunning && timeLeft > 0) {
            timerId = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }

        if (timeLeft === 0 && isRunning) {
            handleTimerEnd();
        }

        return () => clearInterval(timerId);
    }, [isRunning, timeLeft]);

    useEffect(() => {
        const newDuration = getTimerDuration(activeMode);
        setTimeLeft(newDuration * 60);
    }, [activeMode]);

    const handleTimerEnd = () => {
        if (activeMode !== "Short Break" && activeMode !== "Long Break") {
            setActiveMode("Short Break");
            setIsBreakTime(true); 
            // let users change this -- if they want to stop the timer without going to break
        } else {
            setActiveMode("Classic");
            setIsBreakTime(false);
            setIsRunning(false); // Let users change this if they want to auto start after break
        }
    };

    const handleStart = () => {
        setIsRunning((prev) => !prev);
    };

    const handleReset = () => {
        setIsRunning(false);
        const newDuration = getTimerDuration(activeMode);
        setTimeLeft(newDuration * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const radius = 150;
    const stroke = 10;
    const normalizedRadius = radius - stroke * 0.5;
    const circumference = normalizedRadius * 2 * Math.PI;
    const totalDuration = getTimerDuration(activeMode) * 60;
    const strokeDashoffset = circumference - (timeLeft / totalDuration) * circumference;

    const handleCloseModal = () => {
        setTasksActive(false);
    }

    const handleSelectTimerMode = (selectedMode) => {
        setActiveMode(selectedMode);
        setOpen(false);
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < breakPoint);
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <>
            <div className="main-container flex flex-col relative bg-black h-screen overflow-hidden">
                <div
                    className={`user-btns ${
                        tasksActive || settingsModal ? "blur-sm" : "blur-none"
                    } flex items-center justify-end gap-4 pt-7 pr-7 transition-all duration-500 ease-in-out`}
                >
                    <div
                        className="settings"
                        onClick={() => setSettingsModal(true)}
                    >
                        <Settings size={24} className="cursor-pointer" />
                    </div>
                    {/* move theme into settings. */}
                </div>
                <div
                    className={`circular-timer-container ${
                        tasksActive || settingsModal ? "blur-sm" : "blur-none"
                    } flex flex-col items-center justify-center transition-all duration-500 ease-in-out`}
                >
                    <div className="timer-choose mb-10">
                        {!isMobile ? (
                            <ul className="menu menu-horizontal rounded-full font-sans bg-neutral-900 border-2 border-neutral-800/85 gap-2">
                                {modes.map((mode) => (
                                    <li key={mode} className="rounded-full">
                                        <button
                                            onClick={() => setActiveMode(mode)}
                                            className={`rounded-full py-3 px-6 transition-all duration-150 ease-in-out ${
                                                activeMode === mode
                                                    ? "bg-black"
                                                    : ""
                                            }`}
                                        >
                                            {mode}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="dropdown dropdown-start menu menu-horizontal rounded-full font-sans bg-neutral-900 border-2 border-neutral-800/85 gap-2" tabIndex={0}
                            onBlur={() => setOpen(false)}>
                                <div
                                    role="button"
                                    onClick={() => setOpen(!open)}
                                    className="rounded-full bg-black py-3 px-6 transition-all duration-150 ease-in-out cursor-pointer select-none flex items-center gap-2"
                                >
                                    {activeMode} <ChevronDown className="transform translate-y-[1px]" size={17}/>
                                </div>
                                {open && (
                                    <ul
                                        className="dropdown-content menu bg-neutral-900 z-1 w-50 transform rounded-3xl -translate-x-2.5 translate-y-13 transition-all duration-150 ease-in-out gap-1 select-none"
                                    >   
                                        {modes.map((mode, i) => (
                                            <li key={i}>
                                                <a className="rounded-full transition-all duration-150 ease-in-out px-4 hover:bg-neutral-800 select-none"
                                                onClick={() => handleSelectTimerMode(mode)}
                                                >
                                                    {mode}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) }
                            </div>
                        )}
                    </div>
                    <div className="timer-section flex items-center justify-center relative">
                        <svg height={radius * 2} width={radius * 2}>
                            <circle
                                stroke="#525252" // base circle color (slate-400)
                                fill="transparent"
                                strokeWidth={stroke}
                                r={normalizedRadius}
                                cx={radius}
                                cy={radius}
                            />
                            <circle
                                stroke="#e2e8f0" // ring color (blue-600)
                                fill="transparent"
                                strokeWidth={stroke}
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                r={normalizedRadius}
                                cx={radius}
                                cy={radius}
                                strokeLinecap="round"
                                className="transition-all duration-1000 linear rotate-x-180 transform translate-y-75 translate-x-75 rotate-z-90"
                            />
                        </svg>
                        <div className="timer-text absolute text-6xl font-mono">
                            <p>{formatTime(timeLeft)}</p>
                        </div>
                    </div>
                    <div className="timer-controls mt-10 flex items-center justify-center gap-3">
                        <button
                            className="bg-neutral-900 border-2 border-neutral-800/85 hover:bg-neutral-800 transition-all duration-300 ease-in-out active:scale-80 text-base-content p-3 rounded-full cursor-pointer"
                            onClick={handleStart}
                        >
                            {isRunning ? (
                                <Pause size={18} />
                            ) : (
                                <Play size={18} />
                            )}
                        </button>
                        <button
                            className="font-sans bg-neutral-900 border-2 border-neutral-800/85 hover:bg-neutral-800 transition-all duration-300 ease-in-out active:scale-80 text-base-content py-2.25 px-5 rounded-full cursor-pointer"
                            onClick={handleReset}
                        >
                            <span className="flex transform -translate-y-[1px]">
                                Reset
                            </span>
                        </button>
                    </div>
                    <button
                        className="w-[140px] mt-4 font-sans bg-neutral-900 border-2 border-neutral-800/85 hover:bg-neutral-800 transition-all duration-300 ease-in-out active:scale-80 text-base-content py-2.25 px-5 rounded-full cursor-pointer"
                        onClick={() => setTasksActive((prev) => !prev)}
                    >
                        <span className="flex transform -translate-y-[1px] items-center justify-center">
                            View Tasks
                        </span>
                    </button>
                </div>
                <div
                    className={`${
                        tasksActive
                            ? "task-container absolute flex items-center justify-center bg-black/35 filter backdrop-blur-none w-full h-screen z-99 transform translate-x-0"
                            : "task-container absolute flex items-center justify-center filter backdrop-blur-none transform translate-x-[900px] w-full h-screen -z-99 "
                    } transition-all duration-500 ease-in-out`}
                >
                    <TaskChecklist closeModal={handleCloseModal} />
                </div>
                <div
                    className={`settings-container ${
                        settingsModal
                            ? "absolute filter backdrop-blur-none h-screen z-99 transform translate-x-[695px]"
                            : "absolute filter backdrop-blur-none transform translate-x-[1300px] h-screen -z-99 "
                    } transition-all duration-500 ease-in-out`}
                >
                    <SettingsPanel closeModal={() => setSettingsModal(false)} />
                </div>
            </div>
        </>
    );
}