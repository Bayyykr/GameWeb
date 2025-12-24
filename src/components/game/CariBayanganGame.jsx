import React, { useState } from 'react';

export default function CariBayanganGame({ onExit }) {
    const [level, setLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [message, setMessage] = useState('');

    const QUESTIONS = [
        {
            image: "🦁",
            shadows: [
                { id: 1, val: "brightness-0", correct: true }, // Correct shadow
                { id: 2, val: "brightness-0 rotate-90", correct: false },
                { id: 3, val: "brightness-0 scale-x-[-1]", correct: false },
            ]
        },
        {
            image: "🚀",
            shadows: [
                { id: 1, val: "brightness-0 rotate-180", correct: false },
                { id: 2, val: "brightness-0", correct: true },
                { id: 3, val: "brightness-0 rotate-45", correct: false },
            ]
        },
        {
            image: "🐘",
            shadows: [
                { id: 1, val: "brightness-0 scale-y-[-1]", correct: false },
                { id: 2, val: "brightness-0 blur-[2px]", correct: false },
                { id: 3, val: "brightness-0", correct: true },
            ]
        },
        {
            image: "🚗",
            shadows: [
                { id: 1, val: "brightness-0", correct: true },
                { id: 2, val: "brightness-0 scale-x-[-1]", correct: false }, // Mirror
                { id: 3, val: "brightness-0 skew-x-12", correct: false },
            ]
        },
        {
            image: "🦖",
            shadows: [
                { id: 1, val: "brightness-0 rotate-12", correct: false },
                { id: 2, val: "brightness-0 rotate-[-12deg]", correct: false },
                { id: 3, val: "brightness-0", correct: true },
            ]
        },
        // New Levels
        {
            image: "🦋",
            shadows: [
                { id: 1, val: "brightness-0 rotate-45", correct: false },
                { id: 2, val: "brightness-0", correct: true },
                { id: 3, val: "brightness-0 scale-y-[-1]", correct: false },
            ]
        },
        {
            image: "🍦",
            shadows: [
                { id: 1, val: "brightness-0", correct: true },
                { id: 2, val: "brightness-0 scale-x-[-1]", correct: false },
                { id: 3, val: "brightness-0 rotate-180", correct: false },
            ]
        },
        {
            image: "🚲",
            shadows: [
                { id: 1, val: "brightness-0 rotate-[-15deg]", correct: false },
                { id: 2, val: "brightness-0 scale-x-[-1]", correct: false },
                { id: 3, val: "brightness-0", correct: true },
            ]
        },
        {
            image: "🌵",
            shadows: [
                { id: 1, val: "brightness-0", correct: true },
                { id: 2, val: "brightness-0 skew-x-12", correct: false },
                { id: 3, val: "brightness-0 rotate-90", correct: false },
            ]
        },
        {
            image: "👑",
            shadows: [
                { id: 1, val: "brightness-0 rotate-180", correct: false },
                { id: 2, val: "brightness-0 scale-y-[-0.5]", correct: false },
                { id: 3, val: "brightness-0", correct: true },
            ]
        }
    ];

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
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
            setMessage('UPS! COBA LAGI  ');
            setTimeout(() => setMessage(''), 1000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="bg-indigo-950/90 p-8 rounded-[3rem] border-8 border-amber-400 shadow-2xl max-w-4xl w-full relative backdrop-blur-sm flex flex-col items-center">

                {/* Header */}
                <div className="w-full flex justify-between items-center mb-8 bg-indigo-900/50 p-4 rounded-2xl border-2 border-white/10">
                    <button onClick={onExit} className="bg-red-500 text-white px-6 py-2 rounded-xl font-black shadow-[0_4px_0_0_#991b1b] active:translate-y-1 transition-all">
                        KELUAR
                    </button>
                    <div className="text-amber-400 font-black text-2xl uppercase tracking-widest drop-shadow-md">
                        Soal {level + 1}
                    </div>
                </div>

                {!showResult ? (
                    <>
                        <h2 className="text-3xl font-black text-white mb-8 text-center drop-shadow-md">TEMUKAN BAYANGANNYA</h2>

                        <div className="flex flex-col md:flex-row items-center gap-12 w-full justify-center">
                            {/* Main Image */}
                            <div className="w-40 h-40 md:w-56 md:h-56 bg-white/10 rounded-3xl flex items-center justify-center border-4 border-white/20 p-8 shadow-2xl">
                                <span className="text-[8rem] filter drop-shadow-lg">{QUESTIONS[level].image}</span>
                            </div>

                            <div className="text-white text-5xl font-black md:rotate-0 rotate-90">➡️</div>

                            {/* Shadows */}
                            <div className="flex flex-col gap-4">
                                {QUESTIONS[level].shadows.sort(() => Math.random() - 0.5).map((shadow, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(shadow.correct)}
                                        className="w-32 h-32 bg-indigo-800 rounded-2xl flex items-center justify-center hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_0_0_#1e1b4b] border-2 border-indigo-600 group"
                                    >
                                        {/* CSS Filter magic to make emoji black (shadow) */}
                                        <span className={`text-6xl filter ${shadow.val} transition-transform`}>
                                            {QUESTIONS[level].image}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Feedback */}
                        {message && (
                            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
                                <div className={`px-10 py-6 text-4xl font-black text-white rounded-[2rem] shadow-2xl animate-bounce border-8 ${message.includes('BENAR') ? 'bg-emerald-500 border-white' : 'bg-red-500 border-white'}`}>
                                    {message}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center animate-in fade-in zoom-in duration-500">
                        <div className="text-8xl mb-6">🕵️</div>
                        <h2 className="text-5xl font-black text-amber-400 mb-4">MATA ELANG!</h2>
                        <p className="text-white text-2xl font-bold mb-8">Kamu sangat teliti menemukan bayangan!</p>
                        <button onClick={onExit} className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black text-2xl shadow-[0_8px_0_0_#065f46] hover:scale-105 active:translate-y-1 transition-all">
                            SELESAI
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
