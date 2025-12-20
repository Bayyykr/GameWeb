import React from 'react';

const MagicAcademyBackground = ({ className = "" }) => {
    return (
        <svg
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="sky-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0F172A" />
                    <stop offset="100%" stopColor="#1E1B4B" />
                </linearGradient>
                <linearGradient id="aurora-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0" />
                    <stop offset="50%" stopColor="#818CF8" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="island-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4A3B69" />
                    <stop offset="100%" stopColor="#2D2244" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Sky Background */}
            <rect width="1000" height="600" fill="url(#sky-grad)" />

            {/* Aurora Effects */}
            <path d="M-100 150 Q200 -50 500 150 T1100 150" fill="none" stroke="url(#aurora-grad)" strokeWidth="150" opacity="0.4" className="animate-pulse" />
            <path d="M-100 300 Q300 100 600 300 T1100 300" fill="none" stroke="url(#aurora-grad)" strokeWidth="100" opacity="0.2" />

            {/* Distant Stars */}
            {[...Array(50)].map((_, i) => (
                <circle
                    key={i}
                    cx={Math.random() * 1000}
                    cy={Math.random() * 400}
                    r={Math.random() * 1.5}
                    fill="white"
                    opacity={Math.random()}
                    className="animate-sparkle"
                    style={{ animationDelay: `${Math.random() * 2}s` }}
                />
            ))}

            {/* Floating Islands */}
            {/* Island 1 - Left */}
            <g transform="translate(150, 400) scale(0.8)">
                <path d="M-100 0 C-100 50 -50 100 0 100 C50 100 100 50 100 0 Z" fill="url(#island-grad)" />
                <path d="M-100 0 C-100 -20 -50 -30 0 -30 C50 -30 100 -20 100 0 Z" fill="#5B4A7D" />
                {/* Tower */}
                <rect x="-30" y="-120" width="60" height="100" fill="#3D2E55" />
                <path d="M-40 -120 L0 -180 L40 -120 Z" fill="#6D5A8D" />
                <rect x="-10" y="-100" width="20" height="30" fill="#818CF8" opacity="0.6" filter="url(#glow)" />
            </g>

            {/* Island 2 - Center High */}
            <g transform="translate(500, 250) scale(0.6)" className="animate-magic-float">
                <path d="M-150 0 C-150 70 -80 140 0 140 C80 140 150 70 150 0 Z" fill="url(#island-grad)" />
                <path d="M-150 0 C-150 -30 -80 -45 0 -45 C80 -45 150 -30 150 0 Z" fill="#5B4A7D" />
                {/* Main Academy Building */}
                <rect x="-50" y="-150" width="100" height="120" fill="#3D2E55" />
                <path d="M-70 -150 L0 -240 L70 -150 Z" fill="#6D5A8D" />
                <circle cx="0" cy="-200" r="15" fill="#FBBF24" opacity="0.8" filter="url(#glow)" />
            </g>

            {/* Island 3 - Right */}
            <g transform="translate(850, 450) scale(0.9)">
                <path d="M-120 0 C-120 60 -60 120 0 120 C60 120 120 60 120 0 Z" fill="url(#island-grad)" />
                <path d="M-120 0 C-120 -25 -60 -35 0 -35 C60 -35 120 -25 120 0 Z" fill="#5B4A7D" />
                {/* Small Tower */}
                <rect x="-20" y="-90" width="40" height="70" fill="#3D2E55" />
                <path d="M-30 -90 L0 -140 L30 -90 Z" fill="#6D5A8D" />
            </g>

            {/* Magic Bridges (Lines) */}
            <path d="M220 380 Q500 250 800 420" fill="none" stroke="#818CF8" strokeWidth="2" strokeDasharray="10 10" opacity="0.3" className="animate-pulse" />
        </svg>
    );
};

export default MagicAcademyBackground;
