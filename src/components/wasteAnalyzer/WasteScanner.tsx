import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Camera,
  CheckCircle2,
  ScanLine,
  RefreshCw,
  Sparkles,
  Info,
  Clock,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import { WasteAnalysisResult } from '../../types/campus';
import { DEMO_SAMPLE_ITEMS } from '../../data/mockCampusData';
import { useCampus } from '../../context/CampusContext';

export const WasteScanner: React.FC = () => {
  const { wasteHistory, addWasteScan } = useCampus();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [currentResult, setCurrentResult] = useState<WasteAnalysisResult | null>(null);
  const [activeSampleName, setActiveSampleName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle uploaded image
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setCurrentResult(null);
        setActiveSampleName(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Select sample item for quick hackathon judge test
  const handleSelectSample = (sample: typeof DEMO_SAMPLE_ITEMS[0]) => {
    setActiveSampleName(sample.name);
    setCurrentResult(null);
    // Create an illustrative SVG preview card for this sample
    const svgUrl = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%230F172A"/><circle cx="200" cy="150" r="80" fill="${encodeURIComponent(sample.sampleSvgColor)}" opacity="0.3"/><text x="50%" y="45%" text-anchor="middle" fill="%23FFFFFF" font-size="20" font-family="sans-serif" font-weight="bold">${encodeURIComponent(sample.name)}</text><text x="50%" y="60%" text-anchor="middle" fill="%2338BDF8" font-size="14" font-family="monospace">Simulated CV Camera Feed</text></svg>`;
    setSelectedImage(svgUrl);
  };

  // Run waste classification simulation
  const handleAnalyze = () => {
    if (!selectedImage) return;

    setIsScanning(true);

    setTimeout(() => {
      // Find matching sample or classify intelligently based on selected sample
      let item = DEMO_SAMPLE_ITEMS.find(s => s.name === activeSampleName);
      if (!item) {
        // If user uploaded custom image, select an appropriate category or plastic
        item = DEMO_SAMPLE_ITEMS[0];
      }

      const scanResult: WasteAnalysisResult = {
        id: `scan-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: item.category,
        confidence: item.confidence,
        materialDetected: item.materialDetected,
        binColor: item.binColor,
        binName: item.binName,
        disposalRecommendation: item.disposalRecommendation,
        recyclingInstructions: item.recyclingInstructions,
        carbonOffsetKg: item.carbonOffsetKg,
        imageUrl: selectedImage,
      };

      setCurrentResult(scanResult);
      addWasteScan(scanResult);
      setIsScanning(false);
    }, 1400);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="glass-panel rounded-2xl p-6 border border-eco-cyan/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <ScanLine className="w-5 h-5 text-eco-cyan" />
              <h2 className="text-xl font-bold text-white">
                Computer Vision Waste Stream Classifier
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-eco-cyan/15 text-eco-cyan font-bold border border-eco-cyan/30">
                Demo Classifier Mode
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Demonstrates automatic optical detection of campus cafeteria and classroom trash to enforce proper bin segregation and minimize landfill contamination.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-eco-green" />
            <span>YOLOv8 Edge Simulation Ready</span>
          </div>
        </div>

        {/* Quick Sample Selector for Judges */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs font-semibold text-slate-300 mb-2 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-eco-cyan" />
            <span>1-Click Test Samples for Hackathon Judges:</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {DEMO_SAMPLE_ITEMS.map(sample => (
              <button
                key={sample.name}
                onClick={() => handleSelectSample(sample)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeSampleName === sample.name
                    ? 'bg-eco-cyan text-campus-darkest font-bold shadow-glow-cyan'
                    : 'bg-campus-darkest/70 hover:bg-campus-surface border border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                {sample.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Analyzer Grid: Upload / Preview + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Upload / Camera Viewport (6 cols) */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                <Camera className="w-4 h-4 text-eco-green" />
                <span>Optical Input Viewport</span>
              </span>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-eco-cyan hover:underline flex items-center space-x-1"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload Custom Image</span>
              </button>
            </div>

            {/* Viewport Frame */}
            <div
              onClick={() => {
                if (!selectedImage) fileInputRef.current?.click();
              }}
              className={`mt-4 relative aspect-[4/3] rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all ${
                selectedImage
                  ? 'border-eco-cyan/50 bg-black/40'
                  : 'border-slate-700 bg-campus-darkest/50 hover:border-slate-500 cursor-pointer'
              }`}
            >
              {selectedImage ? (
                <>
                  <img
                    src={selectedImage}
                    alt="Uploaded item"
                    className="w-full h-full object-contain"
                  />

                  {/* Scanning HUD overlay */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-eco-cyan/10 backdrop-blur-[1px] flex flex-col items-center justify-center">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-eco-cyan to-transparent animate-pulse absolute top-1/2 -translate-y-1/2 shadow-glow-cyan" />
                      <div className="glass-panel px-4 py-2 rounded-xl border border-eco-cyan/40 flex items-center space-x-2 text-xs font-bold text-eco-cyan">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Extracting Optical Features & Material Density...</span>
                      </div>
                    </div>
                  )}

                  {/* Target Bounding Box Effect */}
                  {!isScanning && (
                    <div className="absolute inset-8 border border-eco-cyan/40 pointer-events-none rounded-lg">
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-eco-cyan" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-eco-cyan" />
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-eco-cyan" />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-eco-cyan" />
                      <span className="absolute top-1 left-1 bg-campus-darkest/80 text-[10px] text-eco-cyan font-mono px-1 rounded">
                        CV_ROI: Active
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center p-6 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-campus-card mx-auto flex items-center justify-center text-slate-400">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-slate-200">
                    Drop waste photo here or select test sample
                  </p>
                  <p className="text-xs text-slate-500">
                    Supports PNG, JPG, or simulated video stream
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-mono">
              Model: <span className="text-eco-cyan">DSU-WasteNet-v1.4 (Demo)</span>
            </span>

            <button
              onClick={handleAnalyze}
              disabled={!selectedImage || isScanning}
              className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                !selectedImage || isScanning
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-eco-cyan hover:bg-eco-cyanDark text-campus-darkest shadow-glow-cyan'
              }`}
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Material...</span>
                </>
              ) : (
                <>
                  <ScanLine className="w-4 h-4" />
                  <span>Analyze Waste Image</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Prediction & Disposal Guide (6 cols) */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-eco-green" />
              <span>Classification & Recycling Directives</span>
            </span>
            {currentResult && (
              <span className="text-[10px] font-mono text-slate-400">
                Logged at {currentResult.timestamp}
              </span>
            )}
          </div>

          {currentResult ? (
            <div className="mt-4 space-y-4">
              
              {/* Category Badge + Confidence Score */}
              <div className="p-4 rounded-xl bg-campus-darkest/70 border border-eco-cyan/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Predicted Waste Stream
                  </span>
                  <div className="flex items-center space-x-2 mt-1">
                    <h3 className="text-xl font-extrabold text-white">
                      {currentResult.category}
                    </h3>
                    <span className="text-xs text-eco-cyan font-mono">
                      ({currentResult.materialDetected})
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Confidence
                  </span>
                  <span className="text-xl font-bold font-mono text-eco-green">
                    {(currentResult.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Designated Bin Directive */}
              <div className="p-4 rounded-xl bg-campus-darkest/50 border border-white/5 space-y-2">
                <span className="text-xs font-bold text-slate-300 block">
                  Campus Bin Assignment
                </span>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-campus-card border border-white/10">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-campus-darkest text-xs ${
                      currentResult.binColor === 'Green'
                        ? 'bg-eco-green'
                        : currentResult.binColor === 'Blue'
                        ? 'bg-sky-400'
                        : currentResult.binColor === 'Yellow'
                        ? 'bg-amber-400'
                        : 'bg-eco-red'
                    }`}
                  >
                    ●
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      {currentResult.binName}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {currentResult.disposalRecommendation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recycling Step-by-Step Instructions */}
              <div className="p-4 rounded-xl bg-campus-darkest/50 border border-white/5 space-y-2">
                <span className="text-xs font-bold text-slate-300 block">
                  Step-by-Step Handling Directives
                </span>
                <ul className="space-y-1.5">
                  {currentResult.recyclingInstructions.map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-eco-cyan/20 text-eco-cyan text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Environmental Carbon Impact avoided */}
              <div className="p-3 rounded-xl bg-eco-green/10 border border-eco-green/30 flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">
                  Landfill Avoidance Carbon Credit:
                </span>
                <span className="font-mono font-bold text-eco-green">
                  +{currentResult.carbonOffsetKg} kg CO2e avoided
                </span>
              </div>

            </div>
          ) : (
            <div className="py-16 text-center space-y-3 text-slate-400">
              <ScanLine className="w-10 h-10 mx-auto text-slate-600" />
              <p className="text-sm font-semibold text-slate-300">
                Awaiting Waste Image Input
              </p>
              <p className="text-xs max-w-sm mx-auto">
                Select one of the sample test items above or upload a photo, then click <strong>Analyze Waste Image</strong>.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Analysis History Log */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-eco-cyan" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Recent CV Scans Log (Session History)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {wasteHistory.length} items logged
          </span>
        </div>

        {wasteHistory.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">
            No scans performed in this session yet. Run an analysis above to populate audit logs.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {wasteHistory.slice(0, 6).map(item => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-campus-darkest/60 border border-white/5 flex items-center space-x-3 text-xs"
              >
                <div className="w-12 h-12 rounded-lg bg-campus-card overflow-hidden flex-shrink-0 border border-white/10">
                  <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white truncate">{item.category}</span>
                    <span className="text-[10px] text-eco-green font-mono">
                      {(item.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{item.materialDetected}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Transparent Disclaimer */}
      <div className="p-3.5 rounded-xl bg-campus-card/50 border border-white/5 flex items-start space-x-2 text-[11px] text-slate-400">
        <Info className="w-4 h-4 text-eco-cyan flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-300">Model Disclosure:</strong> Classification demonstrated using simulated neural weights and category sample mapping. For physical deployment, this connects to an edge camera RTSP stream using TensorRT / ONNX models trained on campus solid waste datasets.
        </p>
      </div>
    </div>
  );
};
