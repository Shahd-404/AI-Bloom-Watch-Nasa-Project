import React, { useEffect, useState } from 'react';
import { Flower, Sparkles } from 'lucide-react';

const SplashScreen = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [showFlower, setShowFlower] = useState(false);
    const [showText, setShowText] = useState(false);
    const [showStar, setShowStar] = useState(false);
    const [exitAnimation, setExitAnimation] = useState(false);
    const [moveRight, setMoveRight] = useState(false);

    useEffect(() => {
        const flowerTimer = setTimeout(() => {
            setShowFlower(true);
        }, 300);

        const textTimer = setTimeout(() => {
            setShowText(true);
        }, 2300);

        const starTimer = setTimeout(() => {
            setShowStar(true);
        }, 3500);

        const moveTimer = setTimeout(() => {
            setMoveRight(true);
        }, 4500);

        const hideTimer = setTimeout(() => {
            setExitAnimation(true);
            setTimeout(() => {
                setIsVisible(false);
                if (onComplete) {
                    onComplete();
                }
            }, 1000);
        }, 7300);

        return () => {
            clearTimeout(flowerTimer);
            clearTimeout(textTimer);
            clearTimeout(starTimer);
            clearTimeout(moveTimer);
            clearTimeout(hideTimer);
        };
    }, [onComplete]);

    if (!isVisible) {
        return null;
    }

    const bloomLetters = "Bloom".split("");
    const watchLetters = "Watch".split("");

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${exitAnimation ? 'splash-exit' : ''}`} style={{
            backgroundColor: '#000000',
            backgroundImage: `
                linear-gradient(to bottom right, rgba(255, 255, 255, 0.7) 0%, transparent 20%),
                linear-gradient(to top left, rgba(255, 255, 255, 0.7) 0%, transparent 20%)
            `,
            backgroundPosition: `0 0, 100% 100%`,
            backgroundSize: `50% 50%`,
            backgroundRepeat: `no-repeat`,
        }}>
            {/* هذه هي الطبقة الزجاجية الجديدة */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backdropFilter: 'blur(10px)', // درجة الضباب
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // لون شبه شفاف
                zIndex: 49, // تأكد من أنها تحت المحتوى الرئيسي
            }}></div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

                @keyframes flower-fill-diagonal {
                    from {
                        -webkit-mask-position: 100% 100%;
                        mask-position: 100% 100%;
                    }
                    to {
                        -webkit-mask-position: 0% 0%;
                        mask-position: 0% 0%;
                    }
                }
                @keyframes unveil-fill {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes move-right {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(150px);
                    }
                }
                @keyframes move-left {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-150px);
                    }
                }
                @keyframes line-unveil {
                    from {
                        height: 0;
                    }
                    to {
                        height: 250px;
                    }
                }

                .main-logo-container {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    z-index: 51; /* تأكد من أن المحتوى الرئيسي فوق الطبقة الزجاجية */
                }
                .main-logo-text-wrapper {
                    display: flex;
                    align-items: center;
                    margin-top: -1.5rem;
                }
                .main-logo-text {
                    font-family: 'Poppins', sans-serif;
                    font-weight: 700;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
                    display: flex;
                    white-space: nowrap;
                }
                .main-logo-text-wrapper.move-right {
                    animation: move-right 1s ease-in-out forwards;
                }
                .unveiling-letter {
                    display: inline-block;
                    opacity: 0;
                    transform: translateY(20px);
                }
                .splash-exit {
                    transform: translateX(100%);
                    opacity: 0;
                    transition: transform 1s ease-in-out, opacity 0.5s ease-in-out;
                }
                .flower-fill-container {
                    position: relative;
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                }
                .flower-fill-container.move-left {
                    animation: move-left 1s ease-in-out forwards;
                }
                .flower-fill-top {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    color: #FFD700;
                    -webkit-mask-image: linear-gradient(135deg, transparent 50%, #000 50%);
                    mask-image: linear-gradient(135deg, transparent 50%, #000 50%);
                    -webkit-mask-size: 200% 200%;
                    mask-size: 200% 200%;
                    animation: flower-fill-diagonal 2s ease-out forwards;
                }
                .flower-line {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(45deg);
                    width: 2px;
                    height: 0;
                    background-color: #FFFFFF;
                    animation: line-unveil 1s ease-in-out forwards;
                    display: none;
                }
                .flower-line.show-line {
                    display: block;
                }
                .star-icon {
                    margin-left: 0.5rem;
                    opacity: 0;
                    animation: unveil-fill 1s ease-out forwards;
                }
            `}</style>
            
            <div className="main-logo-container">
                {showFlower && (
                    <div className={`flower-fill-container ${moveRight ? 'move-left' : ''}`}>
                        <Flower size={80} color="#FFD700" />
                        <div className="flower-fill-top">
                            <Flower size={80} color="#FFFFFF" />
                        </div>
                    </div>
                )}
                {showText && (
                    <div className={`main-logo-text-wrapper ${moveRight ? 'move-right' : ''}`}>
                        <h1 className={`text-4xl md:text-6xl font-extrabold main-logo-text leading-tight`}>
                            {bloomLetters.map((letter, index) => (
                                <span
                                    key={`bloom-${index}`}
                                    className="text-[#32CD32] unveiling-letter"
                                    style={{
                                        animation: `unveil-fill 2s ease-out forwards`,
                                        animationDelay: `${index * 0.3}s`
                                    }}
                                >
                                    {letter}
                                </span>
                            ))}
                            {watchLetters.map((letter, index) => (
                                <span
                                    key={`watch-${index}`}
                                    className="text-[#FFFFFF] unveiling-letter"
                                    style={{
                                        animation: `unveil-fill 2s ease-out forwards`,
                                        animationDelay: `${(bloomLetters.length + index) * 0.3}s`
                                    }}
                                >
                                    {letter}
                                </span>
                            ))}
                        </h1>
                        {showStar && <Sparkles size={40} color="#FFFFFF" className="star-icon" />}
                    </div>
                )}
                {moveRight && <div className="flower-line show-line" style={{ top: '40%', left: '30%' }}></div>}
            </div>
        </div>
    );
};

export default SplashScreen;