import React, { useState, useRef } from 'react';
import {
  Camera,
  Video,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  X,
  Trash2,
  Sparkles,
  Search,
  Filter,
  Copy,
  Check,
  Eye,
  Smartphone,
  Monitor,
  HardDrive,
  FolderPlus,
  Play,
  Layers,
  ArrowRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { MediaAsset, MediaDestination } from '../types';
import { optimizeImageFile, formatFileSize, OptimizedMediaResult } from '../utils/imageOptimizer';

interface MediaLibraryManagerProps {
  onNotify?: (message: string) => void;
  initialUploadOpen?: boolean;
}

interface QueuedUploadItem {
  id: string;
  file: File;
  previewUrl: string;
  mediaType: 'image' | 'video';
  title: string;
  caption: string;
  category: 'Humanitarian' | 'Education' | 'Health' | 'Events' | 'Leadership' | 'Youth' | 'Installation' | 'General';
  destinations: MediaDestination[];
  originalSizeFormatted: string;
  compressedSizeFormatted: string;
  compressionRatio: string;
  dimensions?: { width: number; height: number };
  isOptimizing: boolean;
  optimizedDataUrl?: string;
  error?: string;
}

const DESTINATION_OPTIONS: { id: MediaDestination; label: string; icon: string }[] = [
  { id: 'homepage', label: 'Homepage / Hero', icon: '🏠' },
  { id: 'news', label: 'News / Bulletins', icon: '📰' },
  { id: 'events', label: 'Events & Calendar', icon: '📅' },
  { id: 'projects', label: 'Humanitarian Projects', icon: '🛠️' },
  { id: 'youth', label: 'Children & Youth Hub', icon: '👶' },
  { id: 'stories', label: 'Stories of Impact', icon: '📖' },
  { id: 'gallery', label: 'Photo & Video Gallery', icon: '🖼️' },
  { id: 'leadership', label: 'District Leadership', icon: '👔' },
  { id: 'announcements', label: 'Announcements', icon: '📢' },
];

const CATEGORIES: ('Humanitarian' | 'Education' | 'Health' | 'Events' | 'Leadership' | 'Youth' | 'Installation' | 'General')[] = [
  'Education',
  'Health',
  'Humanitarian',
  'Youth',
  'Events',
  'Leadership',
  'Installation',
  'General',
];

export const MediaLibraryManager: React.FC<MediaLibraryManagerProps> = ({
  onNotify,
  initialUploadOpen = false,
}) => {
  const {
    mediaAssets,
    addMediaAsset,
    updateMediaAsset,
    deleteMediaAsset,
    publishMediaToDestination,
    projects,
    events,
    announcements,
    youthInitiatives,
    impactStories,
    leadership,
  } = useData();

  const [isUploadPanelOpen, setIsUploadPanelOpen] = useState(initialUploadOpen);
  const [queue, setQueue] = useState<QueuedUploadItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);

  // Media Library filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Preview Modal
  const [previewMedia, setPreviewMedia] = useState<MediaAsset | null>(null);

  // Quick Action Placement Modal
  const [placementTarget, setPlacementTarget] = useState<{
    media: MediaAsset;
    destination: MediaDestination;
  } | null>(null);
  const [selectedEntityId, setSelectedEntityId] = useState<string>('');

  // Copied state indicator
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const notify = (msg: string) => {
    if (onNotify) {
      onNotify(msg);
    }
  };

  // Process incoming files through the Optimizer
  const processFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setIsUploadPanelOpen(true);
    const fileArray = Array.from(files);

    const newQueuedItems: QueuedUploadItem[] = fileArray.map((file, idx) => {
      const isVideo = file.type.startsWith('video/');
      const tempUrl = URL.createObjectURL(file);
      const cleanTitle = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

      return {
        id: `queued-${Date.now()}-${idx}`,
        file,
        previewUrl: tempUrl,
        mediaType: isVideo ? 'video' : 'image',
        title: cleanTitle,
        caption: '',
        category: 'Humanitarian',
        destinations: ['gallery', 'homepage'],
        originalSizeFormatted: formatFileSize(file.size),
        compressedSizeFormatted: 'Optimizing...',
        compressionRatio: '',
        isOptimizing: true,
      };
    });

    setQueue((prev) => [...newQueuedItems, ...prev]);

    // Process optimization in parallel
    for (const item of newQueuedItems) {
      try {
        const result: OptimizedMediaResult = await optimizeImageFile(item.file, 1600, 1600, 0.85);
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? {
                  ...q,
                  optimizedDataUrl: result.dataUrl,
                  compressedSizeFormatted: result.formattedCompressedSize,
                  compressionRatio: result.compressionRatio,
                  dimensions: { width: result.width, height: result.height },
                  isOptimizing: false,
                }
              : q
          )
        );
      } catch (err: any) {
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? {
                  ...q,
                  isOptimizing: false,
                  error: err.message || 'Failed to optimize image',
                }
              : q
          )
        );
      }
    }
  };

  // Handle Drag and Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  // Toggle destination tag for a queued item
  const toggleQueueDestination = (itemId: string, destination: MediaDestination) => {
    setQueue((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const exists = item.destinations.includes(destination);
        const updated = exists
          ? item.destinations.filter((d) => d !== destination)
          : [...item.destinations, destination];
        return {
          ...item,
          destinations: updated.length > 0 ? updated : ['gallery'],
        };
      })
    );
  };

  // Publish all queued files
  const handlePublishAll = () => {
    if (queue.length === 0) return;
    setIsProcessingBatch(true);

    let count = 0;
    for (const item of queue) {
      const finalUrl = item.optimizedDataUrl || item.previewUrl;
      addMediaAsset({
        title: item.title || 'Rotary District 9141 Media Asset',
        caption: item.caption || item.title,
        mediaType: item.mediaType,
        url: finalUrl,
        thumbnailUrl: finalUrl,
        fileSize: item.compressedSizeFormatted || item.originalSizeFormatted,
        originalFileName: item.file.name,
        category: item.category,
        destinations: item.destinations,
        dimensions: item.dimensions,
        isOptimized: !!item.optimizedDataUrl,
      });
      count++;
    }

    setQueue([]);
    setIsProcessingBatch(false);
    setIsUploadPanelOpen(false);
    notify(`Successfully uploaded and published ${count} media asset${count > 1 ? 's' : ''}!`);
  };

  // Publish single item from queue
  const handlePublishSingle = (itemId: string) => {
    const item = queue.find((q) => q.id === itemId);
    if (!item) return;

    const finalUrl = item.optimizedDataUrl || item.previewUrl;
    addMediaAsset({
      title: item.title || 'Rotary District 9141 Media Asset',
      caption: item.caption || item.title,
      mediaType: item.mediaType,
      url: finalUrl,
      thumbnailUrl: finalUrl,
      fileSize: item.compressedSizeFormatted || item.originalSizeFormatted,
      originalFileName: item.file.name,
      category: item.category,
      destinations: item.destinations,
      dimensions: item.dimensions,
      isOptimized: !!item.optimizedDataUrl,
    });

    setQueue((prev) => prev.filter((q) => q.id !== itemId));
    notify(`Published "${item.title}" to Media Library & selected sections!`);
  };

  // Remove single item from queue
  const handleRemoveFromQueue = (itemId: string) => {
    setQueue((prev) => prev.filter((q) => q.id !== itemId));
  };

  // Handle Quick Placement execution
  const handleConfirmPlacement = () => {
    if (!placementTarget) return;

    const res = publishMediaToDestination(
      placementTarget.media.id,
      placementTarget.destination,
      selectedEntityId || undefined
    );

    notify(res.message);
    setPlacementTarget(null);
    setSelectedEntityId('');
  };

  // Copy link
  const handleCopyLink = (asset: MediaAsset) => {
    navigator.clipboard.writeText(asset.url);
    setCopiedId(asset.id);
    notify('Image Link copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter media library
  const filteredAssets = mediaAssets.filter((asset) => {
    const matchesSearch =
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (asset.caption && asset.caption.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (asset.originalFileName && asset.originalFileName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategoryFilter === 'all' || asset.category === selectedCategoryFilter;

    const matchesDestination =
      selectedDestinationFilter === 'all' ||
      asset.destinations.includes(selectedDestinationFilter as MediaDestination);

    return matchesSearch && matchesCategory && matchesDestination;
  });

  return (
    <div id="media-library-manager" className="space-y-6">
      {/* ========================================================================= */}
      {/* HERO UPLOAD CTA CARD - HIGHLY VISIBLE GOLD BANNER ON ADMIN DASHBOARD       */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#061329] via-[#0B1E3D] to-[#0A224A] border-2 border-amber-500/50 shadow-xl p-5 sm:p-7">
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                MEDIA UPLOADER
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                Auto-Compressed for Fast Loading
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold hidden sm:inline">
                Mobile Gallery & Computer Drag-and-Drop
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Upload Photos & Videos to District 9141 Website
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Upload high-resolution event photos, project documentation, governor bulletins, and videos directly from your phone or computer. Images are automatically optimized and ready to publish in one click to Homepage, Projects, Events, or Gallery.
            </p>
          </div>

          {/* LARGE PROMINENT GOLD UPLOAD BUTTON */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              id="btn-upload-photos-videos"
              onClick={() => {
                setIsUploadPanelOpen(true);
                fileInputRef.current?.click();
              }}
              className="px-6 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-base sm:text-lg shadow-lg hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 border border-amber-300"
            >
              <Camera className="w-6 h-6 animate-pulse" />
              <span>📸 UPLOAD PHOTOS & VIDEOS</span>
            </button>

            <button
              onClick={() => setIsUploadPanelOpen(!isUploadPanelOpen)}
              className="px-4 py-4 rounded-xl bg-[#061329] hover:bg-[#162C52] text-amber-400 border border-amber-500/30 text-sm font-bold transition-all flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>{isUploadPanelOpen ? 'Hide Uploader' : 'Open Drag & Drop Dropzone'}</span>
            </button>
          </div>
        </div>

        {/* Quick Shortcut Buttons for Phone & Desktop */}
        <div className="mt-5 pt-4 border-t border-slate-700/50 flex flex-wrap items-center gap-2 text-xs text-slate-300">
          <span className="font-bold text-amber-400">Direct Upload Options:</span>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg bg-[#061329]/80 hover:bg-[#162C52] text-white border border-[#162C52] flex items-center gap-1.5 transition-colors"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Phone Gallery / File Selector</span>
          </button>

          <button
            onClick={() => cameraInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg bg-[#061329]/80 hover:bg-[#162C52] text-white border border-[#162C52] flex items-center gap-1.5 transition-colors"
          >
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>Take Live Photo (Camera)</span>
          </button>

          <button
            onClick={() => videoInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg bg-[#061329]/80 hover:bg-[#162C52] text-white border border-[#162C52] flex items-center gap-1.5 transition-colors"
          >
            <Video className="w-3.5 h-3.5 text-blue-400" />
            <span>Upload Video File (.mp4, .webm)</span>
          </button>
        </div>
      </div>

      {/* Hidden File Inputs for Direct Access */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(e) => {
          if (e.target.files) processFiles(e.target.files);
          e.target.value = '';
        }}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          if (e.target.files) processFiles(e.target.files);
          e.target.value = '';
        }}
        className="hidden"
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        onChange={(e) => {
          if (e.target.files) processFiles(e.target.files);
          e.target.value = '';
        }}
        className="hidden"
      />

      {/* ========================================================================= */}
      {/* EXPANDABLE UPLOAD & DROPZONE WORKSPACE                                    */}
      {/* ========================================================================= */}
      {isUploadPanelOpen && (
        <div className="rounded-2xl bg-[#061329] border border-amber-500/30 p-5 sm:p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">Upload Media Files</h3>
              {queue.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black">
                  {queue.length} in queue
                </span>
              )}
            </div>
            <button
              onClick={() => setIsUploadPanelOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#162C52]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drag and Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all ${
              isDragging
                ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
                : 'border-slate-700 hover:border-amber-500/60 bg-[#0B1E3D]/50 hover:bg-[#0B1E3D]'
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-3 max-w-md mx-auto pointer-events-none">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-inner">
                <Upload className="w-8 h-8" />
              </div>
              <h4 className="text-base sm:text-lg font-black text-white">
                Drag & Drop Photos or Videos here
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Or click to browse from your device gallery. Supports multiple JPG, PNG, WEBP, and MP4 files.
              </p>
              <div className="flex items-center gap-3 pt-2 text-[11px] font-semibold text-amber-400/90">
                <span>⚡ Instant Client Compression</span>
                <span>•</span>
                <span>🛡️ High Quality Retained</span>
                <span>•</span>
                <span>📱 Mobile Optimized</span>
              </div>
            </div>
          </div>

          {/* Upload Queue List */}
          {queue.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Pending Uploads ({queue.length})</span>
                </h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQueue([])}
                    className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handlePublishAll}
                    disabled={isProcessingBatch || queue.some((q) => q.isOptimizing)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Publish All {queue.length} Files</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {queue.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl bg-[#0B1E3D] border border-slate-700/80 p-4 space-y-3 flex flex-col justify-between"
                  >
                    <div className="flex gap-3">
                      {/* Thumbnail Preview */}
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                        {item.mediaType === 'video' ? (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-amber-400">
                            <Video className="w-8 h-8" />
                            <span className="text-[9px] uppercase font-bold mt-1">Video</span>
                          </div>
                        ) : (
                          <img
                            src={item.optimizedDataUrl || item.previewUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {item.isOptimizing && (
                          <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center text-amber-400 text-xs font-bold">
                            Optimizing...
                          </div>
                        )}
                      </div>

                      {/* File Details & Form Fields */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                            setQueue((prev) =>
                              prev.map((q) => (q.id === item.id ? { ...q, title: e.target.value } : q))
                            )
                          }
                          placeholder="Media Title"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-[#061329] border border-slate-700 text-white text-xs font-bold focus:border-amber-400 outline-none"
                        />

                        <input
                          type="text"
                          value={item.caption}
                          onChange={(e) =>
                            setQueue((prev) =>
                              prev.map((q) => (q.id === item.id ? { ...q, caption: e.target.value } : q))
                            )
                          }
                          placeholder="Caption or description (optional)"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-[#061329] border border-slate-700 text-slate-300 text-xs focus:border-amber-400 outline-none"
                        />

                        {/* Category Selector */}
                        <div className="flex items-center gap-2">
                          <label className="text-[10px] text-slate-400 uppercase font-bold shrink-0">
                            Category:
                          </label>
                          <select
                            value={item.category}
                            onChange={(e: any) =>
                              setQueue((prev) =>
                                prev.map((q) => (q.id === item.id ? { ...q, category: e.target.value } : q))
                              )
                            }
                            className="w-full px-2 py-1 rounded bg-[#061329] border border-slate-700 text-white text-xs"
                          >
                            {CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Compression info badge */}
                    <div className="flex items-center justify-between text-[11px] px-2.5 py-1.5 rounded-lg bg-[#061329] border border-slate-800 text-slate-400">
                      <span>Original: {item.originalSizeFormatted}</span>
                      <span className="text-emerald-400 font-semibold">
                        Optimized: {item.compressedSizeFormatted} ({item.compressionRatio})
                      </span>
                    </div>

                    {/* Target Destinations Checkbox Badges */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-amber-400 uppercase font-black">
                        Publish To Website Destinations:
                      </label>
                      <div className="flex flex-wrap gap-1">
                        {DESTINATION_OPTIONS.map((dest) => {
                          const isChecked = item.destinations.includes(dest.id);
                          return (
                            <button
                              key={dest.id}
                              type="button"
                              onClick={() => toggleQueueDestination(item.id, dest.id)}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors flex items-center gap-1 ${
                                isChecked
                                  ? 'bg-amber-500 text-slate-950'
                                  : 'bg-[#061329] text-slate-400 border border-slate-700 hover:text-white'
                              }`}
                            >
                              <span>{dest.icon}</span>
                              <span>{dest.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-700/50">
                      <button
                        onClick={() => handleRemoveFromQueue(item.id)}
                        className="text-red-400 hover:text-red-300 text-xs font-semibold flex items-center gap-1 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>

                      <button
                        onClick={() => handlePublishSingle(item.id)}
                        disabled={item.isOptimizing}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Publish This Photo</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MEDIA LIBRARY VIEWER & QUICK PLACEMENT MANAGER                            */}
      {/* ========================================================================= */}
      <div className="rounded-2xl bg-[#0B1E3D] border border-[#162C52] p-5 sm:p-6 space-y-6">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#162C52] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-black text-white">District Media Library</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">
                {mediaAssets.length} Assets
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Browse, search, reuse, and assign uploaded media directly across website modules without touching code.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative min-w-[200px] flex-1 sm:flex-initial">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search photos, videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#061329] border border-[#162C52] text-white text-xs placeholder:text-slate-500 focus:border-amber-400 outline-none"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#061329] border border-[#162C52] text-white text-xs font-semibold focus:border-amber-400 outline-none"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Destination Filter */}
            <select
              value={selectedDestinationFilter}
              onChange={(e) => setSelectedDestinationFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#061329] border border-[#162C52] text-white text-xs font-semibold focus:border-amber-400 outline-none"
            >
              <option value="all">All Destinations</option>
              {DESTINATION_OPTIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex rounded-xl bg-[#061329] border border-[#162C52] p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs ${
                  viewMode === 'grid' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <Layers className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs ${
                  viewMode === 'list' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="List View"
              >
                <HardDrive className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Media Items Display */}
        {filteredAssets.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-xl bg-[#061329] border border-dashed border-slate-800 space-y-3">
            <ImageIcon className="w-12 h-12 text-slate-600 mx-auto" />
            <h4 className="text-base font-bold text-white">No media files found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery || selectedCategoryFilter !== 'all' || selectedDestinationFilter !== 'all'
                ? 'Try adjusting your search terms or category filters.'
                : 'Click the "Upload Photos & Videos" button at the top to upload your first project photos!'}
            </p>
            <button
              onClick={() => {
                setIsUploadPanelOpen(true);
                fileInputRef.current?.click();
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider"
            >
              Upload Photos Now
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="group rounded-xl bg-[#061329] border border-[#162C52] hover:border-amber-500/50 transition-all flex flex-col overflow-hidden shadow-md"
              >
                {/* Media Image / Video Box */}
                <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                  {asset.mediaType === 'video' ? (
                    <div className="w-full h-full flex items-center justify-center bg-slate-950 text-amber-400 group-hover:scale-105 transition-transform duration-300">
                      <Play className="w-12 h-12" />
                    </div>
                  ) : (
                    <img
                      src={asset.url}
                      alt={asset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {/* Top Badge Overlay */}
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                      {asset.category}
                    </span>
                    {asset.isOptimized && (
                      <span className="px-1.5 py-0.5 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold">
                        Optimized
                      </span>
                    )}
                  </div>

                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <button
                      onClick={() => setPreviewMedia(asset)}
                      title="Preview Full Size"
                      className="p-1.5 rounded-lg bg-slate-950/80 text-white hover:text-amber-400 border border-slate-700"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleCopyLink(asset)}
                      title="Copy URL"
                      className="p-1.5 rounded-lg bg-slate-950/80 text-white hover:text-amber-400 border border-slate-700"
                    >
                      {copiedId === asset.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* File Size badge */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 text-slate-300 text-[10px] font-mono">
                    {asset.fileSize || '350 KB'}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                      {asset.title}
                    </h4>
                    {asset.caption && (
                      <p className="text-xs text-slate-300 line-clamp-2">{asset.caption}</p>
                    )}
                  </div>

                  {/* Destination tags */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Appears on:</span>
                    <div className="flex flex-wrap gap-1">
                      {asset.destinations.map((dest) => (
                        <span
                          key={dest}
                          className="px-1.5 py-0.5 rounded bg-[#0B1E3D] border border-slate-700 text-amber-300 text-[9px] font-medium"
                        >
                          {dest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 1-CLICK PUBLISH QUICK ACTION DROPDOWN */}
                  <div className="pt-2 border-t border-slate-800 space-y-1.5">
                    <span className="text-[10px] text-amber-400 font-bold uppercase block">
                      Quick Publish Actions:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold">
                      <button
                        onClick={() =>
                          setPlacementTarget({ media: asset, destination: 'homepage' })
                        }
                        className="px-2 py-1.5 rounded-lg bg-[#0B1E3D] hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition-colors text-center"
                      >
                        🏠 Homepage
                      </button>

                      <button
                        onClick={() =>
                          setPlacementTarget({ media: asset, destination: 'gallery' })
                        }
                        className="px-2 py-1.5 rounded-lg bg-[#0B1E3D] hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition-colors text-center"
                      >
                        🖼️ Add to Gallery
                      </button>

                      <button
                        onClick={() =>
                          setPlacementTarget({ media: asset, destination: 'projects' })
                        }
                        className="px-2 py-1.5 rounded-lg bg-[#0B1E3D] hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition-colors text-center"
                      >
                        🛠️ Use in Project
                      </button>

                      <button
                        onClick={() =>
                          setPlacementTarget({ media: asset, destination: 'events' })
                        }
                        className="px-2 py-1.5 rounded-lg bg-[#0B1E3D] hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition-colors text-center"
                      >
                        📅 Use in Event
                      </button>

                      <button
                        onClick={() =>
                          setPlacementTarget({ media: asset, destination: 'news' })
                        }
                        className="px-2 py-1.5 rounded-lg bg-[#0B1E3D] hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition-colors text-center"
                      >
                        📰 Use in News
                      </button>

                      <button
                        onClick={() =>
                          setPlacementTarget({ media: asset, destination: 'stories' })
                        }
                        className="px-2 py-1.5 rounded-lg bg-[#0B1E3D] hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition-colors text-center"
                      >
                        📖 Impact Story
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[10px] text-slate-500">{asset.uploadedAt}</span>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${asset.title}" from Media Library?`)) {
                            deleteMediaAsset(asset.id);
                            notify('Media item deleted.');
                          }
                        }}
                        className="text-red-400 hover:text-red-300 text-[11px] flex items-center gap-1 font-semibold"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#061329] text-white uppercase text-[10px] border-b border-[#162C52]">
                <tr>
                  <th className="p-3">Media</th>
                  <th className="p-3">Title & Caption</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Destinations</th>
                  <th className="p-3">Size</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#162C52]">
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-[#061329]/50 transition-colors">
                    <td className="p-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                        <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-3 font-semibold text-white max-w-xs">
                      <div className="truncate">{asset.title}</div>
                      <div className="text-[11px] text-slate-400 truncate">{asset.caption || 'No caption'}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                        {asset.category}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {asset.destinations.map((d) => (
                          <span key={d} className="px-1.5 py-0.2 rounded bg-slate-800 text-[9px]">
                            {d}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 font-mono text-[11px]">{asset.fileSize || '350 KB'}</td>
                    <td className="p-3 text-[11px] text-slate-400">{asset.uploadedAt}</td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => setPlacementTarget({ media: asset, destination: 'homepage' })}
                        className="px-2 py-1 rounded bg-[#061329] hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-slate-700 text-[10px] font-bold"
                      >
                        Publish
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${asset.title}"?`)) {
                            deleteMediaAsset(asset.id);
                            notify('Media item deleted.');
                          }
                        }}
                        className="p-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* FULL PREVIEW MODAL                                                        */}
      {/* ========================================================================= */}
      {previewMedia && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-[#0B1E3D] border border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div>
                <h3 className="text-lg font-black text-white">{previewMedia.title}</h3>
                <p className="text-xs text-slate-300">{previewMedia.caption || 'District 9141 High Resolution Asset'}</p>
              </div>
              <button
                onClick={() => setPreviewMedia(null)}
                className="p-2 rounded-full bg-[#061329] text-slate-400 hover:text-white border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative max-h-[60vh] rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
              {previewMedia.mediaType === 'video' ? (
                <video src={previewMedia.url} controls className="max-h-[60vh] w-auto rounded-lg" autoPlay />
              ) : (
                <img src={previewMedia.url} alt={previewMedia.title} className="max-h-[60vh] w-auto object-contain rounded-lg" />
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-400">Category: {previewMedia.category}</span>
                <span>•</span>
                <span>Size: {previewMedia.fileSize}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleCopyLink(previewMedia);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#061329] text-white border border-slate-700 hover:border-amber-400 flex items-center gap-1 font-semibold"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Image URL</span>
                </button>
                <button
                  onClick={() => {
                    setPlacementTarget({ media: previewMedia, destination: 'gallery' });
                    setPreviewMedia(null);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black"
                >
                  Add to Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* QUICK PLACEMENT TARGET SELECTION MODAL                                   */}
      {/* ========================================================================= */}
      {placementTarget && (
        <div className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[#0B1E3D] border-2 border-amber-500/50 rounded-2xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black text-white uppercase tracking-wider">
                  Publish to {placementTarget.destination.toUpperCase()}
                </h3>
              </div>
              <button
                onClick={() => setPlacementTarget(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#061329] border border-slate-800">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-950 border border-slate-700 shrink-0">
                <img
                  src={placementTarget.media.url}
                  alt={placementTarget.media.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{placementTarget.media.title}</h4>
                <p className="text-xs text-amber-400">Target Destination: {placementTarget.destination}</p>
              </div>
            </div>

            {/* If destination is projects, allow selecting which project */}
            {placementTarget.destination === 'projects' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Select Specific Project:</label>
                <select
                  value={selectedEntityId}
                  onChange={(e) => setSelectedEntityId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#061329] border border-slate-700 text-white text-xs font-semibold focus:border-amber-400 outline-none"
                >
                  <option value="">-- Apply to Flagship / Featured Project --</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.category})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* If destination is events, allow selecting which event */}
            {placementTarget.destination === 'events' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Select Specific Event:</label>
                <select
                  value={selectedEntityId}
                  onChange={(e) => setSelectedEntityId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#061329] border border-slate-700 text-white text-xs font-semibold focus:border-amber-400 outline-none"
                >
                  <option value="">-- Apply to Upcoming Featured Event --</option>
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.title} ({ev.formattedDate})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* If destination is news/announcements */}
            {(placementTarget.destination === 'news' || placementTarget.destination === 'announcements') && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Select Specific Bulletin / Article:</label>
                <select
                  value={selectedEntityId}
                  onChange={(e) => setSelectedEntityId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#061329] border border-slate-700 text-white text-xs font-semibold focus:border-amber-400 outline-none"
                >
                  <option value="">-- Apply to Latest Bulletin Headline --</option>
                  {announcements.map((an) => (
                    <option key={an.id} value={an.id}>
                      {an.title} ({an.date})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* If destination is stories */}
            {placementTarget.destination === 'stories' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Select Specific Impact Story:</label>
                <select
                  value={selectedEntityId}
                  onChange={(e) => setSelectedEntityId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#061329] border border-slate-700 text-white text-xs font-semibold focus:border-amber-400 outline-none"
                >
                  <option value="">-- Apply to Flagship BRED Story --</option>
                  {impactStories.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* If destination is youth */}
            {placementTarget.destination === 'youth' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Select Children & Youth Initiative:</label>
                <select
                  value={selectedEntityId}
                  onChange={(e) => setSelectedEntityId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#061329] border border-slate-700 text-white text-xs font-semibold focus:border-amber-400 outline-none"
                >
                  <option value="">-- Apply to First Youth Initiative --</option>
                  {youthInitiatives.map((yi) => (
                    <option key={yi.id} value={yi.id}>
                      {yi.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* If destination is homepage */}
            {placementTarget.destination === 'homepage' && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                This image will be published to the Homepage hero welcome section and set as the official District Governor executive presentation portrait.
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
              <button
                onClick={() => setPlacementTarget(null)}
                className="px-4 py-2 rounded-xl bg-[#061329] hover:bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPlacement}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Confirm & Publish</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
