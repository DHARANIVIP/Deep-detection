
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Save, Bell, Shield, Eye, Database } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [engineSensitivity, setEngineSensitivity] = useState(85);

  const SettingToggle = ({ label, desc, active }: { label: string, desc: string, active: boolean }) => (
    <div className="flex items-center justify-between p-6 glass rounded-2xl">
      <div>
        <h3 className="font-bold text-slate-200">{label}</h3>
        <p className="text-xs text-slate-500 mt-1">{desc}</p>
      </div>
      <button className={`w-12 h-6 rounded-full relative transition-all ${active ? 'bg-forensic-blue' : 'bg-slate-700'}`}>
        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${active ? 'translate-x-6' : 'translate-x-0'}`}></div>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-navy flex flex-col">
      <Navbar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-3xl font-black italic tracking-tight mb-2">Engine Settings</h1>
            <p className="text-slate-400">Configure your forensic detection preferences and data handling.</p>
          </motion.div>

          <div className="space-y-6">
            <section>
              <div className="flex items-center space-x-2 mb-4 text-forensic-blue uppercase text-[10px] font-black tracking-[0.2em]">
                <Shield className="w-3 h-3" />
                <span>Detection Engine</span>
              </div>
              <div className="space-y-4">
                <div className="p-8 glass rounded-3xl">
                  <div className="flex justify-between mb-4">
                    <span className="font-bold text-sm">Analysis Sensitivity</span>
                    <span className="font-mono text-forensic-blue font-bold">{engineSensitivity}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={engineSensitivity}
                    onChange={(e) => setEngineSensitivity(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-forensic-blue"
                  />
                  <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">
                    High sensitivity may increase false positives in low-quality video files but ensures no synthetic artifacts are missed.
                  </p>
                </div>
                <SettingToggle
                  label="Auto-Overlay Landmarks"
                  desc="Automatically enable facial mapping points in analysis view."
                  active={true}
                />
                <SettingToggle
                  label="GPU Acceleration"
                  desc="Use local hardware for faster frequency domain scanning."
                  active={true}
                />
              </div>
            </section>

            <section className="pt-6">
              <div className="flex items-center space-x-2 mb-4 text-forensic-blue uppercase text-[10px] font-black tracking-[0.2em]">
                <Database className="w-3 h-3" />
                <span>Data & Privacy</span>
              </div>
              <div className="space-y-4">
                <SettingToggle
                  label="Cloud Storage"
                  desc="Save scan history to encrypted cloud vault."
                  active={false}
                />
                <SettingToggle
                  label="Anonymous Telemetry"
                  desc="Help improve the engine by sharing non-sensitive metadata."
                  active={true}
                />
              </div>
            </section>

            <div className="pt-10 flex justify-end">
              <button className="px-8 py-3 bg-forensic-blue text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
