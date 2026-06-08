import React from 'react';
import { ShieldAlert, Award, Compass, TrendingUp, Cpu, Target, Zap } from 'lucide-react';
import { archetypesData } from '../../data/questions';

export default function Result({ answers, scores, handleRestart }) {

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
            results.careers = archetypesData.scientist.careers.filter(c => !['Sports Physiotherapist', 'Sports Nutritionist / Dietitian'].includes(c.name));
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
            results.careers = archetypesData.scientist.careers.filter(c => !['Sports Physiotherapist', 'Sports Nutritionist / Dietitian'].includes(c.name));
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

  // Accent colors per archetype
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
    <div className=" flex justify-center items-centermin-h-screen  text-white overflow-hidden relative">
      {/* Subtle Sports Field Background */}
     
      {/* checker borders */}
      <div className="checker-border absolute top-0 right-0 w-15 h-full z-10" />
      <div className="checker-border-faded absolute top-0 right-0 w-30 h-full z-5 hidden md:block" />
      <div className="checker-border absolute top-0 left-0 w-15 h-full z-10" />
      <div className="checker-border-faded absolute top-0 left-0 w-30 h-full z-5 hidden md:block" />


      <div className=" relative z-10 max-w-7xl mx-auto px-10 space-y-10">

        {/* HERO HEADER */}
        <div className="relative overflow-hidden  p-10 md:p-16 mb-2">
          
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                
                <span className="uppercase tracking-wide text-sm font-bold text-[#84ff4d]">YOUR BLUEPRINT</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-luckiest-guy tracking-wide leading-none mb-4">
                {rec.archetypeTitle}
              </h1>
              
              <p className="text-2xl md:text-3xl font-light italic text-[#a3ff6b]">
                "{rec.tagline}"
              </p>
            </div>

        
           
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">

            {/* WHO YOU ARE */}
            <div className="border border-[#84ff4d]/10  p-8 md:p-10">
              <SectionLabel label="WHO YOU ARE" accent={accent.primary}></SectionLabel>
              <p className="text-lg leading-relaxed text-[#c5e8a8] mt-6">
                {rec.desc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                <MiniBlock label="WORK STYLE" text={rec.workStyle} accent="#84ff4d" />
                <MiniBlock label="UNDER PRESSURE" text={rec.underPressure} accent="#f59e0b" />
                <MiniBlock label="HIDDEN SUPERPOWER" text={rec.superpower} accent="#a3ff6b" />
                <MiniBlock label="BIGGEST BLIND SPOT" text={rec.blindSpot} accent="#fb7185" />
              </div>
            </div>

            {/* CAREERS */}
            <div className=" border border-[#84ff4d]/10  p-8 md:p-10">
              <SectionLabel label="YOUR CAREER PATHS" accent={accent.primary}  />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {rec.careers.map((career, idx) => (
                  <div
                    key={idx}
                    className="group grainy  bg-bg_green  border border-black /10   p-6 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                     
                      <div>
                        <h3 className="relative font-bold text-xl text-[#2c7b07] group-hover:text-[#184602] transition-colors">
                          {career.name}
                        </h3>
                        <p className="relative text-green-800 mt-2 leading-relaxed">
                          {career.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">

            {/* ACADEMIC PATHWAY */}
            <div className="  overflow bg-bg_green grainy border-2 border-green-900  p-8 -hidden ">
              <h1 className='relative uppercase text-orange-400 font-luckiest-guy text-3xl'>Academic Pathway</h1>
              
              <div className=" relative mt-6 text-2xl font-black leading-tight text-black">
                {rec.bestCourse}
              </div>
              
              <p className=" relative text-sm font-medium text-green-700 mt-2">Best fit based on your profile</p>

              {rec.warningMsg && (
                <div className="mt-6 p-5 bg-black border border-orange-500/30  text-sm text-orange-200 flex gap-4">
                  <ShieldAlert className="mt-0.5 text-orange-400" size={22} />
                  <div>{rec.warningMsg}</div>
                </div>
              )}
            </div>

            {/* ALTERNATIVE */}
            {rec.fallbackCourse && (
              <div className="grainy border border-[#eab308]/30  p-8 bg-bg_green">
                 <h1 className='uppercase text-green-900 font-luckiest-guy relative md:text-3xl text-2xl '>Alternative route</h1>
                <div className="mt-5 text-xl font-bold text-black">
                  {rec.fallbackCourse}
                </div>
              </div>
            )}

            {/* LONG-TERM GOAL */}
            <div className="grainy border border-[#22c55e]/30  p-8 bg-black ">
              <SectionLabel label="LONG-TERM GOAL" accent={accent.secondary} icon={<TrendingUp />} />
              <div className="mt-6 text-xl font-bold leading-tight">
                {rec.longTermGoal}
              </div>
            </div>

           

            {/* RESTART BUTTON */}
            <button
              onClick={handleRestart}
              className=" bg-gtext flex justify-center items-center   text-black p-6 mb-6 font-luckiest-guy text-lg tracking-wide uppercase border-4 border-black shadow-[5px_8px_0_2px_rgba(161,216,0)] active:shadow-none 
              active:translate-x-[6px] hover:scale-105 transition-all  "
            >
              RETAKE THE QUIZ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ====================== SUB COMPONENTS ====================== */

function SectionLabel({ label, accent, icon }) {
  return (
    <div className="flex items-center gap-3 font-luckiest-guy tracking-widest">
      
      <span className="text-2xl md:text-3xl text-[#CBF356] ">
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