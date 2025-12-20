import React from 'react'
import { Link } from 'react-router-dom'

function CategoryCard({ title, description, category, color, icon: Icon }) {
    const colorClasses = {
        blue: 'bg-blue-500 border-blue-700 shadow-[0_8px_0_0_#1e40af] hover:shadow-[0_12px_0_0_#1e40af]',
        purple: 'bg-indigo-600 border-indigo-800 shadow-[0_8px_0_0_#312e81] hover:shadow-[0_12px_0_0_#312e81]',
        amber: 'bg-amber-500 border-amber-700 shadow-[0_8px_0_0_#b45309] hover:shadow-[0_12px_0_0_#b45309]',
        rose: 'bg-rose-500 border-rose-700 shadow-[0_8px_0_0_#9f1239] hover:shadow-[0_12px_0_0_#9f1239]',
    }

    return (
        <Link
            to={`/category/${category}`}
            className={`group relative p-8 rounded-[2.5rem] ${colorClasses[color]} border-t-2 border-white/20 transition-all duration-200 hover:-translate-y-1 active:translate-y-2 active:shadow-none flex flex-col items-center text-center overflow-hidden`}
        >
            {/* Glossy Overlay */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 pointer-events-none rounded-t-[2.5rem]"></div>

            <div className="relative z-10 p-5 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/30 text-white mb-6 group-hover:scale-110 transition-transform shadow-xl">
                {Icon ? <Icon size={48} /> : <div className="w-12 h-12 flex items-center justify-center font-black text-4xl drop-shadow-lg">⚡</div>}
            </div>

            <div className="flex-grow flex flex-col items-center">
                <h3 className="relative z-10 text-2xl font-black text-white mb-2 tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                    {title}
                </h3>
                <p className="relative z-10 text-white/90 text-sm leading-relaxed font-bold drop-shadow-sm px-2">
                    {description}
                </p>
            </div>

            <div className="relative z-10 mt-8 bg-white text-indigo-900 px-6 py-2 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg transform group-hover:rotate-3 transition-transform">
                MULAI MAIN
            </div>

            {/* Corner Rank/Icon */}
            <div className="absolute top-4 right-4 bg-yellow-400 text-indigo-900 w-10 h-10 rounded-full flex items-center justify-center font-black border-2 border-white shadow-md text-xs group-hover:animate-bounce">
                LV1
            </div>
        </Link>
    )
}

export default CategoryCard
