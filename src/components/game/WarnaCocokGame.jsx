import React, { useState, useEffect, useRef } from 'react';

export default function WarnaCocokGame({ onExit }) {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(180);
    const [gameActive, setGameActive] = useState(false);
    const [bubbles, setBubbles] = useState([]);
    const [targetColor, setTargetColor] = useState(null);
    const bubbleIdRef = useRef(0);

    const COLORS = [
        { name: 'Merah', class: 'bg-red-500', hex: '#ef4444' },
        { name: 'Biru', class: 'bg-blue-500', hex: '#3b82f6' },
        { name: 'Kuning', class: 'bg-yellow-400', hex: '#facc15' },
        { name: 'Hijau', class: 'bg-green-500', hex: '#22c55e' },
        { name: 'Ungu', class: 'bg-purple-500', hex: '#a855f7' }
    ];

    // Game Control
    const startGame = () => {
        setScore(0);
        setTimeLeft(180);
        setBubbles([]);
        setTargetColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
        setGameActive(true);
    };

    // Timer
    useEffect(() => {
        let timer;
        if (gameActive && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0) {
            setGameActive(false);
            setBubbles([]);
        }
        return () => clearInterval(timer);
    }, [gameActive, timeLeft]);

    // Target color changer
    useEffect(() => {
        let targetTimer;
        if (gameActive) {
            targetTimer = setInterval(() => {
                setTargetColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
            }, Math.max(2000, 5000 - (score * 100))); // Slower: Start at 5s, min 2s
        }
        return () => clearInterval(targetTimer);
    }, [gameActive, score]);

    // Bubble generator
    useEffect(() => {
        let generator;
        if (gameActive) {
            generator = setInterval(() => {
                // 35% chance to spawn target color, otherwise random
                const isTarget = Math.random() < 0.35;
                const color = isTarget ? targetColor : COLORS[Math.floor(Math.random() * COLORS.length)];

                const newBubble = {
                    id: bubbleIdRef.current++,
                    color: color,
                    left: Math.random() * 80 + 10,
                    top: 100, // Start from bottom
                    size: Math.random() * 20 + 60,
                    speedX: (Math.random() - 0.5) * 1.0,
                    speedY: -(Math.random() * 0.8 + 0.3 + (score * 0.02)) // Slower: HALVED base speed and reduced scaling
                };
                setBubbles(prev => [...prev, newBubble]);
            }, Math.max(300, 800 - (score * 10)));
        }
        return () => clearInterval(generator);
    }, [gameActive, score, targetColor]);

    // Animation loop
    useEffect(() => {
        let frame;
        if (gameActive) {
            const update = () => {
                setBubbles(prev =>
                    prev
                        .map(b => ({
                            ...b,
                            left: b.left + b.speedX,
                            top: b.top + b.speedY
                        }))
                        .filter(b => b.top > -50 && b.top < 650 && b.left > -50 && b.left < 105)
                );
                frame = requestAnimationFrame(update);
            };
            frame = requestAnimationFrame(update);
        }
        return () => cancelAnimationFrame(frame);
    }, [gameActive]);

    const handlePop = (bubble) => {
        if (bubble.color.name === targetColor.name) {
            setScore(prev => prev + 1);
            setBubbles(prev => prev.filter(b => b.id !== bubble.id));
            // Immediate Target Change!
            setTargetColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
        } else {
            setScore(prev => Math.max(0, prev - 1));
        }
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-4 w-full select-none pt-4 md:pt-8">
            <div className="bg-indigo-950/90 p-6 md:p-8 rounded-[3rem] border-8 border-amber-400 shadow-2xl max-w-4xl w-full relative backdrop-blur-sm flex flex-col items-center h-[650px] overflow-hidden">

                {/* Header */}
                <div className="w-full flex justify-between items-center mb-6 bg-indigo-900/50 p-4 rounded-2xl border-2 border-white/10 z-20">
                    <button onClick={onExit} className="bg-red-500 text-white px-4 md:px-6 py-2 rounded-xl font-black shadow-[0_4px_0_0_#991b1b] active:translate-y-1 transition-all text-sm md:text-base">
                        KELUAR
                    </button>
                    <div className="flex gap-4 items-center">
                        <div className="bg-black/40 px-6 py-2 rounded-xl border-2 border-white/10 flex items-center gap-3">
                            <span className="text-white font-bold text-sm uppercase">TARGET:</span>
                            <div
                                className="w-8 h-8 rounded-full border-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                style={{ backgroundColor: targetColor?.hex || 'transparent' }}
                            ></div>
                            <span className="text-white font-black text-xl drop-shadow-md">{targetColor?.name}</span>
                        </div>
                        <div className="text-amber-400 font-black text-2xl drop-shadow-md">🏆 {score}</div>
                        <div className="text-white font-black text-2xl drop-shadow-md">⏳ {timeLeft}</div>
                    </div>
                </div>

                {/* Game Area */}
                <div className="flex-grow w-full relative bg-black/30 rounded-[2rem] border-2 border-white/5 overflow-hidden cursor-crosshair">
                    {!gameActive && timeLeft === 180 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                            <h2 className="text-5xl font-black text-white mb-4 drop-shadow-lg text-center uppercase tracking-tighter italic">Warna Cocok</h2>
                            <p className="text-slate-300 font-bold mb-8 text-xl text-center max-w-md italic">Pecahkan gelembung yang warnanya SAMA dengan target!</p>
                            <button onClick={startGame} className="bg-amber-400 text-indigo-950 px-12 py-5 rounded-3xl font-black text-3xl shadow-[0_12px_0_0_#92400e] hover:scale-105 active:translate-y-2 transition-all border-t-4 border-white/40 uppercase tracking-widest">
                                MULAI PERMAINAN
                            </button>
                        </div>
                    )}

                    {!gameActive && timeLeft === 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-indigo-950/90">
                            <div className="text-9xl mb-6">🎈</div>
                            <h2 className="text-6xl font-black text-amber-400 mb-4 uppercase tracking-tighter italic">HEBAT!</h2>
                            <p className="text-white text-3xl font-bold mb-10">Skor Akhir: {score}</p>
                            <button onClick={startGame} className="bg-amber-400 text-indigo-950 px-12 py-5 rounded-3xl font-black text-3xl shadow-[0_12px_0_0_#92400e] hover:scale-105 active:translate-y-2 transition-all border-t-4 border-white/40 uppercase tracking-widest">
                                COBA LAGI
                            </button>
                        </div>
                    )}

                    {bubbles.map(bubble => (
                        <div
                            key={bubble.id}
                            onPointerDown={() => handlePop(bubble)}
                            className="absolute rounded-full border-4 border-white/40 shadow-xl cursor-pointer transition-transform active:scale-150 active:opacity-0 flex items-center justify-center overflow-hidden"
                            style={{
                                left: `${bubble.left}%`,
                                top: `${bubble.top}%`,
                                width: `${bubble.size}px`,
                                height: `${bubble.size}px`,
                                backgroundColor: bubble.color.hex,
                                filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.3))',
                                boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.2), inset 10px 10px 20px rgba(255,255,255,0.4)`
                            }}
                        >
                            {/* Balloon shine and string-ish look */}
                            <div className="absolute top-2 left-2 w-1/4 h-1/4 bg-white/50 rounded-full blur-[1px]"></div>
                            <div className="absolute bottom-1 w-2 h-2 bg-white/20 rounded-full"></div>
                            <span className="text-3xl opacity-20 pointer-events-none">🎈</span>
                        </div>
                    ))}
                </div>

                {gameActive && (
                    <div className="mt-4 text-white/50 font-black uppercase tracking-[0.3em] animate-pulse">
                        Fokus pada warna {targetColor?.name}!
                    </div>
                )}
            </div>
        </div>
    );
}
