import React from 'react';

const WizardMascot = ({ className = "" }) => {
    return (
        <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Glow Effect */}
            <circle cx="100" cy="100" r="80" fill="url(#magic-glow)" opacity="0.4" />

            {/* Wizard Cloak */}
            <path d="M60 170L100 70L140 170H60Z" fill="url(#cloak-grad)" stroke="#4338CA" strokeWidth="2" />
            <path d="M60 170C60 170 80 175 100 175C120 175 140 170 140 170" stroke="#4338CA" strokeWidth="2" />

            {/* Arms */}
            <path d="M85 110L65 140" stroke="#4338CA" strokeWidth="6" strokeLinecap="round" />
            <path d="M115 110L135 140" stroke="#4338CA" strokeWidth="6" strokeLinecap="round" />

            {/* Hands */}
            <circle cx="65" cy="140" r="5" fill="#FDE68A" />
            <circle cx="135" cy="140" r="5" fill="#FDE68A" />

            {/* Magic Staff */}
            <path d="M135 150L135 80" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
            <circle cx="135" cy="75" r="8" fill="url(#crystal-grad)" className="animate-pulse" />
            <path d="M135 60V90M120 75H150" stroke="#FBBF24" strokeWidth="1" opacity="0.6" />

            {/* Head & Beard */}
            <path d="M100 100C110 100 115 90 115 80C115 70 108 65 100 65C92 65 85 70 85 80C85 90 90 100 100 100Z" fill="#FDE68A" />
            <path d="M85 80C85 110 100 125 100 125C100 125 115 110 115 80" fill="white" />
            <path d="M92 78C92 78 95 75 100 75C105 75 108 78 108 78" stroke="#78350F" strokeWidth="1" fill="none" />

            {/* Eyes */}
            <circle cx="95" cy="78" r="1.5" fill="#1E1B4B" />
            <circle cx="105" cy="78" r="1.5" fill="#1E1B4B" />

            {/* Hat */}
            <path d="M75 70C75 70 85 68 100 68C115 68 125 70 125 70L100 20L75 70Z" fill="url(#cloak-grad)" stroke="#4338CA" strokeWidth="2" />
            <path d="M70 75C70 75 85 70 100 70C115 70 130 75 130 75" stroke="#4338CA" strokeWidth="5" strokeLinecap="round" />

            {/* Stars on Hat */}
            <path d="M100 35L102 40L107 40L103 43L104 48L100 45L96 48L97 43L93 40L98 40L100 35Z" fill="#FBBF24" />

            <defs>
                <radialGradient id="magic-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="cloak-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#312E81" />
                </linearGradient>
                <radialGradient id="crystal-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="100%" stopColor="#D97706" />
                </radialGradient>
            </defs>
        </svg>
    );
};

export default WizardMascot;
