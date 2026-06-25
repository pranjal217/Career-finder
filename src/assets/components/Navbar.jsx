import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {RxHamburgerMenu} from "react-icons/rx";
import {IoCloseOutline} from "react-icons/io5";


export default function Navbar() {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hasresult,setHasResult] = useState(
        ()=> sessionStorage.getItem('quizScores')!==null

    );


   useEffect(()=>{
    const checkResult =()=>{
        setHasResult(sessionStorage.getItem('quizScores')!==null);
    };

    window.addEventListener('quizResultChanged',checkResult);
    window.addEventListener('storage',checkResult);

    return()=>{
        window.removeEventListener('quizResultChanged', checkResult)
        window.removeEventListener('storage',checkResult);

    }


   },[]);



    const handleLogin = () => loginWithRedirect();
    const handleSignup = () => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });

    const handleLogout = () => {
        sessionStorage.removeItem('quizScores');
        sessionStorage.removeItem('quizAnswers');
        setHasResult(false);
        logout({ logoutParams: { returnTo: window.location.origin } });
    };
    




   const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'How it Works', path: '/howitworks' },
    { label: 'Take the Quiz', path: '/quiz' },
    { label: 'Contact', path: '/contact' },
    ...(isAuthenticated && hasresult ? [{ label: 'Result', path: '/result' }] : []),
];


    return (
        <>
        <nav className='rounded-full sticky top-0 z-50 shadow-xl bg-[#A4CE03] primary mt-3'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16 md:h-20'>

                    {/* LEFT - Logo & Brand */}
                    <div className='flex items-center gap-3 flex-shrink-0'>
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-white shadow-md flex items-center justify-center">
                            <span className='text-green-800 font-bold text-xs md:text-sm'>S</span>
                        </div>
                        <div className='flex flex-col leading-tight'>
                            <span className='text-black font-bold text-xs md:text-sm tracking-wider'>SPORTCAREER</span>
                            <span className='text-gray-800 font-semibold text-[10px] md:text-xs tracking-widest'>FINDER</span>
                        </div>
                    </div>

                    {/* CENTER - Desktop Nav Links */}
                    <div className='hidden md:flex items-center gap-8 flex-4 justify-center'>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className='text-black text-sm font-medium duration-200 relative group hover:scale-115 hover:text-on-primary duartion-300 transition-all'
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* RIGHT - Auth Buttons (Desktop) */}
                    <div className='hidden md:flex items-center gap-3 flex-shrink-0'>
                        {isAuthenticated ? (
                            <>
                                <span className='text-sm font-semibold text-green-900'>{user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className='px-5 py-2 text-sm font-bold text-green-800 bg-[#CBF356] hover:scale-105 border-3 border-black shadow-[5px_5px_0_2px_rgba(0,0,0,1)] active:shadow-none active:translate-x-3 mr-6 transition-all duration-200'
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleLogin}
                                    className='px-5 py-2 text-sm font-bold text-green-800 bg-[#CBF356] hover:scale-105 border-3 border-black shadow-[5px_5px_0_2px_rgba(0,0,0,1)] active:shadow-none active:translate-x-3 mr-6 transition-all duration-200'
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={handleSignup}
                                    className='px-5 py-2 text-sm font-bold text-green-800 bg-[#E5FF9A] hover:scale-105 border-3 border-black shadow-[5px_5px_0_2px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[6px] transition-all duration-150'
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>

                    {/* MOBILE - Log In + Hamburger */}
                    <div className='md:hidden flex items-center gap-2'>
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className='px-3 py-1.5 text-xs font-semibold text-green-800 bg-[#CBF356] hover:scale-105 border-3 border-black shadow-[5px_5px_0_2px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[6px] transition-all duration-150'
                            >
                                Log Out
                            </button>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className='px-3 py-1.5 text-xs font-semibold text-green-800 bg-[#CBF356] hover:scale-105 border-3 border-black shadow-[5px_5px_0_2px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[6px] transition-all duration-150'
                            >
                                Log In
                            </button>
                        )}

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className='p-2 rounded-md text-black transition-colors'
                            aria-label='Toggle menu'
                        >
                            {isMenuOpen ? <IoCloseOutline size={24}/> : <RxHamburgerMenu size={24}/>}
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        {/* MOBILE - Dropdown Menu */}
        {isMenuOpen && (
            <div className='md:hidden top-24 fixed bg-primary w-full py-4 px-4 space-y-3 z-100'>
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className='block text-green-900 hover:text-yellow-600 text-sm font-medium py-2 px-3 rounded-md hover:bg-green-200/70 transition-colors'
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
                {isAuthenticated ? (
                    <button
                        onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                        className='w-full mt-4 px-4 py-2 text-sm font-semibold text-green-800 bg-[#CBF356] border-3 border-black shadow-[5px_5px_0_2px_rgba(0,0,0,1)] hover:scale-105 active:translate-x-[6px] active:shadow-none transition-all duration-150'
                    >
                        Log Out
                    </button>
                ) : (
                    <button
                        onClick={() => { handleSignup(); setIsMenuOpen(false); }}
                        className='w-full mt-4 px-4 py-2 text-sm font-semibold text-green-800 bg-[#E5FF9A] border-3 border-black shadow-[5px_5px_0_2px_rgba(0,0,0,1)] hover:scale-105 active:translate-x-[6px] active:shadow-none transition-all duration-150'
                    >
                        Sign Up
                    </button>
                )}
            </div>
        )}
        </>
    );
}