
import React, { useState, useCallback, useRef } from 'react';
import { simulateDownload } from '../lib/PDFUtils';

type ToolMode = 'merge' | 'split';

interface MergeFile extends File {
  id: number;
}

const PDFToolUI: React.FC = () => {
  const [mode, setMode] = useState<ToolMode>('merge');
  const [mergeFiles, setMergeFiles] = useState<MergeFile[]>([]);
  const [splitFile, setSplitFile] = useState<File | null>(null);
  const [splitRange, setSplitRange] = useState('');
  const [splitPerPage, setSplitPerPage] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const showFeedback = (message: string, type: 'success' | 'error') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleMergeFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
        .filter((file: File) => file.type === 'application/pdf')
        .map((file, index) => Object.assign(file, { id: Date.now() + index }));

      if (newFiles.length !== e.target.files.length) {
        showFeedback('Only PDF files are accepted.', 'error');
      }
      setMergeFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleSplitFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].type === 'application/pdf') {
        setSplitFile(e.target.files[0]);
      } else {
        showFeedback('Only PDF files are accepted.', 'error');
        setSplitFile(null);
      }
    }
  };

  const removeMergeFile = (id: number) => {
    setMergeFiles(prev => prev.filter(file => file.id !== id));
  };
  
  const handleDragSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    let _mergeFiles = [...mergeFiles];
    const draggedItemContent = _mergeFiles.splice(dragItem.current, 1)[0];
    _mergeFiles.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setMergeFiles(_mergeFiles);
  };
  
  const handleMerge = () => {
    if (mergeFiles.length < 2) {
      showFeedback('Please select at least two PDF files to merge.', 'error');
      return;
    }
    showFeedback('Merging PDFs...', 'success');
    simulateDownload('merged_document.pdf', 'Simulated merged PDF content.');
  };
  
  const handleSplit = () => {
    if (!splitFile) {
      showFeedback('Please select a PDF file to split.', 'error');
      return;
    }
    if (!splitRange && !splitPerPage) {
      showFeedback('Please provide a page range or select the "split per page" option.', 'error');
      return;
    }
    showFeedback('Splitting PDF...', 'success');
    simulateDownload('split_files.zip', 'Simulated ZIP of split PDF pages.');
  };

  const TabButton: React.FC<{ active: boolean, onClick: () => void, children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 text-lg font-semibold rounded-t-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
        active
          ? 'bg-indigo-600 text-white focus:ring-indigo-400'
          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70 focus:ring-gray-500'
      }`}
    >
      {children}
    </button>
  );

  return (
    <section id="pdf-tool" className="bg-gray-900/50 backdrop-blur-md rounded-xl shadow-lg shadow-black/30 overflow-hidden border border-gray-700/50">
      <div className="flex border-b border-gray-700/50">
        <TabButton active={mode === 'merge'} onClick={() => setMode('merge')}>Merge PDF</TabButton>
        <TabButton active={mode === 'split'} onClick={() => setMode('split')}>Split PDF</TabButton>
      </div>

      <div className="p-6 md:p-8 min-h-[400px]">
        {mode === 'merge' ? (
          <div>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center mb-6 cursor-pointer hover:border-indigo-500 hover:bg-gray-800/50 transition-colors" onClick={() => fileInputRef.current?.click()}>
              <input type="file" multiple accept="application/pdf" className="hidden" ref={fileInputRef} onChange={handleMergeFileSelect} />
              <p className="text-gray-300">Drag & drop PDF files here, or click to select.</p>
              <p className="text-sm text-gray-500 mt-1">Combine multiple PDFs into one.</p>
            </div>
            {mergeFiles.length > 0 && (
              <ul className="space-y-2 mb-6">
                {mergeFiles.map((file, index) => (
                  <li 
                    key={file.id}
                    className="flex items-center justify-between bg-gray-800 p-3 rounded-md shadow cursor-move transition-all hover:bg-gray-700/80"
                    draggable
                    onDragStart={() => dragItem.current = index}
                    onDragEnter={() => dragOverItem.current = index}
                    onDragEnd={handleDragSort}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <span className="text-white truncate pr-4">{file.name}</span>
                    <button onClick={() => removeMergeFile(file.id)} className="ml-4 text-red-500 hover:text-red-400 transition-colors transform hover:scale-110">&times;</button>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={handleMerge} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 text-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500">
              Merge and Download PDF
            </button>
          </div>
        ) : (
          <div>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center mb-6 cursor-pointer hover:border-teal-500 hover:bg-gray-800/50 transition-colors" onClick={() => fileInputRef.current?.click()}>
              <input type="file" accept="application/pdf" className="hidden" ref={fileInputRef} onChange={handleSplitFileSelect} />
              {splitFile ? (
                <p className="text-teal-400 font-semibold">{splitFile.name}</p>
              ) : (
                <>
                  <p className="text-gray-300">Drag & drop a single PDF here, or click to select.</p>
                  <p className="text-sm text-gray-500 mt-1">Extract pages or page ranges.</p>
                </>
              )}
            </div>
            <div className="space-y-4 mb-6">
              <input 
                type="text"
                placeholder="e.g., 1-5, 8, 11-13"
                value={splitRange}
                onChange={(e) => setSplitRange(e.target.value)}
                disabled={splitPerPage}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
              />
              <label className="flex items-center space-x-3 text-gray-300 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={splitPerPage}
                  onChange={(e) => setSplitPerPage(e.target.checked)}
                  className="form-checkbox h-5 w-5 bg-gray-800 border-gray-600 rounded text-teal-500 focus:ring-teal-500 cursor-pointer"
                />
                <span>Extract all pages into separate PDFs</span>
              </label>
            </div>
            <button onClick={handleSplit} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 text-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500">
              Split and Download Files
            </button>
          </div>
        )}
      </div>
      {feedback && (
        <div className={`p-4 text-center text-white ${feedback.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {feedback.message}
        </div>
      )}
    </section>
  );
};

export default PDFToolUI;
