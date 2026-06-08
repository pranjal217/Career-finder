import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import image from '../tele.png';
import mission from '../mission.png';
import out from '../notout.png';
import stadium from '../stadium.png';
import sport from '../sport.png';


const About = () => {
  const navigate = useNavigate(); 
  const [isMob, setIsmob]=useState(false);
  useEffect(()=>{
    setIsmob(window.innerWidth<768);
  },[]);
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
        <section className='min-h-[87vh]'>
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
            Our goal is simple  to make sports career discovery fast, fun, and personal. No lengthy forms, no generic advice. Just a few honest questions and a result that actually means something.
          </p>
          
          {/* Button + mobile image */}
          <div className='flex flex-1 items-end gap-4 mt-10'>
            <button
              onClick={() => navigate('/quiz')}
              className='bg-orange-400 relative  z-10 px-10 py-3 border-3 border-black shadow-[5px_5px_0_2px_rgba(0,0,0,1)] active:shadow-none hover:scale-105 active:translate-x-[6px] font-bold text-green-900 transition-all duration-300'
            >
              Answer it
            </button>
            
            {/* Phone image on mobile only */}
            <img
              src={image}
              alt="telephone"
              className='block md:hidden w-32 ml-41 h-auto object-contain'
            />
          </div>
        </div>

        {/* Image - right (Desktop only) ✅ */}
        <div
          className='relative flex-1 hidden md:flex justify-center cursor-pointer md:-mr-61 '
          onClick={() => navigate('/quiz')}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => sethovered(true)}
          onMouseLeave={() => sethovered(false)}
        >
          <img 
            src={image} 
            alt="telephone"
            className={`w-80 h-auto transition-all duration-300 ${
              hovered 
                ? 'scale-105 brightness-100 contrast-100 saturate-100' 
                : 'brightness-75 contrast-90 saturate-50'
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

      {/* OUR MISSION */}
      <section className='min-h-[80vh] '>
        <div className='flex  md:flex-row min-h-[80vh]'>
          <div className='flex flex-col  '>
            <h1 className='text-bold text-4xl md:text-7xl p-8'>
              <span className='font-judson font-bold  text-white'>OUR </span><br/>
              <span className='font-luckiest-guy text-[#C3FF0E]'>MISSION</span>
            </h1>
            <img src={mission} alt='goal' 
              className='w-50   md:w-70 '>
            </img>
          </div>
          {/* line */}

          <div className='  w-2 bg-white my-10 '>

          </div>


          <p className='text-white text-normal md:text-4xl flex justify-center items-center text-center p-10 tracking-wide leading-relaxed'>
            We believe every person carries a unique combination of strengths, interests, and drive. In the world of sports, that combination points to something specific  a career that fits like no other. Our quiz cuts 
            through the noise and shows you exactly where you belong.
          </p>
        </div> 

      </section>
      
      {/* OUR BELIEF */}
      <section className='grainy min-h-[80vh] bg-bg_green'>
        <div className='flex  md:flex-row w-full min-h-[80vh]'>
          
          {/* LEFT COLUMN - paragraph (wider) */}
          <div className=' relative w-full md:w-2/3 flex flex-col items-center justify-center '>
            <p className='text-black z-10 text-normal md:text-4xl p-5 mt-15 text-center tracking-wide leading-relaxed'>
              SportsCareerFinder was built for anyone who's ever felt lost choosing a sports 
              career path. We know the feeling the passion is there, but the direction isn't. 
              That's why we created a smarter way to find where you truly belong in the world of sports.

            </p>
          
          </div>

          {/* line */}
          <div className=' relative  w-1 bg-black my-5'> </div>
          {/* RIGHT COLUMN - heading (smaller) */}
          <div className=' relative w-full md:w-1/4 flex flex-col items-end  p-5'>
            <h1 className=' font-bold text-4xl md:text-7xl text-center'>
              <span className='font-judson font-bold text-black'>OUR</span><br/>
              <span className='font-luckiest-guy text-orange tracking-wider'>BELIEF </span>
            </h1>
            <img 
              src={out} 
              alt="stadium"
              className=' w-50 md:w-90 my-25  md:-mr-16  '
            />
          </div>

        </div>
      </section>
      
      {/* Our Solution */}
      <section className='min-h-[80vh]'>

        <div className='flex md:flex-row w-full min-h-[60vh]'>
          {/* header */}
          <div className='relative flex flex-col  w-full md:w-1/3'>
            <h1 className='p-8'>
              <span className='font-bold font-judson text-4xl md:text-7xl text-white'>OUR</span><br/>
              <span className='font-luckiest-guy text-4xl md:text-7xl  text-blue-700'>SOlUTION</span>
            </h1>
            <img src={sport} alt='image' 
              className='w-60 md:w-80 '>
            </img>
          </div>
          {/* line */}
          <div className='bg-white w-1 my-10'>

          </div>
          {/* Para */}
          <div className='flex flex-col justify-center items-center p-5'>
            <p className='text-normal md:text-4xl text-white text-center leading-relaxed tracking-wide  '>
              We turned that confusion into a simple quiz that listens to who you are and points you in the right direction. 
              No guesswork, no generic advice just honest, personalized results built around your strengths, your passion, 
              and your potential in the world of sports.

            </p>
          </div>

        </div>
      </section>
    </div>
  )
}

export default About