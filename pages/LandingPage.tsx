
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Search, FileText, ChevronRight, CheckCircle, Activity, Mail, Layers, MousePointer2, Brain, User, Clock, BarChart3, Microscope, FileCheck, Lock, Volume2 } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-primary-blue/20 overflow-hidden relative font-sans">
      <div className="absolute inset-0 grid-bg opacity-60 z-0"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-blue/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-cyan/5 blur-[150px] rounded-full pointer-events-none"></div>

      <nav className="relative z-10 px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-accent-cyan rounded-xl flex items-center justify-center shadow-lg shadow-primary-blue/20">
            <Shield className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight uppercase italic">Detective<span className="text-primary-blue">AI</span></span>
        </div>

      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary-blue/10 border border-primary-blue/30 rounded-full text-primary-blue text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Activity className="w-3 h-3" />
              <span>Next-Gen Forensic Intelligence</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-8 leading-[1.05]">
              Identify <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue via-accent-cyan to-secondary-blue">Synthetic</span> Media
            </h1>
            <p className="text-xl text-text-secondary mb-12 max-w-xl leading-relaxed font-medium">
              Enterprise-grade deepfake detection. We analyze facial geometry, pulse patterns, and temporal inconsistencies to authenticate digital evidence.
            </p>
            <div className="flex flex-col sm:row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <Link
                to="/dashboard"
                className="group px-10 py-5 bg-primary-blue hover:bg-secondary-blue text-white rounded-2xl font-black text-lg transition-all shadow-[0_10px_40px_rgba(37,99,235,0.3)] flex items-center space-x-3 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span>Start Forensic</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <div className="relative glass p-4 rounded-[2rem] border-white/10 shadow-2xl rotate-3">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80"
                alt="Scanner UI"
                className="rounded-2xl w-full grayscale opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent"></div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-10 -left-10 glass-heavy p-6 rounded-2xl border-forensic-blue/30 w-56"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-status-fake animate-pulse"></div>
                  <span className="text-[10px] font-black tracking-widest uppercase">Artifact Found</span>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-text-primary/5 rounded-full overflow-hidden">
                    <div className="h-full w-[94%] bg-status-fake"></div>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted">94.2% SYNTHETIC MATCH</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* How It Works & Key Features Section */}
        <section className="mt-24 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-center mb-10 tracking-tight"
          >
            How It Works & Key Features
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* How Deepfake Detection Works */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl"
            >
              <h3 className="text-2xl font-black mb-6 text-text-primary">How Deepfake Detection Works</h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.05, translateY: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-bg-section p-6 rounded-2xl border border-text-primary/5 text-center group cursor-default"
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary-blue/10 flex items-center justify-center group-hover:bg-primary-blue/20 transition-colors"
                  >
                    <Activity className="w-6 h-6 text-primary-blue" />
                  </motion.div>
                  <div className="text-3xl font-black text-primary-blue mb-1">
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      95
                    </motion.span>%
                  </div>
                  <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Accuracy</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, translateY: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-bg-section p-6 rounded-2xl border border-text-primary/5 text-center group cursor-default"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent-cyan/10 flex items-center justify-center group-hover:bg-accent-cyan/20 transition-colors"
                  >
                    <CheckCircle className="w-6 h-6 text-accent-cyan" />
                  </motion.div>
                  <div className="text-3xl font-black text-accent-cyan mb-1">AI</div>
                  <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Detection</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, translateY: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-bg-section p-6 rounded-2xl border border-text-primary/5 text-center group cursor-default"
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-12 h-12 mx-auto mb-3 rounded-full bg-secondary-blue/10 flex items-center justify-center group-hover:bg-secondary-blue/20 transition-colors"
                  >
                    <Layers className="w-6 h-6 text-secondary-blue" />
                  </motion.div>
                  <div className="text-3xl font-black text-secondary-blue mb-1">All</div>
                  <div className="text-xs font-bold text-text-muted uppercase tracking-wider">AI Models</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, translateY: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-bg-section p-6 rounded-2xl border border-text-primary/5 text-center group cursor-default"
                >
                  <motion.div
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-12 h-12 mx-auto mb-3 rounded-full bg-status-real/10 flex items-center justify-center group-hover:bg-status-real/20 transition-colors"
                  >
                    <Shield className="w-6 h-6 text-status-real" />
                  </motion.div>
                  <div className="text-3xl font-black text-status-real mb-1">Real</div>
                  <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Human Detection</div>
                </motion.div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">
                Our advanced AI analyzes and video files to detect subtle patterns and anomalies that indicate deepfake manipulation. We examine multiple layers of the media to provide accurate results.
              </p>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl"
            >
              <h3 className="text-2xl font-black mb-6 text-text-primary">Key Features</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Brain,
                    title: "Multi-Modal Detection",
                    desc: "Detect deepfakes across video, image, and audio formats with AI-powered analysis.",
                    delay: 0.1,
                    color: "primary-blue"
                  },
                  {
                    icon: User,
                    title: "Face-Swap Identification",
                    desc: "Identify facial identity replacement using advanced face consistency checks.",
                    delay: 0.15,
                    color: "accent-cyan"
                  },
                  {
                    icon: Clock,
                    title: "Temporal Frame Analysis",
                    desc: "Analyze frame-to-frame motion to detect unnatural transitions and anomalies.",
                    delay: 0.2,
                    color: "secondary-blue"
                  },
                  {
                    icon: Volume2,
                    title: "Audio-Visual Sync Check",
                    desc: "Detect lip-sync mismatches and audio inconsistencies in manipulated media.",
                    delay: 0.25,
                    color: "status-info"
                  },
                  {
                    icon: BarChart3,
                    title: "Detailed Confidence Scores",
                    desc: "Get probability breakdowns and confidence levels for reliable decisions.",
                    delay: 0.3,
                    color: "primary-blue"
                  },
                  {
                    icon: Microscope,
                    title: "Forensic-Level Analysis",
                    desc: "Reveal hidden artefacts using frequency and biometric analysis.",
                    delay: 0.35,
                    color: "accent-cyan"
                  },
                  {
                    icon: FileCheck,
                    title: "Automated Forensic Reports",
                    desc: "Generate clear, structured reports explaining detected abnormalities.",
                    delay: 0.4,
                    color: "secondary-blue"
                  },
                  {
                    icon: Lock,
                    title: "Secure & Private Processing",
                    desc: "Uploads are encrypted, processed securely, and never reused for training.",
                    delay: 0.45,
                    color: "status-info"
                  }
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: feature.delay }}
                    className="flex items-start space-x-4 group p-3 rounded-2xl hover:bg-white/5 transition-colors"
                  >
                    <motion.div
                      animate={{
                        rotate: idx % 2 === 0 ? [0, 5, 0] : [0, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                      className={`w-10 h-10 rounded-xl bg-${feature.color}/10 flex items-center justify-center shrink-0 group-hover:bg-${feature.color}/20 transition-colors`}
                    >
                      <feature.icon className={`w-5 h-5 text-${feature.color}`} />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-text-primary text-sm mb-1">{feature.title}</h4>
                      <p className="text-[11px] text-text-secondary leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Forensic Capabilities */}
        <h2 className="text-4xl md:text-5xl font-black text-center mb-12 tracking-tight">Forensic Capabilities</h2>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              icon: Search,
              title: "Face Swapping",
              desc: "Detect identity replacement using facial landmark inconsistencies."
            },
            {
              icon: Zap,
              title: "Lip-Syncing",
              desc: "Analyze audio-visual alignment and phoneme generation artifacts."
            },
            {
              icon: Activity,
              title: "Generative AI",
              desc: "Identify diffusion-based textures and latent space inconsistencies."
            },
            {
              icon: FileText,
              title: "PDF Audits",
              desc: "Generate court-ready forensic reports for digital evidence."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass p-8 rounded-2xl hover:border-primary-blue/40 transition-all cursor-default group"
            >
              <motion.div
                animate={{
                  rotate: i % 2 === 0 ? [0, 5, 0] : [0, -5, 0],
                  scale: i % 3 === 0 ? [1, 1.05, 1] : [1, 1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <item.icon className="w-8 h-8 text-primary-blue mb-6 group-hover:text-accent-cyan transition-colors" />
              </motion.div>
              <h3 className="text-lg font-bold mb-3">{item.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 border-t border-text-primary/5 px-8 py-12 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-text-muted text-[10px] font-bold tracking-widest uppercase">
          <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0">
            <span className="text-text-secondary">Detective AI Forensics v4.2.0</span>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-3 h-3 text-status-real" />
              <span>System Operational</span>
            </div>
          </div>
          <div className="flex items-center space-x-8 mt-6 md:mt-0">
            {/* Email Contact moved to footer */}
            <div className="flex items-center space-x-2 text-text-muted hover:text-primary-blue transition-colors">
              <Mail className="w-4 h-4" />
              <a href="mailto:aidetector1105@gmail.com" className="font-mono font-bold lowercase tracking-wider">
                aidetector1105@gmail.com
              </a>
            </div>
            <a href="#" className="hover:text-text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-text-primary transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
