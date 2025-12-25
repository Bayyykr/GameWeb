import React, { useState, useEffect, useRef } from 'react';

export default function KetukCepatGame({ onExit }) {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(180);
    const [gameActive, setGameActive] = useState(false);
    const [activeHole, setActiveHole] = useState(null);
    const [monsterIdx, setMonsterIdx] = useState(0);
    const timerRef = useRef(null);
    const monsterTimerRef = useRef(null);

    const MONSTERS = ['👾', '👹', '👺', '👻', '👽', '🤖'];

    const startGame = () => {
        setScore(0);
        setTimeLeft(180);
        setGameActive(true);
        setMonsterIdx(Math.floor(Math.random() * MONSTERS.length));
        nextLife();
    };

    const nextLife = () => {
        if (!gameActive && score > 0) return;

        const randomHole = Math.floor(Math.random() * 9);
        setActiveHole(randomHole);
        setMonsterIdx(Math.floor(Math.random() * MONSTERS.length));

        // Duration the monster stays up
        const duration = Math.max(400, 1200 - (score * 30));

        if (monsterTimerRef.current) clearTimeout(monsterTimerRef.current);
        monsterTimerRef.current = setTimeout(() => {
            setActiveHole(null);
            // Small delay before next monster
            setTimeout(nextLife, Math.random() * 500 + 200);
        }, duration);
    };

    useEffect(() => {
        if (gameActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setGameActive(false);
            setActiveHole(null);
            if (timerRef.current) clearInterval(timerRef.current);
            if (monsterTimerRef.current) clearTimeout(monsterTimerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (monsterTimerRef.current) clearTimeout(monsterTimerRef.current);
        };
    }, [gameActive, timeLeft]);

    const handleTap = (index) => {
        if (index === activeHole) {
            setScore(prev => prev + 1);
            setActiveHole(null);
            if (monsterTimerRef.current) clearTimeout(monsterTimerRef.current);
            setTimeout(nextLife, 100);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-4 w-full pt-4 md:pt-8">
            <div className="bg-indigo-950/90 p-4 md:p-6 rounded-[2.5rem] border-8 border-amber-400 shadow-2xl max-w-lg w-full relative backdrop-blur-sm flex flex-col items-center">

                {/* Header */}
                <div className="w-full flex justify-between items-center mb-6 bg-indigo-900/50 p-4 rounded-2xl border-2 border-white/10">
                    <button onClick={onExit} className="bg-red-500 text-white px-6 py-2 rounded-xl font-black shadow-[0_4px_0_0_#991b1b] active:translate-y-1 transition-all">
                        KELUAR
                    </button>
                    <div className="flex gap-4">
                        <div className="text-amber-400 font-black text-2xl uppercase tracking-widest">
                            💥 {score}
                        </div>
                        <div className="text-white font-black text-2xl uppercase tracking-widest">
                            ⏳ {timeLeft}s
                        </div>
                    </div>
                </div>

                {/* Game Grid */}
                <div className="grid grid-cols-3 gap-3 md:gap-4 bg-indigo-900/40 p-4 rounded-[1.5rem] border-4 border-white/10 w-full aspect-square relative overflow-hidden">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="relative aspect-square">
                            {/* Hole */}
                            <div className="absolute inset-0 bg-black/60 rounded-full border-t-4 border-black shadow-inner"></div>
                            {/* Monster */}
                            <button
                                onClick={() => handleTap(i)}
                                className={`absolute inset-0 flex items-center justify-center text-4xl md:text-6xl transition-all duration-150 transform
                                    ${activeHole === i ? 'translate-y-0 opacity-100 scale-100 cursor-pointer' : 'translate-y-12 opacity-0 scale-50 pointer-events-none'}`}
                            >
                                <span className="hover:scale-110 active:scale-90 transition-transform">{MONSTERS[monsterIdx]}</span>
                            </button>
                        </div>
                    ))}

                    {!gameActive && timeLeft === 180 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 backdrop-blur-sm">
                            <h2 className="text-4xl font-black text-white mb-6 drop-shadow-lg text-center">KETUK MONSTER CEPAT!</h2>
                            <button onClick={startGame} className="bg-amber-400 text-indigo-950 px-10 py-4 rounded-3xl font-black text-3xl shadow-[0_8px_0_0_#92400e] hover:scale-105 active:translate-y-2 transition-all">
                                MULAI!
                            </button>
                        </div>
                    )}

                    {!gameActive && timeLeft === 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-indigo-950/80">
                            <div className="text-6xl mb-4">🍄</div>
                            <h2 className="text-4xl font-black text-amber-400 mb-2">SELESAI!</h2>
                            <p className="text-white text-2xl font-bold mb-8">Skor Kamu: {score}</p>
                            <button onClick={startGame} className="bg-amber-400 text-indigo-950 px-10 py-4 rounded-2xl font-black text-2xl shadow-[0_8px_0_0_#92400e] hover:scale-105 active:translate-y-1 transition-all">
                                MAIN LAGI
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-indigo-300 font-bold uppercase tracking-widest text-center pb-4 text-xs md:text-sm">
                    Ketuk monster sebelum mereka masuk kembali!
                </div>
            </div>
        </div>
    );
}
