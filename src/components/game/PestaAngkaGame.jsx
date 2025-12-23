import React, { useState, useEffect, useCallback } from 'react';
import coinImg from '../../assets/images/pesta_angka.png';

export default function PestaAngkaGame({ mode, onExit }) {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(300);
    const [gameState, setGameState] = useState('playing'); // 'playing', 'finished'
    const [coins, setCoins] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    // Generate a random question
    const generateQuestion = useCallback(() => {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const op = Math.random() > 0.5 ? '+' : '-';
        let numA = a, numB = b;
        if (op === '-' && numA < numB) [numA, numB] = [numB, numA];

        return {
            a: numA,
            b: numB,
            op,
            answer: op === '+' ? numA + numB : numA - numB
        };
    }, []);

    // Spawn a coin
    const spawnCoin = useCallback(() => {
        const id = Math.random().toString(36).substr(2, 9);
        const x = Math.random() * 80 + 10; // 10% to 90%
        const y = Math.random() * 60 + 20; // 20% to 80%
        const question = generateQuestion();

        setCoins(prev => [...prev, { id, x, y, question }]);
    }, [generateQuestion]);

    // Game loop for spawning coins
    useEffect(() => {
        if (gameState !== 'playing') return;

        const spawnInterval = setInterval(() => {
            setCoins(prev => {
                if (prev.length < 7) {
                    let attempts = 0;
                    let newX, newY;
                    let overlapping = true;

                    while (overlapping && attempts < 10) {
                        newX = Math.random() * 80 + 10;
                        newY = Math.random() * 60 + 20;

                        // Check distance from existing coins (approx 15% distance threshold)
                        overlapping = prev.some(coin => {
                            const dx = coin.x - newX;
                            const dy = coin.y - newY;
                            return Math.sqrt(dx * dx + dy * dy) < 15;
                        });
                        attempts++;
                    }

                    if (!overlapping) {
                        const id = Math.random().toString(36).substr(2, 9);
                        const question = generateQuestion();
                        return [...prev, { id, x: newX, y: newY, question }];
                    }
                }
                return prev;
            });
        }, 3000);

        const timerInterval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerInterval);
                    clearInterval(spawnInterval);
                    setGameState('finished');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(spawnInterval);
            clearInterval(timerInterval);
        };
    }, [gameState, generateQuestion]);

    const handleCoinClick = (coin) => {
        if (gameState !== 'playing' || activeQuestion) return;
        setActiveQuestion(coin);
        setUserAnswer('');
    };

    const handleNumberClick = (num) => {
        if (userAnswer.length < 3) setUserAnswer(prev => prev + num);
    };

    const handleClear = () => setUserAnswer('');

    const handleSubmit = () => {
        if (!activeQuestion) return;

        if (parseInt(userAnswer) === activeQuestion.question.answer) {
            setScore(prev => prev + 10);
            setCoins(prev => prev.filter(c => c.id !== activeQuestion.id));
            setFeedback({ type: 'correct', message: '+10' });
        } else {
            setFeedback({ type: 'wrong', message: 'Salah!' });
        }

        setTimeout(() => {
            setFeedback(null);
            setActiveQuestion(null);
        }, 800);
    };

    if (gameState === 'finished') {
        return (
            <div className="fixed inset-0 bg-slate-950/90 flex items-center justify-center z-[10000] p-4 backdrop-blur-xl">
                <div className="bg-indigo-950 p-8 rounded-[3rem] border-8 border-amber-400 shadow-[0_20px_0_0_rgba(0,0,0,0.5)] text-center max-w-lg w-full">
                    <h2 className="text-5xl font-black text-white mb-4 italic uppercase tracking-tighter drop-shadow-[0_8px_0_#1e1b4b]">
                        PESTA BERAKHIR!
                    </h2>
                    <div className="bg-black/40 p-6 rounded-3xl border-2 border-white/10 mb-8">
                        <p className="text-indigo-200 text-xl font-bold mb-2 uppercase tracking-widest">Skor Akhir</p>
                        <p className="text-6xl font-black text-amber-400 drop-shadow-[0_4px_0_#92400e]">{score}</p>
                    </div>
                    <button onClick={onExit} className="bg-red-500 hover:bg-red-600 text-white px-8 py-3.5 rounded-2xl font-black text-xl shadow-[0_6px_0_0_#991b1b] active:translate-y-1 active:shadow-none transition-all border-t-4 border-white/30 uppercase tracking-widest w-full">KEMBALI KE MENU</button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[80vh] flex flex-col gap-6 select-none">
            {/* Header */}
            <div className="flex justify-between items-center bg-indigo-950/80 p-4 rounded-3xl border-2 border-white/20 shadow-2xl backdrop-blur-md z-50">
                <button onClick={onExit} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-black text-xs shadow-[0_4px_0_0_#991b1b] active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest">KELUAR</button>
                <div className="flex gap-4">
                    <div className="bg-black/40 px-6 py-2 rounded-2xl border-2 border-white/10">
                        <span className="text-amber-400 font-black text-2xl italic tracking-tighter">SKOR: {score}</span>
                    </div>
                    <div className="bg-black/40 px-6 py-2 rounded-2xl border-2 border-white/10">
                        <span className="text-rose-400 font-black text-2xl italic tracking-tighter">WAKTU: {timeLeft}s</span>
                    </div>
                </div>
            </div>

            {/* Play Area */}
            <div className="relative flex-grow bg-indigo-900/20 rounded-[3rem] border-4 border-dashed border-white/10 overflow-hidden">
                {coins.map(coin => (
                    <div
                        key={coin.id}
                        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 active:scale-95"
                        style={{ left: `${coin.x}%`, top: `${coin.y}%` }}
                        onClick={() => handleCoinClick(coin)}
                    >
                        <div className="relative group">
                            <img src={coinImg} alt="coin" className="w-24 h-24 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] animate-bounce" />
                            <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                ))}

                {/* Feedback Overlay */}
                {feedback && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[60]">
                        <div className={`text-6xl font-black uppercase italic tracking-tighter animate-ping ${feedback.type === 'correct' ? 'text-emerald-400' : 'text-red-500'}`}>
                            {feedback.message}
                        </div>
                    </div>
                )}
            </div>

            {/* Question Modal / Keypad */}
            {activeQuestion && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
                    <div className="bg-indigo-950 p-8 rounded-[3rem] border-8 border-amber-400 shadow-2xl max-w-sm w-full animate-in zoom-in-95 duration-200">
                        <div className="text-center mb-6">
                            <span className="text-amber-400 font-black text-sm uppercase tracking-widest mb-2 block">PECAHKAN UNTUK AMBIL KOIN!</span>
                            <div className="text-5xl font-black text-white italic drop-shadow-[0_4px_0_#1e1b4b]">
                                {activeQuestion.question.a} {activeQuestion.question.op} {activeQuestion.question.b} = ?
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                                <button
                                    key={n}
                                    onClick={() => handleNumberClick(n)}
                                    className="bg-indigo-800 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-[0_5px_0_0_#1e1b4b] active:translate-y-1 active:shadow-none transition-all text-2xl"
                                >
                                    {n}
                                </button>
                            ))}
                            <button onClick={handleClear} className="bg-red-500 hover:bg-red-600 text-white font-black py-4 rounded-2xl shadow-[0_5px_0_0_#b91c1c] active:translate-y-1 active:shadow-none transition-all text-xl uppercase">C</button>
                            <button onClick={() => handleNumberClick(0)} className="bg-indigo-800 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-[0_5px_0_0_#1e1b4b] active:translate-y-1 active:shadow-none transition-all text-2xl">0</button>
                            <button onClick={handleSubmit} className="bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-[0_5px_0_0_#065f46] active:translate-y-1 active:shadow-none transition-all text-xl uppercase">OK</button>
                        </div>

                        <div className="mt-6 bg-black/40 p-4 rounded-2xl border-2 border-white/10 text-center">
                            <span className="text-4xl font-black text-amber-400 tracking-normal min-h-[1.2em] flex items-center justify-center">
                                {userAnswer || '...'}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
