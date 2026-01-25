
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import VideoUploader from '../components/VideoUploader';
import { ScanResult } from '../types';
import { ExternalLink, Search, Filter, MoreHorizontal, Video, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'video' | 'image'>('video');
  const [recentScans, setRecentScans] = useState<ScanResult[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch scans on mount
  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    try {
      const response = await fetch('/api/scans');
      if (response.ok) {
        const data = await response.json();
        // Map backend data to frontend type if necessary, or ensure backend sends compatible shape
        // Backend key mapping:
        // scan_id -> id
        // file_name -> fileName
        // created_at -> date (convert timestamp)
        // verdict -> result
        // confidence_score -> probability

        const mappedData: ScanResult[] = data.map((item: any) => ({
          id: item.scan_id,
          fileName: item.file_name || 'Unknown File',
          date: new Date(item.created_at * 1000).toLocaleString(),
          status: 'Completed', // Assuming fetched scans are completed, or add status field in backend if needed
          result: item.verdict,
          probability: item.confidence_score
        }));

        setRecentScans(mappedData.slice(0, 5)); // Limit to 5
      }
    } catch (error) {
      console.error("Error fetching scans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Upload failed' }));
        throw new Error(errorData.detail || 'Upload failed');
      }

      const data = await response.json();
      navigate(`/analysis/${data.scan_id}`);
    } catch (error) {
      console.error("Error uploading file:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to upload video. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Navbar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2 text-text-primary">Forensic Scan</h1>
            <p className="text-text-secondary">Upload media for forensic verification or review past audits.</p>
          </div>

          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'video'
                ? 'bg-primary-blue text-white shadow-lg shadow-primary-blue/20'
                : 'bg-bg-section text-text-secondary hover:bg-text-primary/5'
                }`}
            >
              <Video className="w-5 h-5" />
              <span>Video Detector</span>
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'image'
                ? 'bg-primary-blue text-white shadow-lg shadow-primary-blue/20'
                : 'bg-bg-section text-text-secondary hover:bg-text-primary/5'
                }`}
            >
              <ImageIcon className="w-5 h-5" />
              <span>Image Detector</span>
            </button>
          </div>

          {/* Upload Area */}
          <div className="mb-16">
            <VideoUploader onUpload={handleFileUpload} type={activeTab} />
          </div>

          {/* History Table */}
          <div className="glass rounded-2xl overflow-hidden border border-text-primary/5">
            <div className="p-6 border-b border-text-primary/5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Recent Scans</h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/history')}
                  className="text-primary-blue hover:text-blue-400 text-sm font-bold flex items-center"
                >
                  View All History <ExternalLink className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-text-primary/[0.02] text-xs font-bold uppercase tracking-wider text-text-muted border-b border-text-primary/5">
                    <th className="px-6 py-4">File Name / ID</th>
                    <th className="px-6 py-4">Analysis Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Forensic Result</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-text-primary/5">
                  {recentScans.length === 0 && !loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-text-muted">
                        No scans found. Upload a video to start.
                      </td>
                    </tr>
                  ) : (
                    recentScans.map((scan, i) => (
                      <motion.tr
                        key={scan.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-text-primary/[0.02] transition-colors group cursor-pointer"
                        onClick={() => navigate(`/analysis/${scan.id}`)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-sm text-text-primary group-hover:text-primary-blue transition-colors">{scan.fileName}</span>
                            <span className="text-[10px] text-text-muted font-mono">{scan.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary font-mono">{scan.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${scan.status === 'Completed' ? 'bg-status-real/10 text-status-real border border-status-real/20' :
                            scan.status === 'Processing' ? 'bg-status-info/10 text-status-info border border-status-info/20 animate-pulse' :
                              'bg-status-fake/10 text-status-fake border border-status-fake/20'
                            }`}>
                            {scan.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {scan.status === 'Completed' ? (
                            <div className="flex items-center space-x-2">
                              <span className={`text-sm font-bold ${scan.result === 'Fake' ? 'text-status-fake' : 'text-status-real'}`}>
                                {scan.result}
                              </span>
                              <span className="text-[10px] text-text-muted font-mono">({scan.probability}%)</span>
                            </div>
                          ) : (
                            <span className="text-text-muted text-sm">--</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-text-muted hover:text-text-primary transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
