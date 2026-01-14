
import React, { useState, useRef } from 'react';
import { Upload, FileVideo, CheckCircle2, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoUploaderProps {
  onUpload: (file: File) => void;
  type?: 'video' | 'image';
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onUpload, type = 'video' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (type === 'video' && droppedFile.type.startsWith('video/')) {
        setFile(droppedFile);
      } else if (type === 'image' && droppedFile.type.startsWith('image/')) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleStartAnalysis = () => {
    if (file) onUpload(file);
  };

  const acceptTypes = type === 'video' ? 'video/mp4,video/avi,video/quicktime' : 'image/jpeg,image/png,image/webp';
  const icon = type === 'video' ? <FileVideo className="w-8 h-8 text-status-real" /> : <ImageIcon className="w-8 h-8 text-status-real" />;
  const label = type === 'video' ? 'Video' : 'Image';

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 p-12 flex flex-col items-center justify-center cursor-pointer ${isDragging
          ? 'border-primary-blue bg-primary-blue/10 scale-[1.01]'
          : 'border-text-primary/20 bg-bg-section hover:border-text-primary/30'
          }`}
        onClick={() => !file && fileInputRef.current?.click()}
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept={acceptTypes}
        />

        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-text-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-primary-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-text-primary">Drag & Drop Forensic {label}</h3>
              <p className="text-text-secondary mb-6">
                Supported formats: {type === 'video' ? '.mp4, .avi, .mov' : '.jpg, .png, .webp'} (Max 500MB)
              </p>
              <button className="px-6 py-2.5 bg-primary-blue hover:bg-secondary-blue rounded-lg font-semibold transition-colors text-white">
                Browse Files
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-status-real/20 rounded-xl flex items-center justify-center mb-4">
                {icon}
              </div>
              <div className="text-center mb-8">
                <h3 className="text-lg font-bold truncate max-w-md text-text-primary">{file.name}</h3>
                <p className="text-sm text-text-muted">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="px-6 py-2 border border-text-primary/20 hover:bg-text-primary/5 rounded-lg transition-colors flex items-center space-x-2 text-text-primary"
                >
                  <X className="w-4 h-4" />
                  <span>Remove</span>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleStartAnalysis(); }}
                  className="px-8 py-2 bg-primary-blue hover:bg-secondary-blue rounded-lg font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] flex items-center space-x-2 text-white"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Start Forensic Scan</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VideoUploader;
