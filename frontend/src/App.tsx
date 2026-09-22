import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell
} from 'recharts';
import {
  LayoutDashboard, Scan, Route, Globe, Bot, MapPin, Filter, Zap, Clock, TrendingUp, Mic, UploadCloud, Play, Check, Sparkles, Link2, Copy, MessageCircle, Power, Briefcase, Flame, ArrowUpRight, Video, Wand2, Eye, MoreHorizontal, Pause, Shield, Cpu, Server, Database, Rocket, Code2, RefreshCw, Smartphone, Lock, Activity, Layers, Brain, Cloud
} from 'lucide-react';

const initialSkillsData = [
  { skill: 'Reels Editing', growth: 84, demand: 92 },
  { skill: 'CapCut Pro', growth: 72, demand: 88 },
  { skill: 'Hook Writing', growth: 68, demand: 85 },
  { skill: 'Auto-Captions', growth: 91, demand: 90 },
  { skill: 'Thumbnail AI', growth: 55, demand: 71 },
  { skill: 'Trending Memes', growth: 79, demand: 83 },
  { skill: 'CTA Craft', growth: 61, demand: 76 },
  { skill: 'UGC Scripting', growth: 74, demand: 81 },
  { skill: 'Caption Style', growth: 66, demand: 78 },
  { skill: 'Retention Edit', growth: 88, demand: 89 },
];

const jobsFeed = [
  { id: 1, company: 'SUGAR Cosmetics', role: 'Short Video Editor', salary: '₹32k', age: 4, gap: 92, location: 'Delhi NCR', niche: 'Beauty', logo: 'S' },
  { id: 2, company: 'Boat Lifestyle', role: 'Reels Specialist', salary: '₹28k', age: 18, gap: 78, location: 'Delhi NCR', niche: 'D2C', logo: 'B' },
  { id: 3, company: 'PhysicsWallah', role: 'Hook Writer + Editor', salary: '₹35k', age: 2, gap: 85, location: 'Remote', niche: 'Edtech', logo: 'P' },
  { id: 4, company: 'MamaEarth', role: 'CapCut Editor', salary: '₹25k', age: 22, gap: 81, location: 'Gurgaon', niche: 'Beauty', logo: 'M' },
  { id: 5, company: 'Lenskart', role: 'UGC Video Editor', salary: '₹30k', age: 7, gap: 88, location: 'Delhi NCR', niche: 'D2C', logo: 'L' },
  { id: 6, company: 'Unacademy', role: 'Meme Trend Editor', salary: '₹27k', age: 16, gap: 69, location: 'Delhi NCR', niche: 'Edtech', logo: 'U' },
];

const radarDataInitial = [
  { subject: 'Reels', A: 85, B: 92, fullMark: 100 },
  { subject: 'Captions', A: 60, B: 88, fullMark: 100 },
  { subject: 'Hooks', A: 78, B: 85, fullMark: 100 },
  { subject: 'Memes', A: 35, B: 83, fullMark: 100 },
  { subject: 'CTA', A: 55, B: 76, fullMark: 100 },
  { subject: 'Trending', A: 70, B: 81, fullMark: 100 },
];

const missions = [
  { day: 1, title: 'Trending Memes DNA', desc: 'Decode top 10 viral templates from last 7 days', task: 'Make 1 reel using "Expectation vs Reality" template with captions', duration: '5 min', status: 'done', feedback: 'Viral hook! 9/10 - caption timing perfect' },
  { day: 2, title: 'Caption Styling Pro', desc: 'Master Alex Hormozi style kinetic captions', task: 'Recreate this caption style on your old reel', duration: '7 min', status: 'done', feedback: 'Good hook, but caption too slow at 0:03' },
  { day: 3, title: 'CTA That Converts', desc: '3 CTA formulas that doubled conversion', task: 'Add high-converting CTA to Day 2 reel', duration: '4 min', status: 'active', feedback: null },
  { day: 4, title: 'Hook Writing Lab', desc: 'First 3 seconds = 80% retention', task: 'Write 5 hooks for beauty niche, test 1', duration: '6 min', status: 'locked', feedback: null },
  { day: 5, title: 'Retention Editing', desc: 'Keep viewers past 7 second mark', task: 'Apply jump cuts + zoom punches', duration: '8 min', status: 'locked', feedback: null },
  { day: 6, title: 'Auto-Caption Mastery', desc: 'AI captions that feel human', task: 'Build captions system in CapCut', duration: '5 min', status: 'locked', feedback: null },
  { day: 7, title: 'Portfolio Drop', desc: 'Final showcase ready for hiring', task: 'Publish all 6 projects to rozhasunil.work', duration: '10 min', status: 'locked', feedback: null },
];

const portfolioProjects = [
  { title: 'SUGAR - Festive Drop', views: '1.2M', tag: 'Beauty' },
  { title: 'Boat - Bass Test Reel', views: '890K', tag: 'D2C' },
  { title: 'PW - Hook Breakdown', views: '2.1M', tag: 'Edtech' },
];

