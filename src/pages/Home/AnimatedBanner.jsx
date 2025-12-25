import React from 'react'
import wizardMascot from '../../assets/images/wizard_mascot.png'
import magicBg from '../../assets/images/magic_bg.jpg'

function AnimatedBanner() {
    return (
        <div className="relative overflow-hidden rounded-[3.25rem] bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-indigo-800/80 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/10 mt-6 backdrop-blur-md">
            {/* Background Image subtle overlay */}
            <div className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${magicBg})` }}></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
                <div className="flex-1 text-center lg:text-left">
                    <span className="inline-block px-5 py-2 rounded-full bg-amber-400 text-indigo-950 text-xs font-black tracking-widest uppercase mb-5 shadow-[0_4px_0_0_#92400e] border-2 border-white/40">
                        AOC FUN KIDZ
                    </span>
                    <h1 className="text-4xl md:text-[3.25rem] font-black text-white mb-5 leading-[1.1] tracking-tighter drop-shadow-[0_4px_0_#1e1b4b]">
                        BELAJAR SAMBIL <br />
                        <span className="text-amber-400">BERPETUALANG!</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 max-w-lg mb-8 leading-relaxed font-bold drop-shadow-md">
                        Taklukkan angka, pecahkan kata, arungi petualangan! Angkat tongkatmu saatnya buktikan kamulah penyihir terjenius di jagat raya!
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6">
                        <button
                            onClick={() => {
                                document.getElementById('dunia-belajar')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-gradient-to-b from-yellow-300 to-yellow-500 text-indigo-950 px-9 py-3.5 rounded-2xl text-lg font-black shadow-[0_8px_0_0_#92400e] transition-all hover:scale-105 active:translate-y-1 active:shadow-none border-t-2 border-white/50"
                        >
                            AYO MAIN!
                        </button>
                    </div>
                </div>

                <div className="relative flex-shrink-0 group">
                    <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-[60px] animate-pulse group-hover:bg-amber-400/40 transition-colors"></div>
                    <img
                        src={wizardMascot}
                        alt="Wizard Mascot"
                        className="w-56 md:w-80 relative z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] animate-magic-float"
                    />
                </div>
            </div>
        </div>
    )
}

export default AnimatedBanner
