'use client';

import { useState, useEffect } from 'react';

export default function CertificateDemo() {
    const [currentView, setCurrentView] = useState(1); // 0 for certificate, 1 for ticket
    const [isVisible, setIsVisible] = useState(true);

    // Static QR code pattern to avoid hydration mismatch
    const qrPattern = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentView(prev => prev === 0 ? 1 : 0);
                setIsVisible(true);
            }, 200); // Short pause for fade effect
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const CertificateView = () => (
        <div className="rounded-xl sm:rounded-2xl p-2 sm:p-4 md:p-8 lg:p-12 shadow-2xl max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto relative overflow-hidden" style={{ 
            background: 'linear-gradient(135deg, rgba(13, 6, 48, 0.95) 0%, rgba(24, 49, 79, 0.95) 50%, rgba(56, 78, 119, 0.95) 100%)',
            aspectRatio: '5/3.5'
        }}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b298dc' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '30px 30px'
                }}></div>
            </div>

            {/* Certificate Border */}
            <div className="border border-double sm:border-2 md:border-4 h-full p-1 sm:p-2 md:p-4 lg:p-8 relative" style={{ borderColor: '#b298dc' }}>
                {/* Decorative corners */}
                <div className="absolute top-1 left-1 sm:top-2 sm:left-2 md:top-4 md:left-4 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-8 lg:h-8 border-l border-t sm:border-l-2 sm:border-t-2 md:border-l-3 md:border-t-3" style={{ borderColor: '#683abe' }}></div>
                <div className="absolute top-1 right-1 sm:top-2 sm:right-2 md:top-4 md:right-4 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-8 lg:h-8 border-r border-t sm:border-r-2 sm:border-t-2 md:border-r-3 md:border-t-3" style={{ borderColor: '#683abe' }}></div>
                <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 md:bottom-4 md:left-4 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-8 lg:h-8 border-l border-b sm:border-l-2 sm:border-b-2 md:border-l-3 md:border-b-3" style={{ borderColor: '#683abe' }}></div>
                <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 md:bottom-4 md:right-4 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-8 lg:h-8 border-r border-b sm:border-r-2 sm:border-b-2 md:border-r-3 md:border-b-3" style={{ borderColor: '#683abe' }}></div>
                
                <div className="text-center h-full flex flex-col justify-center relative z-10">
                    {/* Header */}
                    <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-8">
                        <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold mb-1 sm:mb-2 text-white">CERTIFICATE OF COMPLETION</h1>
                        <div className="w-8 sm:w-12 md:w-16 lg:w-32 h-0.5 sm:h-1 md:h-1.5 mx-auto rounded-full" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)' }}></div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center space-y-1 sm:space-y-2 md:space-y-4 lg:space-y-6">
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg">This is to certify that</p>
                        <h2 className="text-sm sm:text-base md:text-xl lg:text-3xl xl:text-4xl font-bold text-white tracking-wide">{`{name}`}</h2>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg">has successfully completed the</p>
                        <h3 className="text-xs sm:text-sm md:text-lg lg:text-2xl xl:text-3xl font-semibold px-1 sm:px-2" style={{ color: '#b298dc' }}>Advanced Web Development Course</h3>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2 md:mt-4">Completed on: {new Date().toLocaleDateString()}</p>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-end mt-2 sm:mt-3 md:mt-4 lg:mt-8 pt-1 sm:pt-2 md:pt-3 lg:pt-6 border-t" style={{ borderColor: 'rgba(178, 152, 220, 0.4)' }}>
                        <div className="text-left">
                            <div className="w-6 sm:w-8 md:w-12 lg:w-24 h-0.5 sm:h-1 mb-1 sm:mb-2 md:mb-3 rounded" style={{ backgroundColor: '#683abe' }}></div>
                            <p className="text-xs sm:text-sm text-gray-300">Instructor Signature</p>
                        </div>
                        <div className="text-center">
                            <div className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-16 lg:h-16 mx-auto mb-1 sm:mb-2 md:mb-3 rounded-full flex items-center justify-center border border-2" style={{ backgroundColor: 'rgba(178, 152, 220, 0.1)', borderColor: '#b298dc' }}>
                                <span className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg">✓</span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-300">Verified</p>
                        </div>
                        <div className="text-right">
                            <div className="w-6 sm:w-8 md:w-12 lg:w-24 h-0.5 sm:h-1 mb-1 sm:mb-2 md:mb-3 rounded" style={{ backgroundColor: '#683abe' }}></div>
                            <p className="text-xs sm:text-sm text-gray-300">Date</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const TicketView = () => (
        <div className="rounded-xl sm:rounded-2xl p-2 sm:p-4 md:p-8 lg:p-12 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto relative overflow-hidden flex items-center justify-center" style={{ 
            aspectRatio: '5/3.5'
        }}>
            {/* Centered Ticket */}
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-lg sm:rounded-xl overflow-hidden" style={{ 
                background: 'linear-gradient(135deg, rgba(13, 6, 48, 0.98) 0%, rgba(56, 78, 119, 0.98) 50%, rgba(88, 28, 135, 0.98) 100%)',
                aspectRatio: '2.5/1'
            }}>
                {/* Ticket Background Effects */}
                <div className="absolute inset-0">
                    {/* Purple flowing lines */}
                    <div className="absolute bottom-0 right-0 w-full h-full opacity-30">
                        <div className="absolute bottom-0 right-0 w-16 sm:w-24 md:w-32 lg:w-64 h-8 sm:h-12 md:h-16 lg:h-32 rounded-full" style={{
                            background: 'radial-gradient(ellipse, rgba(147, 51, 234, 0.4) 0%, transparent 70%)'
                        }}></div>
                        <div className="absolute bottom-1 right-3 sm:bottom-3 sm:right-6 md:bottom-6 md:right-12 w-8 sm:w-12 md:w-16 lg:w-32 h-4 sm:h-6 md:h-8 lg:h-16 rounded-full" style={{
                            background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.3) 0%, transparent 70%)'
                        }}></div>
                    </div>
                    {/* Sparkle effects */}
                    <div className="absolute top-1 left-5 sm:top-3 sm:left-10 md:top-6 md:left-20 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-purple-400 rounded-full opacity-60"></div>
                    <div className="absolute top-3 right-8 sm:top-6 sm:right-16 md:top-12 md:right-32 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-blue-400 rounded-full opacity-80"></div>
                    <div className="absolute bottom-4 left-8 sm:bottom-8 sm:left-16 md:bottom-16 md:left-32 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-purple-300 rounded-full opacity-70"></div>
                </div>

                {/* Ticket perforated edges */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full border border-2 border-dashed" style={{ backgroundColor: 'rgba(24, 49, 79, 0.8)', borderColor: '#b298dc' }}></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full border border-2 border-dashed" style={{ backgroundColor: 'rgba(24, 49, 79, 0.8)', borderColor: '#b298dc' }}></div>
                
                <div className="h-full flex relative z-10 p-1 sm:p-2 md:p-3 lg:p-6">
                    {/* Left section - Main content */}
                    <div className="flex-1 pr-1 sm:pr-2 md:pr-3 lg:pr-6 flex flex-col justify-between">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 mb-1 sm:mb-2">
                                    <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-6 lg:h-6 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)' }}>
                                        <span className="text-white font-bold text-xs">M</span>
                                    </div>
                                    <span className="text-gray-300 text-xs font-medium">MAILCRAFT PRO</span>
                                </div>
                                <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 mb-1 sm:mb-2 md:mb-3">
                                    <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-8 lg:h-8 rounded flex items-center justify-center border" style={{ borderColor: '#b298dc', backgroundColor: 'rgba(178, 152, 220, 0.1)' }}>
                                        <span className="text-white font-bold text-xs">E</span>
                                    </div>
                                    <span className="text-gray-200 text-xs font-medium">EVENT ORGANIZER</span>
                                </div>
                            </div>
                        </div>

                        {/* Event Title */}
                        <div className="mb-1 sm:mb-2 md:mb-3 lg:mb-4">
                            <h1 className="text-xs sm:text-sm md:text-base lg:text-2xl xl:text-3xl font-bold mb-1 sm:mb-2" style={{ 
                                background: 'linear-gradient(135deg, #00e5ff, #b298dc)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                TECH SUMMIT
                            </h1>
                            <div className="w-4 sm:w-6 md:w-8 lg:w-12 h-0.5 rounded" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)' }}></div>
                        </div>
                        
                        {/* Event Details */}
                        <div className="grid grid-cols-2 gap-1 sm:gap-2 md:gap-3 text-xs">
                            <div>
                                <p className="text-purple-300 uppercase tracking-wide text-xs">Date</p>
                                <p className="text-white font-medium text-xs">23/08/2025</p>
                            </div>
                            <div>
                                <p className="text-purple-300 uppercase tracking-wide text-xs">Time</p>
                                <p className="text-white font-medium text-xs">Start: 10 am</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-purple-300 uppercase tracking-wide text-xs">Venue</p>
                                <p className="text-white font-medium text-xs">Innovation Convention Center</p>
                                <p className="text-gray-300 text-xs">Downtown Tech District</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Dashed divider */}
                    <div className="w-px border-l border-dashed sm:border-l-2 mx-1 sm:mx-2 md:mx-3 lg:mx-4" style={{ borderColor: 'rgba(178, 152, 220, 0.4)' }}></div>
                    
                    {/* Right section - Ticket stub */}
                    <div className="w-12 sm:w-16 md:w-20 lg:w-36 flex flex-col justify-between py-0.5 sm:py-1">
                        {/* Attendee info */}
                        <div>
                            <p className="text-purple-300 uppercase tracking-wide text-xs mb-0.5 sm:mb-1">Delegate Name:</p>
                            <p className="text-white font-bold text-xs mb-1 sm:mb-2 md:mb-3">{`{name}`}</p>
                            
                            <p className="text-purple-300 uppercase tracking-wide text-xs mb-0.5 sm:mb-1">Team Name:</p>
                            <p className="text-white font-medium text-xs mb-1 sm:mb-3 md:mb-4">{`{TeamName}`}</p>
                        </div>
                        
                        {/* QR Code and Date */}
                        <div className="text-center">
                            <div className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 mx-auto mb-1 sm:mb-2 rounded border border-2 flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#b298dc' }}>
                                <div className="grid grid-cols-4 gap-px">
                                    {qrPattern.map((dot, i) => (
                                        <div key={i} className={`w-0.5 h-0.5 sm:w-1 sm:h-1 ${dot ? 'bg-gray-800' : 'bg-transparent'}`}></div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="border-t pt-0.5 sm:pt-1 md:pt-2" style={{ borderColor: 'rgba(178, 152, 220, 0.4)' }}>
                                <p className="text-white font-bold text-xs">23 August 2025</p>
                                <p className="text-purple-300 text-xs">Start: 10 am</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative mx-auto max-w-6xl">
            <div className="rounded-3xl border shadow-2xl overflow-hidden backdrop-blur-sm" style={{ backgroundColor: 'rgba(24, 49, 79, 0.8)', borderColor: 'rgba(179, 152, 220, 0.4)' }}>
                {/* Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 border-b" style={{ backgroundColor: 'rgba(13, 6, 48, 0.9)', borderColor: 'rgba(179, 152, 220, 0.3)' }}>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)' }}>
                            <span className="text-white font-bold text-sm sm:text-base">{currentView === 0 ? 'C' : 'T'}</span>
                        </div>
                        <span className="text-white font-semibold text-sm sm:text-base md:text-lg">
                            {currentView === 0 ? 'Certificate Preview' : 'Event Ticket Preview'}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-300">
                        <span className="hidden sm:inline">Live Preview</span>
                        <span className="sm:hidden">Live</span>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400 animate-pulse"></div>
                    </div>
                </div>

                {/* Content with fade animation */}
                <div className="p-2 sm:p-4 md:p-8 lg:p-12">
                    <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        {currentView === 0 ? <CertificateView /> : <TicketView />}
                    </div>
                </div>
            </div>
        </div>
    );
}