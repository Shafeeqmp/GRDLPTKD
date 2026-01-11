"use client";
import { useState, useEffect, useRef } from "react";
import { TrendingUp, Calendar, ArrowLeft, Gem, Download, Edit2, Image as ImageIcon, Upload } from "lucide-react";
import Link from "next/link";
import html2canvas from "html2canvas";

export default function RatePage() {
    const [date, setDate] = useState("");
    const [rates, setRates] = useState({
        gold22k1g: "12,650",
        gold22k8g: "101,200",
        gold18k1g: "5,440"
    });
    const [footerNote, setFooterNote] = useState("പഴയ സ്വർണ്ണാഭരണങ്ങൾക്ക് ഉയർന്ന മൂല്യം");
    const [isEditing, setIsEditing] = useState(false);
    const [bgImage, setBgImage] = useState<string | null>(null);
    const [logo, setLogo] = useState("/images/logo.png");
    const posterRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const today = new Date();
        setDate(today.toLocaleDateString("en-US", {
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
        console.log("Downloading Rate Board...");
        if (!posterRef.current) return;

        try {
            const canvas = await html2canvas(posterRef.current, {
                scale: 3,
                backgroundColor: null,
                useCORS: true,
                logging: true
            });

            const image = canvas.toDataURL("image/jpeg", 1.0);
            const link = document.createElement("a");
            link.href = image;
            link.download = `Gemerald-Tech-Rates-${date.replace(/,/g, '').replace(/ /g, '-')}.jpg`;
            link.click();
        } catch (err) {
            console.error("Failed to download rate board:", err);
            alert("Failed to download rate board. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4 relative overflow-hidden isolate">

            {/* Tech Background Ambience */}
            <div className="absolute inset-0 z-[-1]">
                <div className="absolute top-0 left-0 w-full h-full bg-[#0c0a09]"></div>
                <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-[#f59e0b]/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#78350f]/10 rounded-full blur-[100px]"></div>
                {/* Grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            {/* Controls Bar */}
            <div className="fixed top-0 left-0 w-full px-4 py-4 flex justify-between items-center z-50 pointer-events-none bg-gradient-to-b from-[#09090b] to-transparent">
                <Link href="/" className="pointer-events-auto group flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md">
                    <ArrowLeft size={18} className="text-[#f59e0b] group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[#a8a29e] text-sm font-medium tracking-wide hidden md:inline">Home</span>
                </Link>

                <div className="flex gap-2 pointer-events-auto">
                    {/* Controls moved to bottom for better visibility */}
                    {/* Hidden File Input kept here for ref mapping */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col items-center justify-center w-full min-h-screen py-20">

                {/* POSTER CAPTURE AREA */}
                <div className="p-4 md:p-10 flex justify-center w-full">
                    <div
                        ref={posterRef}
                        className="relative w-full max-w-[380px] rounded-[20px] shadow-2xl overflow-hidden isolate flex flex-col justify-between"
                        style={{
                            backgroundColor: '#000000',
                            borderColor: 'rgba(245, 158, 11, 0.3)',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            aspectRatio: '9/16'
                        }}
                    >

                        {/* Poster Background */}
                        <div className="absolute inset-0 z-[-1] overflow-hidden">
                            {bgImage ? (
                                <>
                                    <img src={bgImage} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(2px)' }}></div>
                                </>
                            ) : (
                                <>
                                    {/* Futuristic lines */}
                                    <div className="absolute inset-0" style={{ backgroundColor: '#0a0a0a' }}></div>
                                    <div className="absolute top-0 left-0 w-full h-[1px] opacity-50" style={{ background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)' }}></div>
                                    <div className="absolute bottom-0 left-0 w-full h-[1px] opacity-50" style={{ background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)' }}></div>
                                    <div className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] rounded-full blur-[80px]" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}></div>
                                    <div className="absolute top-[30%] left-[-100px] w-[200px] h-[400px] rotate-45 blur-[60px]" style={{ backgroundColor: 'rgba(234, 88, 12, 0.1)' }}></div>
                                </>
                            )}
                        </div>

                        {/* Header branding */}
                        <div className="pt-8 px-6 text-center flex-shrink-0 relative z-10">
                            <div className="flex justify-center mb-4">
                                <div className="relative">
                                    <div className="absolute -inset-2 rounded-full blur opacity-20 animate-pulse" style={{ backgroundColor: '#f59e0b' }}></div>
                                    <img
                                        src={logo}
                                        alt="Icon"
                                        className="w-16 h-16 object-contain relative z-10"
                                        style={{ filter: 'drop-shadow(0 0 5px rgba(251,191,36,0.5))' }}
                                    />
                                </div>
                            </div>

                            <h1 className="text-3xl font-sans font-bold tracking-[0.1em] uppercase mb-1" style={{ color: '#ffffff', textShadow: '0 0 10px rgba(251,191,36,0.3)' }}>
                                Gemerald
                            </h1>
                            <h3 className="text-[10px] font-sans font-medium tracking-[0.4em] uppercase pb-3 mx-10" style={{ color: '#f59e0b', borderBottom: '1px solid rgba(245, 158, 11, 0.3)' }}>
                                Gold & Diamonds
                            </h3>
                        </div>

                        {/* Date Display */}
                        <div className="flex justify-center my-6 flex-shrink-0 relative z-10">
                            <div className="relative group">
                                <div className="absolute -inset-0.5 rounded-md blur opacity-30" style={{ background: 'linear-gradient(90deg, #f59e0b, #ea580c)' }}></div>
                                <div className="relative flex items-center gap-3 px-6 py-2 rounded-md" style={{ backgroundColor: '#000000', borderColor: 'rgba(245, 158, 11, 0.3)', borderWidth: '1px', borderStyle: 'solid' }}>
                                    <Calendar size={14} style={{ color: '#f59e0b' }} />
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="text-sm font-mono uppercase tracking-widest outline-none w-36 text-center rounded px-2"
                                            style={{ backgroundColor: '#2a2a2a', borderColor: '#f59e0b', borderWidth: '1px', borderStyle: 'solid', color: '#ffffff' }}
                                            placeholder="DATE"
                                        />
                                    ) : (
                                        <span className="text-sm font-mono uppercase tracking-widest" style={{ color: '#e5e5e5' }}>{date}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Rates Section */}
                        <div className="px-5 flex-grow flex flex-col gap-4 relative z-10 pb-4 justify-center">

                            {/* Main Rates Block */}
                            <div className="relative">
                                {/* Tech Borders */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t" style={{ borderColor: '#f59e0b' }}></div>
                                <div className="absolute top-0 right-0 w-2 h-2 border-r border-t" style={{ borderColor: '#f59e0b' }}></div>
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b" style={{ borderColor: '#f59e0b' }}></div>
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b" style={{ borderColor: '#f59e0b' }}></div>

                                <div className="backdrop-blur-md p-5 border-l border-r" style={{ backgroundColor: 'rgba(28, 25, 23, 0.8)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
                                    <div className="flex items-center gap-2 mb-5 justify-center">
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#f59e0b', boxShadow: '0 0 5px #f59e0b' }}></span>
                                        <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#fbbf24' }}>Gold Rates</span>
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#f59e0b', boxShadow: '0 0 5px #f59e0b' }}></span>
                                    </div>

                                    <div className="space-y-5">
                                        {/* 22K 1 Gram */}
                                        <div className="flex items-center justify-between group">
                                            <div className="flex flex-col">
                                                <span className="text-xl font-bold font-mono" style={{ color: '#f59e0b' }}>22K</span>
                                                <span className="text-[10px] uppercase tracking-wider" style={{ color: '#a8a29e' }}>1 Gram</span>
                                            </div>
                                            <div className="flex items-baseline gap-1 relative">
                                                <span className="text-sm relative z-10" style={{ color: '#d97706' }}>₹</span>
                                                {isEditing ? (
                                                    <input
                                                        value={rates.gold22k1g}
                                                        onChange={(e) => handleRateChange('gold22k1g', e.target.value)}
                                                        className="rounded px-2 w-28 text-right font-mono text-2xl font-bold outline-none transition-colors relative z-10"
                                                        style={{ backgroundColor: '#2a2a2a', borderColor: '#f59e0b', borderWidth: '1px', borderStyle: 'solid', color: '#ffffff' }}
                                                    />
                                                ) : (
                                                    <span className="font-mono text-3xl font-bold tracking-tighter relative z-10" style={{ color: '#fbbf24', textShadow: '0 0 5px rgba(251,191,36,0.3)' }}>{rates.gold22k1g}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)' }}></div>

                                        {/* 22K 8 Gram */}
                                        <div className="flex items-center justify-between group">
                                            <div className="flex flex-col">
                                                <span className="text-xl font-bold font-mono" style={{ color: '#d6d3d1' }}>22K</span>
                                                <span className="text-[10px] uppercase tracking-wider" style={{ color: '#a8a29e' }}>8 Gram (1 Pavan)</span>
                                            </div>
                                            <div className="flex items-baseline gap-1 relative">
                                                <span className="text-sm relative z-10" style={{ color: '#d97706' }}>₹</span>
                                                {isEditing ? (
                                                    <input
                                                        value={rates.gold22k8g}
                                                        onChange={(e) => handleRateChange('gold22k8g', e.target.value)}
                                                        className="rounded px-2 w-28 text-right font-mono text-2xl font-bold outline-none transition-colors relative z-10"
                                                        style={{ backgroundColor: '#2a2a2a', borderColor: '#f59e0b', borderWidth: '1px', borderStyle: 'solid', color: '#ffffff' }}
                                                    />
                                                ) : (
                                                    <span className="font-mono text-3xl font-bold tracking-tighter relative z-10" style={{ color: '#e5e5e5' }}>{rates.gold22k8g}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)' }}></div>

                                        {/* 18K 1 Gram */}
                                        <div className="flex items-center justify-between group">
                                            <div className="flex flex-col">
                                                <span className="text-xl font-bold font-mono" style={{ color: '#d6d3d1' }}>18K</span>
                                                <span className="text-[10px] uppercase tracking-wider" style={{ color: '#a8a29e' }}>1 Gram</span>
                                            </div>
                                            <div className="flex items-baseline gap-1 relative">
                                                <span className="text-sm relative z-10" style={{ color: '#d97706' }}>₹</span>
                                                {isEditing ? (
                                                    <input
                                                        value={rates.gold18k1g}
                                                        onChange={(e) => handleRateChange('gold18k1g', e.target.value)}
                                                        className="rounded px-2 w-28 text-right font-mono text-2xl font-bold outline-none transition-colors relative z-10"
                                                        style={{ backgroundColor: '#2a2a2a', borderColor: '#f59e0b', borderWidth: '1px', borderStyle: 'solid', color: '#ffffff' }}
                                                    />
                                                ) : (
                                                    <span className="font-mono text-3xl font-bold tracking-tighter relative z-10" style={{ color: '#e5e5e5' }}>{rates.gold18k1g}</span>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="py-4 text-center flex-shrink-0 border-t relative z-10" style={{ borderColor: 'rgba(245, 158, 11, 0.1)', backgroundColor: 'rgba(12, 10, 9, 0.5)' }}>

                            {/* Editable Promo Note */}
                            <div className="mb-3 px-4">
                                {isEditing ? (
                                    <input
                                        value={footerNote}
                                        onChange={(e) => setFooterNote(e.target.value)}
                                        className="w-full text-center font-bold text-sm outline-none rounded p-1"
                                        style={{ backgroundColor: '#2a2a2a', borderColor: '#f59e0b', borderWidth: '1px', borderStyle: 'solid', color: '#fbbf24' }}
                                    />
                                ) : (
                                    <h4 className="font-bold text-sm tracking-wide leading-tight" style={{ color: '#fbbf24', textShadow: '0 0 10px rgba(245, 158, 11, 0.2)' }}>
                                        {footerNote}
                                    </h4>
                                )}
                            </div>

                            <div className="mb-2 px-2">
                                <p className="text-[9px] font-bold uppercase tracking-wider leading-relaxed" style={{ color: '#d97706' }}>
                                    Cungam-pattikkad | Anjilangadi <br /> Manjeri | Perinthalmanna
                                </p>
                            </div>
                            <p className="text-[7px] font-medium uppercase tracking-[0.2em]" style={{ color: '#57534e' }}>
                                Market Rates Subject to Change
                            </p>
                        </div>

                    </div>
                </div>

                {/* Actions Area - Mobile Friendly */}
                <div className="mt-8 flex flex-col gap-4 w-full max-w-[380px] px-4">
                    <button
                        onClick={downloadPoster}
                        className="w-full py-4 rounded-xl bg-linear-to-r from-[#f59e0b] to-[#ea580c] text-white font-bold text-lg shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:scale-105 transition-transform flex items-center justify-center gap-2 border border-[#fbbf24]/50 hover:bg-[#c2410c] active:scale-95"
                    >
                        <Download size={24} />
                        DOWNLOAD POSTER
                    </button>

                    {/* Hidden Inputs */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />
                    <input
                        type="file"
                        ref={logoInputRef}
                        onChange={handleLogoUpload}
                        accept="image/*"
                        className="hidden"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 py-3 px-2 rounded-xl bg-[#1c1917] border border-[#f59e0b]/30 text-[#f59e0b] font-medium flex items-center justify-center gap-1.5 hover:bg-[#292524] transition-colors text-xs sm:text-sm"
                        >
                            <ImageIcon size={16} />
                            Bg Image
                        </button>
                        <button
                            onClick={() => logoInputRef.current?.click()}
                            className="flex-1 py-3 px-2 rounded-xl bg-[#1c1917] border border-[#f59e0b]/30 text-[#f59e0b] font-medium flex items-center justify-center gap-1.5 hover:bg-[#292524] transition-colors text-xs sm:text-sm"
                        >
                            <ImageIcon size={16} />
                            Logo
                        </button>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`flex-1 py-3 px-2 rounded-xl border font-medium flex items-center justify-center gap-1.5 transition-all text-xs sm:text-sm ${isEditing ? 'bg-[#f59e0b]/20 border-[#f59e0b] text-[#f59e0b]' : 'bg-[#1c1917] border-[#f59e0b]/30 text-[#a8a29e] hover:bg-[#292524]'}`}
                        >
                            <Edit2 size={16} />
                            {isEditing ? 'Done' : 'Edit'}
                        </button>
                    </div>

                    <div className="text-center mt-2">
                        {isEditing && (
                            <p className="text-[#f59e0b] text-sm font-medium animate-pulse">TAP VALUES ABOVE TO EDIT</p>
                        )}
                        {!bgImage && !isEditing && (
                            <p className="text-[#57534e] text-xs">Tip: Upload your own background & logo</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface TechRateRowProps {
    label: string;
    sub: string;
    value: string;
    onChange: (val: string) => void;
    isEditing: boolean;
    highlight?: boolean;
}

function TechRateRow({ label, sub, value, onChange, isEditing, highlight = false }: TechRateRowProps) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex flex-col">
                <span className={`text-xl font-bold font-mono ${highlight ? 'text-[#f59e0b]' : 'text-[#d6d3d1]'}`}>{label}</span>
                <span className="text-[9px] text-[#78716c] uppercase tracking-wider">{sub}</span>
            </div>

            <div className="flex items-baseline gap-1 relative">
                <div className="absolute -inset-2 bg-[#f59e0b]/5 rounded opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-[#d97706] text-sm relative z-10">₹</span>
                {isEditing ? (
                    <input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className={`bg-[#2a2a2a] border border-[#f59e0b] rounded px-2 w-28 text-right font-mono text-2xl font-bold outline-none focus:border-[#f59e0b] transition-colors relative z-10 text-white`}
                    />
                ) : (
                    <span className={`font-mono text-3xl font-bold tracking-tighter relative z-10 drop-shadow-sm ${highlight ? 'text-[#fbbf24]' : 'text-[#e5e5e5]'}`}>
                        {value}
                    </span>
                )}
            </div>
        </div>
    );
}
