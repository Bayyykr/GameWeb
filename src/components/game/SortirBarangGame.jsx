import React, { useState, useEffect } from 'react';

export default function SortirBarangGame({ onExit }) {
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    // Categories
    const CATEGORIES = {
        left: { id: 'fruit', label: 'BUAH 🍎', items: ['🍎', '🍌', '🍇', '🍉', '🍊', '🍓'] },
        right: { id: 'veg', label: 'SAYUR 🥕', items: ['🥕', '🥦', '🌽', '🍆', '🥒', '🥬'] }
    };

    const TOTAL_ITEMS = 10;

    useEffect(() => {
        // Generate random list of items to sort
        const list = [];
        for (let i = 0; i < TOTAL_ITEMS; i++) {
            const isLeft = Math.random() > 0.5;
            const category = isLeft ? CATEGORIES.left : CATEGORIES.right;
            const item = category.items[Math.floor(Math.random() * category.items.length)];
            list.push({ id: i, icon: item, type: category.id });
        }
        setItems(list);
        setCurrentItem(list[0]);
    }, []);

    const handleSort = (direction) => { // 'left' or 'right'
        if (isAnimating || !currentItem) return;

        const targetCategory = CATEGORIES[direction].id;
        const correct = currentItem.type === targetCategory;

        if (correct) {
            setScore(score + 1);
            setMessage('BENAR!');
            setIsAnimating(true);
            setTimeout(() => {
                setMessage('');
                setIsAnimating(false);
                const nextIndex = items.indexOf(currentItem) + 1;
                if (nextIndex < items.length) {
                    setCurrentItem(items[nextIndex]);
                } else {
                    setGameOver(true);
                }
            }, 600);
        } else {
            setMessage('UPS! SALAH KOTAK');
            setTimeout(() => setMessage(''), 800);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="bg-indigo-950/90 p-8 rounded-[3rem] border-8 border-amber-400 shadow-2xl max-w-4xl w-full relative backdrop-blur-sm flex flex-col items-center">

                {/* Header */}
                <div className="w-full flex justify-between items-center mb-8 bg-indigo-900/50 p-4 rounded-2xl border-2 border-white/10">
                    <button onClick={onExit} className="bg-red-500 text-white px-6 py-2 rounded-xl font-black shadow-[0_4px_0_0_#991b1b] active:translate-y-1 transition-all">
                        KELUAR
                    </button>
                    <div className="text-amber-400 font-black text-2xl uppercase tracking-widest drop-shadow-md">
                        Skor: {score}
                    </div>
                </div>

                {!gameOver ? (
                    <>
                        <h2 className="text-3xl font-black text-white mb-8 text-center drop-shadow-md">PISAHKAN BUAH & SAYUR</h2>

                        {/* Game Area */}
                        <div className="flex justify-between items-end w-full gap-8 h-96 relative">

                            {/* Left Bin */}
                            <button
                                onClick={() => handleSort('left')}
                                className="w-1/3 h-64 bg-rose-500 rounded-t-[3rem] border-4 border-white/20 flex flex-col items-center justify-end p-6 hover:bg-rose-400 active:scale-95 transition-all shadow-xl group"
                            >
                                <div className="text-6xl mb-4 group-hover:-translate-y-2 transition-transform">🍎</div>
                                <div className="text-white font-black text-xl uppercase">BUAH</div>
                            </button>

                            {/* Item to Sort */}
                            <div className="flex-grow h-full flex items-center justify-center relative">
                                {currentItem && (
                                    <div className={`w-32 h-32 bg-white rounded-full flex items-center justify-center text-7xl shadow-2xl border-8 border-indigo-400 z-10 
                                        ${isAnimating ? 'scale-0 opacity-0 separate-animation' : 'animate-bounce-slow'}`}
                                    >
                                        {currentItem.icon}
                                    </div>
                                )}
                                {/* Conveyor Belt Look */}
                                <div className="absolute bottom-10 left-0 w-full h-4 bg-gray-700 rounded-full"></div>
                            </div>

                            {/* Right Bin */}
                            <button
                                onClick={() => handleSort('right')}
                                className="w-1/3 h-64 bg-emerald-500 rounded-t-[3rem] border-4 border-white/20 flex flex-col items-center justify-end p-6 hover:bg-emerald-400 active:scale-95 transition-all shadow-xl group"
                            >
                                <div className="text-6xl mb-4 group-hover:-translate-y-2 transition-transform">🥕</div>
                                <div className="text-white font-black text-xl uppercase">SAYUR</div>
                            </button>
                        </div>

                        <div className="mt-8 text-indigo-300 font-bold animate-pulse text-lg">
                            Klik kotak yang sesuai!
                        </div>

                        {/* Feedback */}
                        {message && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
                                <div className={`px-8 py-4 text-3xl font-black text-white rounded-2xl shadow-xl animate-bounce border-4 ${message.includes('BENAR') ? 'bg-emerald-500' : 'bg-red-500'}`}>
                                    {message}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center animate-in fade-in zoom-in duration-500">
                        <div className="text-8xl mb-6">🧺</div>
                        <h2 className="text-5xl font-black text-amber-400 mb-4">SELESAI!</h2>
                        <p className="text-white text-2xl font-bold mb-8">Kamu berhasil menyortir {score} barang!</p>
                        <button onClick={onExit} className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black text-2xl shadow-[0_8px_0_0_#065f46] hover:scale-105 active:translate-y-1 transition-all">
                            MENU UTAMA
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
