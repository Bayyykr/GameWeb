import React, { useState, useEffect } from 'react';
import mageImg from '../../assets/mage-avatar.png';
import elfImg from '../../assets/elf-avatar.png';
import monsterImg from '../../assets/monster-avatar.png';

export default function BattleSihirGame({ mode, onExit }) {
    const isMultiplayer = mode === 'multiplayer';

    // Game State
    const [p1Health, setP1Health] = useState(100);
    const [p2Health, setP2Health] = useState(100);

    // Independent Questions
    const [p1Question, setP1Question] = useState({ a: 0, b: 0, answer: 0 });
    const [p2Question, setP2Question] = useState({ a: 0, b: 0, answer: 0 });

    // Answers for both players
    const [p1Answer, setP1Answer] = useState('');
    const [p2Answer, setP2Answer] = useState('');

    const [message, setMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [shake, setShake] = useState(false);
    const [attackAnim, setAttackAnim] = useState(null);
    const [attackEffect, setAttackEffect] = useState('fire');

    // Generate a new math question
    const generateQuestion = (player) => {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const newQ = { a, b, answer: a + b };

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
    }, [isMultiplayer]);

    const handleNumberClick = (player, num) => {
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
        if (isProcessing) return;
        const answerStr = player === 1 ? p1Answer : p2Answer;
        if (!answerStr) return;

        setIsProcessing(true);

        const currentQ = player === 1 ? p1Question : p2Question;
        const isCorrect = parseInt(answerStr, 10) === currentQ.answer;

        const effects = ['fire', 'lightning', 'water', 'earth', 'wind'];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];

        if (isMultiplayer) {
            if (isCorrect) {
                setAttackEffect(randomEffect);
                if (player === 1) {
                    setP2Health((h) => Math.max(0, h - 10));
                    setMessage('Player 1 Hit!');
                    setAttackAnim('left');
                    generateQuestion(1);
                } else {
                    setP1Health((h) => Math.max(0, h - 10));
                    setMessage('Player 2 Hit!');
                    setAttackAnim('right');
                    generateQuestion(2);
                }
                setTimeout(() => {
                    setMessage('');
                    setAttackAnim(null);
                    setIsProcessing(false);
                }, 1000);
            } else {
                if (player === 1) {
                    setMessage('Player 1 Salah!');
                    setShake(true);
                    setP1Answer('');
                } else {
                    setMessage('Player 2 Salah!');
                    setShake(true);
                    setP2Answer('');
                }
                setTimeout(() => {
                    setShake(false);
                    setMessage('');
                    setIsProcessing(false);
                }, 1000);
            }

        } else {
            if (player !== 1) return;

            if (isCorrect) {
                setAttackEffect(randomEffect);
                setP2Health((h) => Math.max(0, h - 20));
                setMessage('Benar! Serangan masuk!');
                setAttackAnim('left');
                generateQuestion(1);
            } else {
                setP1Health((h) => Math.max(0, h - 15));
                setMessage('Salah! Monster menyerang!');
                setShake(true);
                setAttackAnim('right');
                setTimeout(() => setShake(false), 500);
                setP1Answer('');
            }
            setTimeout(() => {
                setMessage('');
                setAttackAnim(null);
                setIsProcessing(false);
            }, 1000);
        }
    };

    const ProjectileSystem = ({ type, direction }) => {
        return (
            <div className="absolute inset-0 pointer-events-none overflow-visible">
                <style>
                    {`
                    @keyframes fly-left-to-right {
                        0% { left: 15%; opacity: 0; transform: scale(0.5); }
                        10% { opacity: 1; transform: scale(1); }
                        100% { left: 85%; opacity: 1; transform: scale(1.2); }
                    }
                    @keyframes fly-right-to-left {
                        0% { right: 15%; opacity: 0; transform: scale(0.5); }
                        10% { opacity: 1; transform: scale(1); }
                        100% { right: 85%; opacity: 1; transform: scale(1.2); }
                    }
                    @keyframes spin { 100% { transform: rotate(360deg); } }
                    @keyframes lightning-flash { 0% { opacity: 0; } 10% { opacity: 1; } 20% { opacity: 0; } 40% { opacity: 1; } 100% { opacity: 0; } }
                    `}
                </style>

                <div
                    className="absolute top-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center z-50"
                    style={{
                        animation: type === 'lightning' ? 'none' : `${direction === 'left' ? 'fly-left-to-right' : 'fly-right-to-left'} 0.6s cubic-bezier(0.2, 0.6, 0.2, 1) forwards`
                    }}
                >
                    {type === 'fire' && (
                        <div className="relative w-24 h-24">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600 rounded-full blur-md animate-pulse"></div>
                            <div className="absolute inset-2 bg-yellow-100 rounded-full blur-sm"></div>
                        </div>
                    )}
                    {type === 'water' && (
                        <div className="relative w-24 h-24 animate-[spin_0.5s_linear_infinite]">
                            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                                <path d="M50 50 L50 0 Q70 0 85 15 L50 50 L100 50 Q100 70 85 85 L50 50 L50 100 Q30 100 15 85 L50 50 L0 50 Q0 30 15 15 Z" fill="#4fc3f7" stroke="white" strokeWidth="2" />
                            </svg>
                        </div>
                    )}
                    {type === 'earth' && (
                        <div className="relative w-24 h-24 animate-[spin_2s_linear_infinite]">
                            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                                <path d="M20,50 L40,20 L80,30 L90,60 L60,90 L30,80 Z" fill="#78350f" stroke="#a9550b" strokeWidth="2" />
                            </svg>
                        </div>
                    )}
                    {type === 'wind' && (
                        <div className="relative w-32 h-16">
                            <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-md opacity-80">
                                <path d="M10,50 Q100,0 190,50 Q100,100 10,50 Z" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="4" />
                            </svg>
                        </div>
                    )}
                </div>

                {type === 'lightning' && (
                    <div
                        className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none mix-blend-screen"
                        style={{ animation: 'lightning-flash 0.5s linear forwards' }}
                    >
                        <svg viewBox="0 0 800 200" className="w-full h-full drop-shadow-[0_0_30px_#00ffff]" preserveAspectRatio="none">
                            <path d={direction === 'left' ? "M100,100 L300,50 L500,150 L700,100" : "M700,100 L500,150 L300,50 L100,100"} stroke="#b0e0ff" strokeWidth="25" fill="none" />
                        </svg>
                    </div>
                )}
            </div>
        );
    };

    const AvatarBox = ({ src, alt, isAttacking, isFlip }) => (
        <div className={`w-32 h-32 md:w-40 md:h-40 relative transition-all duration-300 transform ${isAttacking ? (isFlip ? '-translate-x-6' : 'translate-x-6') + ' scale-110 brightness-110' : ''}`}>
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-contain transition-all duration-300 ${isFlip ? 'scale-x-[-1]' : ''}`}
                style={{
                    mixBlendMode: 'multiply',
                    filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))'
                }}
            />
        </div>
    );

    const Keypad = ({ player, active, value }) => (
        <div className={`transition-all duration-300 ${active ? 'opacity-100 scale-100' : 'opacity-50 scale-95 pointer-events-none grayscale'}`}>
            <div className={`bg-indigo-950 rounded-xl p-2 mb-2 border-2 ${active ? 'border-amber-400' : 'border-white/10'} shadow-inner`}>
                <div className="text-indigo-300 text-[10px] font-bold mb-0.5 uppercase tracking-widest text-center">Jawaban</div>
                <div className="bg-black/40 h-10 rounded-lg flex items-center justify-center text-2xl font-mono text-white tracking-widest">
                    {value || <span className="animate-pulse text-white/20">_</span>}
                </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button key={num} onClick={() => handleNumberClick(player, num.toString())} className="bg-indigo-800 text-white text-xl font-bold rounded-lg py-1.5 shadow-[0_3px_0_0_#312e81] hover:bg-indigo-700 active:translate-y-1 active:shadow-none transition-all border border-white/10">{num}</button>
                ))}
                <button onClick={() => handleClear(player)} className="bg-red-500 text-white text-lg font-bold rounded-lg py-1.5 shadow-[0_3px_0_0_#991b1b] hover:bg-red-600 active:translate-y-1 active:shadow-none transition-all border border-white/10">C</button>
                <button onClick={() => handleNumberClick(player, '0')} className="bg-indigo-800 text-white text-xl font-bold rounded-lg py-1.5 shadow-[0_3px_0_0_#312e81] hover:bg-indigo-700 active:translate-y-1 active:shadow-none transition-all border border-white/10">0</button>
                <button onClick={() => handleSubmit(player)} className="bg-green-500 text-white text-lg font-bold rounded-lg py-1.5 shadow-[0_3px_0_0_#166534] hover:bg-green-600 active:translate-y-1 active:shadow-none transition-all border border-white/10">GO</button>
            </div>
        </div>
    );

    if (p1Health === 0 || p2Health === 0) {
        const winner = p1Health > 0 ? 'Player 1' : 'Player 2';
        const isWin = isMultiplayer || p2Health === 0;

        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center space-y-8 animate-fade-in">
                <div className={`p-12 rounded-[3rem] border-8 ${isWin ? 'bg-indigo-950/80 border-green-400' : 'bg-indigo-950/80 border-red-500'} backdrop-blur-xl max-w-2xl w-full`}>
                    <h2 className="text-4xl font-black mb-6 text-white">{isMultiplayer ? `${winner} MENANG!` : (isWin ? 'MENANG!' : 'KALAH!')}</h2>
                    <p className="text-white text-xl font-bold mb-8">{isWin ? 'Luar biasa!' : 'Jangan menyerah!'}</p>
                    <button className="bg-amber-400 text-indigo-950 text-xl px-12 py-4 rounded-2xl font-black hover:scale-105" onClick={onExit}>Kembali ke Menu</button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-6xl mx-auto p-2 md:p-4">
            <div className="flex justify-between items-center mb-2 bg-indigo-950/50 p-2 md:p-3 rounded-full border-2 border-white/10 backdrop-blur-sm">
                <button onClick={onExit} className="bg-red-500 text-white px-4 py-1.5 rounded-full font-bold shadow-lg hover:bg-red-600 transition-colors text-xs">KELUAR</button>
                <div className="flex items-center gap-2 bg-indigo-900/80 px-4 py-1.5 rounded-full border border-white/20">
                    <span className="text-white font-bold animate-pulse text-amber-400 uppercase tracking-widest text-[10px]">
                        {isMultiplayer ? `Battle Royale` : `Skor: ${100 - p2Health}`}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mt-4">
                <div className={`md:col-span-4 flex flex-col gap-2 ${shake && attackAnim === 'right' ? 'animate-shake' : ''}`}>
                    <div className="bg-indigo-900/40 rounded-[2rem] p-4 border-2 border-indigo-400/20 backdrop-blur-md">
                        <div className="bg-indigo-950/50 rounded-xl p-3 mb-4 border border-white/10">
                            <div className="flex justify-between text-indigo-200 font-bold mb-1 text-[10px]">
                                <span>PLAYER 1</span>
                                <span>{p1Health}%</span>
                            </div>
                            <div className="h-2.5 bg-indigo-950 rounded-full overflow-hidden border border-white/5">
                                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500" style={{ width: `${p1Health}%` }}></div>
                            </div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl w-full text-center border-2 border-white/10 backdrop-blur-sm mb-4">
                            <div className="text-indigo-200 text-[10px] font-bold mb-1 uppercase tracking-wider">Pertanyaan</div>
                            <div className="text-3xl font-black text-white drop-shadow-lg">{p1Question.a} + {p1Question.b} = ?</div>
                        </div>
                        <Keypad player={1} active={true} value={p1Answer} />
                    </div>
                </div>

                <div className="md:col-span-4 flex flex-col items-center justify-center relative">
                    <div className="w-full h-full relative flex flex-col items-center justify-start py-4">
                        <div className="flex w-full items-center justify-between px-2 mb-4 relative z-20 h-48 overflow-visible">
                            <AvatarBox src={mageImg} alt="Mage" isAttacking={attackAnim === 'left'} isFlip={false} />

                            <div className="absolute inset-0 z-50 pointer-events-none">
                                {attackAnim && <ProjectileSystem type={attackEffect} direction={attackAnim} />}
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center z-0 opacity-10">
                                <div className="text-6xl font-black text-white italic">VS</div>
                            </div>

                            <AvatarBox
                                src={isMultiplayer ? elfImg : monsterImg}
                                alt={isMultiplayer ? "Elf" : "Monster"}
                                isAttacking={attackAnim === 'right'}
                                isFlip={isMultiplayer ? true : false} // Face RIGHT in single player (natural direction)
                            />
                        </div>

                        <div className="h-12 flex items-center justify-center w-full z-20 mt-2">
                            {message && (
                                <div className={`px-4 py-1.5 rounded-full font-black text-white shadow-xl animate-bounce-slow border-2 text-center text-xs ${message.includes('Hit') || message.includes('Benar') ? 'bg-green-500 border-green-300' : 'bg-red-500 border-red-300'}`}>
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={`md:col-span-4 flex flex-col gap-2 ${shake && attackAnim === 'left' ? 'animate-shake' : ''}`}>
                    <div className="bg-indigo-900/40 rounded-[2rem] p-4 border-2 border-indigo-400/20 backdrop-blur-md">
                        <div className="bg-black/20 rounded-xl p-3 mb-4 border border-white/10">
                            <div className="flex justify-between text-white/80 font-bold mb-1 uppercase text-[10px]">
                                <span>{isMultiplayer ? 'PLAYER 2' : 'MONSTER'}</span>
                                <span>{p2Health}%</span>
                            </div>
                            <div className="h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                                <div className={`h-full transition-all duration-500 ${isMultiplayer ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-red-600 to-red-800'}`} style={{ width: `${p2Health}%` }}></div>
                            </div>
                        </div>
                        {isMultiplayer ? (
                            <>
                                <div className="bg-white/5 p-4 rounded-2xl w-full text-center border-2 border-white/10 backdrop-blur-sm mb-4">
                                    <div className="text-purple-200 text-[10px] font-bold mb-1 uppercase tracking-wider">Pertanyaan</div>
                                    <div className="text-3xl font-black text-white drop-shadow-lg">{p2Question.a} + {p2Question.b} = ?</div>
                                </div>
                                <Keypad player={2} active={true} value={p2Answer} />
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
                                <img src={monsterImg} alt="Monster" className="w-40 h-40 object-contain"
                                    style={{
                                        mixBlendMode: 'multiply',
                                        filter: 'drop-shadow(0 0 25px rgba(255,0,0,0.3))'
                                    }}
                                />
                                <p className="font-black text-red-500 tracking-widest mt-2 text-sm uppercase">Boss Monster</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