const jobsForResume = [
  { id: 'sugar', company: 'SUGAR Cosmetics', role: 'Short Video Editor' },
  { id: 'boat', company: 'Boat', role: 'Reels Specialist' },
  { id: 'pw', company: 'PhysicsWallah', role: 'Hook Writer' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('pulse');
  const [locationFilter, setLocationFilter] = useState('Delhi NCR');
  const [nicheFilter, setNicheFilter] = useState('All Niches');
  const [analyzed, setAnalyzed] = useState(false);
  const [score, setScore] = useState(42);
  const [isRecording, setIsRecording] = useState(false);
  const [recProgress, setRecProgress] = useState(0);
  const [missionStates, setMissionStates] = useState(missions);
  const [botActive, setBotActive] = useState(false);
  const [selectedResumeJob, setSelectedResumeJob] = useState('sugar');
  const [resumeCopied, setResumeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [applications, setApplications] = useState([
    { company: 'SUGAR Cosmetics', role: 'Short Video Editor', status: 'Applied', time: '2m ago' },
    { company: 'Boat Lifestyle', role: 'Reels Specialist', status: 'Viewed by HR', time: '1h ago' },
    { company: 'MamaEarth', role: 'CapCut Editor', status: 'Applied', time: '3h ago' },
    { company: 'Lenskart', role: 'UGC Video Editor', status: 'Interview Scheduled', time: '5h ago' },
    { company: 'PhysicsWallah', role: 'Hook Writer', status: 'Applied', time: '6h ago' },
    { company: 'Unacademy', role: 'Meme Editor', status: 'Applied', time: '8h ago' },
    { company: 'Noise', role: 'Short Video Editor', status: 'Viewed by HR', time: '9h ago' },
    { company: 'Zomato', role: 'Reels Creator', status: 'Applied', time: '10h ago' },
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // LIVE HYBRID STATES
  const [hybridMode, setHybridMode] = useState<'fast' | 'deep'>('fast');
  const [skillsData, setSkillsData] = useState(initialSkillsData);
  const [isRefreshingJobs, setIsRefreshingJobs] = useState(false);
  const [lastScraped, setLastScraped] = useState('2 min ago');
  const [apiLive, setApiLive] = useState(true);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [xrayStage, setXrayStage] = useState<'idle' | 'ondevice' | 'cloud' | 'done'>('idle');
  const [confidence, setConfidence] = useState(0);
  const [liveJobCount, setLiveJobCount] = useState(4832);

  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isRecording) return;
    const id = setInterval(() => {
      setRecProgress(p => {
        if (p >= 30) { setIsRecording(false); return 30; }
        return p + 0.3;
      });
    }, 100);
    return () => clearInterval(id);
  }, [isRecording]);

  useEffect(() => {
    if (!botActive) return;
    const id = setInterval(() => {
      setApplications(prev => prev.map(a => {
        if (Math.random() > 0.85 && a.status === 'Applied') return { ...a, status: 'Viewed by HR' };
        if (Math.random() > 0.95 && a.status === 'Viewed by HR') return { ...a, status: 'Interview Scheduled' };
        return a;
      }));
    }, 2500);
    return () => clearInterval(id);
  }, [botActive]);

  // Simulate live last scraped ticker
  useEffect(() => {
    const id = setInterval(() => {
      setLiveJobCount(c => c + Math.floor(Math.random()*3));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const handleAnalyze = () => {
    setAnalyzed(false);
    setScore(42);
    setXrayStage('ondevice');
    setConfidence(0);
    let conf = 0;
    const confInterval = setInterval(() => {
      conf += Math.random()*12;
      if (conf >= 82) { conf = 82; clearInterval(confInterval); }
      setConfidence(Math.round(conf));
    }, 120);
    
    setTimeout(() => {
      setXrayStage('cloud');
      const conf2 = setInterval(() => {
        setConfidence(c => {
          if (c >= 94) { clearInterval(conf2); return 94; }
          return c + 2;
        });
      }, 150);
    }, 900);

    setTimeout(() => {
      setAnalyzed(true);
      setScore(78);
      setXrayStage('done');
      setConfidence(94);
    }, 2200);
  };

  const handleRefreshJobs = () => {
    setIsRefreshingJobs(true);
    setApiLive(false);
    setTimeout(() => setApiLive(true), 800);
    setTimeout(() => {
      setSkillsData(prev => prev.map(s => ({
        ...s,
        growth: Math.min(99, Math.max(45, s.growth + (Math.random()*12 - 5))),
        demand: Math.min(98, Math.max(60, s.demand + (Math.random()*6 - 2)))
      })).sort((a,b) => b.growth - a.growth).slice(0,10));
      setLastScraped('just now');
      setLiveJobCount(c => c + Math.floor(Math.random()*45+12));
      setIsRefreshingJobs(false);
      setTimeout(() => setLastScraped('2 min ago'), 60000);
    }, 1400);
  };

  const completeMission = (day: number) => {
    setMissionStates(prev => prev.map(m => {
      if (m.day === day) return { ...m, status: 'done', feedback: 'Excellent execution! Auto-added to portfolio ✓' };
      if (m.day === day + 1) return { ...m, status: 'active' };
      return m;
    }));
    setScore(s => Math.min(100, s + 6));
  };

  const completedCount = missionStates.filter(m => m.status === 'done').length;
  const progressPercent = (completedCount / 7) * 100;

  const filteredJobs = jobsFeed.filter(j => {
    if (locationFilter !== 'All' && j.location !== locationFilter && locationFilter !== 'Delhi NCR') {
      if (locationFilter === 'Delhi NCR' && j.location === 'Remote') return true;
      if (j.location !== locationFilter && locationFilter !== 'Delhi NCR') return false;
    }
    if (nicheFilter !== 'All Niches' && j.niche !== nicheFilter) return false;
    return true;
  });

  const navItems = [
    { id: 'pulse', label: 'Market Pulse', icon: LayoutDashboard, badge: 'LIVE' },
    { id: 'xray', label: 'Skill X-Ray Lab', icon: Scan },
    { id: 'mission', label: 'Mission Path', icon: Route, badge: `${completedCount}/7` },
    { id: 'portfolio', label: 'Portfolio OS', icon: Globe },
    { id: 'bot', label: 'Auto Apply Bot', icon: Bot, badge: botActive ? 'ON' : 'OFF' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 selection:bg-[#D4FF32] selection:text-black font-[Inter] antialiased overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        h1,h2,h3,.sora { font-family: 'Sora', sans-serif; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 999px; }
        @keyframes pulse-dot { 0%{box-shadow:0 0 0 0 rgba(16,185,129,0.6)} 70%{box-shadow:0 0 0 8px rgba(16,185,129,0)} 100%{box-shadow:0 0 0 0 rgba(16,185,129,0)} }
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
      `}</style>

      <div className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-[#D4FF32]/[0.03] via-transparent to-transparent" />

      <div className="relative flex h-screen">
        {/* Sidebar - desktop */}
        <aside className="hidden lg:flex w-[280px] shrink-0 flex-col border-r border-zinc-800/80 bg-zinc-900/[0.4] backdrop-blur-xl">
          <div className="p-6 border-b border-zinc-800/60">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#D4FF32] text-black grid place-items-center font-bold sora text-[14px]">KS</div>
              <div>
                <div className="sora font-bold leading-none tracking-tight text-[15px]">KaamSeKaamTak</div>
                <div className="text-[10px] tracking-[0.18em] text-zinc-400 font-medium mt-1">AGENTIC OS • v2.0 LIVE HYBRID</div>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-full bg-zinc-800/60 border border-zinc-700/50 px-3 py-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400" style={{ animation: 'pulse-dot 2s infinite' }} />
              <span className="text-[11px] font-medium tracking-wide text-zinc-300">Delhi NCR Market • Live</span>
              <span className="ml-auto text-[10px] text-zinc-500">{liveJobCount.toLocaleString()} jobs</span>
            </div>
            <div className="mt-3 rounded-xl bg-[#D4FF32]/10 border border-[#D4FF32]/20 px-3 py-2 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-[#D4FF32]">● LIVE Hybrid Engine: SLM On-Device + Agentic Cloud</span>
            </div>
          </div>

          <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-all
                  ${activeTab === item.id ? 'bg-[#D4FF32] text-black shadow-[0_0_20px_rgba(212,255,50,0.3)]' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'}`}
              >
                <item.icon className="h-[18px] w-[18px]" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wide ${activeTab === item.id ? 'bg-black text-[#D4FF32]' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}>{item.badge}</span>
                )}
              </button>
            ))}

            <div className="pt-6">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-[11px] font-semibold tracking-widest text-zinc-400">JOB-READY SCORE</div>
                <div className="mt-3 flex items-end gap-3">
                  <div className="text-4xl font-bold sora leading-none">{score}%</div>
                  <div className="mb-1 text-[11px] px-2 py-0.5 rounded-full bg-[#D4FF32] text-black font-bold">+{score - 42}%</div>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-[#D4FF32] transition-all duration-700" style={{ width: `${score}%` }} />
                </div>
                <div className="mt-2 text-[11px] text-zinc-500">Complete missions to reach 100%</div>
              </div>
            </div>

            <div className="pt-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3">
                <div className="text-[10px] tracking-widest font-bold text-zinc-500 mb-2 flex items-center gap-1.5"><Layers className="h-3 w-3" /> TECH STACK</div>
                <div className="flex flex-wrap gap-1.5">
                  {['FastAPI','Supabase','Apify','Transformers.js','Vercel'].map(t=>(
                    <span key={t} className="text-[10px] px-2 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="p-4 border-t border-zinc-800/60">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-zinc-800 grid place-items-center text-[12px] font-bold">RS</div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium truncate">Rozha Sunil</div>
                <div className="text-[11px] text-zinc-500 truncate">rozhasunil.work • Pro • LIVE</div>
              </div>
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="lg:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between border-b border-zinc-800 bg-[#0A0A0B]/90 backdrop-blur-xl px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-[#D4FF32] text-black grid place-items-center font-bold sora text-[13px]">KS</div>
            <div>
              <div className="sora font-bold text-[13px] leading-none">KaamSeKaamTak OS</div>
              <div className="flex items-center gap-1 mt-1"><div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /><span className="text-[9px] font-bold tracking-widest text-[#D4FF32]">LIVE Hybrid Engine</span></div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="h-8 w-8 grid place-items-center rounded-lg bg-zinc-800 border border-zinc-700">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className="w-[300px] bg-[#111113] border-l border-zinc-800 p-4 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="sora font-bold">Navigation</span>
                <button onClick={() => setSidebarOpen(false)} className="h-8 w-8 rounded-lg bg-zinc-800 grid place-items-center">✕</button>
              </div>
              {navItems.map(item => (
                <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-[14px] font-medium mb-1 ${activeTab === item.id ? 'bg-[#D4FF32] text-black' : 'text-zinc-400 bg-zinc-800/50'}`}>
                  <item.icon className="h-5 w-5" /> {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-6 lg:py-8 pt-[68px] lg:pt-8">
            {/* Global LIVE banner */}
            <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 backdrop-blur px-4 py-2.5 flex flex-wrap items-center gap-2 md:gap-3 text-[11px] overflow-hidden">
              <span className="inline-flex items-center gap-2 font-bold tracking-widest text-emerald-300 shrink-0"><span className="h-2 w-2 rounded-full bg-emerald-400" style={{ animation: 'pulse-dot 2s infinite' }} /> ● LIVE Hybrid Engine: SLM On-Device + Agentic Cloud</span>
              <span className="hidden md:inline h-3 w-px bg-emerald-500/20 shrink-0" />
              <span className="text-zinc-400 flex items-center gap-2 min-w-0 break-words"><Activity className="h-3.5 w-3.5 shrink-0" /> <span className="truncate md:whitespace-normal">Connected to Railway API | Last Scraped: {lastScraped} | Source: Apna.co + Internshala + Google Jobs (via SerpAPI) - Legal</span></span>
              <span className="ml-auto flex items-center gap-2 shrink-0"><span className={`h-2 w-2 rounded-full ${apiLive ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} /> {apiLive ? 'API Live • 128ms' : 'Scraping...'}</span>
            </div>

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="sora text-[28px] lg:text-[34px] font-bold tracking-tight leading-[0.95]">
                    {activeTab === 'pulse' && 'Live Market Pulse'}
                    {activeTab === 'xray' && 'Skill X-Ray Lab'}
                    {activeTab === 'mission' && 'Mission Path'}
                    {activeTab === 'portfolio' && 'Auto Portfolio OS'}
                    {activeTab === 'bot' && 'Auto Apply Bot'}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4FF32] text-black px-3 py-1 text-[11px] font-bold tracking-wide">v2.0 LIVE HYBRID • YC-READY</span>
                </div>
                <p className="mt-2 text-[13px] lg:text-[14px] text-zinc-400 max-w-[620px] leading-relaxed">
                  {activeTab === 'pulse' && 'Reverse-engineered from 4,832 active jobs via Railway FastAPI. SLM fast scan on-device + GPT-4o deep scan in cloud. 100% legal scraping.'}
                  {activeTab === 'xray' && 'Upload resume + 30sec voice intro. Phi-3 SLM extracts gaps on-device in 0.8s, then GPT-4o deep analysis. Privacy-first.'}
                  {activeTab === 'mission' && `You are ${completedCount} missions away from 100% job-ready. Each mission auto-adds to portfolio.`}
                  {activeTab === 'portfolio' && 'Your personal site rewrites itself per job description. Same work, different positioning.'}
                  {activeTab === 'bot' && 'Toggle on. Bot applies to 10 high-match jobs daily, sends WhatsApp updates, tracks HR views.'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden lg:flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-[12px] text-zinc-400">
                  <Cpu className="h-4 w-4 text-[#D4FF32]" /> {hybridMode === 'fast' ? 'Phi-3 Mini On-Device' : 'GPT-4o Cloud'}
                </div>
                <button onClick={() => setShowDeployModal(true)} className="h-9 rounded-full bg-zinc-900 border border-zinc-800 px-4 text-[13px] font-medium text-zinc-300 flex items-center gap-1.5 hover:bg-zinc-800 transition">
                  <Rocket className="h-4 w-4" /> Deploy to Public
                </button>
              </div>
            </div>

            {/* PULSE */}
            {activeTab === 'pulse' && (
              <div className="space-y-6">
                {/* API Status + Hybrid Toggle */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-4">
                  <div className="rounded-[20px] border border-zinc-800 bg-zinc-900/40 backdrop-blur p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 grid place-items-center"><Server className="h-5 w-5 text-emerald-400" /></div>
                      <div>
                        <div className="text-[12px] font-semibold flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${apiLive ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} /> Connected to Railway API</div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">GET /api/live-jobs • Last Scraped: {lastScraped} • Source: Apna.co + Internshala + Google Jobs (via SerpAPI) - Legal</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={handleRefreshJobs} disabled={isRefreshingJobs} className="h-9 rounded-full bg-[#D4FF32] text-black px-4 text-[12px] font-bold flex items-center gap-1.5 hover:brightness-110 transition disabled:opacity-60">
                        <RefreshCw className={`h-4 w-4 ${isRefreshingJobs ? 'animate-spin' : ''}`} /> {isRefreshingJobs ? 'Scraping...' : 'Refresh Jobs'}
                      </button>
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400">{liveJobCount.toLocaleString()} live</span>
                    </div>
                  </div>

                  <div className="rounded-[20px] border border-[#D4FF32]/20 bg-zinc-900/40 backdrop-blur p-4 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] tracking-widest font-bold text-zinc-500">HYBRID MODE</div>
                      <div className="mt-1 text-[13px] font-semibold flex items-center gap-2"><Brain className="h-4 w-4 text-[#D4FF32]" /> {hybridMode === 'fast' ? 'On-Device Fast Scan (Phi-3)' : 'Cloud Deep Scan (GPT-4o)'}</div>
                      <div className="text-[11px] text-zinc-500 mt-1">{hybridMode === 'fast' ? '0.8s • Offline • Private' : '2.4s • Deep reasoning • 94% accuracy'}</div>
                    </div>
                    <button onClick={() => setHybridMode(hybridMode === 'fast' ? 'deep' : 'fast')} className="relative h-9 w-[72px] rounded-full bg-zinc-800 border border-zinc-700 p-1 transition">
                      <div className={`h-7 w-7 rounded-full grid place-items-center transition-all ${hybridMode === 'fast' ? 'translate-x-0 bg-[#D4FF32] text-black' : 'translate-x-[38px] bg-white text-black'}`}>
                        {hybridMode === 'fast' ? <Cpu className="h-4 w-4" /> : <Cloud className="h-4 w-4" />}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-[20px] border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-900/20 backdrop-blur p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4FF32]/10 blur-2xl rounded-full" />
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[11px] tracking-widest text-zinc-500 font-semibold">LIVE JOBS TODAY • Railway API</div>
                        <div className="mt-2 sora text-[36px] font-bold leading-none flex items-center gap-2">{liveJobCount.toLocaleString()} {isRefreshingJobs && <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />}</div>
                        <div className="mt-2 flex items-center gap-1.5 text-[12px] text-emerald-300"><TrendingUp className="h-3.5 w-3.5" /> +214 vs yesterday • via /api/live-jobs</div>
                      </div>
                      <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-zinc-700 grid place-items-center"><Briefcase className="h-5 w-5 text-zinc-300" /></div>
                    </div>
                    {isRefreshingJobs && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-800 overflow-hidden"><div className="h-full w-1/2 bg-[#D4FF32]" style={{ animation: 'shimmer 1s infinite linear' }} /></div>}
                  </div>
                  <div className="rounded-[20px] border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-900/20 backdrop-blur p-5">
                    <div className="text-[11px] tracking-widest text-zinc-500 font-semibold">AVG SALARY DELHI NCR • Live Calc</div>
                    <div className="mt-2 sora text-[36px] font-bold leading-none">₹28.5k</div>
                    <div className="mt-2 text-[12px] text-zinc-400">Entry: Reels / CapCut / UGC • 0-2 yrs • SLM estimated</div>
                  </div>
                  <div className="rounded-[20px] border border-[#D4FF32]/30 bg-[#D4FF32] p-5 text-black relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-black/10" />
                    <div className="text-[11px] tracking-widest font-bold opacity-70 flex items-center gap-1"><Zap className="h-3 w-3" /> MOST DEMANDED • Real-time frequency</div>
                    <div className="mt-2 sora text-[28px] font-bold leading-[1.1]">Auto-Captions + Kinetic Style</div>
                    <div className="mt-2 text-[12px] font-medium opacity-80">91% growth • 90% of jobs require it • {hybridMode === 'fast' ? 'Phi-3 scan' : 'GPT-4o scan'}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
                  {/* Chart */}
                  <div className="rounded-[20px] border border-zinc-800 bg-zinc-900/40 backdrop-blur p-5 lg:p-6 relative overflow-hidden">
                    {isRefreshingJobs && <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-[1px] z-10 grid place-items-center"><div className="flex items-center gap-2 text-[13px] font-medium bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2"><RefreshCw className="h-4 w-4 animate-spin text-[#D4FF32]" /> Fetching /api/live-jobs • Parsing 4,832 JDs • Transformers.js</div></div>}
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="sora font-semibold text-[15px] flex items-center gap-2"><BarChart className="h-4 w-4 text-[#D4FF32]" /> Top 10 Demanded Skills • Real-time Frequency • {hybridMode === 'fast' ? 'Fast Scan' : 'Deep Scan'}</h3>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-500"><div className="h-2 w-2 rounded-full bg-[#D4FF32] animate-pulse" /> % Growth last 30 days • Live</div>
                    </div>
                    <div className="h-[340px] -ml-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={skillsData} layout="vertical" margin={{ left: 20 }}>
                          <XAxis type="number" hide domain={[0, 100]} />
                          <YAxis dataKey="skill" type="category" width={110} tick={{ fill: '#a1a1aa', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
                          <Tooltip
                            contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', fontSize: '12px' }}
                            cursor={{ fill: '#27272a', opacity: 0.3 }}
                          />
                          <Bar dataKey="growth" radius={[0, 8, 8, 0]} barSize={18}>
                            {skillsData.map((_, i) => (
                              <Cell key={i} fill={i === 0 ? '#D4FF32' : '#3f3f46'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-[10px] text-zinc-500"><Code2 className="h-3 w-3" /> Endpoint: GET /api/live-jobs?location=DelhiNCR&mode={hybridMode} • Latency: {hybridMode === 'fast' ? '0.8s' : '2.4s'}</div>
                  </div>

                  {/* Filters + Feed */}
                  <div className="rounded-[20px] border border-zinc-800 bg-zinc-900/40 backdrop-blur p-5 flex flex-col relative overflow-hidden">
                    {isRefreshingJobs && <div className="absolute inset-0 z-10 bg-zinc-900/60 backdrop-blur-sm p-5"><div className="space-y-2">{Array.from({length:6}).map((_,i)=><div key={i} className="h-[52px] rounded-xl bg-zinc-800 animate-pulse" style={{animationDelay:`${i*100}ms`}} />)}</div></div>}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="sora font-semibold text-[15px]">Live Job Feed • /api/live-jobs</h3>
                      <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live • {filteredJobs.length} matches</span>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <div className="relative flex-1">
                        <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                        <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="w-full h-9 rounded-xl bg-zinc-800 border border-zinc-700 pl-8 pr-3 text-[12px] font-medium outline-none focus:border-[#D4FF32]">
                          <option>Delhi NCR</option>
                          <option>Gurgaon</option>
                          <option>Remote</option>
                          <option>All</option>
                        </select>
                      </div>
                      <div className="relative flex-1">
                        <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                        <select value={nicheFilter} onChange={e => setNicheFilter(e.target.value)} className="w-full h-9 rounded-xl bg-zinc-800 border border-zinc-700 pl-8 pr-3 text-[12px] font-medium outline-none focus:border-[#D4FF32]">
                          <option>All Niches</option>
                          <option>Beauty</option>
                          <option>D2C</option>
                          <option>Edtech</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2 overflow-auto max-h-[380px] pr-1">
                      {filteredJobs.map(job => (
                        <div key={job.id} className="group flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 hover:border-zinc-700 hover:bg-zinc-800/60 transition">
                          <div className="h-9 w-9 rounded-lg bg-zinc-800 border border-zinc-700 grid place-items-center text-[12px] font-bold shrink-0">{job.logo}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <div className="text-[13px] font-semibold truncate">{job.company}</div>
                              {job.age > 15 && <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 border border-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-300"><Flame className="h-3 w-3" /> URGENT {job.age}d</span>}
                            </div>
                            <div className="text-[11px] text-zinc-400 truncate">{job.role} • {job.location} • {job.niche} • Apna.co</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-[12px] font-semibold">{job.salary}</div>
                            <div className={`text-[11px] font-medium ${job.gap > 85 ? 'text-[#D4FF32]' : 'text-zinc-500'}`}>{job.gap}% match</div>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-200 transition shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* X-RAY */}
            {activeTab === 'xray' && (
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
                <div className="space-y-4">
                  <div className="rounded-[20px] border border-dashed border-zinc-700 bg-zinc-900/30 backdrop-blur p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="sora font-semibold flex items-center gap-2"><Scan className="h-4 w-4 text-[#D4FF32]" /> Resume Drop • Hybrid Engine</h3>
                      <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-300"><Shield className="h-3 w-3" /> Privacy Mode: Resume never leaves device for initial scan</span>
                    </div>
                    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 grid place-items-center text-center hover:border-[#D4FF32]/40 transition cursor-pointer relative overflow-hidden">
                      <div className="absolute top-2 right-2 text-[10px] px-2 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 flex items-center gap-1"><Lock className="h-3 w-3" /> On-Device • Phi-3 • 0.8s</div>
                      <div className="h-12 w-12 rounded-2xl bg-zinc-800 border border-zinc-700 grid place-items-center mb-4 group-hover:scale-105 transition"><UploadCloud className="h-6 w-6 text-zinc-300" /></div>
                      <div className="sora font-semibold text-[15px]">Drop resume or click to browse</div>
                      <div className="mt-1 text-[12px] text-zinc-500">Rozha_Sunil_Resume.pdf • 1.2MB parsed ✓ • Transformers.js local</div>
                      <div className="mt-4 flex gap-2 flex-wrap justify-center">
                        <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#D4FF32]/15 border border-[#D4FF32]/20 text-[#D4FF32]">Reels Editing</span>
                        <span className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400">CapCut</span>
                        <span className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400">Premiere</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-[13px] font-semibold tracking-wide flex items-center gap-2"><Mic className="h-4 w-4" /> 30-sec Voice Intro • Confidence AI</h4>
                        <span className="text-[11px] px-2 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 flex items-center gap-1"><Activity className="h-3 w-3" /> Analyzing confidence... {confidence}%</span>
                      </div>
                      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              if (recProgress >= 30) { setRecProgress(0); }
                              setIsRecording(!isRecording);
                            }}
                            className={`h-11 w-11 rounded-full grid place-items-center transition-all shrink-0 ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-[#D4FF32] text-black hover:brightness-110'}`}
                          >
                            {isRecording ? <Pause className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                          </button>
                          <div ref={waveformRef} className="flex-1 flex items-center gap-[3px] h-[36px]">
                            {Array.from({ length: 40 }).map((_, i) => (
                              <div key={i} className={`w-[3px] rounded-full transition-all ${isRecording || recProgress > 0 || xrayStage !== 'idle' ? 'bg-[#D4FF32]' : 'bg-zinc-700'}`}
                                style={{ height: `${isRecording ? 8 + Math.random() * 28 : recProgress > 0 || xrayStage !== 'idle' ? 10 + Math.sin(i + confidence) * 10 + (confidence/4) : 8}px`, opacity: isRecording || confidence>0 ? 1 : 0.4 }} />
                            ))}
                          </div>
                          <div className="text-right shrink-0 min-w-[72px]">
                            <div className="sora font-bold text-[14px]">{Math.floor(recProgress)}s / 30s</div>
                            <div className="text-[11px] text-zinc-500">{isRecording ? 'Listening...' : recProgress > 0 ? `Confidence ${confidence}% ✓` : 'Tap to record'}</div>
                          </div>
                        </div>
                        {(recProgress > 0 || xrayStage !== 'idle') && (
                          <div className="mt-3 flex items-center gap-2 text-[11px] text-zinc-400">
                            <div className="h-1.5 flex-1 rounded-full bg-zinc-800 overflow-hidden"><div className="h-full bg-[#D4FF32] transition-all duration-300" style={{ width: `${xrayStage === 'idle' ? (recProgress/30)*100 : confidence}%` }} /></div>
                            <span>{xrayStage === 'idle' ? `${Math.round((recProgress/30)*100)}%` : `${confidence}%`}</span>
                          </div>
                        )}
                        {xrayStage !== 'idle' && (
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            <div className={`rounded-xl border p-2.5 flex items-center gap-2 text-[11px] ${xrayStage === 'ondevice' || xrayStage === 'cloud' || xrayStage === 'done' ? 'bg-[#D4FF32]/10 border-[#D4FF32]/20 text-[#D4FF32]' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}><Cpu className="h-3.5 w-3.5" /> {xrayStage === 'ondevice' ? 'On-Device SLM scanning... 0.8s' : 'On-Device SLM ✓ 0.8s'}</div>
                            <div className={`rounded-xl border p-2.5 flex items-center gap-2 text-[11px] ${xrayStage === 'cloud' || xrayStage === 'done' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}><Cloud className="h-3.5 w-3.5" /> {xrayStage === 'cloud' ? 'Cloud LLM deep gap analysis...' : xrayStage === 'done' ? 'Cloud deep analysis ✓' : 'Cloud LLM pending...'}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <button onClick={handleAnalyze} className="mt-6 w-full h-12 rounded-2xl bg-[#D4FF32] text-black font-semibold sora text-[14px] flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition">
                      <Wand2 className="h-4 w-4" /> {analyzed ? 'Re-Analyze • Hybrid Mode' : 'Analyze with Hybrid AI • POST /api/skill-xray'}
                    </button>
                    <div className="mt-2 text-[10px] text-zinc-600 text-center">Phi-3 runs in browser via Transformers.js • Resume stays on device until you approve cloud analysis • Legal scraping</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[20px] border border-zinc-800 bg-zinc-900/40 backdrop-blur p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="sora font-semibold text-[15px]">Job-Ready Score • Hybrid Engine</h3>
                      <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold border ${analyzed ? 'bg-[#D4FF32] text-black border-[#D4FF32]' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>{xrayStage === 'done' ? 'ANALYZED • 94% CONF' : xrayStage !== 'idle' ? xrayStage.toUpperCase() : 'PENDING'}</span>
                    </div>
                    <div className="mt-6 flex items-center gap-8">
                      <div className="relative h-[132px] w-[132px] shrink-0">
                        <svg className="h-full w-full -rotate-90">
                          <circle cx="66" cy="66" r="56" fill="none" stroke="#27272a" strokeWidth="10" />
                          <circle cx="66" cy="66" r="56" fill="none" stroke="#D4FF32" strokeWidth="10" strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 56}`} strokeDashoffset={`${2 * Math.PI * 56 * (1 - score / 100)}`}
                            style={{ transition: 'stroke-dashoffset 1s ease' }} />
                        </svg>
                        <div className="absolute inset-0 grid place-items-center">
                          <div className="text-center">
                            <div className="sora text-[32px] font-bold leading-none">{score}%</div>
                            <div className="text-[11px] text-zinc-500 mt-1 tracking-wide font-medium">READY • {confidence}% conf</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-[13px] leading-relaxed text-zinc-300">
                          {analyzed ? (
                            <>You are <span className="text-white font-semibold">{score}% Ready</span>. 3 skills missing to reach 95%+ match. <span className="text-[#D4FF32]">Confidence {confidence}%</span> via hybrid.</>
                          ) : (
                            <>Upload resume + voice to get precise gap vs market. <span className="text-zinc-200 font-medium">0.8s on-device</span> then cloud deep scan. Estimated: 2.2s total.</>
                          )}
                        </div>
                        {analyzed && (
                          <div className="mt-4 space-y-2">
                            <div className="flex gap-2 flex-wrap">
                              {['Trending Memes', 'Caption Styling', 'CTA Craft'].map(s => (
                                <span key={s} className="text-[11px] px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/20 text-red-300 font-medium">{s} • Missing</span>
                              ))}
                            </div>
                            <button onClick={() => setActiveTab('mission')} className="mt-2 text-[12px] font-medium text-[#D4FF32] flex items-center gap-1 hover:underline">Fix gaps in 7-day Mission Path <ArrowUpRight className="h-3.5 w-3.5" /></button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[20px] border border-zinc-800 bg-zinc-900/40 backdrop-blur p-6">
                    <h3 className="sora font-semibold text-[14px] mb-4 flex items-center gap-2"><Shield className="h-4 w-4 text-emerald-400" /> Skills vs Market Demand • Privacy-First</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarDataInitial} outerRadius="75%">
                          <PolarGrid stroke="#27272a" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                          <Radar name="Market Demand" dataKey="B" stroke="#3f3f46" fill="#3f3f46" fillOpacity={0.2} />
                          <Radar name="You" dataKey="A" stroke="#D4FF32" fill="#D4FF32" fillOpacity={0.4} />
                          <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', fontSize: '12px' }} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-zinc-500">
                      <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#D4FF32]" /> You • On-Device</span>
                      <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-zinc-600" /> Market • Railway API</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MISSION */}
            {activeTab === 'mission' && (
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
                <div>
                  <div className="rounded-[20px] border border-zinc-800 bg-zinc-900/40 backdrop-blur p-5 lg:p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="sora font-semibold">7-Day Mission Timeline • Auto Portfolio</h3>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-36 rounded-full bg-zinc-800 overflow-hidden"><div className="h-full bg-[#D4FF32] transition-all duration-700" style={{ width: `${progressPercent}%` }} /></div>
                        <span className="text-[12px] font-medium text-zinc-400">{completedCount}/7</span>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-zinc-800" />
                      <div className="space-y-4">
                        {missionStates.map(m => (
                          <div key={m.day} className={`relative pl-12 group ${m.status === 'locked' ? 'opacity-50' : ''}`}>
                            <div className={`absolute left-0 top-1 h-[38px] w-[38px] rounded-full grid place-items-center border text-[12px] font-bold transition
                              ${m.status === 'done' ? 'bg-[#D4FF32] text-black border-[#D4FF32]' : m.status === 'active' ? 'bg-zinc-900 border-[#D4FF32] text-[#D4FF32] shadow-[0_0_12px_rgba(212,255,50,0.4)]' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}>
                              {m.status === 'done' ? <Check className="h-4 w-4" /> : m.day}
                            </div>

                            <div className={`rounded-2xl border p-4 transition ${m.status === 'active' ? 'border-[#D4FF32]/40 bg-zinc-900/80 shadow-[0_0_0_1px_rgba(212,255,50,0.1)]' : 'border-zinc-800 bg-zinc-900/40'}`}>
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] tracking-widest font-semibold text-zinc-500">DAY {m.day}</span>
                                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 flex items-center gap-1"><Clock className="h-3 w-3" /> {m.duration}</span>
                                    {m.status === 'active' && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4FF32] text-black font-bold">ACTIVE • Hybrid</span>}
                                  </div>
                                  <div className="mt-1.5 sora font-semibold text-[14px]">{m.title}</div>
                                  <div className="mt-1 text-[12px] text-zinc-400 leading-relaxed">{m.desc}</div>
                                </div>
                              </div>

                              <div className="mt-4 grid grid-cols-[84px_1fr] gap-3">
                                <div className="rounded-xl bg-zinc-800 border border-zinc-700 aspect-[4/3] grid place-items-center relative overflow-hidden">
                                  <Video className="h-6 w-6 text-zinc-500" />
                                  <div className="absolute bottom-1 left-1 right-1 h-6 rounded-md bg-black/60 backdrop-blur flex items-center justify-center gap-1 text-[10px] text-white"><Play className="h-3 w-3" /> Play</div>
                                </div>
                                <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-3">
                                  <div className="text-[11px] font-semibold tracking-wide text-zinc-400">TASK</div>
                                  <div className="mt-1 text-[12px] leading-relaxed text-zinc-300">{m.task}</div>
                                  <div className="mt-3 flex gap-2">
                                    {m.status === 'active' ? (
                                      <>
                                        <button onClick={() => completeMission(m.day)} className="h-8 rounded-full bg-[#D4FF32] text-black px-3.5 text-[12px] font-semibold flex items-center gap-1.5 hover:brightness-110 transition"><UploadCloud className="h-3.5 w-3.5" /> Mark Complete</button>
                                        <button className="h-8 rounded-full bg-zinc-800 border border-zinc-700 px-3.5 text-[12px] text-zinc-300">Skip</button>
                                      </>
                                    ) : m.status === 'done' ? (
                                      <span className="h-8 rounded-full bg-emerald-500/15 border border-emerald-500/20 px-3.5 text-[12px] text-emerald-300 flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> Completed • In Portfolio</span>
                                    ) : (
                                      <span className="h-8 rounded-full bg-zinc-800 border border-zinc-700 px-3.5 text-[12px] text-zinc-500 flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Locked</span>
                                    )}
                                  </div>
                                  {m.feedback && (
                                    <div className="mt-3 rounded-lg bg-[#D4FF32]/10 border border-[#D4FF32]/20 p-2.5 flex gap-2">
                                      <div className="h-5 w-5 rounded-full bg-[#D4FF32] text-black grid place-items-center shrink-0 text-[10px] font-bold">AI</div>
                                      <div className="text-[11px] leading-relaxed text-zinc-200">{m.feedback}</div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[20px] border border-zinc-800 bg-zinc-900/40 backdrop-blur p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="sora font-semibold text-[14px]">Portfolio Auto-Build Preview • Vercel Live</h3>
                      <span className="text-[11px] px-2 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400">{portfolioProjects.length + completedCount} projects • /api/portfolio</span>
                    </div>
                    <div className="mt-4 rounded-2xl border border-zinc-800 bg-[#0A0A0B] overflow-hidden">
                      <div className="h-9 flex items-center gap-1.5 px-4 border-b border-zinc-800 bg-zinc-900/60">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" /><div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" /><div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                        <div className="ml-3 flex-1 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center px-3 text-[11px] text-zinc-500"><Globe className="h-3 w-3 mr-1.5" /> rozhasunil.work • LIVE on Vercel</div>
                      </div>
                      <div className="p-4">
                        <div className="sora font-bold text-[18px] leading-tight">Rozha Sunil • Short Video Editor</div>
                        <div className="mt-1 text-[11px] text-zinc-500">Delhi NCR • 3M+ views generated • CapCut • Reels • UGC • Hybrid OS</div>
                        <div className="mt-4 grid grid-cols-1 gap-3">
                          {portfolioProjects.map((p, i) => (
                            <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 flex gap-3">
                              <div className="h-14 w-20 rounded-lg bg-zinc-800 border border-zinc-700 grid place-items-center shrink-0"><Play className="h-4 w-4 text-zinc-500" /></div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[12px] font-semibold truncate">{p.title}</div>
                                <div className="mt-1 flex items-center gap-2 text-[11px] text-zinc-500"><Eye className="h-3 w-3" /> {p.views} • {p.tag}</div>
                              </div>
                              <div className="h-6 w-6 rounded-full bg-[#D4FF32] text-black grid place-items-center shrink-0"><ArrowUpRight className="h-3.5 w-3.5" /></div>
                            </div>
                          ))}
                          {missionStates.filter(m => m.status === 'done').slice(0, 2).map((m, i) => (
                            <div key={`m-${i}`} className="rounded-xl border border-[#D4FF32]/30 bg-[#D4FF32]/10 p-3 flex gap-3 animate-in fade-in">
                              <div className="h-14 w-20 rounded-lg bg-[#D4FF32]/20 border border-[#D4FF32]/20 grid place-items-center shrink-0"><Sparkles className="h-4 w-4 text-[#D4FF32]" /></div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[12px] font-semibold">Day {m.day} • {m.title}</div>
                                <div className="mt-1 text-[11px] text-zinc-400">Auto-added • Just now • New • LIVE</div>
                              </div>
                              <span className="h-5 px-2 rounded-full bg-[#D4FF32] text-black text-[10px] font-bold grid place-items-center shrink-0">NEW</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[20px] border border-[#D4FF32]/20 bg-[#D4FF32]/10 p-5">
                    <div className="flex items-center gap-2 text-[12px] font-bold tracking-wide"><Zap className="h-4 w-4" /> NEXT UNLOCK • Hybrid Reward</div>
                    <div className="mt-2 sora font-semibold">Retention Editing • Keep viewers past 7s</div>
                    <div className="mt-1 text-[12px] text-zinc-700 leading-relaxed">Completing this raises your match to 91% for SUGAR + Boat jobs. Auto-deploys to Vercel.</div>
                  </div>
                </div>
              </div>
            )}

            {/* PORTFOLIO */}
            {activeTab === 'portfolio' && (
              <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6">
                <div className="rounded-[20px] border border-zinc-800 bg-zinc-900/40 backdrop-blur p-5 lg:p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="sora font-semibold">Live Personal Site Preview • Vercel Edge</h3>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setLinkCopied(true)} className="h-8 rounded-full bg-zinc-800 border border-zinc-700 px-3 text-[12px] font-medium flex items-center gap-1.5 hover:bg-zinc-700 transition">
                        {linkCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Link2 className="h-3.5 w-3.5" />} {linkCopied ? 'Copied!' : 'rozhasunil.work'}
                      </button>
                      <button onClick={() => setLinkCopied(true)} className="h-8 w-8 rounded-full bg-[#D4FF32] text-black grid place-items-center hover:brightness-110 transition"><Copy className="h-4 w-4" /></button>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[18px] border border-zinc-800 overflow-hidden bg-[#0A0A0B]">
                    <div className="h-10 flex items-center gap-2 px-4 border-b border-zinc-800 bg-zinc-900/60">
                      <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-red-500/70" /><div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" /><div className="h-2.5 w-2.5 rounded-full bg-green-500/70" /></div>
                      <div className="ml-2 flex-1 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center px-3 text-[11px] text-zinc-500 gap-2"><Globe className="h-3.5 w-3.5" /> rozhasunil.work • {score}% match • Edge cached</div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="inline-flex items-center gap-2 rounded-full bg-[#D4FF32]/15 border border-[#D4FF32]/20 px-3 py-1 text-[11px] font-medium text-[#D4FF32]"><div className="h-1.5 w-1.5 rounded-full bg-[#D4FF32] animate-pulse" /> Available for freelance • LIVE</div>
                          <h2 className="mt-3 sora text-[28px] font-bold leading-[0.95] tracking-tight">I turn boring<br />products into<br /><span className="text-[#D4FF32]">1M+ view reels.</span></h2>
                          <p className="mt-3 text-[12px] leading-relaxed text-zinc-400 max-w-[320px]">Delhi NCR based short video editor. 3M+ views generated for D2C brands. CapCut, Auto-Captions, Hook Writing. Hybrid OS powered.</p>
                        </div>
                        <div className="h-14 w-14 rounded-2xl bg-zinc-800 border border-zinc-700 grid place-items-center text-[12px] font-bold shrink-0">RS</div>
                      </div>

                      <div className="mt-6 grid grid-cols-3 gap-2.5">
                        {[...portfolioProjects, { title: 'MamaEarth - UGC Test', views: '540K', tag: 'New' }].map((p, i) => (
                          <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden group hover:border-zinc-700 transition">
                            <div className="aspect-[4/3] bg-zinc-800 grid place-items-center relative">
                              <Play className="h-5 w-5 text-zinc-600" />
                              <div className="absolute bottom-1.5 left-1.5 rounded-full bg-black/70 px-2 py-0.5 text-[10px] text-white flex items-center gap-1"><Eye className="h-3 w-3" /> {p.views}</div>
                            </div>
                            <div className="p-2.5">
                              <div className="text-[11px] font-semibold leading-tight truncate">{p.title}</div>
                              <div className="mt-1 text-[10px] text-zinc-500">{p.tag}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[20px] border border-zinc-800 bg-zinc-900/40 backdrop-blur p-5 lg:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="sora font-semibold">Resume That Rewrites Itself • Agentic</h3>
                    <select value={selectedResumeJob} onChange={e => setSelectedResumeJob(e.target.value)} className="h-9 rounded-xl bg-zinc-800 border border-zinc-700 px-3 text-[12px] font-medium outline-none focus:border-[#D4FF32]">
                      {jobsForResume.map(j => <option key={j.id} value={j.id}>{j.company} • {j.role}</option>)}
                    </select>
                  </div>

                  <div className="mt-5 rounded-[16px] border border-zinc-800 bg-white text-zinc-900 p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4FF32]" />
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="sora text-[18px] font-bold">Rozha Sunil</div>
                        <div className="text-[11px] tracking-wide font-medium text-zinc-500">SHORT VIDEO EDITOR • DELHI NCR • HYBRID OS</div>
                      </div>
                      <div className="text-right text-[10px] leading-relaxed text-zinc-600">rozha.work<br />+91 98XXX XXXXX<br />Delhi NCR</div>
                    </div>

                    <div className="mt-5 space-y-4 text-[11px] leading-relaxed">
                      <div>
                        <div className="text-[10px] tracking-widest font-bold text-zinc-500">SUMMARY • {hybridMode === 'fast' ? 'Phi-3' : 'GPT-4o'} generated</div>
                        <div className="mt-1">
                          {selectedResumeJob === 'sugar' && 'Beauty & lifestyle reels specialist with 3M+ views. Expert in festive drop hooks, auto-caption styling that boosted SUGAR CTR by 34%. CapCut Pro + Trending Memes DNA. Verified via /api/live-jobs.'}
                          {selectedResumeJob === 'boat' && 'D2C audio reels editor. Specialized in bass-test hooks, retention editing for tech audiences. 890K avg views on Boat-style product reveals. Hook Writing + Retention Edit. Live market match 88%.'}
                          {selectedResumeJob === 'pw' && 'Edtech short video editor. PhysicsWallah style hook breakdowns - 2.1M views. Expert in simplifying complex topics into 15sec hooks. UGC Scripting + Auto-Captions. Hybrid analysis confidence 94%.'}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-[10px] tracking-widest font-bold text-zinc-500">TOP SKILLS • LIVE market</div>
                          <div className="mt-1 flex flex-wrap gap-1.5">
                            {(selectedResumeJob === 'sugar' ? ['Auto-Captions', 'Festive Hooks', 'Beauty Trends'] : selectedResumeJob === 'boat' ? ['Retention Edit', 'Bass Hooks', 'CapCut Pro'] : ['Hook Writing', 'UGC Scripts', 'Simplification']).map(s => (
                              <span key={s} className="px-2 py-0.5 rounded-full bg-zinc-900 text-white text-[10px] font-medium">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] tracking-widest font-bold text-zinc-500">IMPACT • Verified</div>
                          <div className="mt-1 font-semibold">{selectedResumeJob === 'sugar' ? '34% CTR uplift • 1.2M views' : selectedResumeJob === 'boat' ? '890K avg • 22% retention lift' : '2.1M views • 18% completion'}</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] tracking-widest font-bold text-zinc-500">PROJECTS • auto from missions + /api/portfolio</div>
                        <div className="mt-1 space-y-1">
                          <div>• SUGAR Festive Drop - 1.2M views • Hook + Caption styling</div>
                          <div>• Boat Bass Test - 890K views • Retention edit system</div>
                          <div>• Trending Meme template • Day {completedCount} Mission • LIVE</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-2">
                      <button onClick={() => { setResumeCopied(true); setTimeout(() => setResumeCopied(false), 2000); }} className="h-8 rounded-full bg-zinc-900 text-white px-4 text-[11px] font-semibold flex items-center gap-1.5 hover:bg-black transition">
                        {resumeCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {resumeCopied ? 'Copied tailored resume!' : 'Copy for this job'}
                      </button>
                      <span className="h-8 rounded-full bg-[#D4FF32] text-black px-3 text-[10px] font-bold grid place-items-center">TAILORED • {score}% MATCH • {hybridMode}</span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#D4FF32]/15 border border-[#D4FF32]/20 grid place-items-center shrink-0"><Wand2 className="h-4 w-4 text-[#D4FF32]" /></div>
                    <div className="text-[12px] leading-relaxed text-zinc-400"><span className="text-zinc-200 font-medium">How it works:</span> Same projects, different angle. For SUGAR we highlight beauty hooks. For Boat, retention editing. AI rewrites summary, skills, and impact metrics per JD automatically via /api/skill-xray. On-device Phi-3 first, then GPT-4o if user approves.</div>
                  </div>
                </div>
              </div>
            )}

            {/* BOT */}
            {activeTab === 'bot' && (
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
                <div className="space-y-4">
                  <div className={`rounded-[20px] border p-6 transition-all ${botActive ? 'border-[#D4FF32]/30 bg-[#D4FF32]/[0.08] shadow-[0_0_30px_rgba(212,255,50,0.15)]' : 'border-zinc-800 bg-zinc-900/40'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-12 w-12 rounded-2xl grid place-items-center border transition ${botActive ? 'bg-[#D4FF32] text-black border-[#D4FF32]' : 'bg-zinc-800 border-zinc-700 text-zinc-400'}`}><Bot className="h-6 w-6" /></div>
                        <div>
                          <div className="sora font-semibold text-[16px] flex items-center gap-2">Auto Apply Bot • Railway + Supabase <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wide border ${botActive ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>{botActive ? 'ACTIVE' : 'OFF'}</span></div>
                          <div className="text-[12px] text-zinc-400 mt-0.5">Applies to 10 high-match jobs daily • 9 AM IST • POST /api/auto-apply</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setBotActive(!botActive)}
                        className={`relative h-9 w-[56px] rounded-full p-1 transition-all ${botActive ? 'bg-[#D4FF32]' : 'bg-zinc-800 border border-zinc-700'}`}
                      >
                        <div className={`h-7 w-7 rounded-full bg-white shadow transition-all flex items-center justify-center ${botActive ? 'translate-x-[22px]' : 'translate-x-0'}`}>
                          <Power className={`h-3.5 w-3.5 ${botActive ? 'text-black' : 'text-zinc-500'}`} />
                        </div>
                      </button>
                    </div>

                    {botActive && (
                      <div className="mt-5 grid grid-cols-3 gap-3">
                        <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3">
                          <div className="text-[11px] text-zinc-500 tracking-wide font-semibold">TODAY • LIVE</div>
                          <div className="mt-1 sora text-[20px] font-bold">8 Applied</div>
                          <div className="text-[11px] text-emerald-300">2 Viewed by HR • Supabase</div>
                        </div>
                        <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3">
                          <div className="text-[11px] text-zinc-500 tracking-wide font-semibold">INTERVIEWS</div>
                          <div className="mt-1 sora text-[20px] font-bold">{applications.filter(a => a.status === 'Interview Scheduled').length}</div>
                          <div className="text-[11px] text-[#D4FF32]">Scheduled this week</div>
                        </div>
                        <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3">
                          <div className="text-[11px] text-zinc-500 tracking-wide font-semibold">AVG MATCH</div>
                          <div className="mt-1 sora text-[20px] font-bold">86%</div>
                          <div className="text-[11px] text-zinc-400">Hybrid scored</div>
                        </div>
                      </div>
                    )}

                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-[13px] font-semibold">Today's Queue • 10 jobs • /api/live-jobs</h4>
                        <span className="text-[11px] text-zinc-500">Auto-tailored resume per job ✓ • Hybrid</span>
                      </div>
                      <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
                        {applications.map((app, i) => (
                          <div key={i} className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 hover:border-zinc-700 transition">
                            <div className="h-8 w-8 rounded-lg bg-zinc-800 border border-zinc-700 grid place-items-center text-[11px] font-bold shrink-0">{app.company[0]}</div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[13px] font-medium truncate">{app.company}</div>
                              <div className="text-[11px] text-zinc-500 truncate">{app.role} • {app.time} • Apna.co</div>
                            </div>
                            <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium border shrink-0
                              ${app.status === 'Applied' ? 'bg-zinc-800 text-zinc-300 border-zinc-700' : app.status === 'Viewed by HR' ? 'bg-blue-500/15 text-blue-300 border-blue-500/20' : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20'}`}>
                              {app.status === 'Applied' && '● Applied'}
                              {app.status === 'Viewed by HR' && '👁 Viewed by HR'}
                              {app.status === 'Interview Scheduled' && '🎯 Interview'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Enhanced Phone Mockup */}
                  <div className="rounded-[24px] border border-zinc-800 bg-zinc-900/40 backdrop-blur p-5">
                    <h3 className="sora font-semibold text-[14px] flex items-center gap-2"><Smartphone className="h-4 w-4 text-[#D4FF32]" /> WhatsApp Live Alerts • Real Phone Mockup</h3>
                    <div className="mt-4 flex justify-center overflow-hidden">
                      <div className="relative w-[320px] max-w-[90vw] rounded-[36px] border-[8px] border-zinc-900 bg-black shadow-2xl overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-900 rounded-b-xl z-10" />
                        <div className="bg-[#0B141A] overflow-hidden">
                          <div className="h-14 bg-[#202C33] flex items-center gap-3 px-4 pt-3">
                            <div className="h-8 w-8 rounded-full bg-[#D4FF32] text-black grid place-items-center font-bold text-[11px]">KS</div>
                            <div>
                              <div className="text-[13px] font-medium text-white leading-none">KaamSeKaamTak Bot</div>
                              <div className="text-[11px] text-emerald-400 flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> online • LIVE</div>
                            </div>
                            <div className="ml-auto flex items-center gap-1 text-zinc-400"><span className="text-[12px]">📹</span><span className="text-[12px]">📞</span></div>
                          </div>
                          <div className="p-3 space-y-3 bg-[#111B21] min-h-[380px] relative overflow-hidden">
                            <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage:`radial-gradient(#fff 1px, transparent 1px)`, backgroundSize:'18px 18px'}} />
                            <div className="relative z-10 flex justify-center"><span className="text-[10px] px-3 py-1 rounded-full bg-[#1F2C34] text-zinc-300 shadow">Today • 9:03 AM • Railway API Live</span></div>

                            <div className="relative z-10 max-w-[85%] rounded-[12px] rounded-bl-[2px] bg-[#202C33] p-3 text-[12px] leading-relaxed text-zinc-200 shadow">
                              🚀 Bot activated! Applied to <span className="text-white font-medium">8 jobs</span> today with tailored resumes. Hybrid mode: {hybridMode}.
                              <div className="mt-1 text-[10px] text-zinc-500">9:03 AM ✓✓ • Supabase logged</div>
                            </div>

                            <div className="relative z-10 max-w-[85%] rounded-[12px] rounded-bl-[2px] bg-[#202C33] p-3 text-[12px] leading-relaxed text-zinc-200 shadow border border-[#D4FF32]/20">
                              <div className="flex items-center gap-1.5 mb-1 text-[11px] font-bold text-[#D4FF32]"><span className="h-4 w-4 rounded-full bg-[#D4FF32] text-black grid place-items-center">!</span> LIVE ALERT</div>
                              👀 <span className="font-medium text-white">Boat HR viewed your profile!</span><br />
                              Boat Lifestyle • Reels Specialist<br />
                              Match: 88% • HR opened portfolio 2x<br />
                              Via: Apna.co scraping
                              <div className="mt-2 rounded-lg bg-[#111B21] border border-zinc-800 p-2 text-[11px]">
                                <div className="font-medium text-white">🔥 Hot lead • Reply in 2h window</div>
                                <div className="text-zinc-400">Tip: Send Day 3 CTA reel • Confidence 94%</div>
                              </div>
                              <div className="mt-1 text-[10px] text-zinc-500">10:14 AM ✓✓ • FastAPI webhook</div>
                            </div>

                            <div className="relative z-10 max-w-[85%] rounded-[12px] rounded-bl-[2px] bg-[#00A884]/15 border border-[#00A884]/20 p-3 text-[12px] leading-relaxed text-emerald-200 shadow">
                              🎯 Interview scheduled! <span className="font-medium">Lenskart</span> • Tomorrow 11 AM • UGC Video Editor • ₹30k • /api/auto-apply
                              <div className="mt-1 text-[10px] text-emerald-300/70">11:42 AM ✓✓</div>
                            </div>

                            {botActive && (
                              <div className="relative z-10 max-w-[85%] rounded-[12px] rounded-bl-[2px] bg-[#202C33] p-3 text-[12px] leading-relaxed text-zinc-200 animate-pulse shadow">
                                ⚡ Live: Applying to PhysicsWallah now... tailored hook-writing resume attached. Mode: {hybridMode}
                                <div className="mt-1 text-[10px] text-zinc-500">Just now • typing... • Railway</div>
                              </div>
                            )}
                          </div>
                          <div className="h-14 bg-[#202C33] flex items-center gap-2 px-3">
                            <div className="h-8 w-8 rounded-full bg-zinc-700 grid place-items-center text-zinc-400">😊</div>
                            <div className="flex-1 h-9 rounded-full bg-[#2A3942] px-4 flex items-center text-[12px] text-zinc-500">Type a message...</div>
                            <div className="h-9 w-9 rounded-full bg-[#00A884] grid place-items-center"><span className="text-white text-[14px]">➤</span></div>
                          </div>
                        </div>
                        <div className="h-3 bg-zinc-900 flex justify-center items-center"><div className="w-16 h-1 rounded-full bg-zinc-700" /></div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-zinc-500"><MessageCircle className="h-3 w-3" /> WhatsApp Business API • Supabase Realtime • Railway webhook</div>
                  </div>

                  <div className="rounded-[20px] border border-zinc-800 bg-zinc-900/40 p-5">
                    <h4 className="text-[13px] font-semibold">How Auto-Apply Works • Hybrid</h4>
                    <div className="mt-4 space-y-3 text-[12px] leading-relaxed text-zinc-400">
                      <div className="flex gap-3"><span className="h-6 w-6 rounded-full bg-zinc-800 border border-zinc-700 grid place-items-center text-[11px] shrink-0">1</span><span><span className="text-zinc-200 font-medium">Market scan 9AM • Railway cron</span> • Picks 10 jobs with 80%+ match from {liveJobCount.toLocaleString()} live jobs via Apify + SerpAPI (legal)</span></div>
                      <div className="flex gap-3"><span className="h-6 w-6 rounded-full bg-zinc-800 border border-zinc-700 grid place-items-center text-[11px] shrink-0">2</span><span><span className="text-zinc-200 font-medium">Resume tailors itself • Phi-3 on-device</span> • Same projects, different positioning per company niche • 0.8s</span></div>
                      <div className="flex gap-3"><span className="h-6 w-6 rounded-full bg-[#D4FF32]/20 border border-[#D4FF32]/20 grid place-items-center text-[11px] shrink-0 text-[#D4FF32]">3</span><span><span className="text-zinc-200 font-medium">Applies + tracks • Supabase + WhatsApp</span> • Sends alerts when HR views or schedules interview • Webhook live</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Production Deployment Panel - Always visible bottom */}
            <div className="mt-10 rounded-[24px] border border-[#D4FF32]/20 bg-gradient-to-b from-zinc-900/80 to-zinc-900/30 backdrop-blur-xl overflow-hidden max-w-full">
              <div className="p-6 lg:p-7 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#D4FF32] text-black grid place-items-center"><Rocket className="h-5 w-5" /></div>
                  <div>
                    <div className="sora font-bold text-[16px] flex items-center gap-2">Production Deployment Panel • LIVE Hybrid Edition <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold">LIVE ON RAILWAY + VERCEL</span></div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">YC-funded startup dashboard • Serving public users • Agentic OS v2.0</div>
                  </div>
                </div>
                <button onClick={() => setShowDeployModal(true)} className="h-10 rounded-full bg-[#D4FF32] text-black px-5 text-[13px] font-bold flex items-center gap-2 hover:brightness-110 transition shadow-[0_0_20px_rgba(212,255,50,0.3)]"><Rocket className="h-4 w-4" /> Deploy to Public</button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                <div className="p-6 border-b lg:border-b-0 lg:border-r border-zinc-800">
                  <div className="text-[11px] tracking-widest font-bold text-zinc-500 flex items-center gap-1.5"><Code2 className="h-3.5 w-3.5" /> API ENDPOINTS • Railway FastAPI</div>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-3">
                      <div className="flex items-center gap-2 text-[11px] font-bold"><span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">GET</span> /api/live-jobs</div>
                      <div className="mt-1 text-[11px] text-zinc-500">?location=DelhiNCR&niche=All&mode=hybrid • Returns 4,832 jobs • Latency 128ms • Legal scraping</div>
                      <div className="mt-2 flex gap-1.5"><span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400">Apna.co</span><span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400">Internshala</span><span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400">Google Jobs</span></div>
                    </div>
                    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-3">
                      <div className="flex items-center gap-2 text-[11px] font-bold"><span className="px-2 py-0.5 rounded bg-[#D4FF32]/15 text-[#D4FF32] border border-[#D4FF32]/20">POST</span> /api/skill-xray</div>
                      <div className="mt-1 text-[11px] text-zinc-500">Body: {`{resume_pdf, voice_blob}` } • Returns gaps + confidence • Phi-3 0.8s + GPT-4o 2.4s</div>
                      <div className="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 inline-flex items-center gap-1"><Shield className="h-3 w-3" /> Privacy: On-device first</div>
                    </div>
                    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-3">
                      <div className="flex items-center gap-2 text-[11px] font-bold"><span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/20">POST</span> /api/auto-apply</div>
                      <div className="mt-1 text-[11px] text-zinc-500">Supabase logs • WhatsApp webhook • 10 jobs/day • Tracks HR views</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-b lg:border-b-0 lg:border-r border-zinc-800">
                  <div className="text-[11px] tracking-widest font-bold text-zinc-500 flex items-center gap-1.5"><Database className="h-3.5 w-3.5" /> TECH STACK • Production Grade</div>
                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    {[
                      { name: 'FastAPI', icon: Server, desc: 'Railway • 128ms p95', color: 'emerald' },
                      { name: 'Supabase', icon: Database, desc: 'Postgres • Realtime', color: 'green' },
                      { name: 'Apify', icon: Layers, desc: 'Legal scraping', color: 'blue' },
                      { name: 'Transformers.js', icon: Brain, desc: 'Phi-3 on-device', color: 'yellow' },
                      { name: 'Vercel', icon: Globe, desc: 'Edge • Portfolio OS', color: 'zinc' },
                      { name: 'SerpAPI', icon: Globe, desc: 'Google Jobs Legal', color: 'orange' },
                    ].map(s => (
                      <div key={s.name} className="rounded-xl bg-zinc-900 border border-zinc-800 p-3 flex gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-zinc-800 border border-zinc-700 grid place-items-center shrink-0"><s.icon className="h-4 w-4 text-zinc-300" /></div>
                        <div>
                          <div className="text-[12px] font-semibold">{s.name}</div>
                          <div className="text-[10px] text-zinc-500">{s.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl bg-[#D4FF32]/10 border border-[#D4FF32]/20 p-3 flex items-center gap-2 text-[11px] text-[#D4FF32]"><Zap className="h-4 w-4" /> All endpoints live • CORS enabled • Rate limited • Public ready</div>
                </div>

                <div className="p-6">
                  <div className="text-[11px] tracking-widest font-bold text-zinc-500 flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5" /> COST & REVENUE • YC Math</div>
                  <div className="mt-4 rounded-xl bg-zinc-900 border border-zinc-800 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-zinc-400">For 1000 active users</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-300">Profitable Day 1</span>
                    </div>
                    <div className="mt-3 space-y-2 text-[12px]">
                      <div className="flex justify-between"><span className="text-zinc-500">Railway FastAPI + cron</span><span className="font-medium">₹800</span></div>
                      <div className="flex justify-between"><span className="text-zinc-500">Supabase + Realtime</span><span className="font-medium">₹1,200</span></div>
                      <div className="flex justify-between"><span className="text-zinc-500">Apify + SerpAPI scraping</span><span className="font-medium">₹1,800</span></div>
                      <div className="flex justify-between"><span className="text-zinc-500">GPT-4o cloud calls</span><span className="font-medium">₹800</span></div>
                      <div className="h-px bg-zinc-800 my-2" />
                      <div className="flex justify-between font-bold"><span>Total Cost</span><span className="text-zinc-300">₹4,600</span></div>
                      <div className="flex justify-between font-bold text-[#D4FF32]"><span>Revenue (₹149/user)</span><span>₹1.4L</span></div>
                      <div className="flex justify-between font-bold text-emerald-300"><span>Net Profit</span><span>₹1.35L • 96% margin</span></div>
                    </div>
                  </div>
                  <div className="mt-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3">
                    <div className="text-[11px] font-bold text-emerald-300">WHY HYBRID WINS</div>
                    <div className="mt-1 text-[11px] leading-relaxed text-zinc-400">On-device Phi-3 handles 70% queries free. Cloud GPT-4o only for deep analysis. Scraping cached in Supabase for 3h. WhatsApp via Meta API free tier. No LLM cost for fast scans.</div>
                  </div>
                  <button onClick={() => setShowDeployModal(true)} className="mt-3 w-full h-10 rounded-xl bg-zinc-800 border border-zinc-700 text-[12px] font-semibold flex items-center justify-center gap-2 hover:bg-zinc-700 transition"><Rocket className="h-4 w-4" /> View Deployment Guide</button>
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-600 border-t border-zinc-800/60 pt-6">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> KaamSeKaamTak OS v2.0 LIVE Hybrid • Reverse Skill-to-Job Engine • India’s first Agentic Job OS • Built 2026 • Railway Live • YC-Ready</span>
              <span className="hidden lg:inline-flex items-center gap-3"><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> API: {apiLive ? 'Live • 128ms' : 'Scraping...'} • Market sync: {lastScraped}</span><span className="px-2 py-0.5 rounded-full bg-[#D4FF32]/10 border border-[#D4FF32]/20 text-[#D4FF32]">● LIVE Hybrid Engine</span></span>
            </div>
          </div>
        </main>
      </div>

      {/* Deploy Modal */}
      {showDeployModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowDeployModal(false)} />
          <div className="relative w-full max-w-[640px] rounded-[24px] border border-zinc-800 bg-[#111113] shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#D4FF32] text-black grid place-items-center"><Rocket className="h-5 w-5" /></div>
                <div>
                  <div className="sora font-bold">Deploy to Public • Production Guide</div>
                  <div className="text-[11px] text-zinc-500">Railway + Supabase + Vercel • 1-click live</div>
                </div>
              </div>
              <button onClick={() => setShowDeployModal(false)} className="h-8 w-8 rounded-full bg-zinc-800 grid place-items-center">✕</button>
            </div>
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
                <div className="text-[12px] font-bold flex items-center gap-2"><Server className="h-4 w-4 text-emerald-400" /> 1. Backend • FastAPI on Railway</div>
                <div className="mt-2 text-[11px] leading-relaxed text-zinc-400 font-mono bg-black/50 rounded-lg p-3 border border-zinc-800 overflow-x-auto break-words max-w-full">
                  git clone kaam-os-api<br />
                  railway up --service api<br />
                  ENV: SUPABASE_URL, SERPAPI_KEY, APIFY_TOKEN, OPENAI_KEY<br />
                  Endpoints: /api/live-jobs (cached 3h), /api/skill-xray, /api/auto-apply<br />
                  Cron: 0 9 * * * scrapes Apna + Internshala + Google Jobs
                </div>
              </div>
              <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
                <div className="text-[12px] font-bold flex items-center gap-2"><Database className="h-4 w-4 text-green-400" /> 2. Supabase • DB + Realtime</div>
                <div className="mt-2 text-[11px] leading-relaxed text-zinc-400 font-mono bg-black/50 rounded-lg p-3 border border-zinc-800 overflow-x-auto break-words max-w-full">
                  Tables: jobs (4,832 rows live), applications, users<br />
                  Realtime enabled for WhatsApp alerts<br />
                  Row-level security: user_id = auth.uid()
                </div>
              </div>
              <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
                <div className="text-[12px] font-bold flex items-center gap-2"><Globe className="h-4 w-4 text-white" /> 3. Frontend • Vercel Edge</div>
                <div className="mt-2 text-[11px] leading-relaxed text-zinc-400 font-mono bg-black/50 rounded-lg p-3 border border-zinc-800 overflow-x-auto break-words max-w-full">
                  npm run build → vercel --prod<br />
                  Env: NEXT_PUBLIC_API_URL=https://api.railway.app<br />
                  Transformers.js Phi-3 loaded via CDN • On-device first<br />
                  Edge cached portfolio pages
                </div>
              </div>
              <div className="rounded-xl bg-[#D4FF32]/10 border border-[#D4FF32]/20 p-4">
                <div className="text-[12px] font-bold text-[#D4FF32] flex items-center gap-2"><Shield className="h-4 w-4" /> Legal & Privacy • YC Compliant</div>
                <div className="mt-2 text-[11px] leading-relaxed text-zinc-700">
                  • Scraping only public job boards via official APIs • No login bypass • Respects robots.txt<br />
                  • Resume never leaves device for fast scan • User consent before cloud GPT-4o call<br />
                  • WhatsApp via Meta approved template • GDPR ready
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowDeployModal(false)} className="flex-1 h-11 rounded-xl bg-[#D4FF32] text-black font-bold text-[13px] flex items-center justify-center gap-2 hover:brightness-110 transition"><Rocket className="h-4 w-4" /> LIVE at kaam-se-kaam-tak.vercel.app</button>
                <button onClick={() => setShowDeployModal(false)} className="h-11 px-5 rounded-xl bg-zinc-800 border border-zinc-700 text-[13px] font-medium">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
