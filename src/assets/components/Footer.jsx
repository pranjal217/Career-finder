import React from 'react'
import { Link } from 'react-router-dom'
import { BsInstagram } from "react-icons/bs";
import { RiTwitterXLine } from "react-icons/ri";
import { SiWhatsapp } from "react-icons/si";

const Footer = () => {
  const linkClass = 'hover:text-green-800 hover:translate-x-2 transition-all duration-300'

  return (
   <footer className='bg-[#A4CE03] z-20 p-5 flex flex-col gap-6 relative pb-10'>
{/* Top row: logo + links */}
<div className='flex flex-col md:flex-row md:items-stretch md:justify-between gap-6'>

  {/* Logo and tagline */}
  <div className='flex flex-col gap-1'>
    <div className='flex flex-row items-center gap-3'>
      <div className='rounded-full bg-white w-8 h-8 md:w-10 md:h-10 border border-black flex-shrink-0' />
      <span className='text-sm md:text-xl font-bold tracking-wider uppercase'>
        SportsCareerFinder
      </span>
    </div>
    <p className='ml-11 text-[11px] md:text-[15px] text-green-700'>
      Find Your Field. Build Your Future.
    </p>
  </div>

  {/* Right column */}
  <div className='flex flex-col justify-between'>

    {/* Nav links */}
    <div className='flex flex-col md:flex-row gap-3 md:gap-8 text-[15px] md:text-xl text-green-950 font-semibold'>
      <Link to="/" className={linkClass}>Home</Link>
      <Link to="/about" className={linkClass}>About us</Link>
      <Link to="/howitworks" className={linkClass}>How it works</Link>
      <Link to="/contact" className={linkClass}>Contact us</Link>
    </div>

    {/* Legal — pinned to bottom */}
    <div className='flex flex-row gap-4 text-[15px] md:text-xl font-light'>
      <Link to="/privacy-policy" className='hover:text-orange-700'>Privacy Policy</Link>
      <Link to="/tnc" className='hover:text-orange-700'>Terms & Condition</Link>
    </div>

  </div>
</div>
      {/* Follow us */}
      <div className='flex flex-row gap-4 text-xl items-center'>
        <span className='text-lg font-semibold'>Follow us:</span>
        <a
        href="https://instagram.com/iismworld"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on instgram">
        <BsInstagram className='hover:text-green-900 cursor-pointer' />
        </a>

        <a href="twitter_handle"
        target="_blank"
        rel="noopener noreferrer"
      aria-label="Follow us on X">
        <RiTwitterXLine className='hover:text-green-900 cursor-pointer' />
        </a>
        <a
              href="https://wa.me/910000000000"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
  >
            
        <SiWhatsapp className='hover:text-green-900 cursor-pointer' />
      </a>
      </div>

      {/* Copyright */}
      <p className='text-sm text-green-950'>
        Eduhub Education Pvt Ltd. | © Copyright 2026 iismworld.com
      </p>

    </footer>
  )
}

export default Footer