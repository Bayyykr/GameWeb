import React, { useState, useEffect } from 'react';

const WORD_PAIRS = [
    { id: 1, a: 'PANAS', b: 'DINGIN' },
    { id: 2, a: 'SIANG', b: 'MALAM' },
    { id: 3, a: 'BESAR', b: 'KECIL' },
    { id: 4, a: 'TINGGI', b: 'PENDEK' },
    { id: 5, a: 'PANJANG', b: 'PENDEK' },
    { id: 6, a: 'BERSIH', b: 'KOTOR' },
    { id: 7, a: 'CEPAT', b: 'LAMBAT' },
    { id: 8, a: 'MUDA', b: 'TUA' },
    { id: 9, a: 'KAYA', b: 'MISKIN' },
    { id: 10, a: 'HIDUP', b: 'MATI' },
    { id: 11, a: 'KANAN', b: 'KIRI' },
    { id: 12, a: 'ATAS', b: 'BAWAH' },
    { id: 13, a: 'MAJU', b: 'MUNDUR' },
    { id: 14, a: 'BUKA', b: 'TUTUP' },
    { id: 15, a: 'GELAP', b: 'TERANG' },
    { id: 16, a: 'KERAS', b: 'EMPUK' },
    { id: 17, a: 'BERAT', b: 'RINGAN' },
    { id: 18, a: 'GEMUK', b: 'KURUS' },
    { id: 19, a: 'JAUH', b: 'DEKAT' },
    { id: 20, a: 'BAIK', b: 'JAHAT' },
];

export default function PasangKataGame({ onExit }) {
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(180);
    const [gameState, setGameState] = useState('playing'); // 'playing', 'finished'
    const [streak, setStreak] = useState(0);
    const [message, setMessage] = useState('');
    const [matchedCount, setMatchedCount] = useState(0);

    // Initialize Game
    useEffect(() => {
        startNewRound();
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

    const startNewRound = () => {
        // Pick 6 random pairs for the board (12 cards total)
        const shuffledPairs = [...WORD_PAIRS].sort(() => 0.5 - Math.random()).slice(0, 10);

        let deck = [];
        shuffledPairs.forEach(pair => {
            deck.push({ id: `${pair.id}-a`, pairId: pair.id, text: pair.a, isFlipped: false, isMatched: false });
            deck.push({ id: `${pair.id}-b`, pairId: pair.id, text: pair.b, isFlipped: false, isMatched: false });
        });

        // Shuffle deck
        deck.sort(() => 0.5 - Math.random());
        setCards(deck);
        setMatchedCount(0);

        // Bonus time for clearing a round if not first round? Maybe simple scoring is enough.
    };

    const handleCardClick = (card) => {
        if (gameState !== 'playing' || card.isFlipped || card.isMatched || selectedCards.length >= 2) return;

        // Flip card
        const newCards = cards.map(c => c.id === card.id ? { ...c, isFlipped: true } : c);
        setCards(newCards);

        const newSelected = [...selectedCards, card];
        setSelectedCards(newSelected);

        if (newSelected.length === 2) {
            setTimeout(() => {
                checkMatch(newSelected, newCards);
            }, 800);
        }
    };

    const checkMatch = (selected, currentCards) => {
        const [card1, card2] = selected;

        if (card1.pairId === card2.pairId) {
            // Match found
            setScore(prev => prev + 10 + (streak * 2));
            setStreak(prev => prev + 1);


            const matchedCards = currentCards.map(c =>
                c.id === card1.id || c.id === card2.id ? { ...c, isMatched: true } : c
            );
            setCards(matchedCards);
            setSelectedCards([]);

            setMatchedCount(prev => {
                const newCount = prev + 1;
                if (newCount === 10) {
                    setTimeout(() => {
                        setMessage('RONDE BARU!');
                        startNewRound();
                        setTimeout(() => setMessage(''), 3000);
                    }, 3000);
                }
                return newCount;
            });


        } else {
            // No match
            setStreak(0);


            setTimeout(() => {
                setCards(prev => prev.map(c =>
                    c.id === card1.id || c.id === card2.id ? { ...c, isFlipped: false } : c
                ));
                setSelectedCards([]);

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
            <div className="bg-indigo-950 border-4 border-white/10 p-6 md:p-8 rounded-[3rem] shadow-2xl relative mt-4">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-black text-white italic drop-shadow-[0_4px_0_#1e1b4b] uppercase tracking-wider">
                        CARI PASANGAN LAWAN KATA
                    </h2>
                    <p className="text-indigo-300 font-bold">Cocokkan kata dengan lawan katanya!</p>
                </div>

                <div className="grid grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
                    {cards.map((card) => (
                        <button
                            key={card.id}
                            onClick={() => handleCardClick(card)}
                            disabled={card.isMatched || card.isFlipped}
                            className={`aspect-[4/3] rounded-2xl font-black text-xs md:text-xl border-t-4 transition-all duration-500 transform perspective-1000 flex items-center justify-center p-2
                                ${card.isMatched
                                    ? 'bg-transparent border-transparent text-transparent pointer-events-none scale-0'
                                    : card.isFlipped
                                        ? 'bg-amber-400 text-indigo-900 border-white/40 shadow-[0_4px_0_0_#92400e] rotate-y-180'
                                        : 'bg-indigo-600 text-transparent border-white/20 shadow-[0_6px_0_0_#1e1b4b] hover:-translate-y-1 hover:shadow-[0_10px_0_0_#1e1b4b] active:translate-y-1 active:shadow-none'
                                }`}
                        >
                            <span className={card.isFlipped ? 'rotate-y-180 inline-block' : 'hidden'}>{card.text}</span>
                            {!card.isFlipped && !card.isMatched && (
                                <span className="text-3xl md:text-5xl opacity-20 filter grayscale">❓</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Feedback Message */}
            {message && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[20000] pointer-events-none">
                    <div className={`px-12 py-6 rounded-[2rem] font-black text-4xl shadow-2xl animate-bounce tracking-widest uppercase border-8 
                        ${message.includes('SALAH') ? 'bg-red-500 border-red-300 text-white' : 'bg-green-500 border-green-300 text-white'}`}>
                        {message}
                    </div>
                </div>
            )}
        </div>
    );
}
