import React, { useState, useEffect, useRef } from 'react';

export default function TangkapBintangGame({ onExit }) {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(180);
    const [gameActive, setGameActive] = useState(false);
    const [stars, setStars] = useState([]);
    const gameAreaRef = useRef(null);
    const starIdRef = useRef(0);

    // Game Timer
    useEffect(() => {
        let timer;
        if (gameActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setGameActive(false);
        }
        return () => clearInterval(timer);
    }, [gameActive, timeLeft]);

    // Star Generator
    useEffect(() => {
        let generator;
        if (gameActive) {
            generator = setInterval(() => {
                const newStar = {
                    id: starIdRef.current++,
                    left: Math.random() * 80 + 10, // 10% to 90%
                    top: -50,
                    speed: Math.random() * 2 + 1 + (score / 20), // Speed up with score
                };
                setStars(prev => [...prev, newStar]);
            }, Math.max(400, 1000 - (score * 20))); // Frequency increases
        }
        return () => clearInterval(generator);
    }, [gameActive, score]);

    // Animation Loop
    useEffect(() => {
        let frame;
        if (gameActive) {
            const update = () => {
                setStars(prev =>
                    prev
                        .map(star => ({ ...star, top: star.top + star.speed }))
                        .filter(star => star.top < 600) // Remove if off bottom
                );
                frame = requestAnimationFrame(update);
            };
            frame = requestAnimationFrame(update);
        }
        return () => cancelAnimationFrame(frame);
    }, [gameActive]);

    const handleCatch = (id) => {
        setScore(prev => prev + 1);
        setStars(prev => prev.filter(star => star.id !== id));
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(180);
        setStars([]);
        setGameActive(true);
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-4 w-full pt-4 md:pt-8">
            <div className="bg-indigo-950/90 p-6 md:p-8 rounded-[3rem] border-8 border-amber-400 shadow-2xl max-w-4xl w-full relative backdrop-blur-sm flex flex-col items-center h-[600px] overflow-hidden">

                {/* Header */}
                <div className="w-full flex justify-between items-center mb-6 bg-indigo-900/50 p-4 rounded-2xl border-2 border-white/10 z-20">
                    <button onClick={onExit} className="bg-red-500 text-white px-4 md:px-6 py-2 rounded-xl font-black shadow-[0_4px_0_0_#991b1b] active:translate-y-1 transition-all text-sm md:text-base">
                        KELUAR
                    </button>
                    <div className="flex gap-4">
                        <div className="text-amber-400 font-black text-xl md:text-2xl uppercase tracking-widest drop-shadow-md">
                            ⭐ {score}
                        </div>
                        <div className="text-white font-black text-xl md:text-2xl uppercase tracking-widest drop-shadow-md">
                            ⏳ {timeLeft}s
                        </div>
                    </div>
                </div>

                {/* Game Area */}
                <div ref={gameAreaRef} className="flex-grow w-full relative bg-black/20 rounded-3xl border-2 border-white/5 overflow-hidden">
                    {!gameActive && timeLeft === 180 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                            <h2 className="text-4xl font-black text-white mb-6 drop-shadow-lg text-center">TANGKAP BINTANG JATUH</h2>
                            <button onClick={startGame} className="bg-amber-400 text-indigo-950 px-10 py-4 rounded-3xl font-black text-3xl shadow-[0_8px_0_0_#92400e] hover:scale-105 active:translate-y-2 transition-all">
                                MULAI!
                            </button>
                        </div>
                    )}

                    {!gameActive && timeLeft === 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-indigo-950/80">
                            <div className="text-8xl mb-4">🏆</div>
                            <h2 className="text-5xl font-black text-amber-400 mb-2">WAKTU HABIS!</h2>
                            <p className="text-white text-2xl font-bold mb-8 italic">Kamu menangkap {score} bintang!</p>
                            <button onClick={startGame} className="bg-amber-400 text-indigo-950 px-10 py-4 rounded-2xl font-black text-2xl shadow-[0_8px_0_0_#92400e] hover:scale-105 active:translate-y-1 transition-all">
                                COBA LAGI
                            </button>
                        </div>
                    )}

                    {stars.map(star => (
                        <button
                            key={star.id}
                            onMouseDown={() => handleCatch(star.id)}
                            className="absolute text-5xl md:text-6xl cursor-pointer transform hover:scale-125 transition-transform active:scale-75 select-none touch-none"
                            style={{ left: `${star.left}%`, top: `${star.top}px` }}
                        >
                            ⭐
                        </button>
                    ))}
                </div>

                {/* Instructions */}
                {gameActive && (
                    <div className="absolute bottom-10 text-white/50 font-bold uppercase tracking-widest animate-pulse pointer-events-none">
                        Klik pada bintang!
                    </div>
                )}
            </div>
        </div>
    );
}
