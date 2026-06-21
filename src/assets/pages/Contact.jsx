import React from 'react'

const Contact = () => {
  return (
    <div className='min-h-screen'>

      {/* Page Hero */}
      <section className='relative min-h-[86vh] flex justify-center items-center'>
        <h1 className='text-center mb-34 uppercase text-[#A1D800] font-judson font-bold text-7xl md:text-9xl'>
          GET IN TOUCH <br /> WITH US
        </h1>
        <div className='checker-border absolute bottom-0 left-0 w-full h-20 z-10' />
        <div className='checker-border-faded absolute bottom-0 left-0 w-full h-40 z-5' />
      </section>

      {/* Contact Form */}
      <section className='flex items-center justify-center px-5 py-20'>
        <div
          className=' grainy w-full max-w-3xl bg-bg_green border-2 border-black p-10 md:p-14'
        >
          {/* Heading */}
          <p className='relative uppercase text-on-primary text-xs tracking-widest font-bold mb-3'>
            SportsCareerFinder
          </p>
          <h2 className='relative font-judson font-bold text-green-800 text-4xl md:text-5xl uppercase leading-tight mb-4'>
            Get In Touch
          </h2>
          

          {/* Name + Contact row */}
          <div className='flex flex-col md:flex-row gap-8 mb-8'>
            <div className='flex-1'>
              <label className='relative  block uppercase text-[#21620a] text-xs tracking-widest font-bold mb-2'>
                Name
              </label>
              <input
                type='text'
                placeholder='Your full name'
                className='relative w-full bg-transparent border-b border-[#465c02] focus:border-[#000000] text-black text-base py-2 outline-none placeholder:text-black/40 transition-colors'
              />
            </div>
            <div className='relative flex-1'>
              <label className='block uppercase text-[#21620a] text-xs tracking-widest font-bold mb-2'>
                Contact / Phone
              </label>
              <input
                type='text'
                placeholder='+91 00000 00000'black
                className='w-full bg-transparent border-b border-[#3e4821] focus:border-[#1b1d17] text- text-base py-2 outline-none placeholder:text-black/40 transition-colors'
              />
            </div>
          </div>

          {/* Email */}
          <div className='relative mb-8'>
            <label className='block uppercase text-[#21620a] text-xs tracking-widest font-bold mb-2'>
              Email
            </label>
            <input
              type='email'
              placeholder='you@email.com'
              className='w-full bg-transparent border-b border-[#343f12] focus:border-[#283208] text-black text-base py-2 outline-none placeholder:textblack/30 transition-colors'
            />
          </div>

          {/* Message */}
          <div className='relative mb-10'>
            <label className='block uppercase text-[#21620a] text-xs tracking-widest font-bold mb-2'>
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Tell us what's on your mind..."
              className='w-full bg-transparent border-b border-[#2b3410] focus:border-[#1d2603] text-black text-base py-2 outline-none placeholder:text-black/40 transition-colors resize-none'
            />
          </div>

          {/* Submit */}
          <button className='relative bg-[#A1D800] text-black border-2 border-black uppercase font-bold 
          text-sm tracking-widest px-10 py-4  shadow-[5px_5px_0_2px_rgba(0,0,0,1)] hover:scale-105 active:translate-x-[6px] active:shadow-none duration-400 transition-all'>
            Send Message →
          </button>

          <p className='mt-6 text-black/60 text-sm italic'>
            We'll get back to you within 2–3 business days.
          </p>
        </div>
      </section>

    </div>
  )
}

export default Contact