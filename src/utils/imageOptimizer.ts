/**
 * Client-Side Image & Media Optimizer for Rotary District 9141 CMS
 * Automatically compresses large high-resolution photos for lightning-fast mobile loading
 * while preserving crisp visual clarity.
 */

export interface OptimizedMediaResult {
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  formattedOriginalSize: string;
  formattedCompressedSize: string;
  compressionRatio: string;
  width: number;
  height: number;
  mediaType: 'image' | 'video';
  fileName: string;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export async function optimizeImageFile(
  file: File,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.85
): Promise<OptimizedMediaResult> {
  const originalSize = file.size;
  const isVideo = file.type.startsWith('video/');

  if (isVideo) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        resolve({
          dataUrl: result,
          originalSize,
          compressedSize: originalSize,
          formattedOriginalSize: formatFileSize(originalSize),
          formattedCompressedSize: formatFileSize(originalSize),
          compressionRatio: '100% (Original Video)',
          width: 1280,
          height: 720,
          mediaType: 'video',
          fileName: file.name,
        });
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate proportional scale
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context could not be created'));
          return;
        }

        // Smooth image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to optimized JPEG dataUrl
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

        // Estimate compressed size in bytes from base64 string
        const base64Length = compressedDataUrl.length - (compressedDataUrl.indexOf(',') + 1);
        const compressedSize = Math.round((base64Length * 3) / 4);

        const ratioNumber = Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100));
        const compressionRatio = ratioNumber > 0 ? `${ratioNumber}% smaller` : 'Optimized';

        resolve({
          dataUrl: compressedDataUrl,
          originalSize,
          compressedSize,
          formattedOriginalSize: formatFileSize(originalSize),
          formattedCompressedSize: formatFileSize(compressedSize),
          compressionRatio,
          width,
          height,
          mediaType: 'image',
          fileName: file.name,
        });
      };

      img.onerror = () => {
        reject(new Error(`Failed to load image: ${file.name}`));
      };

      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
