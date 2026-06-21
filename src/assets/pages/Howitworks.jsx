import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import players from '../final.png';

const Howitworks = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [stepProgress, setStepProgress] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      // Main timeline progress
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrolled = -rect.top + windowHeight * 0.3;
      const progress = Math.min(Math.max(scrolled / (sectionHeight * 0.9), 0), 1);
      setScrollProgress(progress);

      // Individual step progress
      const newStepProgress = stepRefs.current.map((ref) => {
        if (!ref) return 0;
        const stepRect = ref.getBoundingClientRect();
        const stepHeight = ref.offsetHeight;
        const stepScrolled = windowHeight / 2 - stepRect.top;
        return Math.min(Math.max(stepScrolled / stepHeight, 0), 1);
      });
      setStepProgress(newStepProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    { step: 'Step 1', title: 'Take the Quiz', desc: '"No wrong answers, just honest ones"', bg: 'bg-primary', side: 'left', badge: 'bg-[#fdb928]' },
    { step: 'Step 2', title: 'Tell Us Who You Are', desc: '"Strengths, vibes, dreams - all of it"', bg: 'bg-primary', side: 'right', badge: 'bg-orange-400' },
    { step: 'Step 3', title: 'Create Your Free Account', desc: '"Takes 30 sec and pays off for years"', bg: 'bg-primary', side: 'left', badge: 'bg-[#E4DBB2]' },
    { step: 'Step 4', title: "Get Your Career Blueprint", desc: '"Your dream path, courses and all served hot"', bg: 'bg-primary', side: 'right', badge: 'bg-yellow-300' },
    { step: 'Step 5', title: 'Share It, Own It', desc: '"Download it, share it, go get it!"', bg: 'bg-primary', side: 'left', badge: 'bg-[#1BFDF8]' },
  ];

  return (
    <div className='min-h-screen'>

      {/* Page Hero */}
      <section className='relative min-h-[86vh] flex justify-center items-center'>
        <h1 className='text-center mb-34 uppercase text-[#A1D800] font-judson font-bold text-7xl md:text-9xl'>
          HOW DOES IT<br /> WORK?
        </h1>
        <div className='checker-border absolute bottom-0 left-0 w-full h-20 z-10' />
        <div className='checker-border-faded absolute bottom-0 left-0 w-full h-40 z-5' />
      </section>

      {/* Heading */}
      <section className='grainy bg-bg_green py-16 px-8 text-center p-20 '>
        <h1 className='relative font-luckiest-guy uppercase font-black text-3xl md:text-6xl tracking-wide'>
          Your 4-Step Playbook
        </h1>
        <div className='wx-200 md:w-200 h-3 bg-blue-600 mx-auto -mt-4 mb-6' />
        <p className='relative text-lg md:text-2xl'>
          Your road map to the big leagues. No bench warming allowed.
        </p>
      </section>

      {/* Steps */}
<section ref={sectionRef} className='relative bg-black py-20 px-4 md:px-8 overflow-hidden'
  style={{
    backgroundImage: `url(${players})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  }}>
  <div className='absolute inset-0 bg-black/50 z-0 ' />
  <div className='relative max-w-4xl mx-auto' style={{ perspective: '1000px' }}>

    {/* Background dashed line */}
    <div className='absolute left-1/2 top-0 bottom-0 border-l-2 border-dashed border-white/20 z-0 -translate-x-1/2' />

    {/* Animated fill line */}
    <div
      className='absolute left-1/2 top-0 w-1 bg-[#A1D800] z-[1] -translate-x-1/2 transition-all duration-100 rounded-full'
      style={{ height: `${scrollProgress * 100}%` }}
    />

    {/* Animated ball */}
    <div
      className='absolute left-1/2 z-20 -translate-x-1/2 transition-all duration-100'
      style={{ top: `calc(${scrollProgress * 100}% - 12px)` }}
    >
      <div className='w-6 h-6 rounded-full bg-[#A1D800] border-3 border-black shadow-[0_0_12px_4px_rgba(161,216,0,0.6)] animate-pulse' />
    </div>

    {/* Steps */}
    <div className='flex flex-col gap-16'>
      {steps.map((s, i) => {
        const progress = stepProgress[i] || 0;
        const rotation = (1 - progress) * 50; // Tilt amount
        
        return (
          <div
            key={i}
            ref={(el) => (stepRefs.current[i] = el)}
            className='grid grid-cols-2 items-center'
            style={{
              transform: `rotateY(${rotation}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.09s linear',
              willChange: 'transform',
            }}
          >
            {s.side === 'left' ? (
              <>
                <div className='relative z-10 pr-8'>
                  <span className={`absolute top-1 -left-4 w-18 text-center text-xs ${s.badge} border-2 border-black text-black 
                    font-black px-3 py-1 uppercase`}>
                    {s.step}
                  </span>
                  <div className={`${s.bg} border-3 border-black shadow-[6px_6px_0_2px_rgba(0,0,0,1)] p-5 pt-7`}>
                    <h2 className='text-black font-luckiest-guy text-lg md:text-2xl uppercase'>{s.title}</h2>
                    <p className='text-black/80 text-sm mt-2'>{s.desc}</p>
                  </div>
                </div>
                <div />
              </>
            ) : (
              <>
                <div />
                <div className='relative z-10 pl-8'>
                  <span className={`absolute -top-5 -right-4 ${s.badge} border-2 border-black text-black text-xs font-black px-3 py-1 uppercase`}>
                    {s.step}
                  </span>
                  <div className={`${s.bg} border-3 border-black shadow-[6px_6px_0_2px_rgba(0,0,0,1)] p-5 pt-7`}>
                    <h2 className='text-black font-luckiest-guy text-lg md:text-2xl uppercase'>{s.title}</h2>
                    <p className='text-black/80 text-sm mt-2'>{s.desc}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>

  </div>
</section>

      {/* CTA */}
      <section className='py-16 px-8 text-center'>
        <h2 className='text-primary  font-Keania-one text-3xl md:text-7xl uppercase tracking-wider mb-8'>
          Your Season Starts<br /> Now!
        </h2>
        <button
          onClick={() => navigate('/quiz')}
          className='bg-[#A1D800] text-black font-Keania-one  text-2xl uppercase px-10 py-4 border-3 border-black shadow-[8px_9px_0_2px_rgba(161,216,0)] active:shadow-none active:translate-x-[6px] hover:scale-105 transition-all duration-150'
        >
          Kickoff
        </button>
      </section>

    </div>
  );
};

export default Howitworks;