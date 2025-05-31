"use client";

import { useState } from "react";
import '../globals.css';
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function OnboardingModal({ onComplete }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedGoal, setSelectedGoal] = useState("");
    const [selectedTimer, setSelectedTimer] = useState('classic');

    const steps = [
        {
            title: "What's your focus today?",
            subtitle: "Choose your primary use case",
            content: (
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { id: "Study", name: "Study & Learning", icon: "📚" },
                        { id: "Work", name: "Work & Projects", icon: "💼" },
                        {
                            id: "Writing",
                            name: "Writing & Creative",
                            icon: "✍️",
                        },
                        {
                            id: "Coding",
                            name: "Coding & Development",
                            icon: "💻",
                        },
                    ].map((goal) => (
                        <button
                            key={goal.id}
                            onClick={() => setSelectedGoal(goal.id)}
                            className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                                selectedGoal === goal.id
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                            }`}
                        >
                            <div className="text-3xl mb-3">{goal.icon}</div>
                            <div className="font-medium text-slate-800 dark:text-slate-100">
                                {goal.name}
                            </div>
                        </button>
                    ))}
                </div>
            ),
        },
        {
            title: "Choose your timer style",
            subtitle: "Pick the timing that works best for you",
            content: (
                <div className="space-y-4">
                    {[
                        {
                            id: "classic",
                            name: "Classic Pomodoro",
                            desc: "25 min focus, 5 min break",
                            time: "25/5",
                        },
                        {
                            id: "deepwork",
                            name: "Deep Work",
                            desc: "50 min focus, 10 min break",
                            time: "50/10",
                        },
                        {
                            id: "zen",
                            name: "Zen Mode",
                            desc: "15 min focus, 3 min break",
                            time: "15/3",
                        },
                    ].map((timer) => (
                        <button
                            key={timer.id}
                            onClick={() => setSelectedTimer(timer.id)}
                            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between cursor-pointer ${
                                selectedTimer === timer.id
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                            }`}
                        >
                            <div className="text-left">
                                <div className="font-medium text-slate-800 dark:text-slate-100">
                                    {timer.name}
                                </div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">
                                    {timer.desc}
                                </div>
                            </div>
                            <div className="text-lg font-mono text-blue-600 dark:text-blue-400">
                                {timer.time}
                            </div>
                        </button>
                    ))}
                </div>
            ),
        },
    ];

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete({selectedGoal, selectedTimer});
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const canProceed = () => {
        if (currentStep === 0) return selectedGoal !== "";
        if (currentStep === 1) return selectedTimer !== "";
        return true;
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                {/* Progress bar */}
                <div className="h-1 bg-slate-200 dark:bg-slate-700">
                    <div
                        className="h-full bg-slate-500 rounded-full transition-all duration-750 ease-in-out"
                        style={{
                            width: `${
                                ((currentStep + 1) / steps.length) * 100
                            }%`,
                        }}
                    ></div>
                </div>

                {/* Content */}
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-serif font-light text-slate-800 dark:text-slate-100 mb-2">
                            {steps[currentStep].title}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300">
                            {steps[currentStep].subtitle}
                        </p>
                    </div>

                    <div className="mb-8">{steps[currentStep].content}</div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className="btn bg-slate-700 text-white border-none disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-800 transition-all duration-200"
                        >
                            <ChevronLeft className="mr-[1px]" size={18} />
                            <p className="transform -translate-y-[1px]">Back</p>
                        </button>

                        <div className="flex space-x-2">
                            {steps.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentStep
                                            ? "bg-slate-500 w-6"
                                            : index < currentStep
                                            ? "bg-slate-600"
                                            : "bg-slate-300 dark:bg-slate-600"
                                    }`}
                                ></div>
                            ))}
                        </div>

                        <button
                            onClick={nextStep}
                            disabled={!canProceed()}
                            className="btn bg-blue-700 text-white border-none disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-blue-800 transition-all duration-200"
                        >
                            <p className="transform -translate-y-[1px]">
                                {currentStep === steps.length - 1
                                    ? "Get Started"
                                    : "Next"}
                            </p>
                            <ChevronRight className="ml-[1px]" size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
