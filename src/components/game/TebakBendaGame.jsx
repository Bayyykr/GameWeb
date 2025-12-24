import React, { useState, useEffect } from 'react';

const ITEMS = [
    { name: 'BUKU', emoji: '📚' },
    { name: 'PENSIL', emoji: '✏️' },
    { name: 'GUNTING', emoji: '✂️' },
    { name: 'TAS', emoji: '🎒' },
    { name: 'SEPATU', emoji: '👟' },
    { name: 'KACAMATA', emoji: '👓' },
    { name: 'JAM', emoji: '⌚' },
    { name: 'PAYUNG', emoji: '☂️' },
    { name: 'BOLA', emoji: '⚽' },
    { name: 'GITAR', emoji: '🎸' },
    { name: 'KAMERA', emoji: '📷' },
    { name: 'TELEPON', emoji: '☎️' },
    { name: 'KUNCI', emoji: '🔑' },
    { name: 'MOBIL', emoji: '🚗' },
    { name: 'PESAWAT', emoji: '✈️' },
    { name: 'SEPEDA', emoji: '🚲' },
    { name: 'RUMAH', emoji: '🏠' },
    { name: 'POHON', emoji: '🌳' },
    { name: 'BUNGA', emoji: '🌻' },
    { name: 'MATAHARI', emoji: '☀️' },
    { name: 'BULAN', emoji: '🌙' },
    { name: 'BINTANG', emoji: '⭐' },
    { name: 'API', emoji: '🔥' },
    { name: 'AIR', emoji: '💧' },
    { name: 'ES KRIM', emoji: '🍦' },
    { name: 'APEL', emoji: '🍎' },
    { name: 'PISANG', emoji: '🍌' },
    { name: 'JERUK', emoji: '🍊' },
    { name: 'WORTEL', emoji: '🥕' },
    { name: 'IKAN', emoji: '🐟' },
];

export default function TebakBendaGame({ onExit }) {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(90);
    const [gameState, setGameState] = useState('playing'); // 'playing', 'finished'
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [message, setMessage] = useState('');
    const [streak, setStreak] = useState(0);

    // Initialize Game
    useEffect(() => {
        nextQuestion();
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setGameState('finished');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const nextQuestion = () => {
        // Pick random target
        const targetIdx = Math.floor(Math.random() * ITEMS.length);
        const target = ITEMS[targetIdx];

        // Pick 2 distractors
        let options = [target];
        while (options.length < 3) {
            const randomIdx = Math.floor(Math.random() * ITEMS.length);
            const item = ITEMS[randomIdx];
            if (!options.find(o => o.name === item.name)) {
                options.push(item);
            }
        }

        // Shuffle options
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        setCurrentQuestion({
            target,
            options
        });
    };

    const handleOptionClick = (selectedItem) => {
        if (gameState !== 'playing') return;

        if (selectedItem.name === currentQuestion.target.name) {
            setScore(prev => prev + 10 + (streak * 2));
            setStreak(prev => prev + 1);
            setMessage('BENAR!');
            setTimeout(() => {
                setMessage('');
                nextQuestion();
            }, 1000);
        } else {
            setStreak(0);
            setMessage('SALAH!');
            setTimeout(() => {
                setMessage('');
                nextQuestion();
            }, 1000);
        }
    };

    if (gameState === 'finished') {
        return (
            <div className="fixed inset-0 bg-indigo-950/90 flex items-center justify-center z-[10000] p-4 backdrop-blur-xl">
                <div className="bg-indigo-950 p-8 rounded-[3rem] border-8 border-amber-400 shadow-[0_20px_0_0_rgba(0,0,0,0.5)] text-center max-w-lg w-full">
                    <h2 className="text-5xl font-black text-white mb-4 italic uppercase tracking-tighter drop-shadow-[0_8px_0_#1e1b4b]">
                        WAKTU HABIS!
                    </h2>
                    <p className="text-amber-400 text-2xl font-bold mb-2">Skor Akhir Kamu:</p>
                    <p className="text-white text-6xl font-black mb-8 drop-shadow-md">{score}</p>
                    <button onClick={onExit} className="bg-red-500 hover:bg-red-600 text-white px-8 py-3.5 rounded-2xl font-black text-xl shadow-[0_6px_0_0_#991b1b] active:translate-y-1 active:shadow-none transition-all border-t-4 border-white/30 uppercase tracking-widest w-full">KEMBALI KE MENU</button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center bg-indigo-950/80 p-3 rounded-2xl border-2 border-white/20 shadow-2xl backdrop-blur-md">
                <button onClick={onExit} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-black text-xs shadow-[0_4px_0_0_#991b1b] active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest">KELUAR</button>
                <div className="flex items-center gap-4">
                    <div className="bg-black/40 px-4 py-1.5 rounded-xl border-2 border-white/10">
                        <span className="text-amber-400 font-black text-xl italic tracking-tighter">SKOR: {score}</span>
                    </div>
                    <div className="bg-black/40 px-4 py-1.5 rounded-xl border-2 border-white/10">
                        <span className={`font-black text-xl italic tracking-tighter ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>WAKTU: {timeLeft}s</span>
                    </div>
                </div>
            </div>

            {/* Game Area */}
            <div className="bg-indigo-950 border-4 border-white/10 p-8 rounded-[3rem] shadow-2xl relative mt-4 flex flex-col items-center">
                <div className="text-center mb-8">
                    <span className="text-indigo-300 font-bold uppercase tracking-widest text-sm mb-4 block">TEBAK BENDA APA INI?</span>
                    <div className="w-48 h-48 md:w-64 md:h-64 bg-white/10 rounded-[3rem] flex items-center justify-center border-4 border-white/20 shadow-inner mb-6 mx-auto animate-bounce-slow">
                        <span className="text-[8rem] md:text-[10rem] drop-shadow-2xl filter hover:brightness-110 transition-all cursor-crosshair">
                            {currentQuestion?.target.emoji}
                        </span>
                    </div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    {currentQuestion?.options.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleOptionClick(item)}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white py-6 rounded-2xl font-black text-2xl md:text-3xl shadow-[0_6px_0_0_#1e1b4b] active:translate-y-1 active:shadow-none transition-all border-t-4 border-white/20 uppercase tracking-widest group"
                        >
                            <span className="group-hover:scale-110 inline-block transition-transform">{item.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Feedback Message */}
            {message && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[20000] pointer-events-none">
                    <div className={`px-12 py-6 rounded-[2rem] font-black text-4xl shadow-2xl animate-bounce tracking-widest uppercase border-8 
                        ${message.includes('BENAR') ? 'bg-green-500 border-green-300 text-white' : 'bg-red-500 border-red-300 text-white'}`}>
                        {message}
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
            `}} />
        </div>
    );
}
