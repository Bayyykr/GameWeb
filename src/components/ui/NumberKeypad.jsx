import React from 'react'

function NumberKeypad({ onInput }) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    return (
        <div className="grid grid-cols-3 gap-2">
            {numbers.map(n => (
                <button
                    key={n}
                    className="bg-white border-2 border-slate-200 p-4 rounded-xl text-xl font-bold hover:bg-slate-50"
                    onClick={() => onInput(n)}
                >
                    {n}
                </button>
            ))}
        </div>
    )
}

export default NumberKeypad
