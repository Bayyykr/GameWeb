import React from 'react';
import { createPortal } from 'react-dom';

const SinglePlayerIcon = () => (
    <svg viewBox="0 0 24 24" className="w-20 h-20 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="singleIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#22d3ee' }} />
                <stop offset="100%" style={{ stopColor: '#2563eb' }} />
            </linearGradient>
        </defs>
        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="url(#singleIconGrad)" />
        <path d="M12 2C10.89 2 10 2.89 10 4H14C14 2.89 13.11 2 12 2Z" fill="#fbbf24" stroke="#92400e" strokeWidth="0.5" />
    </svg>
);

const MultiplayerIcon = () => (
    <svg viewBox="0 0 24 24" className="w-20 h-20 drop-shadow-[0_0_8px_rgba(192,38,211,0.6)]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="multiIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#c026d3' }} />
                <stop offset="100%" style={{ stopColor: '#db2777' }} />
            </linearGradient>
        </defs>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="url(#multiIconGrad)" />
        <path d="M12 16.5l-2-1 0.5-2 3 1-0.5 1.5-1 0.5z" fill="#facc15" stroke="#854d0e" strokeWidth="0.5" transform="rotate(20 12 15)" />
    </svg>
);

export default function ModeSelectionModal({ onSelect, onClose }) {
    const modalContent = (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl z-[99999] p-4">
            <div className="bg-indigo-950 rounded-[3rem] p-10 shadow-[0_20px_0_0_rgba(0,0,0,0.4)] border-8 border-amber-400 max-w-lg w-full relative animate-scale-in">
                {/* Decorative Elements */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-400 text-indigo-950 px-8 py-2 rounded-2xl font-black text-xl shadow-lg border-4 border-white/30 uppercase tracking-widest whitespace-nowrap">
                    Pilih Mode
                </div>

                <div className="flex flex-col gap-6 mt-4">
                    <button
                        className="group relative bg-indigo-900 border-4 border-white/10 p-6 rounded-[2rem] flex items-center gap-6 transition-all hover:bg-indigo-800 hover:-translate-y-1 active:translate-y-1"
                        onClick={() => onSelect('single')}
                    >
                        <div className="p-1 rounded-2xl bg-indigo-950/50 border border-white/5 shadow-inner group-hover:scale-110 transition-transform">
                            <SinglePlayerIcon />
                        </div>
                        <div className="text-left">
                            <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight">Single Player</h3>
                            <p className="text-indigo-300 font-bold text-sm leading-tight">Bertarung sendirian melawan para monster!</p>
                        </div>
                    </button>

                    <button
                        className="group relative bg-indigo-900 border-4 border-white/10 p-6 rounded-[2rem] flex items-center gap-6 transition-all hover:bg-indigo-800 hover:-translate-y-1 active:translate-y-1"
                        onClick={() => onSelect('multiplayer')}
                    >
                        <div className="p-1 rounded-2xl bg-indigo-950/50 border border-white/5 shadow-inner group-hover:scale-110 transition-transform">
                            <MultiplayerIcon />
                        </div>
                        <div className="text-left">
                            <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight">Multiplayer</h3>
                            <p className="text-indigo-300 font-bold text-sm leading-tight">Uji ketangkasanmu bersama teman!</p>
                        </div>
                    </button>

                    <button
                        className="mt-4 bg-red-500 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-[0_6px_0_0_#991b1b] hover:bg-red-600 active:translate-y-1 active:shadow-none transition-all border-t-2 border-white/30 uppercase tracking-widest"
                        onClick={onClose}
                    >
                        BATAL
                    </button>
                </div>

                <style>{`
                    @keyframes scale-in {
                        0% { transform: scale(0.9); opacity: 0; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                    .animate-scale-in {
                        animation: scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                    }
                `}</style>
            </div>
        </div>
    );

    // Return using portal to ensure it's at the top level
    if (typeof document !== 'undefined') {
        return createPortal(modalContent, document.body);
    }
    return null;
}
