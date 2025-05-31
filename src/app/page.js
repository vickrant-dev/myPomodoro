import { Moon } from "lucide-react";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <div>
                <section className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center justify-center text-center px-6">
                    <h1 className="text-5xl md:text-6xl font-serif text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight mb-4">
                        FlowForge
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 mb-8">
                        Forge your focus. Stay in flow.
                    </p>
                    <button className="btn btn-lg rounded-full px-8 py-3 bg-neutral-900 text-white hover:bg-neutral-700 transition-all duration-500 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Get Started
                    </button>

                    <div className="absolute top-6 right-6">
                        <label className="swap swap-rotate">
                            <Moon size={22}/>
                        </label>
                    </div>
                </section>
            </div>
        </>
    );
}
