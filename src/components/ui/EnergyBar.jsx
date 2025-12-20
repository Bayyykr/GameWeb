import React from 'react'

function EnergyBar({ value, max }) {
    const percentage = (value / max) * 100
    return (
        <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
            <div
                className="bg-yellow-400 h-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    )
}

export default EnergyBar
