import React, { useState, useEffect } from 'react';

const WORDS = [
    { word: 'BUKU', hint: 'Benda untuk dibaca' },
    { word: 'MEJA', hint: 'Tempat menaruh barang' },
    { word: 'KURSI', hint: 'Tempat duduk' },
    { word: 'BOLA', hint: 'Benda bulat untuk olahraga' },
    { word: 'RUMAH', hint: 'Tempat tinggal' },
    { word: 'SEKOLAH', hint: 'Tempat belajar' },
    { word: 'GURU', hint: 'Orang yang mengajar' },
    { word: 'MURID', hint: 'Orang yang belajar' },
    { word: 'PENSIL', hint: 'Alat tulis' },
    { word: 'KAPUR', hint: 'Alat tulis di papan tulis' },
    { word: 'PAPAN', hint: 'Benda datar dan keras' },
    { word: 'KELAS', hint: 'Ruangan belajar' },
    { word: 'TAS', hint: 'Wadah membawa barang' },
    { word: 'SEPATU', hint: 'Alas kaki' },
    { word: 'BAJU', hint: 'Pakaian' },
];

export default function SusunKataGame({ onExit }) {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(90);
    const [gameState, setGameState] = useState('playing'); // 'playing', 'finished'
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [scrambledLetters, setScrambledLetters] = useState([]);
    const [selectedLetters, setSelectedLetters] = useState([]);
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
        const randomIdx = Math.floor(Math.random() * WORDS.length);
        const q = WORDS[randomIdx];
        setCurrentQuestion(q);

        // Scramble letters
        const letters = q.word.split('').map((char, index) => ({
            id: `${char}-${index}-${Math.random()}`,
            char: char,
            isUsed: false
        }));

        // Shuffle
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }

        setScrambledLetters(letters);
        setSelectedLetters([]);
    };

    const handleLetterClick = (letterObj) => {
        if (gameState !== 'playing' || letterObj.isUsed) return;

        // Mark as used
        const newScrambled = scrambledLetters.map(l =>
            l.id === letterObj.id ? { ...l, isUsed: true } : l
        );
        setScrambledLetters(newScrambled);

        // Add to selected
        setSelectedLetters([...selectedLetters, letterObj]);
    };

    const handleSelectedClick = (letterObj) => {
        if (gameState !== 'playing') return;

        // Remove from selected
        const newSelected = selectedLetters.filter(l => l.id !== letterObj.id);
        setSelectedLetters(newSelected);

        // Unmark used
        const newScrambled = scrambledLetters.map(l =>
            l.id === letterObj.id ? { ...l, isUsed: false } : l
        );
        setScrambledLetters(newScrambled);
    };

    const checkAnswer = () => {
        const answer = selectedLetters.map(l => l.char).join('');
        if (answer === currentQuestion.word) {
            setScore(prev => prev + 10 + (streak * 2));
            setStreak(prev => prev + 1);
            setMessage('BENAR!');
            setTimeout(() => {
                setMessage('');
                nextQuestion();
            }, 1000);
        } else {
            setStreak(0);
            setMessage('COBA LAGI!');
            // Reset selection
            setScrambledLetters(scrambledLetters.map(l => ({ ...l, isUsed: false })));
            setSelectedLetters([]);
            setTimeout(() => setMessage(''), 1000);
        }
    };

    const handleClear = () => {
        setScrambledLetters(scrambledLetters.map(l => ({ ...l, isUsed: false })));
        setSelectedLetters([]);
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
            <div className="bg-indigo-950 border-4 border-white/10 p-8 rounded-[3rem] shadow-2xl relative mt-4">
                <div className="text-center mb-8">
                    <span className="text-indigo-300 font-bold uppercase tracking-widest text-sm mb-2 block">PETUNJUK</span>
                    <h2 className="text-3xl md:text-4xl font-black text-white italic drop-shadow-[0_4px_0_#1e1b4b]">
                        "{currentQuestion?.hint}"
                    </h2>
                </div>

                {/* Answer Box */}
                <div className="min-h-[100px] bg-black/30 rounded-2xl border-2 border-white/10 mb-8 flex items-center justify-center gap-2 p-4 flex-wrap">
                    {selectedLetters.length === 0 && (
                        <span className="text-white/20 font-bold text-xl uppercase tracking-widest animate-pulse">Pilih huruf di bawah...</span>
                    )}
                    {selectedLetters.map((l) => (
                        <button
                            key={l.id}
                            onClick={() => handleSelectedClick(l)}
                            className="w-12 h-12 md:w-16 md:h-16 bg-pink-500 rounded-xl shadow-[0_4px_0_0_#831843] flex items-center justify-center text-white font-black text-2xl md:text-3xl border-t-2 border-white/30 hover:scale-105 transition-transform animate-pop"
                        >
                            {l.char}
                        </button>
                    ))}
                </div>

                {/* Scrambled Letters */}
                <div className="flex justify-center gap-3 flex-wrap mb-10">
                    {scrambledLetters.map((l) => (
                        <button
                            key={l.id}
                            onClick={() => handleLetterClick(l)}
                            disabled={l.isUsed}
                            className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center font-black text-3xl md:text-4xl border-t-4 transition-all duration-300
                                ${l.isUsed
                                    ? 'bg-indigo-900/50 text-indigo-800 border-transparent scale-90 cursor-default'
                                    : 'bg-indigo-600 text-white border-white/20 shadow-[0_6px_0_0_#1e1b4b] hover:-translate-y-2 hover:shadow-[0_10px_0_0_#1e1b4b] active:translate-y-1 active:shadow-none cursor-pointer'
                                }`}
                        >
                            {l.char}
                        </button>
                    ))}
                </div>

                {/* Controls */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={handleClear}
                        className="bg-yellow-500 hover:bg-yellow-400 text-indigo-950 px-8 py-4 rounded-2xl font-black text-xl shadow-[0_6px_0_0_#b45309] active:translate-y-1 active:shadow-none transition-all border-t-4 border-white/30 uppercase tracking-widest"
                    >
                        ULANG
                    </button>
                    <button
                        onClick={checkAnswer}
                        className="bg-green-500 hover:bg-green-400 text-white px-12 py-4 rounded-2xl font-black text-xl shadow-[0_6px_0_0_#15803d] active:translate-y-1 active:shadow-none transition-all border-t-4 border-white/30 uppercase tracking-widest"
                    >
                        CEK JAWABAN
                    </button>
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
                @keyframes pop {
                    0% { transform: scale(0.5); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-pop {
                    animation: pop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
            `}} />
        </div>
    );
}
