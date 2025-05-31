"use client";

import { useState } from "react";
import '../globals.css';
import { Minus, Plus, X } from "lucide-react";

export default function SettingsPanel({ closeModal }) {

    const [activeNav, setActiveNav] = useState("Themes");
    const [activePreset, setActivePreset] = useState("Classic");
    const nav = ["Themes", "Animated Themes", "Pomodoro Settings", "Sounds"];
    const presets = ["Classic", "Deepwork", "Zen"];

    const handleNavChange = (navItem) => {
        setActiveNav(navItem);
    }

    // 47px is the gap from right to be padded
    return (
        <>
            <div className="main-container flex w-[700px] pr-[47px] bg-neutral-900 rounded-3xl border-2 border-neutral-800">
                <div className="left-nav w-[225px] border-r-2 border-r-neutral-800">
                    <div className="nav-header p-5 border-b-2 border-neutral-800">
                        <p className="text-lg font-semibold">Categories</p>
                    </div>
                    <ul className="flex flex-col">
                        {nav.map((navItem, index) => (
                            <li
                                className={`transition-all duration-150 ease-in-out cursor-pointer hover:bg-neutral-800 px-5 py-3 ${
                                    navItem === activeNav
                                        ? "bg-neutral-700 border-neutral-200 border-s-3"
                                        : "bg-neutral-900"
                                }`}
                                key={index}
                                onClick={() => handleNavChange(navItem)}
                            >
                                {navItem}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="right-content w-[475px]">
                    <div className="nav-header p-5 relative border-b-2 border-neutral-800 flex">
                        {nav.map((navItem, index) => (
                            <p key={index} className="text-lg font-semibold">
                                {navItem === activeNav ? navItem : ""}
                            </p>
                        ))}
                        <X
                            size={22}
                            onClick={() => closeModal(false)}
                            className="cursor-pointer absolute top-0 right-0 transform translate-y-5.75 -translate-x-5"
                        />
                    </div>
                    <div className="content">
                        {activeNav === "Pomodoro Settings" && (
                            <>
                                <div className="section p-5 pt-3">
                                    <p className="text-md text-neutral-500">
                                        Customize the Pomodoro Technique time
                                        intervals to suit your preferences.
                                    </p>
                                    <div className="tab-chooser flex items-center gap-3 mt-5">
                                        <ul className="menu menu-horizontal rounded-2xl font-sans bg-neutral-900 border-2 border-neutral-800/85 gap-2">
                                            {presets.map((preset, index) => (
                                                <li
                                                    key={preset + index}
                                                    className="rounded-xl"
                                                >
                                                    <button
                                                        className={`rounded-xl py-3 px-6 transition-all duration-150 ease-in-out ${
                                                            activePreset ===
                                                            preset
                                                                ? "bg-neutral-800"
                                                                : ""
                                                        }`}
                                                        onClick={() =>
                                                            setActivePreset(
                                                                preset
                                                            )
                                                        }
                                                    >
                                                        {preset}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="tab-info mt-3 border border-neutral-700 bg-neutral-800 p-4 rounded-xl flex flex-col">
                                        <div className="header">
                                            <p className="text-neutral-200 pb-5">
                                                Time Intervals
                                            </p>
                                        </div>
                                        <div className="time-input-change flex flex-col gap-4">
                                            <label>
                                                <p className="text-sm mb-3 text-neutral-400">
                                                    Focus time (default 25
                                                    minutes)
                                                </p>
                                                <div className="input-sec flex items-center">
                                                    <div className="reduce mr-1 bg-neutral-900 py-2.5 px-2.5 rounded-lg cursor-pointer hover:bg-neutral-700 transition-all duration-200 ease-in-out">
                                                        <Minus size={18} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="w-full border border-neutral-700 ring-none outline-none py-1 rounded-lg ml-1 px-2.5 text-center pb-2 select-none"
                                                        value={25}
                                                        readOnly
                                                    />
                                                    <div className="increase ml-1 bg-neutral-900 py-2.5 px-2.5 rounded-lg cursor-pointer hover:bg-neutral-700 transition-all duration-200 ease-in-out">
                                                        <Plus size={18} />
                                                    </div>
                                                </div>
                                            </label>
                                            <label>
                                                <p className="text-sm mb-3 text-neutral-400">
                                                    Short Break (default 5
                                                    minutes)
                                                </p>
                                                <div className="input-sec flex items-center">
                                                    <div className="reduce mr-1 bg-neutral-900 py-2.5 px-2.5 rounded-lg cursor-pointer hover:bg-neutral-700 transition-all duration-200 ease-in-out">
                                                        <Minus size={18} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="w-full border border-neutral-700 ring-none outline-none py-1 rounded-lg ml-1 px-2.5 text-center pb-2 select-none"
                                                        value={5}
                                                        readOnly
                                                    />
                                                    <div className="increase ml-1 bg-neutral-900 py-2.5 px-2.5 rounded-lg cursor-pointer hover:bg-neutral-700 transition-all duration-200 ease-in-out">
                                                        <Plus size={18} />
                                                    </div>
                                                </div>
                                            </label>
                                            <label>
                                                <p className="text-sm mb-3 text-neutral-400">
                                                    Long Break (default 15
                                                    minutes)
                                                </p>
                                                <div className="input-sec flex items-center">
                                                    <div className="reduce mr-1 bg-neutral-900 py-2.5 px-2.5 rounded-lg cursor-pointer hover:bg-neutral-700 transition-all duration-200 ease-in-out">
                                                        <Minus size={18} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="w-full border border-neutral-700 ring-none outline-none py-1 rounded-lg ml-1 px-2.5 text-center pb-2 select-none"
                                                        value={15}
                                                        readOnly
                                                    />
                                                    <div className="increase ml-1 bg-neutral-900 py-2.5 px-2.5 rounded-lg cursor-pointer hover:bg-neutral-700 transition-all duration-200 ease-in-out">
                                                        <Plus size={18} />
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );

}