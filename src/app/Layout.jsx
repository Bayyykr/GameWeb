import React from 'react'
import { Outlet, NavLink, Link } from 'react-router-dom'
import HomeIcon from '../components/svg/icons/HomeIcon'
import magicBg from '../assets/images/magic_bg.jpg'

function Layout() {
    const navLinkClass = ({ isActive }) =>
        `relative hidden sm:block font-extrabold text-lg transition-all hover:scale-105 px-2 ${isActive
            ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
            : 'text-slate-300 hover:text-white'
        }`

    return (
        <div
            className="min-h-screen bg-fixed bg-cover bg-center font-fredoka text-slate-100"
            style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url(${magicBg})` }}
        >
            <nav className="sticky top-4 z-50 max-w-5xl mx-auto px-4">
                <div className="bg-indigo-950/60 backdrop-blur-2xl border-4 border-white/20 rounded-[2rem] shadow-[0_8px_0_0_rgba(0,0,0,0.3)] p-3 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3 group px-2">
                        <div className="bg-gradient-to-b from-amber-300 to-amber-600 p-2.5 rounded-2xl text-indigo-950 group-hover:scale-110 transition-transform shadow-[0_4px_0_0_#92400e] border-2 border-white/40">
                            <HomeIcon />
                        </div>
                        <span className="text-3xl font-black tracking-tighter text-white drop-shadow-[0_4px_0_#1e1b4b]">
                            MAGIC<span className="text-amber-400">EDU</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-6 pr-4">
                        <NavLink to="/profile" className={navLinkClass}>
                            {({ isActive }) => (
                                <>
                                    Profile
                                    {isActive && <div className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>}
                                </>
                            )}
                        </NavLink>
                        <NavLink to="/settings" className={navLinkClass}>
                            {({ isActive }) => (
                                <>
                                    Settings
                                    {isActive && <div className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>}
                                </>
                            )}
                        </NavLink>
                        <button className="bg-gradient-to-b from-green-400 to-green-600 hover:from-green-300 hover:to-green-500 text-white px-8 py-3 rounded-2xl text-lg font-black shadow-[0_6px_0_0_#166534] transition-all active:translate-y-1 active:shadow-none border-t-2 border-white/30 ml-2">
                            MAIN!
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <Outlet />
            </main>

            <footer className="mt-20 bg-indigo-950/90 border-t-8 border-amber-500/20 py-12 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="inline-block bg-white/5 p-8 rounded-[3rem] border-2 border-white/10 mb-8">
                        <h2 className="text-2xl font-black text-amber-400 mb-2">MagicEdu Academy</h2>
                        <p className="text-slate-400 font-bold max-w-md mx-auto">
                            Tempat di mana belajar terasa seperti petualangan sihir yang tak terbatas. Bergabunglah sekarang!
                        </p>
                    </div>
                    <div className="text-slate-500 font-bold text-sm tracking-widest uppercase">
                        &copy; 2025 MagicEdu. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Layout
