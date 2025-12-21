import React, { useState, useEffect } from 'react';
/* 
Images used in the project:
hitungAngkaImg from '../../assets/images/hitung_angka.png'
magicBg from '../../assets/images/magic_bg.jpg'
battleSihirIcon from '../../assets/images/battle_sihir.png'
balapAngkaIcon from '../../assets/images/balap_angka.png'
labirinHitungIcon from '../../assets/images/labirin_hitung.png'
pestaAngkaIcon from '../../assets/images/pesta_angka.png'
mageImg from '../../assets/mage-avatar.png'
elfImg from '../../assets/elf-avatar.png'
monsterImg from '../../assets/monster-avatar.png'
*/

export default function BalapAngkaGame({ mode, onExit }) {
    const isMultiplayer = mode === 'multiplayer';

    // Game State
    const [p1Pos, setP1Pos] = useState(0); // Progress 0-100
    const [p2Pos, setP2Pos] = useState(0); // Progress 0-100
    const [p1Question, setP1Question] = useState({ a: 0, b: 0, answer: 0 });
    const [p2Question, setP2Question] = useState({ a: 0, b: 0, answer: 0 });
    const [p1Answer, setP1Answer] = useState('');
    const [p2Answer, setP2Answer] = useState('');
    const [timeLeft, setTimeLeft] = useState(180); // 180 seconds for racing (3 minutes)
    const [gameState, setGameState] = useState('playing'); // 'playing', 'finished'
    const [winType, setWinType] = useState(''); // 'finish', 'timeout'
    const [message, setMessage] = useState('');

    const generateQuestion = (player) => {
        let a = Math.floor(Math.random() * 15) + 1;
        let b = Math.floor(Math.random() * 15) + 1;
        const op = Math.random() > 0.5 ? '+' : '-';

        // Ensure subtraction always results in a positive number (no minus sign on keypad)
        if (op === '-' && a < b) {
            [a, b] = [b, a];
        }

        const answer = op === '+' ? a + b : a - b;
        const newQ = { a, b, op, answer };

        if (player === 1) {
            setP1Question(newQ);
            setP1Answer('');
        } else {
            setP2Question(newQ);
            setP2Answer('');
        }
    };

    useEffect(() => {
        generateQuestion(1);
        if (isMultiplayer) generateQuestion(2);

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setGameState((current) => {
                        if (current !== 'finished') {
                            setWinType('timeout');
                            return 'finished';
                        }
                        return current;
                    });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isMultiplayer]);

    const handleNumberClick = (player, num) => {
        if (gameState !== 'playing') return;
        if (player === 1) {
            if (p1Answer.length < 3) setP1Answer(prev => prev + num);
        } else {
            if (p2Answer.length < 3) setP2Answer(prev => prev + num);
        }
    };

    const handleClear = (player) => {
        if (player === 1) setP1Answer('');
        else setP2Answer('');
    };

    const handleSubmit = (player) => {
        if (gameState !== 'playing') return;
        const answerStr = player === 1 ? p1Answer : p2Answer;
        if (!answerStr) return;

        const currentQ = player === 1 ? p1Question : p2Question;
        const isCorrect = parseInt(answerStr, 10) === currentQ.answer;

        if (isCorrect) {
            if (player === 1) {
                setP1Pos(prev => {
                    const next = prev + 5;
                    if (next >= 100) {
                        setGameState('finished');
                        setWinType('finish');
                    }
                    return Math.min(100, next);
                });
                generateQuestion(1);
            } else {
                setP2Pos(prev => {
                    const next = prev + 5;
                    if (next >= 100) {
                        setGameState('finished');
                        setWinType('finish');
                    }
                    return Math.min(100, next);
                });
                generateQuestion(2);
            }
        } else {
            setMessage(player === 1 ? 'P1 Salah!' : 'P2 Salah!');
            setTimeout(() => setMessage(''), 1000);
            if (player === 1) setP1Answer('');
            else setP2Answer('');
        }
    };

    const Keypad = ({ player, value }) => (
        <div className="grid grid-cols-3 gap-1.5 mt-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                <button
                    key={n}
                    onClick={() => handleNumberClick(player, n)}
                    className="bg-indigo-800 hover:bg-indigo-700 text-white font-black p-2.5 rounded-xl shadow-[0_3px_0_0_#1e1b4b] active:translate-y-1 active:shadow-none transition-all text-base"
                >
                    {n}
                </button>
            ))}
            <button onClick={() => handleClear(player)} className="bg-red-500 hover:bg-red-600 text-white font-black p-2.5 rounded-xl shadow-[0_3px_0_0_#b91c1c] active:translate-y-1 active:shadow-none transition-all text-base uppercase">C</button>
            <button onClick={() => handleNumberClick(player, 0)} className="bg-indigo-800 hover:bg-indigo-700 text-white font-black p-2.5 rounded-xl shadow-[0_3px_0_0_#1e1b4b] active:translate-y-1 active:shadow-none transition-all text-base">0</button>
            <button onClick={() => handleSubmit(player)} className="bg-emerald-500 hover:bg-emerald-600 text-white font-black p-2.5 rounded-xl shadow-[0_3px_0_0_#065f46] active:translate-y-1 active:shadow-none transition-all text-base uppercase">ok</button>

            {/* Answer Display */}
            <div className="col-span-3 mt-1.5 bg-black/40 p-2 rounded-xl border-2 border-white/10 text-center">
                <span className="text-xl font-black text-amber-400 tracking-widest min-h-[1em] block">
                    {value || '...'}
                </span>
            </div>
        </div>
    );

    const RacingTrack = ({ player, pos, color }) => (
        <div className="relative w-full h-10 bg-slate-900 rounded-full border-4 border-slate-700 overflow-hidden shadow-inner">
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-20">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-full w-1 bg-white/50"></div>
                ))}
            </div>
            {/* The "Car" (using a simple emoji for now, can replace with image later) */}
            <div
                className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-out`}
                style={{ left: `${pos}%`, transform: `translate(-50%, -50%)` }}
            >
                <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center shadow-lg border-2 border-white/40`}>
                    <span className="text-xl">{player === 1 ? '🏎️' : '🏎️'}</span>
                </div>
                {/* Tail Effect */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-1.5 bg-gradient-to-r from-transparent to-white/40 rounded-full"></div>
            </div>
            {/* Finish Line */}
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-amber-400 shadow-[0_0_15px_#fbbf24] z-10 flex flex-col justify-around py-1">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-full h-2 bg-black/50"></div>
                ))}
            </div>
        </div>
    );

    if (gameState === 'finished') {
        const winner = isMultiplayer ? (p1Pos > p2Pos ? 'Player 1' : 'Player 2') : (winType === 'finish' ? 'DI FINISH!' : 'WAKTU HABIS!');
        const subMessage = isMultiplayer ? `${winner} MENANG!` : (winType === 'finish' ? 'Luar Biasa!' : `Skor: ${p1Pos}%`);

        return (
            <div className="fixed inset-0 bg-slate-950/90 flex items-center justify-center z-[10000] p-4 backdrop-blur-xl">
                <div className="bg-indigo-950 p-8 rounded-[3rem] border-8 border-amber-400 shadow-[0_20px_0_0_rgba(0,0,0,0.5)] text-center max-w-lg w-full">
                    <h2 className="text-5xl font-black text-white mb-4 italic uppercase tracking-tighter drop-shadow-[0_8px_0_#1e1b4b]">
                        {isMultiplayer ? 'GAME OVER' : (winType === 'finish' ? 'HEBAT!' : 'WAKTU HABIS!')}
                    </h2>
                    <p className="text-amber-400 text-3xl font-black mb-8 drop-shadow-md">
                        {subMessage}
                    </p>
                    <button onClick={onExit} className="bg-red-500 hover:bg-red-600 text-white px-8 py-3.5 rounded-2xl font-black text-xl shadow-[0_6px_0_0_#991b1b] active:translate-y-1 active:shadow-none transition-all border-t-4 border-white/30 uppercase tracking-widest w-full">KEMBALI KE MENU</button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-4xl mx-auto p-2 flex flex-col gap-3">
            {/* Header */}
            <div className="flex justify-between items-center bg-indigo-950/80 p-2.5 rounded-full border-4 border-amber-400 shadow-2xl backdrop-blur-md">
                <button onClick={onExit} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full font-black text-[10px] shadow-[0_3px_0_0_#991b1b] active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest">KELUAR</button>
                <div className="flex items-center gap-3">
                    <div className="bg-black/40 px-3 py-1 rounded-full border-2 border-white/10">
                        <span className="text-amber-400 font-black text-lg italic tracking-tighter text-shadow-sm">TIME: {timeLeft}s</span>
                    </div>
                </div>
            </div>

            {/* Racing Track Area */}
            <div className="bg-indigo-900/40 rounded-[2rem] p-4 border-4 border-indigo-400/20 backdrop-blur-md flex flex-col gap-4 shadow-2xl">
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-end mb-0">
                        <span className="text-white font-black text-[9px] uppercase tracking-widest pl-2">PLAYER 1</span>
                        <span className="text-amber-400 font-black text-[9px]">{p1Pos}%</span>
                    </div>
                    <RacingTrack player={1} pos={p1Pos} color="bg-blue-500" />
                </div>

                {isMultiplayer && (
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-white font-black text-xs uppercase tracking-widest pl-2">PLAYER 2</span>
                            <span className="text-amber-400 font-black text-xs">{p2Pos}%</span>
                        </div>
                        <RacingTrack player={2} pos={p2Pos} color="bg-purple-500" />
                    </div>
                )}
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* P1 Section */}
                <div className="bg-indigo-950 border-4 border-white/10 p-4 rounded-[2rem] shadow-2xl relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border-2 border-white/20">Player 1</div>
                    <div className="bg-indigo-900/50 p-2.5 rounded-2xl text-center mb-3 border-2 border-white/5">
                        <div className="text-blue-300 text-[8px] font-black mb-0.5 uppercase tracking-widest">KECEPATAN MATEMATIKA</div>
                        <div className="text-2xl font-black text-white italic drop-shadow-[0_4px_0_#1e1b4b]">{p1Question.a} {p1Question.op} {p1Question.b} = ?</div>
                    </div>
                    <Keypad player={1} value={p1Answer} />
                </div>

                {/* P2 Section or Single Player Message */}
                {isMultiplayer ? (
                    <div className="bg-indigo-950 border-4 border-white/10 p-4 rounded-[2rem] shadow-2xl relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border-2 border-white/20">Player 2</div>
                        <div className="bg-indigo-900/50 p-2.5 rounded-2xl text-center mb-3 border-2 border-white/5">
                            <div className="text-purple-300 text-[8px] font-black mb-0.5 uppercase tracking-widest">KECEPATAN MATEMATIKA</div>
                            <div className="text-2xl font-black text-white italic drop-shadow-[0_4px_0_#1e1b4b]">{p2Question.a} {p2Question.op} {p2Question.b} = ?</div>
                        </div>
                        <Keypad player={2} value={p2Answer} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center bg-indigo-900/10 rounded-[2rem] border-4 border-dashed border-white/10">
                        <h3 className="text-lg font-black text-amber-400 mb-1 uppercase italic">TANTANGAN WAKTU!</h3>
                        <p className="text-indigo-200 font-bold text-[10px] max-w-[180px]">Capai garis finish sebelum waktu habis untuk skor tertinggi!</p>
                        <div className="mt-2 animate-bounce flex items-center justify-center">
                            <span className="text-5xl">🚩</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Global Message */}
            <div className="h-4 flex items-center justify-center">
                {message && (
                    <div className="px-8 py-2 bg-red-500 border-4 border-red-300 rounded-2xl font-black text-white shadow-2xl animate-bounce tracking-widest uppercase">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
