"use client";
import { useState, useEffect, useRef } from "react";
import { Download, Edit2, Image as ImageIcon, Upload, X, Check, RefreshCw } from "lucide-react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { Playfair_Display, Cinzel } from "next/font/google";

// Optimize fonts
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });

export default function RatePage() {
    const [date, setDate] = useState("");
    const [rates, setRates] = useState({
        gold22k1g: "13,165",
        gold22k8g: "105,320",
        gold18k1g: "10,440"
    });
    const [footerNote, setFooterNote] = useState("പഴയ സ്വർണ്ണാഭരണങ്ങൾക്ക് ഉയർന്ന മൂല്യം");
    const [branchesNote, setBranchesNote] = useState("Chungam-Pattikkad | Anjilangadi\nManjeri | Perinthalmanna");
    const [isEditing, setIsEditing] = useState(false);
    const [bgImage, setBgImage] = useState<string | null>(null);
    const [logo, setLogo] = useState("/images/logo.png");
    const posterRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        const today = new Date();
        setDate(today.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }));
    }, []);

    const handleRateChange = (key: string, value: string) => {
        setRates(prev => ({ ...prev, [key]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setBgImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setLogo(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const downloadPoster = async () => {
        if (!posterRef.current) return;
        setDownloading(true);

        try {
            // Wait for fonts to load (simple timeout/hack for now, ideally use document.fonts.ready)
            await document.fonts.ready;

            const canvas = await html2canvas(posterRef.current, {
                scale: 3, // Higher scale for better quality
                useCORS: true,
                backgroundColor: null,
                logging: false,
                onclone: (clonedDoc) => {
                    // Ensure the cloned node is visible if it was somehow hidden
                    const clonedElement = clonedDoc.querySelector('[data-poster-root]') as HTMLElement;
                    if (clonedElement) {
                        clonedElement.style.transform = 'none';
                    }
                }
            });

            const image = canvas.toDataURL("image/jpeg", 0.95);
            const link = document.createElement("a");
            link.href = image;
            link.download = `Gemerald-Rates-${date.replace(/ /g, '-')}.jpg`;
            link.click();
        } catch (err) {
            console.error("Failed to download rate board:", err);
            alert("Failed to download. Please try again.");
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020202] text-white flex flex-col md:flex-row overflow-hidden font-sans selection:bg-[#d4af37] selection:text-black">

            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#d4af37] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.05] animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#b8860b] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.05] animate-pulse-slow delay-1000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150"></div>
            </div>

            {/* Navigation / Header (Mobile) */}
            <div className="md:hidden absolute top-0 left-0 w-full p-4 z-50 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-[#d4af37] hover:text-[#f3e5ab] transition-colors">
                    <span className="text-sm uppercase tracking-widest font-medium">← Home</span>
                </Link>
            </div>

            {/* --- LEFT PANEL (Controls) --- */}
            <div className={`
                fixed bottom-0 left-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-[#d4af37]/20 p-6 flex flex-col gap-4 transition-transform duration-500 ease-spring
                md:relative md:w-[400px] md:h-screen md:border-t-0 md:border-r md:bg-[#050505] md:justify-center
                ${isEditing ? 'translate-y-0' : 'translate-y-[calc(100%-80px)] md:translate-y-0'}
            `}>
                {/* Mobile Handle */}
                <div className="md:hidden w-12 h-1.5 bg-[#333] rounded-full mx-auto mb-2 opacity-50" onClick={() => setIsEditing(!isEditing)}></div>

                <div className="flex flex-col gap-6 max-w-sm mx-auto w-full">
                    <div className="hidden md:block mb-8">
                        <Link href="/" className="inline-flex items-center gap-2 text-[#888] hover:text-[#d4af37] transition-colors mb-4">
                            <span>← Back to Home</span>
                        </Link>
                        <h2 className={`${playfair.className} text-3xl text-[#d4af37]`}>Rate Config</h2>
                        <p className="text-[#666] text-sm mt-2">Customize your daily rate card.</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] hover:border-[#d4af37]/50 text-white p-4 rounded-xl flex flex-col items-center gap-2 transition-all group"
                        >
                            <ImageIcon size={20} className="text-[#888] group-hover:text-[#d4af37]" />
                            <span className="text-xs uppercase tracking-wider font-medium">Background</span>
                        </button>
                        <button
                            onClick={() => logoInputRef.current?.click()}
                            className="bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] hover:border-[#d4af37]/50 text-white p-4 rounded-xl flex flex-col items-center gap-2 transition-all group"
                        >
                            <Upload size={20} className="text-[#888] group-hover:text-[#d4af37]" />
                            <span className="text-xs uppercase tracking-wider font-medium">Logo</span>
                        </button>
                    </div>

                    <div className="flex items-center justify-between bg-[#1a1a1a] p-2 rounded-xl border border-[#333]">
                        <span className="text-sm font-medium text-[#888] ml-3">Edit Mode</span>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${isEditing ? 'bg-[#d4af37] text-black' : 'bg-[#333] text-white'}`}
                        >
                            {isEditing ? <Check size={16} /> : <Edit2 size={16} />}
                            {isEditing ? 'Done' : 'Edit'}
                        </button>
                    </div>

                    <button
                        onClick={downloadPoster}
                        disabled={downloading}
                        className="w-full py-4 mt-2 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                    >
                        {downloading ? <RefreshCw size={20} className="animate-spin" /> : <Download size={20} />}
                        {downloading ? "GENERATING..." : "DOWNLOAD POSTER"}
                    </button>

                    {/* Hidden Inputs */}
                    <input ref={fileInputRef} type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
                    <input ref={logoInputRef} type="file" onChange={handleLogoUpload} accept="image/*" className="hidden" />
                </div>
            </div>


            {/* --- RIGHT PANEL (Preview) --- */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-10 relative overflow-auto min-h-screen md:min-h-0">

                {/* POSTER ELEMENT */}
                <div
                    ref={posterRef}
                    data-poster-root
                    className="relative w-full max-w-[420px] aspect-[9/16] bg-black overflow-hidden flex flex-col isolate" // Increased Max Width
                    style={{
                        boxShadow: '0 0 0 1px #333, 0 20px 50px -10px rgba(0,0,0,0.5)'
                    }}
                >
                    {/* Background Layer */}
                    <div className="absolute inset-0 z-[-1]">
                        {bgImage ? (
                            <>
                                <img src={bgImage} alt="bg" className="w-full h-full object-cover" />
                                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}></div>
                            </>
                        ) : (
                            <div className="w-full h-full bg-[#080808] relative overflow-hidden">
                                {/* Golden Mesh Gradient */}
                                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-20"
                                    style={{
                                        background: 'radial-gradient(circle at center, #d4af37 0%, transparent 50%)',
                                        filter: 'blur(80px)'
                                    }}
                                ></div>
                                {/* CSS Pattern (Safe for download) */}
                                <div className="absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage: 'linear-gradient(30deg, #222 12%, transparent 12.5%, transparent 87%, #222 87.5%, #222), linear-gradient(150deg, #222 12%, transparent 12.5%, transparent 87%, #222 87.5%, #222), linear-gradient(30deg, #222 12%, transparent 12.5%, transparent 87%, #222 87.5%, #222), linear-gradient(150deg, #222 12%, transparent 12.5%, transparent 87%, #222 87.5%, #222), linear-gradient(60deg, #222777 25%, transparent 25.5%, transparent 75%, #222 75.5%, #222), linear-gradient(60deg, #222 25%, transparent 25.5%, transparent 75%, #222 75.5%, #222)',
                                        backgroundSize: '20px 35px',
                                        backgroundPosition: '0 0, 0 0, 10px 18px, 10px 18px, 0 0, 10px 18px'
                                    }}
                                ></div>
                                {/* Elegant Borders */}
                                <div className="absolute top-4 left-4 right-4 bottom-4 border rounded-t-[100px] rounded-b-[20px]" style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}></div>
                            </div>
                        )}
                    </div>

                    {/* Content Container */}
                    <div className="flex-1 flex flex-col items-center p-6 relative z-10 w-full">

                        {/* Header / Logo */}
                        <div className="flex flex-col items-center mt-4 mb-2"> {/* Reduced Margins */}
                            <div className="w-20 h-20 mb-2 relative flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"> {/* Slightly Smaller Logo */}
                                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <h1 className={`${cinzel.className} text-3xl md:text-4xl text-white font-bold tracking-[0.15em] text-center drop-shadow-lg`}>
                                <span className="text-[#d4af37]">GEM</span>ERALD
                            </h1>
                            <div className="h-[1px] w-24 my-2" style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }}></div>
                            <p className={`${playfair.className} text-[#aaa] text-xs uppercase tracking-[0.4em]`}>Gold & Diamonds</p>
                        </div>

                        {/* Date */}
                        <div className="mb-4 w-full flex justify-center"> {/* Reduced Margin */}
                            <div className="border backdrop-blur-sm px-8 py-1.5 rounded-full flex items-center justify-center min-w-[200px]"
                                style={{ borderColor: 'rgba(212, 175, 55, 0.3)', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                                {isEditing ? (
                                    <input
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                        className="bg-transparent text-center text-[#d4af37] font-medium outline-none w-full uppercase tracking-wider text-base font-mono"
                                    />
                                ) : (
                                    <span className="text-[#d4af37] text-sm font-semibold uppercase tracking-[0.15em]">{date}</span>
                                )}
                            </div>
                        </div>

                        {/* Rates Card */}
                        <div className="w-full backdrop-blur-md rounded-2xl border p-1 flex-1 flex flex-col max-h-[460px] min-h-0" // Reduced max-h and added min-h-0
                            style={{
                                background: 'linear-gradient(to bottom, rgba(26,26,26,0.8), rgba(10,10,10,0.9))',
                                borderColor: 'rgba(212, 175, 55, 0.3)'
                            }}>

                            <div className="border rounded-xl w-full h-full flex flex-col p-4 relative overflow-hidden" // Reduced Padding
                                style={{ borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                                {/* Decor */}
                                <div className="absolute top-0 left-0 w-10 h-10 border-t border-l rounded-tl-xl" style={{ borderColor: 'rgba(212, 175, 55, 0.4)' }}></div>
                                <div className="absolute top-0 right-0 w-10 h-10 border-t border-r rounded-tr-xl" style={{ borderColor: 'rgba(212, 175, 55, 0.4)' }}></div>
                                <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l rounded-bl-xl" style={{ borderColor: 'rgba(212, 175, 55, 0.4)' }}></div>
                                <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r rounded-br-xl" style={{ borderColor: 'rgba(212, 175, 55, 0.4)' }}></div>

                                <h3 className={`${playfair.className} text-center text-xl md:text-2xl italic mb-4 relative`} style={{ color: 'rgba(255,255,255,0.9)' }}> {/* Reduced Margin */}
                                    Today's Gold Rate
                                </h3>

                                <div className="flex-1 flex flex-col justify-center gap-4"> {/* Changed to gap-4 */}
                                    <RateRow
                                        label="22K Gold"
                                        sub="1 Gram"
                                        price={rates.gold22k1g}
                                        onChange={(v) => handleRateChange('gold22k1g', v)}
                                        isEditing={isEditing}
                                        highlight
                                    />

                                    <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)' }}></div>

                                    <RateRow
                                        label="22K Gold"
                                        sub="8 Gram (1 Pavan)"
                                        price={rates.gold22k8g}
                                        onChange={(v) => handleRateChange('gold22k8g', v)}
                                        isEditing={isEditing}
                                    />

                                    <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)' }}></div>

                                    <RateRow
                                        label="18K Gold"
                                        sub="1 Gram"
                                        price={rates.gold18k1g}
                                        onChange={(v) => handleRateChange('gold18k1g', v)}
                                        isEditing={isEditing}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-auto pt-4 text-center w-full z-20"> {/* Reduced Padding, added Z-index */}
                            {isEditing ? (
                                <input
                                    value={footerNote}
                                    onChange={e => setFooterNote(e.target.value)}
                                    className="w-full bg-transparent text-center text-[#d4af37] border-b outline-none pb-1 mb-2 font-serif italic text-lg lg:text-xl"
                                    style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}
                                />
                            ) : (
                                <p className={`${playfair.className} text-[#d4af37] text-lg lg:text-xl italic mb-2 drop-shadow-md`}>"{footerNote}"</p>
                            )}

                            <div className="flex flex-col items-center gap-1 mt-1 opacity-90 w-full px-4">
                                {isEditing ? (
                                    <textarea
                                        value={branchesNote}
                                        onChange={e => setBranchesNote(e.target.value)}
                                        className="w-full bg-transparent text-center text-white text-[10px] uppercase tracking-wider outline-none p-2 rounded border border-[#333] focus:border-[#d4af37]"
                                        rows={2}
                                    />
                                ) : (
                                    <div className="whitespace-pre-line text-center">
                                        {branchesNote.split('\n').map((line, i) => (
                                            <p key={i} className="text-[10px] uppercase tracking-[0.2em] text-white leading-relaxed">{line}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Bottom Gold Bar Decor */}
                    <div className="h-2 w-full shrink-0" style={{ background: 'linear-gradient(90deg, #b8860b, #f3e5ab, #b8860b)' }}></div>
                </div>

            </div>
        </div>
    );
}

function RateRow({ label, sub, price, onChange, isEditing, highlight = false }: { label: string, sub: string, price: string, onChange: (v: string) => void, isEditing: boolean, highlight?: boolean }) {
    return (
        <div className="flex items-center justify-between group w-full">
            <div className="flex flex-col items-start">
                <span className={`text-2xl font-bold font-serif ${highlight ? 'text-[#d4af37] drops-shadow-sm' : 'text-[#c0c0c0]'}`}>{label}</span> {/* Increased Size */}
                <span className="text-xs uppercase tracking-wider text-[#666]">{sub}</span> {/* Increased Size */}
            </div>

            <div className={`flex items-baseline gap-1 ${isEditing ? 'bg-[#222] rounded px-2 -mr-2 ring-1 ring-[#d4af37]/50' : ''}`}>
                <span className="text-[#d4af37] text-lg md:text-xl font-serif">₹</span> {/* Increased Size */}
                {isEditing ? (
                    <input
                        value={price}
                        onChange={e => onChange(e.target.value)}
                        className="bg-transparent text-right w-32 text-4xl font-bold font-sans text-white outline-none" // Increased Size & Width
                    />
                ) : (
                    <span className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight drop-shadow-md">{price}</span> // Increased Size
                )}
            </div>
        </div>
    );
}

