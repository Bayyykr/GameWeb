import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import hitungAngkaImg from '../../assets/images/hitung_angka.png';
import ModeSelectionModal from '../../components/game/ModeSelectionModal';
import BattleSihirGame from '../../components/game/BattleSihirGame';
import BalapAngkaGame from '../../components/game/BalapAngkaGame';
import LabirinHitungGame from '../../components/game/LabirinHitungGame';
import PestaAngkaGame from '../../components/game/PestaAngkaGame';
import magicBg from '../../assets/images/magic_bg.jpg';

// Mode Icons
import battleSihirIcon from '../../assets/images/battle_sihir.png';
import balapAngkaIcon from '../../assets/images/balap_angka.png';
import labirinHitungIcon from '../../assets/images/labirin_hitung.png';
import pestaAngkaIcon from '../../assets/images/pesta_angka.png';
import mageAvatar from '../../assets/mage-avatar.png';

const TrophyIcon = () => (
    <svg viewBox="0 0 24 24" className="w-10 h-10 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9V7h12v2c0 3-2 5-5 5h-2c-3 0-5-2-5-5z" fill="#facc15" stroke="#92400e" strokeWidth="1" />
        <path d="M12 14v4M9 20h6" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 7H4v3c0 1 1 2 2 2M18 7h2v3c0 1-1 2-2 2" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

function HitungAngka() {
    const [showModal, setShowModal] = useState(false);
    const [selectedMode, setSelectedMode] = useState(null);
    const [gameMode, setGameMode] = useState(null);

    const gameModes = [
        {
            id: 'battle-sihir',
            title: 'Battle Sihir',
            description: 'Kalahkan monster dengan merapal mantra matematika!',
            icon: <img src={battleSihirIcon} alt="Battle Sihir" className="w-20 h-20 object-contain drop-shadow-xl" />,
            color: 'from-orange-400 to-rose-600',
            shadow: 'shadow-rose-900/40'
        },
        {
            id: 'balap-angka',
            title: 'Balap Angka',
            description: 'Berlari secepat kilat dengan jawaban yang tepat.',
            icon: <img src={balapAngkaIcon} alt="Balap Angka" className="w-20 h-20 object-contain drop-shadow-xl" />,
            color: 'from-blue-400 to-indigo-600',
            shadow: 'shadow-indigo-900/40'
        },
        {
            id: 'labirin-hitung',
            title: 'Labirin Hitung',
            description: 'Cari jalan keluar dengan memecahkan teka-teki logika.',
            icon: <img src={labirinHitungIcon} alt="Labirin Hitung" className="w-20 h-20 object-contain drop-shadow-xl" />,
            color: 'from-emerald-400 to-teal-600',
            shadow: 'shadow-teal-900/40'
        },
        {
            id: 'pesta-angka',
            title: 'Pesta Angka',
            description: 'Kumpulkan koin sebanyak-banyaknya dalam waktu terbatas.',
            icon: <img src={pestaAngkaIcon} alt="Pesta Angka" className="w-20 h-20 object-contain drop-shadow-xl" />,
            color: 'from-amber-300 to-yellow-600',
            shadow: 'shadow-amber-900/40'
        }
    ];

    const handleModeClick = (modeId) => {
        if (modeId === 'labirin-hitung' || modeId === 'pesta-angka') {
            setSelectedMode(modeId);
            setGameMode('normal'); // Bypass modal with a default mode
        } else if (modeId === 'battle-sihir' || modeId === 'balap-angka') {
            setSelectedMode(modeId);
            setShowModal(true);
        } else {
            alert('Mode belum diimplementasikan');
        }
    };

    const handleSelect = (mode) => {
        setGameMode(mode);
        setShowModal(false);
    };

    const handleExitGame = () => {
        setGameMode(null);
        setSelectedMode(null);
    };

    // Fail-safe to hide navbar/footer
    useEffect(() => {
        if (gameMode) {
            document.body.classList.add('hide-ui-for-game');
        } else {
            document.body.classList.remove('hide-ui-for-game');
        }
        return () => document.body.classList.remove('hide-ui-for-game');
    }, [gameMode]);

    return (
        <div className="space-y-12 pb-12">
            {!gameMode && (
                <>
                    {/* Header / Hero Section */}
                    <header className="relative bg-indigo-950 rounded-[4rem] p-12 overflow-hidden border-8 border-amber-400 shadow-[0_20px_0_0_rgba(0,0,0,0.3)]">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 opacity-50"></div>
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px]"></div>
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px]"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                            <div className="flex-shrink-0 animate-bounce-slow">
                                <img src={hitungAngkaImg} alt="Hitung Angka" className="w-56 h-56 md:w-72 md:h-72 object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]" />
                            </div>
                            <div className="text-center md:text-left">
                                <Link to="/" className="group inline-flex items-center bg-red-500 text-white px-8 py-3 rounded-2xl font-black text-sm mb-8 shadow-[0_6px_0_0_#991b1b] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all border-t-2 border-white/30 uppercase tracking-widest whitespace-nowrap">
                                    <span className="mr-3 text-xl group-hover:-translate-x-1 transition-transform">◀</span> KEMBALI
                                </Link>
                                <h1 className="text-5xl md:text-8xl font-black text-white mb-4 tracking-tighter drop-shadow-[0_8px_0_#1e1b4b] uppercase italic leading-none">
                                    DUNIA <br /><span className="text-amber-400 drop-shadow-[0_8px_0_#92400e]">HITUNG ANGKA</span>
                                </h1>
                                <div className="inline-block bg-black/40 px-6 py-2 rounded-xl backdrop-blur-md border border-white/10 mt-2">
                                    <p className="text-amber-200 text-lg font-bold tracking-wide">
                                        Selamat datang di dimensi matematika! Disini angka adalah kekuatan sihirmu.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Game Modes Grid */}
                    <section>
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-10 w-4 bg-amber-400 rounded-full shadow-[0_0_15px_#fbbf24]"></div>
                            <h2 className="text-4xl font-black text-white tracking-widest uppercase drop-shadow-[0_4px_0_#1e1b4b]">PILIH MODE</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {gameModes.map((mode) => (
                                <div
                                    key={mode.id}
                                    className="group relative bg-indigo-950 border-4 border-white/10 rounded-[3rem] p-1 shadow-[0_12px_0_0_#1e1b4b] hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
                                    onClick={() => handleModeClick(mode.id)}
                                >
                                    <div className="bg-indigo-900/40 rounded-[2.8rem] p-8 flex items-center gap-8 border-4 border-transparent group-hover:border-amber-400/30 transition-colors h-full">
                                        <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${mode.color} flex items-center justify-center shadow-2xl ${mode.shadow} transform group-hover:rotate-6 transition-transform border-t-4 border-white/40 shrink-0`}>
                                            {mode.icon}
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-3xl font-black text-white mb-2 uppercase italic tracking-tight group-hover:text-amber-400 transition-colors drop-shadow-[0_3px_0_#000]">{mode.title}</h3>
                                            <p className="text-indigo-200 font-bold leading-snug">{mode.description}</p>
                                        </div>
                                        <div className="bg-amber-400 p-5 rounded-3xl shadow-[0_6px_0_0_#92400e] border-t-2 border-white/40 group-hover:scale-110 active:translate-y-1 active:shadow-none transition-all shrink-0">
                                            <span className="text-indigo-950 text-3xl font-black inline-block">▶</span>
                                        </div>
                                    </div>
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${mode.color} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity`}></div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Modal for mode selection */}
                    {showModal && (
                        <ModeSelectionModal onSelect={handleSelect} onClose={() => setShowModal(false)} />
                    )}

                    {/* Achievement Footer */}
                    <section className="bg-indigo-950 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between border-8 border-amber-400 shadow-[0_15px_0_0_rgba(0,0,0,0.3)] mt-12 overflow-hidden relative group">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-amber-400/5 to-transparent"></div>
                        <div className="flex items-center gap-8 mb-8 md:mb-0 relative z-10">
                            <div className="w-24 h-24 bg-gradient-to-br from-amber-300 to-yellow-600 rounded-[2rem] flex items-center justify-center shadow-2xl border-t-4 border-white/40 transform group-hover:-rotate-12 transition-transform">
                                <TrophyIcon />
                            </div>
                            <div>
                                <h4 className="text-amber-400 font-black text-4xl uppercase tracking-tighter drop-shadow-[0_4px_0_#000] italic">Ranking Global</h4>
                                <p className="text-indigo-200 font-bold text-lg">Uji kemampuanmu melawan penyihir seluruh dunia!</p>
                            </div>
                        </div>
                        <button className="w-full md:w-auto bg-amber-400 text-indigo-950 px-12 py-5 rounded-[2rem] font-black text-xl shadow-[0_8px_0_0_#92400e] hover:-translate-y-2 hover:shadow-[0_12px_0_0_#92400e] transition-all active:translate-y-1 active:shadow-none border-t-4 border-white/40 uppercase tracking-widest relative z-10">Buka Papan Peringkat</button>
                    </section>
                </>
            )}
            {gameMode && (
                typeof document !== 'undefined' ? createPortal(
                    <div
                        className="fixed inset-0 z-[100000] bg-fixed bg-cover bg-center overflow-y-auto flex flex-col items-center justify-start md:pt-10 p-4 pb-32"
                        style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url(${magicBg})` }}
                    >
                        {/* Game Components */}
                        {selectedMode === 'battle-sihir' && (
                            <BattleSihirGame mode={gameMode} onExit={handleExitGame} />
                        )}
                        {selectedMode === 'balap-angka' && (
                            <BalapAngkaGame mode={gameMode} onExit={handleExitGame} />
                        )}
                        {selectedMode === 'labirin-hitung' && (
                            <LabirinHitungGame mode={gameMode} onExit={handleExitGame} />
                        )}
                        {selectedMode === 'pesta-angka' && (
                            <PestaAngkaGame mode={gameMode} onExit={handleExitGame} />
                        )}
                    </div>,
                    document.body
                ) : null
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s ease-in-out infinite;
                }
                /* Hide global UI when game is active */
                body.hide-ui-for-game nav,
                body.hide-ui-for-game footer {
                    display: none !important;
                }
                body.hide-ui-for-game {
                    overflow: hidden !important;
                }
            `}} />
        </div>
    );
}

export default HitungAngka;
