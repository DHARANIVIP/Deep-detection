
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import GaugeChart from '../components/GaugeChart';
import FrequencyGraph from '../components/FrequencyGraph';
import ResultCard from '../components/ResultCard';
import { Artifact } from '../types';
import {
  ChevronLeft,
  Download,
  Eye,
  Maximize2,
  Settings2,
  Layers,
  Scan,
  Info,
  Share2,
  Printer,
  History,
  Shield,
  Activity,
  Cpu,
  Fingerprint
} from 'lucide-react';
import { motion } from 'framer-motion';

const mockArtifacts: Artifact[] = [
  { label: 'Generative Texture Audit', status: 'Abnormal', details: 'Diffusion-specific artifacts detected in Y-channel chroma (94.2% conf)' },
  { label: 'Optical Flow Consistency', status: 'Warning', details: '0.6s inconsistency in pixel velocity near jawline at 00:04s' },
  { label: 'Blink Biometrics', status: 'Abnormal', details: 'Statistical anomaly: Blink frequency 4.8 SD from human baseline' },
  { label: 'Phoneme Syncing', status: 'Normal', details: 'Audio-Visual alignment within standard physiological tolerances' },
  { label: 'Latent Space Bleeding', status: 'Abnormal', details: 'Shadow artifacts inconsistent with calculated environmental light sources' },
];

