import { useAuth0 } from '@auth0/auth0-react';
import { ShieldAlert, TrendingUp } from 'lucide-react';
import { archetypesData } from '../../data/questions';
import { MdOutlineRestartAlt } from "react-icons/md";
import { RiDownloadLine } from "react-icons/ri";
import  { useRef } from 'react';
import domtoimage from 'dom-to-image-more';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function Result() {
  const {user} = useAuth0();
const location = useLocation();
 const navigate= useNavigate();
  
  const resultRef = useRef(null);

   const scores = location.state?.scores
    ?? JSON.parse(sessionStorage.getItem('quizScores') || '{}');

  const answers = location.state?.answers
    ?? JSON.parse(sessionStorage.getItem('quizAnswers') || '{}');

//guard:nothing to show

if(!scores || Object.keys(scores).length===0){
  return (
     <div className="bg-[#101E08] min-h-screen text-white flex flex-col items-center justify-center gap-4">
        <p className="text-lg">No result found — take the quiz first.</p>
        <button
          onClick={() => navigate('/quiz')}
          className="px-6 py-3 font-bold uppercase border-4 border-black bg-[#A1D800] shadow-[6px_6px_0_2px_rgba(161,216,0)]"
        >
          Take the Quiz
        </button>
      </div>
  )
}


  // download the pdf
  const handleDownload = async () => {
  const node = resultRef.current;
  const blob = await domtoimage.toJpeg(node, {
    quality: 0.95,
    bgcolor: '#0D1F0D',
    scale: 2,
  });
  const link = document.createElement('a');
  link.download = 'my-sports-career-result.jpg';
  link.href = blob;
  link.click();
};

// restart
const handleRestart=()=>{
  navigate('/quiz')
}


  const getRecommendation = () => {
    const sortedBuckets = Object.entries(scores)
      .map(([name, score]) => ({ name, score }))
      .sort((a, b) => b.score - a.score);

    const topBucket = sortedBuckets[0].name;

    const educationLevel = answers['educationLevel'] || 'school';
    const stream12th = answers['stream12th'] || 'other';
    const gradField = answers['gradField'] || 'na';
    const experienceLevel = answers['experienceLevel'] || 'fresher';

    const isGraduate = educationLevel === 'graduate' || educationLevel === 'professional';
    const isPCB = stream12th === 'pcb';
    const isScienceGrad = gradField === 'science_grad';

    const courseEligibilities = {
      BSM: true,
      BSS: isPCB,
      MSM: isGraduate,
      MSS: isGraduate && isScienceGrad,
      PGPSM: isGraduate,
    };

    let results = {
      status: 'eligible',
      archetypeTitle: archetypesData[topBucket].title,
      tagline: archetypesData[topBucket].tagline,
      desc: archetypesData[topBucket].desc,
      workStyle: archetypesData[topBucket].workStyle,
      underPressure: archetypesData[topBucket].underPressure,
      superpower: archetypesData[topBucket].superpower,
      blindSpot: archetypesData[topBucket].blindSpot,
      careers: archetypesData[topBucket].careers,
      bestCourse: '',
      fallbackCourse: '',
      longTermGoal: '',
      warningMsg: '',
      scores: sortedBuckets,
    };

    switch (topBucket) {
      case 'scientist':
        if (isGraduate) {
          if (courseEligibilities.MSS) {
            results.bestCourse = 'Master of Sports Science (MSS)';
            results.longTermGoal = 'Director of Sports Performance / High-Performance Researcher';
          } else {
            results.status = 'redirected';
            results.bestCourse = 'Post Graduate Program in Sports Management (PGPSM)';
            results.fallbackCourse = 'Bachelor of Sports Science (BSS) - 3 Years Program';
            results.warningMsg = 'Academic Restriction: Since your graduation background is not in Life/Biological Sciences, you cannot directly enroll in an MSS. We recommend PGPSM to join the sports industry on the Analytics and Operations side, or restarting with a BSS.';
            results.longTermGoal = 'Director of Sports Analytics & Performance Operations';
            results.careers = archetypesData.scientist.careers.filter(
              c => !['Sports Physiotherapist', 'Sports Nutritionist / Dietitian'].includes(c.name)
            );
          }
        } else {
          if (courseEligibilities.BSS) {
            results.bestCourse = 'Bachelor of Sports Science (BSS)';
            results.longTermGoal = 'Head Sports Performance Scientist & Biomechanist';
          } else {
            results.status = 'redirected';
            results.bestCourse = 'Bachelor of Sports Management (BSM)';
            results.warningMsg = stream12th === 'pcm'
              ? 'Academic Restriction: Since your Class 12 stream did not include Biology (PCM), you are not eligible for a B.Sc in Sports Science. However, your strong Math & Physics background is highly suited for Sports Analytics and Biomechanics via a BSM degree.'
              : 'Academic Restriction: Since you did not study Science (Biology) in Class 12, you are not eligible for BSS. We recommend BSM, where you can still work in Sports Analytics, Scouting, and Operations.';
            results.longTermGoal = 'Head of Player Performance Analytics & Tactical Scout';
            results.careers = archetypesData.scientist.careers.filter(
              c => !['Sports Physiotherapist', 'Sports Nutritionist / Dietitian'].includes(c.name)
            );
          }
        }
        break;

      case 'architect':
        results.bestCourse = isGraduate ? 'Master of Sports Management (MSM)' : 'Bachelor of Sports Management (BSM)';
        results.fallbackCourse = isGraduate ? 'PGPSM' : 'Diploma in Sports Operations';
        results.longTermGoal = 'Chief Executive Officer (CEO) of Sports Franchise / Sports League Director';
        if (isScienceGrad || isPCB) {
          results.warningMsg = 'Hybrid Advantage: Your Biology background is a huge asset. While you are pursuing Sports Management, your clinical knowledge makes you the ultimate fit for managing high-performance athletic centers, rehabilitation facilities, and athlete medical logistics.';
        }
        break;

      case 'hustler':
        results.bestCourse = isGraduate ? 'Master of Sports Management (MSM)' : 'Bachelor of Sports Management (BSM)';
        results.fallbackCourse = isGraduate ? 'PGPSM' : 'Diploma in Athlete Representation & Marketing';
        results.longTermGoal = 'Vice President of Commercial Partnerships & Athlete Agent';
        if (isScienceGrad || isPCB) {
          results.warningMsg = 'Hybrid Advantage: Your background in Science gives you high credibility when representing athletes or negotiating health/fitness brand sponsorship deals, as you understand their physical training needs.';
        }
        break;

      case 'storyteller':
      case 'creator':
        results.bestCourse = isGraduate ? 'Master of Sports Management (MSM)' : 'Bachelor of Sports Management (BSM)';
        results.fallbackCourse = isGraduate ? 'PGPSM' : 'Diploma in Media, PR & Audience Analytics';
        results.longTermGoal = 'VP of Global Sports Marketing & Chief Content Officer';
        break;

      case 'coach':
        results.bestCourse = isPCB || isScienceGrad
          ? (isGraduate ? 'Master of Sports Science (MSS)' : 'Bachelor of Sports Science (BSS)')
          : (isGraduate ? 'Master of Sports Management (MSM)' : 'Bachelor of Sports Management (BSM)');
        results.longTermGoal = 'Head Coach of a Professional Franchise / Youth Academy Director';
        if (!isPCB && !isScienceGrad) {
          results.warningMsg = 'Coaching Route Note: For advanced technical coaching pathways, additional sports science credentials or coaching federation licenses (A-License, etc.) are highly recommended alongside management studies.';
        }
        break;

      default:
        break;
    }

    if (experienceLevel === 'advanced') {
      results.longTermGoal += ' (Research and High-Performance Development)';
    }

    return results;
  };

  const rec = getRecommendation();

  const archetypeAccents = {
    'The Architect': { primary: '#84ff4d', secondary: '#f59e0b' },
    'The Sports Storyteller': { primary: '#fef08c', secondary: '#84ff4d' },
    'The Sports Scientist': { primary: '#4ade80', secondary: '#22d3ee' },
    'The Dealmaker (Hustler)': { primary: '#f59e0b', secondary: '#eab308' },
    'The Creative Catalyst': { primary: '#c026d3', secondary: '#84ff4d' },
    'The Human Developer (Coach)': { primary: '#22c55e', secondary: '#86efac' },
  };

  const accent = archetypeAccents[rec.archetypeTitle] || { primary: '#84ff4d', secondary: '#eab308' };

  return (
    <div ref={resultRef} className="bg-[#101E08] min-h-screen text-white overflow-hidden relative">

      {/* checker borders */}
      <div className="checker-border absolute top-0 right-0  w-10 md:w-15 h-full z-10" />
      <div className="checker-border-faded absolute top-0 right-0 w-30 h-full z-5 hidden md:block" />
      <div className="checker-border absolute top-0 left-0 w-10 md:w-15 h-full z-10" />
      <div className="checker-border-faded absolute top-0 left-0 w-30 h-full z-5 hidden md:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-10 space-y-10 py-10">

        {/* ── HERO ── */}
        <div className="relative overflow-hidden p-10 md:p-16 mb-2">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className=" uppercase tracking-wide text-sm font-bold text-[#84ff4d]">
                  {user?.name ? `${user.name}, YOUR BLUEPRINT`:'Your blueprint'}
                </span>
              </div>
              <h1 className=" text-accent text-3xl md:text-7xl font-luckiest-guy tracking-wide leading-none mb-4">
                {rec.archetypeTitle}
              </h1>
              <p className="text-base md:text-3xl font-light italic text-secondary">
                "{rec.tagline}"
              </p>
            </div>
          </div>
        </div>

        {/* ── MAIN GRID: WHO YOU ARE + SIDEBAR ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Who You Are */}
          <div className="lg:col-span-8 space-y-8">
            <div className="border border-[#84ff4d]/10 p-8 md:p-10 text-primary">
              <SectionLabel label="WHO YOU ARE"  />
              <p className=" text-[14px] md:text-lg leading-loose tracking-wide text-[#c5e8a8] mt-6">
                {rec.desc}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 text-sm">
                <MiniBlock label="WORK STYLE"        text={rec.workStyle}    accent="#84ff4d" />
                <MiniBlock label="UNDER PRESSURE"    text={rec.underPressure} accent="#f59e0b" />
                <MiniBlock label="HIDDEN SUPERPOWER" text={rec.superpower}   accent="#a3ff6b" />
                <MiniBlock label="BIGGEST BLIND SPOT" text={rec.blindSpot}   accent="#fb7185" />
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-4 space-y-8">

            {/* Academic Pathway */}
            <div className= "overflow-hidden bg-bg_green grainy border-2 border-green-900 p-8">
            <h1 className="relative uppercase text-on-primary font-luckiest-guy text-xl md:text-3xl">
                Academic Pathway
              </h1>
              <div className="relative mt-3 text-2xl font-black leading-tight text-black">
                {rec.bestCourse}
              </div>
              <p className="relative text-sm font-medium text-green-700 mt-2">
                Best fit based on your profile
              </p>
              {rec.warningMsg && (
                <div className="mt-6 p-5 bg-black border border-orange-500/30 text-sm text-orange-200 flex gap-4">
                  <ShieldAlert className="mt-0.5 text-orange-400 flex-shrink-0" size={22} />
                  <div>{rec.warningMsg}</div>
                </div>
              )}
            </div>

            {/* Alternative Route */}
            {rec.fallbackCourse && (
              <div className="grainy border  p-8  bg-bg_green">
                <h1 className="uppercase text-green-900 font-luckiest-guy relative md:text-3xl text-2xl">
                  Alternative Route
                </h1>
                <div className="mt-5 text-xl font-bold text-black">
                  {rec.fallbackCourse}
                </div>
              </div>
            )}

            {/* Long-Term Goal */}
            <div className="grainy border border-[#22c55e]/30 p-8 bg-black">
              <SectionLabel label="LONG-TERM GOAL" accent={accent.secondary} />
              <div className="mt-6 text-xl font-bold leading-tight">
                {rec.longTermGoal}
              </div>
            </div>

          </div>
        </div>

        {/* ── CAREERS — full width, outside the grid ── */}
        <div className="border border-[#84ff4d]/10 p-8 md:p-10">
          <SectionLabel label="YOUR CAREER PATHS"  />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {rec.careers.map((career, idx) => (
              <div
                key={idx}
                className="group grainy bg-bg_green border border-black/10 p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="relative font-bold text-xl text-[#013e0d] group-hover:text-[#256b04] transition-colors">
                  {career.name}
                </h3>
                <p className="text-black mt-2 leading-relaxed">
                  {career.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RETAKE BUTTON —*/}
        <div className='flex md:flex-row flex-col items-center justify-between gap-8'>
        <button
        
            onClick={handleRestart}
          className="  flex text-black p-6 mb-6  font-bold 
          
          text-base px-2 md:px-6 py-1 md:py-2 tracking-wide uppercase border-4 border-black bg-[#A1D800] shadow-[9px_9px_0_2px_rgba(161,216,0)] active:shadow-none active:translate-x-[6px] hover:scale-105 transition-all"
        >
          <MdOutlineRestartAlt className='text-2xl mr-3'/> RETAKE THE QUIZ
        </button>
        <button onClick={handleDownload}
        className=' flex  text-black  mb-6 font-bold text-base px-4 py-2 tracking-wide uppercase border-4 border-black bg-[#A1D800] shadow-[9px_9px_0_2px_rgba(161,216,0)] active:shadow-none active:translate-x-[6px] hover:scale-105 transition-all'>

          <RiDownloadLine className='text-2xl mr-3' />Download
        </button>
       </div>
      </div>
    </div>
  );
}

/* ── SUB COMPONENTS ── */

function SectionLabel({ label, accent }) {
  return (
    <div className="flex items-center gap-3 font-luckiest-guy tracking-widest">
      <span className="text-2xl md:text-3xl text-[#CBF356]">
        {label}
      </span>
    </div>
  );
}

function MiniBlock({ label, text, accent }) {
  return (
    <div className="bg-black/40 rounded-2xl p-6 border border-white/5 hover:border-[#84ff4d]/30 transition-colors">
      <div className="uppercase text-xs font-bold tracking-widest mb-3" style={{ color: accent }}>
        {label}
      </div>
      <p className="text-[#c5e8a8] leading-relaxed">{text}</p>
    </div>
  );
}