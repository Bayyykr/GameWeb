import React from 'react';
import { Link } from 'react-router-dom';

// Category Icons
import hitungAngkaImg from '../../assets/images/hitung_angka.png';
import bahasaKataImg from '../../assets/images/bahasa_kata.png';
import logikaFokusImg from '../../assets/images/logika_fokus.png';
import refleksKonsentrasiImg from '../../assets/images/refleks_konsentrasi.png';

// Game Icons
import battleSihirIcon from '../../assets/images/battle_sihir.png';
import balapAngkaIcon from '../../assets/images/balap_angka.png';
import labirinHitungIcon from '../../assets/images/labirin_hitung.png';
import pestaAngkaIcon from '../../assets/images/pesta_angka.png';
import susunKataIcon from '../../assets/images/susun_kata.png';
import tebakBendaIcon from '../../assets/images/tebak_benda.png';
import pasangKataIcon from '../../assets/images/pasang_kata.png';
import lengkapiPolaIcon from '../../assets/images/lengkapi_pola.png';
import cariBayanganIcon from '../../assets/images/cari_bayangan.png';
import sortirBarangIcon from '../../assets/images/sortir_barang.png';
import tangkapBintangIcon from '../../assets/images/tangkap_bintang.png';
import ketukCepatIcon from '../../assets/images/ketuk_cepat.png';
import warnaCocokIcon from '../../assets/images/warna_cocok.png';

function Games() {
    const allGames = [
        {
            category: 'Hitung Angka',
            catPath: 'hitung-angka',
            catIcon: hitungAngkaImg,
            color: 'blue',
            games: [
                { id: 'battle-sihir', title: 'Battle Sihir', icon: battleSihirIcon, desc: 'Battle matematika seru!' },
                { id: 'balap-angka', title: 'Balap Angka', icon: balapAngkaIcon, desc: 'Lari dengan hitungan.' },
                { id: 'labirin-hitung', title: 'Labirin Hitung', icon: labirinHitungIcon, desc: 'Cari jalan dengan angka.' },
                { id: 'pesta-angka', title: 'Pesta Angka', icon: pestaAngkaIcon, desc: 'Kumpulkan koin angka.' },
            ]
        },
        {
            category: 'Bahasa & Kata',
            catPath: 'bahasa-kata',
            catIcon: bahasaKataImg,
            color: 'purple',
            games: [
                { id: 'susun-kata', title: 'Susun Kata', icon: susunKataIcon, desc: 'Rangkai huruf jadi kata.' },
                { id: 'tebak-benda', title: 'Tebak Benda', icon: tebakBendaIcon, desc: 'Tebak nama dari gambar.' },
                { id: 'pasang-kata', title: 'Pasang Kata', icon: pasangKataIcon, desc: 'Cari pasangan kata.' },
            ]
        },
        {
            category: 'Logika & Fokus',
            catPath: 'logika-fokus',
            catIcon: logikaFokusImg,
            color: 'amber',
            games: [
                { id: 'lengkapi-pola', title: 'Lengkapi Pola', icon: lengkapiPolaIcon, desc: 'Temukan pola gambar.' },
                { id: 'cari-bayangan', title: 'Cari Bayangan', icon: cariBayanganIcon, desc: 'Cocokkan bayangan.' },
                { id: 'sortir-barang', title: 'Sortir Barang', icon: sortirBarangIcon, desc: 'Pisahkan benda-benda.' },
            ]
        },
        {
            category: 'Refleks & Konsentrasi',
            catPath: 'refleks-konsentrasi',
            catIcon: refleksKonsentrasiImg,
            color: 'rose',
            games: [
                { id: 'tangkap-bintang', title: 'Tangkap Bintang', icon: tangkapBintangIcon, desc: 'Tangkap bintang jatuh.' },
                { id: 'ketuk-cepat', title: 'Ketuk Cepat', icon: ketukCepatIcon, desc: 'Ketuk monster lincah.' },
                { id: 'warna-cocok', title: 'Warna Cocok', icon: warnaCocokIcon, desc: 'Pecahkan warna tepat.' },
            ]
        }
    ];

    const colorClasses = {
        blue: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
        purple: 'text-purple-400 border-purple-500/30 bg-purple-500/5',
        amber: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
        rose: 'text-rose-400 border-rose-500/30 bg-rose-500/5',
    };

    return (
        <div className="space-y-12 pb-20">
            <header className="text-center pt-8">
                <h1 className="text-6xl font-black text-white mb-4 tracking-tighter drop-shadow-[0_8px_0_#1e1b4b] uppercase italic">
                    SEMUA <span className="text-amber-400">PERMAINAN</span>
                </h1>
                <p className="text-slate-300 text-xl font-bold max-w-2xl mx-auto">
                    Pilih petualanganmu dari berbagai kategori sihir dan logika yang tersedia!
                </p>
            </header>

            <div className="space-y-16">
                {allGames.map((cat, idx) => (
                    <section key={idx}>
                        <div className="flex items-center gap-4 mb-8">
                            <img src={cat.catIcon} alt={cat.category} className="w-12 h-12 object-contain" />
                            <h2 className={`text-3xl font-black uppercase tracking-widest ${colorClasses[cat.color].split(' ')[0]}`}>
                                {cat.category}
                            </h2>
                            <div className="flex-grow h-1 bg-white/10 rounded-full ml-4"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {cat.games.map((game) => (
                                <Link
                                    key={game.id}
                                    to={`/category/${cat.catPath}?game=${game.id}&from=games`}
                                    className="group relative bg-indigo-950/50 backdrop-blur-sm border-2 border-white/10 rounded-[2.5rem] p-6 hover:-translate-y-2 transition-all duration-300 shadow-xl overflow-hidden"
                                >
                                    <div className="relative z-10 flex flex-col items-center text-center gap-4">
                                        <div className="w-24 h-24 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                            <img src={game.icon} alt={game.title} className="w-full h-full object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors uppercase italic">{game.title}</h3>
                                            <p className="text-slate-400 text-sm font-bold mt-1">{game.desc}</p>
                                        </div>
                                        <div className="mt-2 bg-white/10 text-white px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest group-hover:bg-amber-400 group-hover:text-indigo-950 transition-colors">
                                            Mainkan Sekarang
                                        </div>
                                    </div>
                                    <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-30 ${cat.color === 'blue' ? 'bg-blue-500' : cat.color === 'purple' ? 'bg-purple-500' : cat.color === 'amber' ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default Games;
