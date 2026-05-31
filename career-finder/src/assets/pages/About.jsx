import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import image from '../tele.png';

const About = () => {
  const navigate = useNavigate(); 
  const [pos,setpos]= useState({x:0,y:0});
  const [hovered,sethovered]=useState(false);

  const handleMouseMove=(e)=>{
    const rect = e.currentTarget.getBoundingClientRect();
    setpos({
      x: e.clientX  - rect.left,
      y:e.clientY - rect.top,
    });
  };

  return (
    <div className='min-h-screen'>
      {/* Page hero */}
      <div className='relative'>
        <section className='min-h-[80vh]'>
          <h1 className='text-center p-30 md:p-38 uppercase text-[#A1D800] font-judson font-bold text-7xl md:text-9xl'>
            about us
          </h1>
        </section>
        <div className='checker-border absolute bottom-0 left-0 w-full h-20 z-10' />
        <div className='checker-border-faded absolute bottom-0 left-0 w-full h-40 z-5' />
      </div>

      {/* Grainy section */}
      <section className='grainy relative bg-[#99d555] min-h-[90vh] p-10 flex flex-col md:flex-row items-center gap-10'>
        
        {/* Text - left */}
        <div className='relative z-10 flex-1'>
          <h1 className='text-4xl md:text-6xl font-bold font-judson'>
            <span className='text-orange-600'>Empowering you</span> to make informed sports career decisions
          </h1>
          <p className='text-xl md:text-2xl text-black mt-6'>
            Our goal is simple — to make sports career discovery fast, fun, and personal. No lengthy forms, no generic advice. Just a few honest questions and a result that actually means something.
          </p>
          <div className='flex justify-start mt-10'>
            <button
              onClick={() => navigate('/quiz')}
              className='bg-orange-400 relative z-10 px-10 py-4 border-3 border-black shadow-[5px_5px_0_2px_rgba(0,0,0,1)] active:shadow-none hover:scale-105 active:translate-x-[6px] font-bold text-green-900 transition-all duration-300'
            >
              Answer it
            </button>
          </div>
        </div>

        {/* Image - right ✅ */}
   <div
  className='relative flex-1 flex justify-center cursor-pointer -mr-42 md:-mr-61'
  onClick={() => navigate('/quiz')}
  onMouseMove={handleMouseMove}
  onMouseEnter={() => sethovered(true)}
  onMouseLeave={() => sethovered(false)}
>
  <img 
  src={image} 
  alt="telephone"
  className={`w-80 h-auto transition-all duration-300 
    ${hovered 
      ? 'scale-105 brightness-100 contrast-100' 
      : 'brightness-80 contrast-90 saturate-60'
    }`}
/>

  {/* Cursor following text */}
  {hovered && (
    <span
      className='absolute z-50 bg-black rounded-2xl text-[#A1D800] font-bold text-sm px-4 py-2 whitespace-nowrap pointer-events-none'
      style={{ left: pos.x + 15, top: pos.y + 15 }}
    >
    Take the call!
    </span>
  )}
</div>

      </section>
    </div>
  )
}

export default About