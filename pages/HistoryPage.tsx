
import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Calendar, FileText } from 'lucide-react';
import { ScanResult } from '../types';

const mockHistory: ScanResult[] = [
  { id: 'SCN-892', fileName: 'investigation_clip_01.mp4', date: '2024-05-20', status: 'Completed', result: 'Fake', probability: 94 },
  { id: 'SCN-893', fileName: 'news_anchor_interview.avi', date: '2024-05-19', status: 'Completed', result: 'Real', probability: 3 },
  { id: 'SCN-894', fileName: 'ceo_announcement_final.mp4', date: '2024-05-18', status: 'Completed', result: 'Fake', probability: 88 },
  { id: 'SCN-895', fileName: 'testimony_raw.mov', date: '2024-05-18', status: 'Completed', result: 'Real', probability: 12 },
];

const HistoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy flex flex-col">
      <Navbar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div>
              <h1 className="text-3xl font-black italic tracking-tight mb-2">Forensic History</h1>
              <p className="text-slate-400">Archive of all processed media and authenticity audits.</p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Filter cases..."
                className="bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm w-full md:w-64 focus:outline-none focus:border-forensic-blue transition-all"
              />
            </div>
          </motion.div>

          <div className="space-y-4">
            {mockHistory.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-5 rounded-2xl flex items-center justify-between hover:border-white/10 transition-all group"
              >
                <div className="flex items-center space-x-5">
                  <div className={`p-3 rounded-xl ${item.result === 'Fake' ? 'bg-warning-red/10' : 'bg-green-500/10'}`}>
                    <FileText className={`w-6 h-6 ${item.result === 'Fake' ? 'text-warning-red' : 'text-green-500'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-forensic-blue transition-colors">{item.fileName}</h3>
                    <div className="flex items-center space-x-4 text-xs font-mono text-slate-500 mt-1">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                      </span>
                      <span>ID: {item.id}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="text-right">
                    <p className={`text-sm font-black uppercase tracking-widest ${item.result === 'Fake' ? 'text-warning-red' : 'text-green-500'}`}>
                      {item.result} ({item.probability}%)
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Certainty Score</p>
                  </div>
                  <button className="p-2 glass rounded-lg hover:bg-slate-800 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;
