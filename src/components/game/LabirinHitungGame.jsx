import React, { useState, useEffect, useCallback } from 'react';
import mageAvatar from '../../assets/mage-avatar.png';
import gamestikImg from '../../assets/images/gamestik.png';

export default function LabirinHitungGame({ onExit }) {
    const [maze, setMaze] = useState([]);
    const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
    const [pendingMove, setPendingMove] = useState(null);
    const [question, setQuestion] = useState({ a: 0, b: 0, op: '+', answer: 0 });
    const [userAnswer, setUserAnswer] = useState('');
    const [gameState, setGameState] = useState('playing'); // 'playing', 'quiz', 'finished'
    const [message, setMessage] = useState('');

    // Generate a random 10x10 maze using DFS
    const generateNewMaze = useCallback(() => {
        const size = 10;
        const newMaze = Array(size).fill().map(() => Array(size).fill(1));

        const isSafe = (x, y) => x >= 0 && x < size && y >= 0 && y < size;

        const walk = (x, y) => {
            newMaze[y][x] = 0;

            // Standard directions for maze carving (2 steps at a time)
            const dirs = [
                [0, 1], [0, -1], [1, 0], [-1, 0]
            ].sort(() => Math.random() - 0.5);

            for (const [dx, dy] of dirs) {
                const nx = x + dx * 2;
                const ny = y + dy * 2;

                if (isSafe(nx, ny) && newMaze[ny][nx] === 1) {
                    newMaze[y + dy][x + dx] = 0;
                    walk(nx, ny);
                }
            }
        };

        walk(0, 0);

        // Ensure path to end and valid Start/Exit markers
        newMaze[0][0] = 2; // Start

        // Ensure (9,9) is always the single goal (3)
        if (newMaze[9][9] === 1) {
            newMaze[9][9] = 3;
            // Carve a path to ensure reachability
            if (newMaze[8][9] === 1 && newMaze[9][8] === 1) {
                newMaze[8][9] = 0;
            }
        } else {
            newMaze[9][9] = 3;
        }

        setMaze(newMaze);
        setPlayerPos({ x: 0, y: 0 });
    }, []);

    useEffect(() => {
        generateNewMaze();
    }, [generateNewMaze]);

    const generateQuestion = useCallback(() => {
        const difficulty = 15;
        let a = Math.floor(Math.random() * difficulty) + 1;
        let b = Math.floor(Math.random() * difficulty) + 1;
        const op = Math.random() > 0.5 ? '+' : '-';

        if (op === '-' && a < b) [a, b] = [b, a];

        const answer = op === '+' ? a + b : a - b;
        setQuestion({ a, b, op, answer });
        setUserAnswer('');
    }, []);

    const handleMove = (dx, dy) => {
        if (gameState !== 'playing' || !maze.length) return;

        const newX = playerPos.x + dx;
        const newY = playerPos.y + dy;

        // Boundary and wall check
        if (newX >= 0 && newX < 10 && newY >= 0 && newY < 10 && maze[newY][newX] !== 1) {
            setPendingMove({ x: newX, y: newY });
            generateQuestion();
            setGameState('quiz');
        }
    };

    const handleNumberClick = (num) => {
        if (userAnswer.length < 3) setUserAnswer(prev => prev + num);
    };

    const handleClear = () => setUserAnswer('');

    const handleSubmit = () => {
        if (parseInt(userAnswer) === question.answer) {
            setPlayerPos(pendingMove);
            if (maze[pendingMove.y][pendingMove.x] === 3) {
                setGameState('finished');
            } else {
                setGameState('playing');
                setMessage('Benar! Silakan lanjut.');
                setTimeout(() => setMessage(''), 1000);
            }
        } else {
            setMessage('Salah! Coba lagi.');
            setUserAnswer('');
            setTimeout(() => setMessage(''), 1000);
        }
    };

    // Keyboard support for movement
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameState !== 'playing') return;
            switch (e.key) {
                case 'ArrowUp': handleMove(0, -1); break;
                case 'ArrowDown': handleMove(0, 1); break;
                case 'ArrowLeft': handleMove(-1, 0); break;
                case 'ArrowRight': handleMove(1, 0); break;
                default: break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState, playerPos, pendingMove, maze]);

    if (gameState === 'finished') {
        return (
            <div className="fixed inset-0 bg-slate-950/90 flex items-center justify-center z-[10000] p-4 backdrop-blur-xl">
                <div className="bg-indigo-950 p-8 rounded-[3rem] border-8 border-emerald-400 shadow-[0_20px_0_0_rgba(0,0,0,0.5)] text-center max-w-lg w-full">
                    <h2 className="text-5xl font-black text-white mb-4 italic uppercase tracking-tighter drop-shadow-[0_8px_0_#1e1b4b]">
                        HEBAT!
                    </h2>
                    <p className="text-emerald-400 text-3xl font-black mb-8 drop-shadow-md">
                        LABIRIN SELESAI!
                    </p>
                    <button onClick={onExit} className="bg-red-500 hover:bg-red-600 text-white px-8 py-3.5 rounded-2xl font-black text-xl shadow-[0_6px_0_0_#991b1b] active:translate-y-1 active:shadow-none transition-all border-t-4 border-white/30 uppercase tracking-widest w-full">KEMBALI KE MENU</button>
                </div>
            </div>
        );
    }

    if (!maze.length) return null;

    return (
        <div className="relative w-full max-w-5xl mx-auto p-4 flex flex-col gap-6">
            <div className="flex justify-between items-center bg-indigo-950/80 p-3 rounded-2xl border-2 border-white/20 shadow-2xl backdrop-blur-md">
                <button onClick={onExit} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-black text-xs shadow-[0_4px_0_0_#991b1b] active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest">KELUAR</button>
                <div className="bg-black/40 px-8 py-2 rounded-xl border-2 border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                    <span className="text-emerald-400 font-black text-xl italic tracking-widest uppercase">Petualangan Labirin Acak</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Maze Area */}
                <div className="bg-indigo-950 border-8 border-emerald-400/30 p-4 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-square">
                    <div className="grid grid-cols-10 grid-rows-10 h-full gap-1">
                        {maze.map((row, y) => row.map((cell, x) => (
                            <div
                                key={`${x}-${y}`}
                                className={`rounded-md flex items-center justify-center transition-all duration-300 ${cell === 1 ? 'bg-slate-900 border-2 border-slate-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]' :
                                    cell === 2 ? 'bg-amber-400 border-b-4 border-amber-600' :
                                        cell === 3 ? 'bg-emerald-500 border-b-4 border-emerald-700 animate-pulse' :
                                            'bg-white/5 border border-white/5'
                                    }`}
                            >
                                {playerPos.x === x && playerPos.y === y && (
                                    <div className="w-full h-full p-1 animate-bounce">
                                        <img src={mageAvatar} alt="player" className="w-full h-full object-contain drop-shadow-xl" />
                                    </div>
                                )}
                                {cell === 3 && playerPos.x !== x && playerPos.y !== y && (
                                    <span className="text-white font-black text-[10px] drop-shadow-md">FINISH</span>
                                )}
                            </div>
                        )))}
                    </div>
                </div>

                {/* Control / Quiz Area */}
                <div className="flex flex-col gap-4">
                    {gameState === 'quiz' ? (
                        <div className="bg-indigo-950 border-4 border-emerald-400 p-6 rounded-[2rem] shadow-2xl relative animate-in fade-in zoom-in duration-300">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-1 rounded-lg text-xs font-black uppercase tracking-widest border-2 border-white/20">KONFIRMASI JALAN</div>
                            <div className="bg-indigo-900/50 p-4 rounded-2xl text-center mb-4 border-2 border-white/5">
                                <div className="text-2xl font-black text-white italic">{question.a} {question.op} {question.b} = ?</div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'OK'].map((btn) => (
                                    <button
                                        key={btn}
                                        onClick={() => {
                                            if (btn === 'C') handleClear();
                                            else if (btn === 'OK') handleSubmit();
                                            else handleNumberClick(btn);
                                        }}
                                        className={`font-black p-4 rounded-xl shadow-[0_4px_0_0_#1e1b4b] active:translate-y-1 active:shadow-none transition-all text-xl ${btn === 'C' ? 'bg-red-500 text-white' :
                                            btn === 'OK' ? 'bg-emerald-500 text-white' :
                                                'bg-indigo-800 text-white hover:bg-indigo-700'
                                            }`}
                                    >
                                        {btn}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4 bg-black/40 p-3 rounded-xl border-2 border-white/10 text-center">
                                <span className="text-3xl font-black text-emerald-400 tracking-widest min-h-[1.2em] block">
                                    {userAnswer || '...'}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-indigo-950/50 border-4 border-dashed border-white/20 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center h-full">
                            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse p-4">
                                <img src={gamestikImg} alt="control" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2 italic">GUNAKAN ARAH</h3>
                            <p className="text-indigo-200 font-bold">Gunakan tombol panah atau klik area sekitar untuk bergerak ke arah lain!</p>

                            <div className="grid grid-cols-3 gap-2 mt-8">
                                <div />
                                <button onClick={() => handleMove(0, -1)} className="w-16 h-16 bg-indigo-800 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg hover:bg-indigo-700 active:scale-95">▲</button>
                                <div />
                                <button onClick={() => handleMove(-1, 0)} className="w-16 h-16 bg-indigo-800 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg hover:bg-indigo-700 active:scale-95">◀</button>
                                <button onClick={() => handleMove(0, 1)} className="w-16 h-16 bg-indigo-800 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg hover:bg-indigo-700 active:scale-95">▼</button>
                                <button onClick={() => handleMove(1, 0)} className="w-16 h-16 bg-indigo-800 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg hover:bg-indigo-700 active:scale-95">▶</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className={`p-4 rounded-2xl text-center font-black text-white uppercase tracking-widest animate-bounce mt-auto ${message.includes('Salah') ? 'bg-red-500' : 'bg-emerald-500'}`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
