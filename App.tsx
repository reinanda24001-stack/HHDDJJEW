import React, { useState, useEffect, useRef } from 'react';

// Heart icon SVG component
const HeartIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

// Share Icon SVG Component
const ShareIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
    </svg>
);


// Memory Item Component for the timeline
const MemoryItem: React.FC<{ description: string; index: number }> = ({ description, index }) => {
    const isEven = index % 2 === 0;
    const rotation = Math.floor(Math.random() * 6) - 3; // a bit less rotation for a cleaner look

    return (
        <div 
            className={`flex flex-col md:flex-row items-center gap-8 animate-fade-in ${isEven ? 'md:flex-row-reverse' : ''}`}
            style={{ animationDelay: `${index * 350}ms`, opacity: 0 }} // Start with opacity 0 for the animation
        >
            <div className="md:w-1/2 w-full p-2 bg-white shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:z-10" style={{ transform: `rotate(${rotation}deg)` }}>
                <div className="w-full h-64 bg-pink-100 flex items-center justify-center border-2 border-white">
                    <span className="text-pink-400 font-medium">Foto Kenangan {index + 1}</span>
                </div>
            </div>
            <div className={`md:w-1/2 w-full ${isEven ? 'md:text-right' : 'md:text-left'} text-center`}>
                <p className="text-lg leading-relaxed bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-md inline-block">
                    {description}
                </p>
            </div>
        </div>
    );
};

// Reusable Section Component
const Section: React.FC<{ title: string; children?: React.ReactNode; id: string }> = ({ title, children, id }) => (
    <section id={id} className="py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-great-vibes text-pink-500 mb-8">{title}</h2>
            {children}
        </div>
    </section>
);

