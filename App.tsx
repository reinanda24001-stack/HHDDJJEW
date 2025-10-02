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

// Animated Words Component
const AnimatedWords: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className, delay = 300 }) => {
    const words = text.split(' ');
    return (
        <p className={className || "text-3xl md:text-4xl text-gray-700 mb-8 max-w-2xl mx-auto"}>
            {words.map((word, index) => (
                <span key={index} className="inline-block animate-fade-in" style={{ animationDelay: `${index * delay}ms`, opacity: 0 }}>
                    {word}&nbsp;
                </span>
            ))}
        </p>
    );
};


// Memory Item Component for the timeline
const MemoryItem: React.FC<{ description: string; index: number; imageUrl?: string }> = ({ description, index, imageUrl }) => {
    const isEven = index % 2 === 0;
    const rotation = Math.floor(Math.random() * 6) - 3; // a bit less rotation for a cleaner look

    return (
        <div 
            className={`flex flex-col md:flex-row items-center gap-8 animate-fade-in ${isEven ? 'md:flex-row-reverse' : ''}`}
            style={{ animationDelay: `${index * 350}ms`, opacity: 0 }} // Start with opacity 0 for the animation
        >
            <div className="md:w-1/2 w-full p-2 bg-white shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:z-10" style={{ transform: `rotate(${rotation}deg)` }}>
                <div className="w-full h-64 bg-pink-100 flex items-center justify-center border-2 border-white overflow-hidden">
                    {imageUrl ? (
                        <img src={imageUrl} alt={`Foto Kenangan ${index + 1}`} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-pink-400 font-medium">Foto Kenangan {index + 1}</span>
                    )}
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

// Envelope Animation Component
const EnvelopeAnimation = () => (
    <div className="flex items-center justify-center h-40">
        <div className="envelope">
            <div className="envelope-back"></div>
            <div className="envelope-letter"></div>
            <div className="envelope-front"></div>
            <div className="envelope-flap"></div>
        </div>
    </div>
);


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
    const [isWishSent, setIsWishSent] = useState(false);
    const [showWishFeedback, setShowWishFeedback] = useState(false);
    const [isCandleBlown, setIsCandleBlown] = useState(false);
    const [showFinalQuestion, setShowFinalQuestion] = useState(false);
    const [questionProgressionStep, setQuestionProgressionStep] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [confirmationStep, setConfirmationStep] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    
    /*
    ==================================================================================
    === PANDUAN CARA MENAMBAHKAN FOTO KENANGAN (TUTORIAL EDIT MANUAL DI GITHUB) ===
    ==================================================================================

    Hai! Untuk menambahkan foto pada setiap kenangan, ikuti langkah-langkah mudah ini:

    LANGKAH 1: UPLOAD FOTO KE GITHUB
    1. Di halaman utama repository GitHub-mu, klik "Add file" lalu "Upload files".
    2. Buat folder baru untuk menyimpan foto agar rapi. Caranya, ketik nama folder diikuti tanda slash (/), contoh: `images/`
    3. Upload semua fotomu ke dalam folder `images` tersebut.
    4. Setelah selesai, klik "Commit changes".

    LANGKAH 2: SALIN PATH FOTO
    1. Buka folder `images` yang baru kamu buat di GitHub.
    2. Path atau alamat file-nya akan terlihat di URL browser atau bisa langsung kamu gunakan sebagai `images/nama-file-fotonya.jpg`.
       Contoh: Jika kamu upload foto bernama `kenangan-1.jpg` ke folder `images`, maka path-nya adalah `images/kenangan-1.jpg`.

    LANGKAH 3: EDIT KODE DI BAWAH INI
    1. Untuk setiap "kenangan", tambahkan properti `imageUrl` diikuti dengan path fotomu di dalam tanda kutip.
    2. Pastikan ada koma (,) setelah `imageUrl` jika `description` masih ada setelahnya.

    CONTOH SEBELUM DIEDIT:
    { description: "Ingat waktu pertama kali kita foto?..." }

    CONTOH SESUDAH DIEDIT (dengan foto dari folder 'images'):
    {
      imageUrl: "images/kenangan-1.jpg",
      description: "Ingat waktu pertama kali kita foto?..."
    },

    Ulangi langkah ini untuk semua kenangan yang ingin kamu tambahkan fotonya.
    Jika sebuah kenangan tidak punya `imageUrl` atau dikosongkan (""), maka akan ditampilkan placeholder "Foto Kenangan".
    Selamat mencoba! ❤️
    ==================================================================================
    */
    const memories = [
        { imageUrl: "https://picsum.photos/seed/kenangan1/400/300", description: "Ingat waktu pertama kali kita foto? jujur bingung ngomongny gmana, tpi yg ak liat antusiasme kmu yg bnget2 pngen foto sama ak😎. Rasanya ga enak kalau nolak." },
        { imageUrl: "", description: "Waktu kita nekat foto bareng di pondok yeah, kmu mah enak dh lulus, ak mempertaruhkan 6 taun mondok demi satu kali foto sama kmu. hmm.....apa sii yang ga buat kmu😇" },
        { imageUrl: "", description: "Ternyata foto ini jga ngebuat ak merasakan sesuatu yg lom pernah dirasakan lokh ketika itu, sebelomnya ga pernah ada foto berdua dikaca, saat itu ada kesempatan buat foto berdua di kaca rasanya nyaaaaman bangett" },
        { imageUrl: "", description: "kukira kamu penggemar novel novel alay bgituh, trnyata emg iyaa....jujur dpet bnyak insight sinopsis novel2 yg emg lom pernah ak baca, jdinya yaa udh dengerin kmu aj yapping, ak nya oh oh aja sebenernya, wkwkwk" },
        { imageUrl: "", description: " first photo box gabisa dibuat kata2, pokoknya tegang, bingung, malu malu kucing, ya akhirnya spontan ajh gayanyaa🫣" },
        { imageUrl: "", description: "first time klo tau trnyata es krim versi mewah namanya gelatto, maap warga jelata ga tau....tpi pas itu berkesan jgk diajak keliling2 sekitar blok M pas sore sore😆" },
        { imageUrl: "", description: " photobox tuk yg kesekian kalinya yey, bukannya tambah improve malah si onoh ilang dari kamera😮‍💨" },
        { imageUrl: "", description: " difotoin sama fotografer handal, sebuah kehormatan besar, thx babukuh (aboel) telah mengabadikan momen ini. Pasca foto kyknya ada yg nanyain kepastian hubungan deh, katanya cemburu tkut bnyak yg ngintilin pas dh kuliah, siapa yahh yg ngomong🤔" },
        { imageUrl: "", description: "yg kesekian kalinyaa yahh, alhamdulillah smakin hari smakin jago berpose, mana si cewenya keliatan mungil lgih di foto" },
        { imageUrl: "", description: "second time foto depan kaca, makin nempel yahhh" },
        { imageUrl: "", description: "ini jugakk, siapa yg ngide megang pipi yh, jujur ga kepikiran..." },
        { imageUrl: "", description: "ini nihh, orang lagi kelaperan ga diwajarin makan double chicken, pdalah lom makan dari pagi....dalem hatinya shock kali yaa ngeliat org makan porsi kulii, ya maap dehh🙏. mana setelahnya dijejelin sama jasuke lagii yakk" },
        { imageUrl: "", description: "disini vibesnya enak banget buat ngobrol, cuman sayang kurang lamaa...tpi kata ak ga worth it sii itu wingsnya cilik cilik" },
        { imageUrl: "", description: " waktunya membuat cawan dan vas bunga yg bentuknya anomali ituuu, pdahal rencanany mau tukeran, tpi gajadiii, huhu" },
        { imageUrl: "", description: " si teteh balik ke jkt, kyknya dia mau nangis deh meninggalkan nangor, secinta itu dia sama jatos, laen kali maen lagi yah" },
        { imageUrl: "", description: " ketemu si afgan yg biasa aja yaah, dia ga nyadar aj klo disampingnya lebih ngartis dripada si artis" },
        { imageUrl: "", description: "pokoknya yg ngide2 bgini itu si ceuceu yaa, ak mah manut2 ajh" },
        { imageUrl: "", description: "its the best photo in the universe, absolute cinema...makasi lokh fotografernya ni handal bnget. Didukung jgak ama muka gantengnya si cowok dan cantiknya si cewek" },
        { imageUrl: "", description: " ini kalau ak ga minta orang buat motoin kyknya gabakal ada kenangannya sii, untung orgnya juga bagus yh motoin nyh😆" },
        { imageUrl: "", description: "makin hari makin nempel dan makin monyong ajahh tuhh, wkwk" }
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

    const handleSendWish = () => {
        if (!herWish.trim()) return;
        setIsWishSent(true);
        setTimeout(() => {
            setShowWishFeedback(true);
        }, 2800); // Wait for animation to finish
    };
    
    const handleEditWish = () => {
        setIsWishSent(false);
        setShowWishFeedback(false);
    };

    const handleYesConfirmation = () => {
        if (confirmationStep < 4) {
            setConfirmationStep(prev => prev + 1);
        } else if (confirmationStep === 4) {
            setConfirmationStep(prev => prev + 1); // Move to salting step
            setTimeout(() => {
                setShowConfetti(true);
                setConfirmationStep(prev => prev + 1); // Move to final message
            }, 2000);
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
        if (showFinalQuestion && questionProgressionStep > 0 && questionProgressionStep < 9) {
            const delays: { [key: number]: number } = {
                1: 2000, // will u be my girlfriend for 4 times
                2: 3000, // spring, summer, autumn, and winter
                3: 2000, // oh no may be 3 times
                4: 3500, // Yesterday, today, and tomorrow
                5: 2000, // hmm...may be 2 times
                6: 2500, // day and night
                7: 2000, // oh no...i wanna 1 times
                8: 1500, // everyday -> then show buttons
            };
            const timer = setTimeout(() => {
                setQuestionProgressionStep(prev => prev + 1);
            }, delays[questionProgressionStep]);

            return () => clearTimeout(timer);
        }
    }, [showFinalQuestion, questionProgressionStep]);

    const pClass = "text-3xl md:text-4xl text-gray-700 mb-8 max-w-2xl mx-auto";

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

                    <Section title="tak terasa sudah dua puluh tahun hidup di dunia yah" id="twenty">
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
                            <p className="mb-4">untuk intan payou,</p>
                            <p className="mb-4">Selamat ulang tahun yh, hari ini hari dimana dunia diberkati dengan kehadiranmu, dan aku adalah orang yang paling beruntung bisa menemanimu hingga saat ini. Setiap hari mendengar ocehanmu adalah anugerah yang tak ternilai untukku.</p>
                            <p className="mb-4">U're my shine, alasanku untuk tersenyum, dan inspirasiku untuk menjadi orang yang lebih baik. Terima kasih untuk semua cinta, tawa, dan dukungan yang tak pernah berhenti kamu berikan.</p>
                            <p>Selamat bertambah usia, Intan Payou.</p>
                            <p className="mt-6 font-great-vibes text-3xl text-right text-pink-500">- Dengan Penuh Cinta</p>
                        </div>
                    </Section>
                    
                    <Section title="Kenangan Indah Kita" id="photos">
                        <p className="max-w-3xl mx-auto mb-16 text-lg">Setiap momen ini adalah kepingan puzzle yang membentuk cerita kita. Mari kita lihat kembali perjalanan indah yang telah kita lalui bersama.</p>
                        <div className="max-w-4xl mx-auto space-y-12 md:space-y-20">
                            {memories.map((memory, index) => (
                                <MemoryItem key={index} index={index} description={memory.description} imageUrl={memory.imageUrl} />
                            ))}
                        </div>
                    </Section>

                    <Section title="Video Spesial Untukmu" id="video">
                        <p className="max-w-3xl mx-auto mb-12 text-lg">silakan ditonton video singkat yg udh ak buat dengan sepenuh hati, Selamat Menyaksikan😇</p>
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
                         <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-lg text-center text-lg leading-relaxed min-h-[350px] flex flex-col justify-center">
                            {!isWishSent ? (
                                <>
                                    <p className="mb-6">Sekarang giliranmu, tuliskan apa harapanmu untuk hubungan kita ke depannya di sini...</p>
                                    <textarea
                                        className="w-full h-40 p-4 border-2 border-pink-200 rounded-lg focus:ring-pink-400 focus:border-pink-400 transition duration-300 text-gray-700 text-base"
                                        placeholder="Aku berharap kita..."
                                        value={herWish}
                                        onChange={(e) => setHerWish(e.target.value)}
                                        aria-label="Tulis harapanmu di sini"
                                    />
                                    <button
                                        onClick={handleSendWish}
                                        disabled={!herWish.trim()}
                                        className="mt-6 bg-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-110 disabled:bg-pink-300 disabled:cursor-not-allowed disabled:scale-100"
                                    >
                                        Kirim ke pujaan hati
                                    </button>
                                </>
                            ) : !showWishFeedback ? (
                                <EnvelopeAnimation />
                            ) : (
                                <div className="animate-fade-in">
                                    <p className="text-pink-600 font-semibold text-2xl mb-6">
                                        Terima kasih sudah mengirimkan harapanmu, Ceuceu! Aku akan membacanya. ( SS in dong soalnya gabisa di save😭)
                                    </p>
                                    <button
                                        onClick={handleEditWish}
                                        className="mt-4 bg-white text-pink-500 border border-pink-500 font-bold py-2 px-6 rounded-full shadow-lg hover:bg-pink-100 transition-all duration-300 transform hover:scale-110"
                                    >
                                        Ubah Harapanmu
                                    </button>
                                </div>
                            )}
                         </div>
                    </Section>

                    <Section title="Satu Pertanyaan Penting..." id="question">
                        {!showFinalQuestion ? (
                            <div className="animate-fade-in">
                                <p className="text-lg mb-8">Sebagai penutup, aku punya satu pertanyaan terakhir untukmu...</p>
                                <button 
                                    onClick={() => { setShowFinalQuestion(true); setQuestionProgressionStep(1); }} 
                                    className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center mx-auto"
                                >
                                    Buka Pertanyaan
                                    <HeartIcon className="w-5 h-5 ml-2" />
                                </button>
                            </div>
                        ) : (
                            <div className="min-h-[250px] flex items-center justify-center">
                                {showConfetti && <ConfettiCelebration />}
                                
                                {questionProgressionStep > 0 && questionProgressionStep < 9 && (
                                    <div key={questionProgressionStep} className="animate-fade-in w-full">
                                        {questionProgressionStep === 1 && <p className={pClass}>will u be my girlfriend for 4 times</p>}
                                        {questionProgressionStep === 2 && <AnimatedWords text="spring, summer, autumn, and winter" className={pClass} />}
                                        {questionProgressionStep === 3 && <p className={pClass}>oh no may be 3 times</p>}
                                        {questionProgressionStep === 4 && <AnimatedWords text="Yesterday, today, and tomorrow" className={pClass} />}
                                        {questionProgressionStep === 5 && <p className={pClass}>hmm...may be 2 times</p>}
                                        {questionProgressionStep === 6 && <AnimatedWords text="day and night" className={pClass} />}
                                        {questionProgressionStep === 7 && <p className={pClass}>oh no...i wanna 1 times</p>}
                                        {questionProgressionStep === 8 && <p className={pClass}>everyday</p>}
                                    </div>
                                )}
                                
                                {questionProgressionStep === 9 && (
                                    <div className="w-full">
                                        {confirmationStep === 0 && (
                                            <div key="step-0" className="animate-fade-in w-full">
                                                <div className="flex justify-center gap-6 mt-10">
                                                    <button 
                                                        onClick={handleYesConfirmation}
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

                                        {confirmationStep > 0 && confirmationStep < 6 && (
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
                                        
                                        {confirmationStep === 6 && (
                                            <div key="step-6" className="animate-fade-in w-full">
                                                <p className="mt-8 text-3xl font-bold text-pink-600">SO NOW I CAN CALL U MY DARLING😘😜❤️</p>
                                            </div>
                                        )}
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