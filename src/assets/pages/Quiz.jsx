import React, { useState } from 'react';
import { quizQuestions } from '../../data/questions';
import Result from '../components/Result.jsx';

export default function Quiz() {
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
      } else {
        setIsFinished(true);
      }
    }, 220);
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
      setSelectedOption(null);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setScores({ architect: 0, storyteller: 0, scientist: 0, hustler: 0, creator: 0, coach: 0 });
    setIndex(0);
    setIsFinished(false);
    setSelectedOption(null);
  };

  if (isFinished) {
    return <Result answers={answers} scores={scores} handleRestart={handleReset} />;
  }

  const setLabels = {
    1: 'YOUR PROFILE',
    2: 'KEY INTERESTS',
    3: 'HOW YOU THINK',
    4: 'WHAT YOU WANT',
  };
  const setLabel = setLabels[currentQuestion.set] || `SET ${currentQuestion.set}`;

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center py-10 bg-[#0d1a0d] overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, #a3e635 39px, #a3e635 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, #a3e635 39px, #a3e635 40px)`
        }}
      />
      {/* Glow blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full bg-[#84cc16]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 rounded-full bg-[#f97316]/10 blur-3xl pointer-events-none" />

      {/* checker borders */}
      <div className="checker-border absolute top-0 right-0 w-20 h-full z-10" />
      <div className="checker-border-faded absolute top-0 right-0 w-40 h-full z-5 hidden md:block" />
      <div className="checker-border absolute top-0 left-0 w-20 h-full z-10" />
      <div className="checker-border-faded absolute top-0 left-0 w-40 h-full z-5 hidden md:block" />

      {/* Main card */}
      <div className="relative z-20 w-[92vw] md:w-[780px] flex flex-col gap-5">

        {/* Top meta row */}
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-black tracking-[0.25em] text-[#84cc16] uppercase border border-[#84cc16]/30 px-3 py-1 rounded-full">
            {setLabel}
          </span>
          <span className="text-[10px] font-bold tracking-widest text-[#f97316] uppercase">
            {index + 1} <span className="text-[#84cc16]/40">/ {quizQuestions.length}</span>
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[3px] bg-[#1a2e1a] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #84cc16, #f97316)',
            }}
          />
        </div>

        {/* Question card */}
        <div
          className="rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a2e1a 0%, #0f1f0f 100%)',
            border: '1.5px solid rgba(132,204,22,0.18)',
          }}
        >
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#f97316]/5 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-[#84cc16]/5 blur-2xl pointer-events-none" />

          {/* Question number pill */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span
              className="text-[11px] font-black tracking-widest px-3 py-1 rounded-full"
              style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}
            >
              Q{index + 1}
            </span>
          </div>

          <h2 className="text-lg md:text-2xl font-black text-[#e8f5d0] leading-snug mb-7 tracking-tight">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const val = option.value || option.text;
              const isSelected = selectedOption === val;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(val, option.weights || null)}
                  className="w-full text-left px-5 py-4 rounded-xl transition-all duration-200 group relative overflow-hidden"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(90deg, rgba(132,204,22,0.22), rgba(249,115,22,0.12))'
                      : 'rgba(255,255,255,0.04)',
                    border: isSelected
                      ? '1.5px solid rgba(132,204,22,0.55)'
                      : '1.5px solid rgba(255,255,255,0.08)',
                    transform: isSelected ? 'translateX(4px)' : 'translateX(0)',
                    boxShadow: isSelected ? '0 0 18px rgba(132,204,22,0.12)' : 'none',
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl transition-all duration-200"
                    style={{
                      background: isSelected
                        ? 'linear-gradient(180deg, #84cc16, #f97316)'
                        : 'transparent',
                    }}
                  />
                  <div className="flex items-start gap-3 pl-2">
                    <span
                      className="mt-[2px] flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all duration-200"
                      style={{
                        borderColor: isSelected ? '#84cc16' : 'rgba(255,255,255,0.18)',
                        background: isSelected ? '#84cc16' : 'transparent',
                        color: isSelected ? '#0d1a0d' : 'rgba(255,255,255,0.3)',
                      }}
                    >
                      {isSelected ? '✓' : String.fromCharCode(65 + idx)}
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
            <div className="mt-6 pt-5 border-t border-[#84cc16]/10 flex justify-start">
              <button
                onClick={handlePrevious}
                className="text-xs font-bold tracking-wider text-[#84cc16]/60 hover:text-[#84cc16] transition-colors flex items-center gap-2"
              >
                <span>←</span> PREVIOUS
              </button>
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-[10px] tracking-widest text-[#84cc16]/25 uppercase">
          SportCareerFinder · Career Diagnostic Quiz
        </p>
      </div>
    </div>
  );
}