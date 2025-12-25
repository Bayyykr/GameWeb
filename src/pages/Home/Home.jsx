import React from 'react'
import { Link } from 'react-router-dom'
import AnimatedBanner from './AnimatedBanner'
import CategoryCard from '../../components/ui/CategoryCard'
import hitungAngkaImg from '../../assets/images/hitung_angka.png'
import bahasaKataImg from '../../assets/images/bahasa_kata.png'
import logikaFokusImg from '../../assets/images/logika_fokus.png'
import refleksKonsentrasiImg from '../../assets/images/refleks_konsentrasi.png'
import pratinjauGameImg from '../../assets/pratinjau_game.png'

function Home() {
    const categories = [
        {
            title: 'Hitung Angka',
            description: 'Latih kemampuan matematika dengan battle sihir dan balap angka!',
            category: 'hitung-angka',
            color: 'blue',
            icon: hitungAngkaImg
        },
        {
            title: 'Bahasa & Kata',
            description: 'Asah kosa kata dengan sambung kata dan susun kalimat seru.',
            category: 'bahasa-kata',
            color: 'purple',
            icon: bahasaKataImg
        },
        {
            title: 'Logika & Fokus',
            description: 'Uji ketajaman pola dan daya ingat melalui labirin otak.',
            category: 'logika-fokus',
            color: 'amber',
            icon: logikaFokusImg
        },
        {
            title: 'Refleks & Konsentrasi',
            description: 'Tingkatkan kecepatan refleks dan fokus dalam tantangan cepat.',
            category: 'refleks-konsentrasi',
            color: 'rose',
            icon: refleksKonsentrasiImg
        }
    ]

    return (
        <div className="space-y-16">
            <AnimatedBanner />

            <section id="dunia-belajar">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-4xl font-black text-white tracking-tight drop-shadow-[0_4px_0_#1e1b4b]">PILIH DUNIA BELAJARMU</h2>
                        <p className="text-slate-300 font-bold text-lg mt-2">Pilih tantangan dan kumpulkan poin pengalaman!</p>
                    </div>
                    <Link to="/games" className="bg-amber-400 text-indigo-950 px-6 py-2 rounded-xl font-black shadow-[0_4px_0_0_#92400e] hover:scale-105 transition-transform active:translate-y-1 active:shadow-none border-2 border-white/20">
                        LIHAT SEMUA
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((cat, index) => (
                        <CategoryCard key={index} {...cat} />
                    ))}
                </div>
            </section>

            {/* Featured Section */}
            <section className="bg-gradient-to-br from-indigo-900/90 to-purple-900/90 rounded-[4rem] p-12 text-white relative overflow-hidden border-4 border-white/10 shadow-2xl backdrop-blur-md">
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-[100px]"></div>
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="bg-rose-500 text-white px-4 py-1 rounded-full text-xs font-black inline-block mb-4 shadow-lg border-2 border-white/20">HOT CONTENT</div>
                        <h2 className="text-5xl font-black mb-6 drop-shadow-[0_4px_0_#1e1b4b]">BATTLE SIHIR MATEMATIKA</h2>
                        <p className="text-slate-200 text-xl mb-10 leading-relaxed font-bold">
                            モンスター (Monster) sedang menyerang! Gunakan kecepatan hitunganmu untuk merapal mantra api dan es. Lindungi akademi!
                        </p>
                        <Link to="/games" className="bg-gradient-to-b from-green-400 to-green-600 text-white px-10 py-5 rounded-[2rem] text-2xl font-black shadow-[0_8px_0_0_#166534] transition-all hover:scale-110 active:translate-y-2 active:shadow-none border-t-4 border-white/40">
                            MAIN SEKARANG
                        </Link>
                    </div>
                    <div className="bg-indigo-950/80 rounded-[3rem] border-4 border-white/10 h-80 flex flex-col items-center justify-center relative group overflow-hidden shadow-2xl">
                        <img
                            src={pratinjauGameImg}
                            alt="Pratinjau Game"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
