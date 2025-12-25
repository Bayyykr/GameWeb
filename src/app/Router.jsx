import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from '../pages/Home/Home'
import HitungAngka from '../pages/Category/HitungAngka'
import BahasaKata from '../pages/Category/BahasaKata'
import LogikaFokus from '../pages/Category/LogikaFokus'
import RefleksKonsentrasi from '../pages/Category/RefleksKonsentrasi'
import Games from '../pages/Games/Games'
import Profile from '../pages/Profile/Profile'
import Settings from '../pages/Settings/Settings'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="games" element={<Games />} />
                    <Route path="category/hitung-angka" element={<HitungAngka />} />
                    <Route path="category/bahasa-kata" element={<BahasaKata />} />
                    <Route path="category/logika-fokus" element={<LogikaFokus />} />
                    <Route path="category/refleks-konsentrasi" element={<RefleksKonsentrasi />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
