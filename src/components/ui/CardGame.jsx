import React from 'react'

function CardGame({ title, description, image }) {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-slate-100">
            <div className="h-40 bg-slate-200"></div>
            <div className="p-4">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-slate-600 text-sm">{description}</p>
            </div>
        </div>
    )
}

export default CardGame