const AnalysisPage: React.FC = () => {
  const { id } = useParams();
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnalyzing(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
      <Navbar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center space-x-5">
              <Link to="/dashboard" className="w-10 h-10 flex items-center justify-center hover:bg-text-primary/5 rounded-xl transition-all border border-text-primary/5">
                <ChevronLeft className="w-6 h-6" />
              </Link>
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h1 className="text-2xl font-black tracking-tight">investigation_clip_01.mp4</h1>
                  <span className="px-2 py-0.5 bg-status-fake/10 text-status-fake border border-status-fake/20 rounded text-[9px] font-black uppercase tracking-widest">High Risk</span>
                </div>
                <p className="text-[10px] text-text-muted font-mono flex items-center space-x-2">
                  <Fingerprint className="w-3 h-3" />
                  <span>UID: {id} • Forensic Hash: 0x82...FA92 • NIST Verified</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <button className="p-3 glass rounded-xl hover:bg-text-primary/5 transition-colors">
                <Share2 className="w-4 h-4 text-text-secondary" />
              </button>
              <button className="px-6 py-3 bg-primary-blue text-white rounded-xl flex items-center space-x-2 text-sm font-black hover:bg-secondary-blue transition-all shadow-xl">
                <Download className="w-4 h-4" />
                <span>Generate Export Report</span>
              </button>
            </div>
          </div>

          {/* Split Screen Video Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="group relative glass rounded-[2rem] overflow-hidden border-white/5 shadow-2xl">
              <div className="absolute top-6 left-6 z-10 px-3 py-1 bg-black/80 backdrop-blur rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10 flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                <span>Source Material</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                alt="Original"
                className="w-full aspect-video object-cover"
              />
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-3 bg-black/60 rounded-xl hover:bg-black/80 transition-colors">
                  <Maximize2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="relative glass rounded-[2rem] overflow-hidden border-forensic-blue/20 shadow-2xl shadow-forensic-blue/5">
              <div className="absolute top-6 left-6 z-10 px-3 py-1 bg-forensic-blue/80 backdrop-blur rounded-lg text-[10px] font-black uppercase tracking-widest text-white flex items-center space-x-2">
                <Activity className="w-3 h-3" />
                <span>Analysis Overlay</span>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                  alt="Analysis"
                  className={`w-full aspect-video object-cover transition-all grayscale contrast-125 ${showHeatmap ? 'brightness-50' : ''}`}
                />
                {/* Mock Landmarks Overlay */}
                {showLandmarks && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                    <path d="M40,35 Q50,30 60,35" stroke="#2563EB" strokeWidth="0.5" fill="none" opacity="0.8" />
                    <circle cx="45" cy="42" r="1.5" stroke="#2563EB" strokeWidth="0.3" fill="none" />
                    <circle cx="55" cy="42" r="1.5" stroke="#2563EB" strokeWidth="0.3" fill="none" />
                    <path d="M42,65 Q50,70 58,65" stroke="#DC2626" strokeWidth="1" fill="none" className="animate-pulse" />
                    <rect x="35" y="30" width="30" height="45" stroke="rgba(37,99,235,0.2)" strokeWidth="0.2" fill="none" />
                  </svg>
                )}
                {/* Mock Heatmap */}
                {showHeatmap && (
                  <div className="absolute inset-0 bg-gradient-to-br from-status-fake/40 via-transparent to-status-fake/30 mix-blend-overlay"></div>
                )}
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between p-4 glass-heavy rounded-2xl">
                <div className="flex space-x-8">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className={`w-9 h-5 rounded-full relative transition-all ${showLandmarks ? 'bg-primary-blue shadow-lg shadow-primary-blue/40' : 'bg-text-primary/20'}`}>
                      <input type="checkbox" className="hidden" checked={showLandmarks} onChange={() => setShowLandmarks(!showLandmarks)} />
                      <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${showLandmarks ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                    <span className="text-[10px] font-black uppercase text-text-secondary group-hover:text-text-primary tracking-widest">Landmarks</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className={`w-9 h-5 rounded-full relative transition-all ${showHeatmap ? 'bg-status-fake shadow-lg shadow-status-fake/40' : 'bg-text-primary/20'}`}>
                      <input type="checkbox" className="hidden" checked={showHeatmap} onChange={() => setShowHeatmap(!showHeatmap)} />
                      <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${showHeatmap ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                    <span className="text-[10px] font-black uppercase text-text-secondary group-hover:text-text-primary tracking-widest">Heatmap</span>
                  </label>
                </div>
                <div className="flex items-center space-x-2 text-primary-blue">
                  <Scan className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest">Analyzing Frame 492...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Data Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Col 1: Probability Gauge */}
            <div className="glass p-8 rounded-[2rem] flex flex-col min-h-[450px]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-text-muted flex items-center space-x-3">
                  <Cpu className="w-4 h-4 text-primary-blue" />
                  <span>Detection Score</span>
                </h3>
                <button className="text-text-muted hover:text-text-primary transition-colors">
                  <Info className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <GaugeChart probability={94} />
              </div>
              <div className="mt-8 p-5 bg-status-fake/5 border border-status-fake/10 rounded-2xl">
                <p className="text-xs text-status-fake font-bold leading-relaxed">
                  CRITICAL: Subject exhibits 48% deviation from human neural temporal patterns. Verification mandatory for legal processing.
                </p>
              </div>
            </div>

            {/* Col 2: Artifacts List */}
            <div className="glass p-8 rounded-[2rem] flex flex-col min-h-[450px]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-text-muted flex items-center space-x-3">
                  <Settings2 className="w-4 h-4 text-primary-blue" />
                  <span>Forensic Evidence</span>
                </h3>
                <span className="text-[10px] font-mono font-black text-status-fake bg-status-fake/10 px-2 py-0.5 rounded">3 CRITICAL</span>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scroll">
                {mockArtifacts.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <ResultCard artifact={item} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Col 3: Frequency Graph */}
            <div className="glass p-8 rounded-[2rem] flex flex-col min-h-[450px]">
              <div className="flex items-center justify-between mb-10">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-text-muted flex items-center space-x-3">
                  <Activity className="w-4 h-4 text-primary-blue" />
                  <span>Frequency Profile</span>
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary-blue"></div>
                    <span className="text-[9px] font-black uppercase text-text-muted">Real</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-status-fake"></div>
                    <span className="text-[9px] font-black uppercase text-text-muted">Synth</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-h-[220px]">
                <FrequencyGraph />
              </div>
              <div className="mt-10 space-y-4 pt-6 border-t border-text-primary/5">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-text-muted">Temporal Blur</span>
                  <span className="text-status-fake">High Variance</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-text-muted">Pixel Jitter</span>
                  <span className="text-primary-blue">Low</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-text-muted">Artifact Density</span>
                  <span className="text-status-fake">0.82 / frame</span>
                </div>
              </div>
            </div>
          </div>

          {/* Evidence Timeline */}
          <div className="glass p-8 rounded-[2rem]">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-text-muted mb-8 flex items-center space-x-3">
              <History className="w-4 h-4 text-primary-blue" />
              <span>Artifact Detection Timeline</span>
            </h3>
            <div className="relative h-12 bg-text-primary/5 rounded-xl border border-text-primary/5 overflow-hidden group">
              <div className="absolute top-0 left-[20%] w-1 h-full bg-status-fake/40 group-hover:bg-status-fake/80 transition-colors"></div>
              <div className="absolute top-0 left-[21%] w-8 h-full bg-status-fake/10 group-hover:bg-status-fake/20"></div>

              <div className="absolute top-0 left-[45%] w-1 h-full bg-status-fake/40 group-hover:bg-status-fake/80"></div>

              <div className="absolute top-0 left-[82%] w-1 h-full bg-status-fake/40 group-hover:bg-status-fake/80"></div>
              <div className="absolute top-0 left-[83%] w-12 h-full bg-status-fake/10 group-hover:bg-status-fake/20"></div>

              {/* Timeline Marks */}
              <div className="absolute inset-x-0 bottom-0 h-1 flex justify-between px-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="w-px h-full bg-text-primary/10"></div>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-4 text-[9px] font-mono text-text-muted font-bold uppercase tracking-widest">
              <span>00:00:00</span>
              <span>00:00:04</span>
              <span>00:00:08</span>
              <span>00:00:12</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 pb-20">
            <button className="flex items-center space-x-3 px-8 py-4 glass border-text-primary/5 rounded-2xl hover:bg-text-primary/5 transition-all text-text-secondary font-black text-xs uppercase tracking-widest">
              <Printer className="w-4 h-4" />
              <span>Print Hardcopy Case</span>
            </button>
            <button className="flex items-center space-x-3 px-8 py-4 glass border-text-primary/5 rounded-2xl hover:bg-text-primary/5 transition-all text-text-secondary font-black text-xs uppercase tracking-widest">
              <Shield className="w-4 h-4" />
              <span>Seal Evidence Hash</span>
            </button>
          </div>
        </div>
      </main>
      {isAnalyzing && (
        <div className="fixed inset-0 z-[100] glass flex flex-col items-center justify-center text-center p-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative mb-12"
          >
            <div className="w-32 h-32 rounded-full border-[3px] border-primary-blue/10 border-t-primary-blue animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-12 h-12 text-primary-blue" />
            </div>
          </motion.div>
          <h2 className="text-3xl font-black tracking-tight mb-4 uppercase italic text-text-primary">Recalibrating Forensics</h2>
          <div className="max-w-md w-full glass bg-bg-section h-2 rounded-full overflow-hidden mb-6 border border-text-primary/5">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-blue to-accent-cyan"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.4, ease: "easeInOut" }}
            />
          </div>
          <p className="text-text-secondary font-mono text-[10px] font-bold tracking-[0.2em] uppercase animate-pulse">Scanning Latent Space for Synthesis Artifacts...</p>
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
