export default function Download({ rec, user }) {
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
    <div className="w-[1080px] h-[1080px] bg-[#101E08] text-white flex flex-col justify-between p-16 relative overflow-hidden">

      {/* checker borders, same visual language as Result.jsx */}
      <div className="checker-border absolute top-0 right-0 w-16 h-full z-10" />
      <div className="checker-border absolute top-0 left-0 w-16 h-full z-10" />

      <div className="relative z-20 flex flex-col h-full justify-between">

        {/* Top: brand mark */}
        <div className="flex items-center justify-between">
          <span className="uppercase tracking-widest text-sm font-bold text-[#84ff4d]">
            SportCareerFinder
          </span>
          {user?.name && (
            <span className="uppercase tracking-widest text-sm font-bold text-[#c5e8a8]">
              {user.name}
            </span>
          )}
        </div>

        {/* Middle: archetype + tagline */}
        <div className="flex flex-col items-center text-center gap-6">
          <span className="uppercase tracking-wide text-base font-bold text-[#84ff4d]">
            Your Blueprint
          </span>
          <h1 className="text-7xl font-luckiest-guy tracking-wide leading-none">
            {rec.archetypeTitle}
          </h1>
          <p className="text-2xl font-light italic text-[#c5e8a8] max-w-2xl">
            "{rec.tagline}"
          </p>
        </div>

        {/* Bottom: best course, boxed */}
        <div className="bg-bg_green grainy border-2 border-green-900 p-8 text-center">
          <div className="uppercase text-black font-luckiest-guy text-xl mb-2">
            Recommended Path
          </div>
          <div className="text-3xl font-black text-black">
            {rec.bestCourse}
          </div>
        </div>

      </div>
    </div>
  );
}