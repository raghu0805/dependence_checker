import React, { useEffect, useState } from 'react';

const Meter = ({ title, score, type, deductionsLabel, deductionsValue }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [score]);

  const getColor = () => {
    if (score >= 80) return { stroke: '#10b981', glow: 'glow-green', text: 'text-emerald-400' };
    if (score >= 50) return { stroke: '#f59e0b', glow: 'glow-yellow', text: 'text-amber-400' };
    return { stroke: '#ef4444', glow: 'glow-red', text: 'text-red-400' };
  };

  const colors = getColor();

  let riskText = '🚨 High Risk';
  if (score >= 80) riskText = '✅ Safe';
  else if (score >= 50) riskText = '⚠️ Moderate Risk';

  return (
    <div className={`glass-card p-6 rounded-2xl w-full flex flex-col items-center ${colors.glow}`}>
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">{title}</h3>
      
      <div className="relative w-32 h-32 mb-4">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="45" fill="none" stroke={colors.stroke} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={offset}
            className="score-circle transition-all duration-100"
            style={{ filter: `drop-shadow(0 0 8px ${colors.stroke}40)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-extrabold ${colors.text}`}>{animatedScore}</span>
          <span className="text-slate-500 text-[10px] font-medium">/100</span>
        </div>
      </div>

      <div className={`px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
        score >= 80 ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' :
        score >= 50 ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' :
        'bg-red-500/15 text-red-400 border border-red-500/20'
      }`}>
        {riskText}
      </div>

      <div className="w-full flex justify-between text-xs mt-auto pt-4 border-t border-slate-700/50">
        <span className="text-slate-500">{deductionsLabel}</span>
        <span className="text-red-400 font-mono">-{deductionsValue}</span>
      </div>
    </div>
  );
};

export default function TrustScoreMeter({ trustScore }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 h-full">
      <Meter 
        title="Integrity (Fakes)" 
        score={trustScore.score} 
        type="integrity"
        deductionsLabel="Fake pkg deductions"
        deductionsValue={trustScore.breakdown.suspiciousDeductions}
      />
      <Meter 
        title="Vulnerability (CVEs)" 
        score={trustScore.vulnerabilityScore} 
        type="vulnerability"
        deductionsLabel="CVE deductions"
        deductionsValue={trustScore.breakdown.vulnerabilityDeductions}
      />
    </div>
  );
}
