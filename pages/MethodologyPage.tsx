
import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, Scan, Layers, Fingerprint } from 'lucide-react';

const MethodologyPage: React.FC = () => {
  const steps = [
    {
      icon: Scan,
      title: "Landmark Extraction",
      desc: "Our engine maps 128 unique facial landmarks in every frame to detect geometry inconsistencies common in face-swap technologies."
    },
    {
      icon: Activity,
      title: "Frequency Domain Analysis",
      desc: "By applying Fast Fourier Transform (FFT), we identify artificial 'noise' patterns left behind by generative models like Stable Diffusion or GANs."
    },
    {
      icon: Zap,
      title: "Temporal Jitter Detection",
      desc: "AI videos often fail at temporal coherence. We analyze frame-to-frame pixel flow to find microscopic stuttering invisible to the human eye."
    },
    {
      icon: Fingerprint,
      title: "Biometric Validation",
      desc: "Detection of abnormal pulse rhythms (via rPPG) and blink frequencies that deviate from known human physiological ranges."
    }
  ];

  return (
    <div className="min-h-screen bg-navy flex flex-col">
      <Navbar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-3xl font-black italic tracking-tight mb-4">Detection Methodology</h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Sentinel AI combines three distinct layers of neural scrutiny to ensure maximum forensic reliability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-[2rem] hover:border-forensic-blue/30 transition-all"
              >
                <div className="w-14 h-14 bg-forensic-blue/10 rounded-2xl flex items-center justify-center mb-6 text-forensic-blue">
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 p-8 glass rounded-[2rem] bg-gradient-to-r from-forensic-blue/5 to-transparent border-forensic-blue/10"
          >
            <div className="flex items-center space-x-4 mb-4">
              <Cpu className="w-6 h-6 text-forensic-blue" />
              <h2 className="text-lg font-black uppercase tracking-widest italic">V4.2.0 Engine Specs</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Optimized for NVIDIA H100 architecture, processing at ~120 FPS for 1080p streams.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-2xl">
                <p className="text-xs text-slate-500 mb-1">Accuracy</p>
                <p className="font-mono font-bold text-forensic-blue">99.4%</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-2xl">
                <p className="text-xs text-slate-500 mb-1">Latency</p>
                <p className="font-mono font-bold text-forensic-blue">12ms</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-2xl">
                <p className="text-xs text-slate-500 mb-1">Baseline</p>
                <p className="font-mono font-bold text-forensic-blue">2.4B</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default MethodologyPage;
