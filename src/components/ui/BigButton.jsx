import React from 'react'

function BigButton({ children, onClick }) {
    return (
        <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-2xl transform active:scale-95 transition-all shadow-lg"
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default BigButton