// Confetti Component
const ConfettiCelebration: React.FC = () => {
    const confettiColors = ['#fce4ec', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b'];
    const confettiPieces = Array.from({ length: 150 }).map((_, i) => {
        const style = {
            left: `${Math.random() * 100}%`,
            backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            animationDuration: `${Math.random() * 3 + 4}s`,
            animationDelay: `${Math.random() * 2}s`,
            transform: `rotate(${Math.random() * 360}deg)`
        };
        return <div key={i} className="confetti-piece" style={style}></div>;
    });

    return <div className="confetti-container">{confettiPieces}</div>;
};

const Navigation: React.FC<{ onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void }> = ({ onLinkClick }) => {
    const navLinks = [
        { href: "#greeting", text: "Ucapanku" },
        { href: "#photos", text: "Kenangan" },
        { href: "#video", text: "Video" },
        { href: "#wishes", text: "Harapanmu" },
        { href: "#question", text: "Pertanyaan" },
    ];

    return (
        <nav className="sticky top-0 bg-white/80 backdrop-blur-md shadow-md z-40 py-2 animate-fade-in">
            <div className="container mx-auto flex justify-center items-center flex-wrap gap-x-4 md:gap-x-8 gap-y-2 px-4">
                {navLinks.map(link => (
                    <a 
                        key={link.href}
                        href={link.href} 
                        onClick={(e) => onLinkClick(e, link.href)}
                        className="text-pink-500 hover:text-pink-700 font-semibold transition-colors duration-300 px-3 py-2 rounded-md text-sm md:text-base"
                    >
                        {link.text}
                    </a>
                ))}
            </div>
        </nav>
    );
};

const ShareButton: React.FC = () => {
    const [buttonText, setButtonText] = useState('Bagikan Ucapan Ini');

    const handleShare = async () => {
        const shareUrl = window.location.href; // Use the actual page URL
        const shareData = {
            title: 'Ucapan Spesial Untukmu!',
            text: 'Aku punya sesuatu yang spesial untukmu...',
            url: shareUrl
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            // Fallback for browsers that don't support Web Share API
            try {
                await navigator.clipboard.writeText(shareUrl);
                setButtonText('Link Disalin!');
                setTimeout(() => setButtonText('Bagikan Ucapan Ini'), 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
                alert('Gagal menyalin link. Coba salin manual dari browser.');
            }
        }
    };

    return (
        <button
            onClick={handleShare}
            className="mt-6 bg-white text-pink-500 border border-pink-500 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-pink-100 transition-all duration-300 transform hover:scale-110 flex items-center justify-center mx-auto"
        >
            <ShareIcon className="w-5 h-5 mr-2" />
            {buttonText}
        </button>
    );
};


const App: React.FC = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [herWish, setHerWish] = useState('');
    const [isCandleBlown, setIsCandleBlown] = useState(false);
    const [showFinalQuestion, setShowFinalQuestion] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [confirmationStep, setConfirmationStep] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    
    // Placeholder data for memories
    const memories = [
        { description: "Ingat waktu kita pertama kali ketemu? Aku nggak akan pernah lupa senyum manismu hari itu. Momen itu mengubah segalanya." },
        { description: "Perjalanan pertama kita ke pantai. Kita lari-larian dikejar ombak, ketawa sampai sakit perut. Hari itu aku sadar, aku mau lebih banyak hari seperti ini sama kamu." },
        { description: "Malam saat kita nonton bintang sambil cerita semua mimpi kita. Di bawah langit yang sama, aku berjanji dalam hati untuk bantu kamu wujudkan semua mimpimu." },
        { description: "Waktu kamu lagi sedih dan aku coba hibur dengan lelucon garingku. Bukannya ketawa, kamu malah nangis di pelukanku. Saat itu aku tahu, hatiku akan selalu jadi tempatmu pulang." },
        { description: "Setiap momen sederhana, seperti minum kopi pagi atau nonton film di rumah, jadi luar biasa karena ada kamu di sampingku." },
        { description: "Momen saat kita kehujanan dan berteduh di warung kecil, itu jadi salah satu kenangan favoritku." },
        { description: "Pertama kali aku masakin buat kamu. Walaupun rasanya mungkin aneh, tapi kamu tetap bilang enak. Terima kasih ya." },
        { description: "Saat kita nyanyi bareng di mobil, nggak peduli suara fals dan lirik salah semua. Yang penting kita bahagia." },
        { description: "Waktu kita begadang sampai pagi cuma buat ngobrolin hal-hal nggak penting. Aku rindu momen-momen itu." },
        { description: "Hari di mana kamu kenalin aku ke teman-temanmu. Aku merasa jadi orang paling beruntung di dunia." },
        { description: "Setiap 'selamat pagi' dan 'selamat malam' darimu selalu berhasil membuat hariku lebih baik." },
        { description: "Ingat saat kita mencoba resep baru dan dapurnya jadi berantakan? Itu kekacauan yang paling menyenangkan." },
        { description: "Caramu menatapku saat aku sedang bercerita, seolah-olah aku satu-satunya orang di dunia ini." },
        { description: "Momen saat kita saling diam, tapi tetap merasa nyaman karena tahu kita ada untuk satu sama lain." },
        { description: "Ketika kamu memberiku semangat saat aku merasa gagal. Kamu adalah suporter terbaikku." },
        { description: "Jalan-jalan sore tanpa tujuan, hanya menikmati kebersamaan kita. Aku suka itu." },
        { description: "Melihatmu tertawa lepas karena leluconku adalah musik terindah buatku." },
        { description: "Saat kamu memegang tanganku untuk pertama kalinya. Aku masih bisa merasakan debaran jantungku saat itu." },
        { description: "Momen saat kita menyadari bahwa kita punya mimpi masa depan yang sama. Itu meyakinkan hatiku." },
        { description: "Dan hari ini, di ulang tahunmu, adalah kenangan baru yang akan selalu aku simpan. Aku mencintaimu." }
    ];

    const handleOpen = () => {
        setIsOpened(true);
        setTimeout(() => setShowContent(true), 1000);
        if (audioRef.current) {
            audioRef.current.volume = 0.3; // Set a gentle volume
            audioRef.current.play().catch(error => {
                console.log("Audio playback was prevented by the browser:", error);
            });
        }
    };

    const handleBlowCandle = () => {
        setIsCandleBlown(true);
    };
    
    const handleYesConfirmation = () => {
        if (confirmationStep < 4) {
            setConfirmationStep(prev => prev + 1);
        } else {
            setShowConfetti(true);
            setConfirmationStep(prev => prev + 1);
        }
    };

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {
        document.body.style.overflow = showContent ? 'auto' : 'hidden';
        return () => { document.body.style.overflow = 'auto' };
    }, [showContent]);
    
    useEffect(() => {
        if (confirmationStep === 4) {
            const timer = setTimeout(() => {
                handleYesConfirmation();
            }, 2000); // Wait 2 seconds before showing the final message

            return () => clearTimeout(timer); // Cleanup timer
        }
    }, [confirmationStep]);

    return (
        <div className="bg-pink-50 text-gray-800 min-h-screen">
            
            {/* Note: The requested song is copyrighted. Using a royalty-free romantic piano piece instead. */}
            <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/02/14/audio_29c03a985c.mp3" loop />
            
            <div className="hearts">
                {[...Array(10)].map((_, i) => <div key={i} className="heart"></div>)}
            </div>

            <div className={`fixed inset-0 bg-white z-50 flex items-center justify-center text-center transition-opacity duration-1000 ${isOpened ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${showContent ? 'hidden' : 'flex'}`}>
                <div className="p-8">
                    <h1 className="text-4xl md:text-6xl font-great-vibes text-pink-500 mb-4">Happy Birthday, My Love</h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8">Aku punya sesuatu yang spesial untukmu...</p>
                    <button onClick={handleOpen} className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center mx-auto">
                        Buka Hadiahmu
                        <HeartIcon className="w-5 h-5 ml-2" />
                    </button>
                </div>
            </div>

            {showContent && (
                 <main className="relative z-10">
                    <header className="min-h-screen flex items-center justify-center text-center bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')" }}>
                        <div className="bg-black bg-opacity-40 p-8 rounded-xl backdrop-blur-sm">
                           <h1 className="text-5xl md:text-8xl font-great-vibes text-white">Barakallahu Fii Umrik my Darling</h1>
                           <p className="text-xl md:text-2xl text-pink-200 mt-4">dear to Intan Payou / Mak Ijah / ceceu / Momoy</p>
                        </div>
                    </header>
                    
                    <Navigation onLinkClick={handleSmoothScroll} />

                    <Section title="Selamat Dua Puluh Tahun" id="twenty">
                        <div className="flex justify-center items-center text-pink-400" style={{ textShadow: '2px 2px 10px rgba(236, 72, 153, 0.3)' }}>
                            <span className="text-9xl md:text-[12rem] font-bold">2</span>
                            <div className="mx-4">
                               <HeartIcon className="w-16 h-16 md:w-24 md:h-24 text-pink-300" />
                            </div>
                            <span className="text-9xl md:text-[12rem] font-bold">0</span>
                        </div>
                        <p className="max-w-3xl mx-auto mt-8 text-lg">Dua dekade yang luar biasa telah kamu lewati, dan aku bersyukur bisa menjadi bagian dari ceritamu. Perjalanan kita baru saja dimulai.</p>
                    </Section>

                    <Section title="Waktunya Tiup Lilin!" id="candle">
                        <div className="max-w-md mx-auto bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                             <div className="relative w-64 h-80 mx-auto mb-4">
                                {/* Candle & Flame */}
                                <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20">
                                    {!isCandleBlown && (
                                        <>
                                            {/* Wick */}
                                            <div className="absolute top-7 left-1/2 -translate-x-1/2 w-1 h-2 bg-gray-700 z-10"></div>
                                            {/* Flame */}
                                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-10">
                                                <div className="flame-outer"></div>
                                                <div className="flame-inner"></div>
                                                <div className="flame-base"></div>
                                            </div>
                                        </>
                                    )}
                                    {isCandleBlown && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            {[...Array(5)].map((_, i) => (
                                                <div 
                                                    key={i}
                                                    className="absolute bottom-0 w-8 h-8 bg-gray-400/40 rounded-full animate-puff-out" 
                                                    style={{ 
                                                        transformOrigin: 'bottom center',
                                                        animationDelay: `${i * 0.15}s`,
                                                        left: `${(Math.random() - 0.5) * 30}px` 
                                                    }}
                                                ></div>
                                            ))}
                                        </div>
                                    )}
                                    {/* Candle Body */}
                                    <div className="absolute top-8 left-1/2 w-3 h-10 bg-white border-2 border-pink-200 rounded-full" style={{ transform: 'translateX(-50%)' }}></div>
                                </div>
                                {/* Cake */}
                                <div className="absolute bottom-0 w-full h-56">
                                    {/* Cake Top Layer */}
                                    <div className="absolute top-0 w-full h-16 bg-pink-200 rounded-t-xl z-10"></div>
                                    {/* Frosting Drip */}
                                    <div className="absolute top-12 w-full h-8 bg-pink-300 z-10" style={{ borderRadius: '50% / 20%' }}></div>
                                    <div className="absolute top-14 w-full h-4 bg-pink-300 z-10"></div>
                                    {/* Cake Bottom Layer */}
                                    <div className="absolute top-16 w-full h-24 bg-pink-100"></div>
                                    {/* Frosting Middle */}
                                    <div className="absolute top-[12.5rem] w-full h-8 bg-pink-300 z-10" style={{ borderRadius: '50% / 20%' }}></div>
                                    <div className="absolute top-[12.7rem] w-full h-4 bg-pink-300 z-10"></div>
                                    {/* Plate */}
                                    <div className="absolute bottom-0 w-full h-4 bg-white rounded-lg shadow-2xl"></div>
                                    <div className="absolute -bottom-2 left-[-5%] w-[110%] h-4 bg-white rounded-lg shadow-2xl"></div>
                                </div>
                            </div>

                            {!isCandleBlown ? (
                                <>
                                    <p className="mt-6 mb-6 text-lg">Buat permohonan dan tiup lilinnya!</p>
                                    <button onClick={handleBlowCandle} className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-110">
                                        Tiup Lilin!
                                    </button>
                                </>
                            ) : (
                                <p className="mt-8 text-2xl font-bold text-pink-600 animate-fade-in">Horeee! Semoga semua harapanmu terkabul!</p>
                            )}
                        </div>
                    </section>

                     <Section title="Ucapanku Untukmu" id="greeting">
                        <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-lg text-left text-lg leading-relaxed">
                            <p className="mb-4">Untuk kekasih hatiku,</p>
                            <p className="mb-4">Selamat ulang tahun, cintaku. Hari ini adalah hari di mana dunia diberkati dengan kehadiranmu, dan aku adalah orang yang paling beruntung karena bisa memilikimu dalam hidupku. Setiap hari bersamamu adalah anugerah yang tak ternilai.</p>
                            <p className="mb-4">Kamu adalah cahayaku di saat gelap, alasanku untuk tersenyum, dan inspirasiku untuk menjadi orang yang lebih baik. Terima kasih untuk semua cinta, tawa, dan dukungan yang tak pernah berhenti kamu berikan.</p>
                            <p>Aku sangat mencintaimu, lebih dari kata-kata yang bisa kuucapkan. Selamat bertambah usia, sayang.</p>
                            <p className="mt-6 font-great-vibes text-3xl text-right text-pink-500">- Dengan Penuh Cinta</p>
                        </div>
                    </Section>
                    
                    <Section title="Kenangan Indah Kita" id="photos">
                        <p className="max-w-3xl mx-auto mb-16 text-lg">Setiap momen ini adalah kepingan puzzle yang membentuk cerita kita. Mari kita lihat kembali perjalanan indah yang telah kita lalui bersama.</p>
                        <div className="max-w-4xl mx-auto space-y-12 md:space-y-20">
                            {memories.map((memory, index) => (
                                <MemoryItem key={index} index={index} description={memory.description} />
                            ))}
                        </div>
                    </Section>

                    <Section title="Video Spesial Untukmu" id="video">
                        <p className="max-w-3xl mx-auto mb-12 text-lg">Aku sudah menyiapkan video singkat yang merangkum perjalanan kita. Semoga kamu suka!</p>
                        <div className="aspect-video max-w-4xl mx-auto bg-pink-200 border-8 border-white shadow-xl rounded-lg flex items-center justify-center">
                            <div className="text-center text-pink-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                                <p className="mt-4 font-semibold text-xl">Video akan diputar di sini</p>
                            </div>
                        </div>
                    </section>

                    <Section title="Harapanmu Untuk Kita" id="wishes">
                         <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-lg text-center text-lg leading-relaxed">
                            <p className="mb-6">Sekarang giliranmu, tuliskan apa harapanmu untuk hubungan kita ke depannya di sini...</p>
                            <textarea
                                className="w-full h-40 p-4 border-2 border-pink-200 rounded-lg focus:ring-pink-400 focus:border-pink-400 transition duration-300 text-gray-700 text-base"
                                placeholder="Aku berharap kita..."
                                value={herWish}
                                onChange={(e) => setHerWish(e.target.value)}
                                aria-label="Tulis harapanmu di sini"
                            />
                            {herWish && (
                                <p className="mt-6 text-pink-600 font-semibold animate-fade-in">Terima kasih sudah menuliskan harapanmu, sayang!</p>
                            )}
                         </div>
                    </Section>

                    <Section title="Satu Pertanyaan Penting..." id="question">
                        {!showFinalQuestion ? (
                            <div className="animate-fade-in">
                                <p className="text-lg mb-8">Sebagai penutup, aku punya satu pertanyaan terakhir untukmu...</p>
                                <button 
                                    onClick={() => setShowFinalQuestion(true)} 
                                    className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center mx-auto"
                                >
                                    Buka Pertanyaan
                                    <HeartIcon className="w-5 h-5 ml-2" />
                                </button>
                            </div>
                        ) : (
                            <div className="min-h-[250px] flex items-center justify-center">
                                {showConfetti && <ConfettiCelebration />}
                                
                                {confirmationStep === 0 && (
                                    <div key="step-0" className="animate-fade-in w-full">
                                        <p className="text-3xl md:text-4xl text-gray-700 mb-8 max-w-2xl mx-auto">
                                            Will you be my girlfriend, again and forever?
                                        </p>
                                        <div className="flex justify-center gap-6 mt-10">
                                            <button 
                                                onClick={() => setConfirmationStep(1)}
                                                className="bg-green-500 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
                                            >
                                                Yes!
                                            </button>
                                            <button 
                                                className="bg-red-500 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-110"
                                                onClick={() => alert("Yakin? Coba klik 'Yes' deh :)")}
                                            >
                                                No
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {confirmationStep > 0 && confirmationStep < 5 && (
                                     <div key={confirmationStep} className="animate-fade-in w-full flex flex-col items-center justify-center">
                                        {confirmationStep === 1 && <p className="text-2xl md:text-3xl mb-6">Apakah kamu yakin?</p>}
                                        {confirmationStep === 2 && <p className="text-2xl md:text-3xl mb-6">Nggak nyesel kan?</p>}
                                        {confirmationStep === 3 && <p className="text-2xl md:text-3xl mb-6">Beneran serius nih??</p>}
                                        {confirmationStep === 4 && <p className="text-2xl md:text-3xl mb-6">yeaaaayyyy (salting)</p>}
                                        
                                        {confirmationStep < 4 && (
                                            <button 
                                                onClick={handleYesConfirmation}
                                                className="bg-pink-500 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-110"
                                            >
                                                {confirmationStep === 1 && "Iya, yakin banget!"}
                                                {confirmationStep === 2 && "Nggak akan pernah!"}
                                                {confirmationStep === 3 && "Serius pake banget!"}
                                            </button>
                                        )}
                                     </div>
                                )}
                                
                                {confirmationStep === 5 && (
                                    <div key="step-5" className="animate-fade-in w-full">
                                        <p className="mt-8 text-3xl font-bold text-pink-600">SO NOW I CAN CALL U MY DARLING😘😜❤️</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </Section>
                    
                    <footer className="text-center py-12 text-gray-500">
                        <p className="text-2xl font-great-vibes text-pink-500">I Love You</p>
                        <p>Dibuat dengan ❤️ untuk orang yang paling kusukai.</p>
                        <ShareButton />
                    </footer>
                </main>
            )}
        </div>
    );
};

export default App;