import React, { useEffect, useState } from 'react';
import { quizQuestions } from '../../data/questions';
import Result from '../components/Result.jsx';
import { useNavigate } from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react";


export default function Quiz() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [scores, setScores] = useState({
    architect: 0,
    storyteller: 0,
    scientist: 0,
    hustler: 0,
    creator: 0,
    coach: 0,
  });

  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = quizQuestions[index];
  const progressPercent = Math.round((index / quizQuestions.length) * 100);

  const handleSelectOption = (value, weights) => {
    setSelectedOption(value);
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));

    if (weights) {
      setScores(prev => {
        const updated = { ...prev };
        Object.keys(weights).forEach(key => {
          if (updated[key] !== undefined) updated[key] += weights[key];
        });
        return updated;
      });
    }

    setTimeout(() => {
      if (index < quizQuestions.length - 1) {
        setIndex(index + 1);
        setSelectedOption(null);
      } 
    }, 300);
  };



  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
      setSelectedOption(null);
    }
  };

   useEffect(()=>{
    if (isFinished) {
      navigate('/result', {state:{scores,answers}});

    }
  },[isFinished]);

  const setLabels = {
    1: 'YOUR PROFILE',
    2: 'KEY INTERESTS',
    3: 'HOW YOU THINK ?',
    4: 'WHAT YOU WANT ?',
  };
  const setLabel = setLabels[currentQuestion.set] || `SET ${currentQuestion.set}`;
  const cardColors = [
   '#8AB149',
  '#3b1f5e',
  '#1a3d2b',
  '#037F7E',
  '#E1A731',
  '#F67549',
];
const cardColor = cardColors[index % cardColors.length];

const { isAuthenticated, loginWithRedirect } = useAuth0();

  

const HandleSeeResult = () => {
  console.log('button clicked, isAuthenticated:', isAuthenticated);
  if (!isAuthenticated) {
    sessionStorage.setItem('quizScores', JSON.stringify(scores));
    sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
    loginWithRedirect({ appState: { returnTo: '/result' } });
  } else {
    sessionStorage.setItem('quizScores', JSON.stringify(scores));
    sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
    navigate('/result', { state: { scores, answers } });
  }
};
  


  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center bg-[#0F2209] py-10 overflow-hidden">
      
      

      {/* checker borders */}
      <div className="checker-border absolute top-0 right-0 w-20 h-full z-10" />
      <div className="checker-border-faded absolute top-0 right-0 w-40 h-full z-5 hidden md:block" />
      <div className="checker-border absolute top-0 left-0 w-20 h-full z-10" />
      <div className="checker-border-faded absolute top-0 left-0 w-40 h-full z-5 hidden md:block" />

      
      {/* Main card */}
<div className="relative rounded-xl z-15 w-[94vw] md:w-[780px] bg-[#010200] border-black border-4 flex flex-col  gap-7 p-5 md:p-10">
        <div className='absolute checker-green top-0 right-0 w-full h-7 
           z-20'/>
          <div className='absolute checker-green bottom-0 right-0 w-full h-7  z-20'/>

        {/* Top meta row */}
      <div className="w-full flex items-center justify-between px-2 py-5">
          <span className=" text-xs md:text-sm  tracking-[0.25em] text-[#84cc16] font-luckiest-guy p-auto ">
            {setLabel}
          </span>
          <span className="text-xs md:text-sm font-bold tracking-widest text-accent uppercase">
            {index + 1} <span className="text-primary">/ {quizQuestions.length}</span>
          </span>
        </div>

        {/* Progress bar */}
        <div className=" w-full h-[20px] bg-[#1a2e1a]  overflow-hidden">
          <div
            className=" checker-progress h-[20px]  transition-all duration-800"
            style={{
              width: `${progressPercent}%`,
             
            }}
          />
        </div>

        {/* Question card */}
       
        <div
          className=" w-full  rounded-2xl transition-all duration-102 group relative p-6 md:p-8  overflow-hidden"
          style={{backgroundColor: cardColor}}>
        
          

          

          <h2 className="text-lg md:text-3xl  font-black text-[#e8f5d0] leading-snug mb-7 tracking-tight">
            {currentQuestion.question}
          </h2>
           </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const val = option.value || option.text;
              const isSelected = selectedOption === val;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(val, option.weights || null)}
                  className={` w-full text-left px-5 py-4  border-black border-1
                  shadow-[5px_5px_0_2px_rgba(0,0,0,1)] relative hover:bg-white/10  transition-all duration-200
                  ${isSelected 
                    ? 'bg-[#0f2a0a] border-[#84ff4d] translate-x-[5px] translate-y-[5px] hover:text-green-700 shadow-none'
                  : 'bg-[#081505] border-[#1e3a10] text-[#a0c878] shadow-[7px_5px_0_] hover:border-[#84ff4d]  hover:-translate-y-[2px] hover:shadow-[5px_7px_0_#FDD517]'
                      }
                  `}
                >
                  
                  <div className="flex items-start gap-3 pl-2">
                    <span
                      className="mt-[2px] flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all duration-200"
                      style={{
                        borderColor: isSelected ? '#84cc16' : '#84cc16',
                        background: isSelected ? '#84cc16' : 'transparent',
                        color: isSelected ? '#0d1a0d' : '#84cc16',
                      }}
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                    <span
                      className="text-sm md:text-[15px] font-medium leading-relaxed transition-colors duration-200"
                      style={{ color: isSelected ? '#d9f99d' : 'rgba(232,245,208,0.72)' }}
                    >
                      {option.text}
                    </span>
                  </div>
                </button>

              );
            })}
          </div>
          

          {/* Bottom nav */}
         
          {index > 0 && (
            <div className="mt-6 mb-8 pt-5 border border-[#84cc16]/10 flex justify-between">
              <button
                onClick={handlePrevious}
                className="bg-primary text-on-primary border-black border-3  shadow-[6px_5px_0_0px_rgba(161,216,0)] active:shadow-none active:translate-x-[6px] hover:scale-105
               font-bold   text-[13px] md:text-base px-6 md:px-5 py-2 md:py-3 tracking-wide duration-200">
                <span>←</span> PREVIOUS
              </button>


              {index === quizQuestions.length-1 && selectedOption && (
              <button 
              onClick = {HandleSeeResult}
              className='bg-primary text-on-primary uppercase  border-black border-3  shadow-[6px_5px_0_0px_rgba(161,216,0)] active:shadow-none active:translate-x-[6px] 
               hover:scale-105
               font-bold text-[13px] md:text-base px-6 md:px-5 py-2 md:py-3 tracking-wide duration-200'>
                See My Results →
              </button>
              )}
            </div>
          )}
          
       

        
      </div>
    </div>
  );
}