import React from 'react'
import {useNavigate} from 'react-router-dom';

import { TiLocationArrow } from "react-icons/ti";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen'>

      {/* Left Checkers */}
      <div className='relative'>
       <div className='checker-border absolute top-0 left-0 w-16 h-full z-10' />
       <div className='checker-border-faded  hidden md:block absolute top-0 left-14 w-17 h-full z-5' />
      
       {/* Right checkers */}
      
       <div className='checker-border absolute top-0 right-0 w-16 h-full z-10' />
       <div className='checker-border-faded absolute hidden md:block top-0 right-14 w-17 h-full z-5' />

       {/* All content sits between the checkers */}
       <div className='mx-16 '>
       
         {/* TEXT */}
        <section className='flex flex-col items-center justify-center text-center px-6 py-24 min-h-[85vh] '>
          <h1 className=' text-7xl lg:text-9xl md:text-7xl  font-bold font-judson text-[#A1D800] uppercase leading-tight tracking-tight -mt-15 z-20'>
            Your Dream<br /> Sports Career <br /> Isn't a Mystery
          </h1>
          <p className='text-xl text-[#FFEF78] font-medium italic tracking-wide p-10 lg:text-3xl'>
            Try SportsCareerFinder — free, fast, and built for you
          </p>
          {/* Begin button */}
          <button
            onClick={() => navigate('/quiz')}
            className='group flex items-center mt-3 px-6 py-3 bg-[#A1D800] border-5
             border-black shadow-[5px_5px_0_2px_rgba(0,0,0,1)] active:shadow-none 
             active:translate-x-[6px] hover:scale-105 font-bold transition-all duration-150 '
          >
            Begin
            <TiLocationArrow className='text-2xl ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500' />
          </button>
        </section>
        </div>
        </div>
        {/* Problem section */}
        <section className='flex flex-col md:flex-row min-h-[80vh] mt-30 md:mt-5'>
          
             {/* Left dark green side */}
          <div className='w-full md:w-1/3  flex flex-col justify-center px-8 md:px-10 py-12 md:py-18'>

            <h2 className='text-3xl md:text-5xl  text-[#A1D800] font-judson font-bold -mt-50'>
            The <br/> Problem
            </h2>
            <p className='text-[#9CD100] text-base  md:text-lg mt-5 md:mt-10  leading-relaxed '>
              Millions of people love sports but have no idea how to turn that passion into a career.
            </p>
          </div>
        {/* Right-side */}
         <div className=' grainy w-full md:w-2/3 flex flex-col justify-center px-8 md:px-12 py-20 md:py-20  bg-[#DFFDBA] -mt-5 '>
         <p className='text-black text-2xl md:text-4xl leading-snug mb-6'>
          Should you coach? Scout? Work in sports media? Sports management? The options are overwhelming — 
          and we're here to simplify it.
         </p>
        <p className='text-[#18A000] font-bold italic text-xl md:text-2xl'>
          Let's solve it together!
        </p>
         <p className='text-base  md:text-xl py-10 '>
          Whether you want to play, coach, manage or broadcast 
          <span className='text-orange-400 font-bold'> SportsCareerFinder</span> points you in the right direction
        </p>

        {/* Button */}

        <button onClick={()=>navigate('/quiz')}
         className='bg-[#A1D800] w-28 h-12 border-3 border-black
        shadow-[5px_5px_0_2px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[6px] transtion-all duration-300
        text-green-700 text-base font-bold items-center z-30 hover:scale-105'>
          Try Now!
        </button>
         </div>
         
        </section>
        {/* What do we do? */}
        <section className='  grid-bg min-h-[50vh] '>
          <div className='relative'>
          <div className=' grainy  flex flex-col  items-center bg-[#c2f44f]'>
        <h1 className=' relative z-10 px-15 py-10 text-5xl md:text-7xl font-judson font-bold text-green-900 text-center leading-snug' >
          What do we do?
        </h1>
        
        <p className='relative z-10 px-15 py-10 text-3xl leading-relaxed text-center -mt-17' >
          <span className='font-bold italic'>SportsCareerFinder </span>is a smart website designed to help <br/>
          <span className='text-orange-500'> athletes, students 
          and sports enthusiasts</span> discover the career path that best<br/> matches their skills, passion and goals.
          <br/>Answer a few questions and let us know.
        </p>
        </div>
        </div>
      
        </section>
        {/* eligibility */}
       <section>
       
        
       </section>
       {/* stats */}
       <section className='bg-[#2D4A1E] min-h-[90vh]'>
        <h1 className='font-judson font-bold  text-5xl md:text-7xl text-[#A1D800] leading-tight p-10'>
          Not Your Typical<br/> Career Quiz</h1>
          <p className='font-normal p-10 -mt-15 text-orange-300'>
            Stop sitting on the bench. Find the sports career you were always meant to play. 
            </p>
        
         {/* cards */}
         <div className='flex flex-col md:flex-row gap-4 max-w-8xl p-10 relative'>

        <div className=' grainy bg-[#AAFF45]  flex-1 flex flex-col items-center justify-center py-10 px-6 border-3 border-green-500 '>
       <p className='text-5xl relative z-10 font-black text-black'>5K+</p>
       <p className='text-sm  relative z-10 font-bold uppercase tracking-widest text-black mt-2'>Users</p>
      
       <p className='text-center p-5 relative z-10'>5K+ game changers already made their move. Time to get in the game!
       </p>
       </div>

       <div className='grainy bg-[#ff7d7d] flex-1 flex flex-col items-center justify-center py-10 px-6 border-3 border-pink-600'>
       <p className='text-5xl relative z-10 font-black text-black'>50+</p>
       <p className='text-sm font-bold relative z-10 uppercase tracking-widest text-black mt-2'>Careers</p>
       <p className='relative z-10 text-center p-5'>
       Get your top 3 sports careers because the game is bigger than just playing it.
        </p>
       </div>

         <div className='grainy  bg-[#E3FF55] flex-1 flex flex-col items-center justify-center py-10 px-6 border-3 border-yellow-500'>
         <p className='text-5xl relative z-10 font-black text-black'>5-6 mins</p>
         <p className='text-sm relative z-10 font-bold uppercase tracking-widest text-black mt-2'>Time</p>
        <p className='text-center relative z-10 p-5'>
       Faster than a halftime break. No excuses to not take the shot.
       </p>
       </div>
        <div className='grainy bg-[#FFA639] flex-1 flex flex-col items-center justify-center py-10 px-6 border-3 border-orange-500 '>
       <p className='text-5xl relative z-10 font-black text-black -mt-7'>10-15</p>
        <p className='text-sm relative z-10 font-bold uppercase tracking-widest text-black mt-2'>questions

        </p>
        <p className='text-center relative z-10 p-5' >
         No fluff drills just the right Qs to find your winning position.
       </p>
  </div>
  
  </div>
  {/* Button */}
  <div className='flex justify-center'>

    <button  onClick={()=>navigate('/quiz')}
     className='group flex items-center bg-[#A1D800] text-green-800 font-bold  border-3 border-black  mb-10
    text-xl px-8 py-4 shadow-[5px_5px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-[6px] hover:scale-105 duration-300 transition-all'>
     Step up
    </button>
    </div>
  </section>  


     

    </div>
  );
}