import React, { useState } from 'react';

export default function PolaGambarGame({ onExit }) {
    const [level, setLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [message, setMessage] = useState('');

    const QUESTIONS = [
        {
            sequence: ['🍎', '🍌', '🍎', '?'],
            options: ['🍌', '🍎', '🍇'],
            answer: '🍌',
            type: 'A-B-A-B'
        },
        {
            sequence: ['🐶', '🐱', '🐶', '?'],
            options: ['🐶', '🐱', '🦊'],
            answer: '🐱',
            type: 'A-B-A-B'
        },
        {
            sequence: ['☀️', '☁️', '☀️', '?'],
            options: ['🌧️', '☀️', '☁️'],
            answer: '☁️',
            type: 'A-B-A-B'
        },
        {
            sequence: ['🔴', '🔵', '🟢', '🔴', '🔵', '?'],
            options: ['🟢', '🔴', '🟡'],
            answer: '🟢',
            type: 'A-B-C'
        },
        {
            sequence: ['🔺', '🔻', '🔺', '?'],
            options: ['🔻', '🔸', '🔺'],
            answer: '🔻',
            type: 'A-B-A-B'
        },
        // New Levels
        {
            sequence: ['⭐', '🌙', '⭐', '🌙', '?'],
            options: ['⭐', '🌙', '☀️'],
            answer: '⭐',
            type: 'A-B-A-B'
        },
        {
            sequence: ['🚗', '🚲', '🚗', '🚲', '?'],
            options: ['🚲', '✈️', '🚗'],
            answer: '🚗',
            type: 'A-B-A-B'
        },
        {
            sequence: ['🟥', '🟦', '🟥', '🟦', '🟥', '?'],
            options: ['🟦', '🟥', '🟩'],
            answer: '🟦',
            type: 'A-B-A-B'
        },
        {
            sequence: ['🍇', '🍈', '🍉', '🍇', '🍈', '?'],
            options: ['🍉', '🍊', '🍇'],
            answer: '🍉',
            type: 'A-B-C'
        },
        {
            sequence: ['1️⃣', '2️⃣', '1️⃣', '2️⃣', '?'],
            options: ['1️⃣', '2️⃣', '3️⃣'],
            answer: '1️⃣',
            type: 'A-B-A-B'
        }
    ];

    const handleAnswer = (option) => {
        if (option === QUESTIONS[level].answer) {
            setScore(score + 1);
            setMessage('BENAR!');
            setTimeout(() => {
                setMessage('');
                if (level < QUESTIONS.length - 1) {
                    setLevel(level + 1);
                } else {
                    setShowResult(true);
                }
            }, 1000);
        } else {
            setMessage('COBA LAGI!');
            setTimeout(() => setMessage(''), 1000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="bg-indigo-950/90 p-6 md:p-8 rounded-[3rem] border-8 border-amber-400 shadow-2xl max-w-4xl w-full relative backdrop-blur-sm flex flex-col items-center">

                {/* Header */}
                <div className="w-full flex justify-between items-center mb-6 md:mb-8 bg-indigo-900/50 p-4 rounded-2xl border-2 border-white/10">
                    <button onClick={onExit} className="bg-red-500 text-white px-4 md:px-6 py-2 rounded-xl font-black shadow-[0_4px_0_0_#991b1b] active:translate-y-1 transition-all text-sm md:text-base">
                        KELUAR
                    </button>
                    <div className="text-amber-400 font-black text-xl md:text-2xl uppercase tracking-widest drop-shadow-md">
                        Level {level + 1} / {QUESTIONS.length}
                    </div>
                </div>

                {!showResult ? (
                    <>
                        <h2 className="text-2xl md:text-3xl font-black text-white mb-8 text-center drop-shadow-md">LENGKAPI POLA INI</h2>

                        {/* Sequence Display - Fixed Layout */}
                        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12 bg-white/10 p-4 md:p-6 rounded-3xl border-4 border-white/20 w-full min-h-[100px]">
                            {QUESTIONS[level].sequence.map((item, index) => (
                                <div key={index} className="w-12 h-12 md:w-20 md:h-20 bg-indigo-800 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-5xl shadow-inner shadow-black/30 border-2 border-indigo-600">
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-3 gap-4 md:gap-6">
                            {QUESTIONS[level].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(option)}
                                    className="w-16 h-16 md:w-28 md:h-28 bg-amber-400 rounded-2xl flex items-center justify-center text-3xl md:text-6xl shadow-[0_6px_0_0_#92400e] hover:-translate-y-2 hover:bg-amber-300 transition-all active:translate-y-1 active:shadow-none border-t-4 border-white/40"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        {/* Feedback */}
                        {message && (
                            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
                                <div className="bg-indigo-900/90 text-white text-5xl font-black px-12 py-8 rounded-[3rem] border-8 border-white shadow-2xl animate-bounce">
                                    {message}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center animate-in fade-in zoom-in duration-500">
                        <div className="text-8xl mb-6">🏆</div>
                        <h2 className="text-5xl font-black text-amber-400 mb-4">HEBAT!</h2>
                        <p className="text-white text-2xl font-bold mb-8">Kamu berhasil melengkapi semua pola!</p>
                        <button onClick={onExit} className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black text-2xl shadow-[0_8px_0_0_#065f46] hover:scale-105 active:translate-y-1 transition-all">
                            SELESAI
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
