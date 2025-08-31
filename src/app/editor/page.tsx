"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TextElement, TextSettings } from "@/types/editor";
import { 
  Upload, 
  Type, 
  Download, 
  Palette,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RotateCcw,
  Trash2,
  Move,
  Star
} from "lucide-react";

export default function Editor() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Meme Editor...</p>
        </div>
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}

function EditorContent() {
  const searchParams = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null); // Cache the image
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const [textSettings, setTextSettings] = useState<TextSettings>({
    text: "Sample Text",
    fontSize: 32,
    fontFamily: "Arial",
    color: "#000000",
    bold: false,
    italic: false,
    alignment: "left" as "left" | "center" | "right"
  });

  // Automatically update selected text when settings change
  useEffect(() => {
    if (selectedTextId) {
      setTextElements(prev => prev.map(el => 
        el.id === selectedTextId 
          ? {
              ...el,
              text: textSettings.text,
              fontSize: textSettings.fontSize,
              fontFamily: textSettings.fontFamily,
              color: textSettings.color,
              bold: textSettings.bold,
              italic: textSettings.italic,
              alignment: textSettings.alignment
            }
          : el
      ));
    }
  }, [textSettings, selectedTextId]);

  const drawTextElements = useCallback((ctx: CanvasRenderingContext2D) => {
    textElements.forEach((element) => {
      ctx.font = `${element.italic ? "italic" : ""} ${element.bold ? "bold" : ""} ${element.fontSize}px ${element.fontFamily}`.trim();
      ctx.fillStyle = element.color;
      ctx.textAlign = element.alignment;
      
      const lines = element.text.split("\n");
      lines.forEach((line, index) => {
        ctx.fillText(line, element.x, element.y + (index * element.fontSize * 1.2));
      });
      
      // Draw selection border
      if (element.isSelected) {
        const metrics = ctx.measureText(element.text);
        const textWidth = metrics.width;
        const textHeight = element.fontSize;
        
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(
          element.x - (element.alignment === "center" ? textWidth / 2 : element.alignment === "right" ? textWidth : 0) - 5,
          element.y - textHeight - 5,
          textWidth + 10,
          textHeight + 10
        );
        ctx.setLineDash([]);
      }
    });
  }, [textElements]);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set background
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw uploaded image if exists (using cached image)
    if (uploadedImage && imageLoaded && imageRef.current) {
      const img = imageRef.current;
      
      // Calculate scaling to fit canvas
      const canvasAspectRatio = canvas.width / canvas.height;
      const imgAspectRatio = img.width / img.height;
      
      let drawWidth, drawHeight, offsetX, offsetY;
      
      if (imgAspectRatio > canvasAspectRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgAspectRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgAspectRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }
      
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
    
    // Always draw text elements
    drawTextElements(ctx);
  }, [uploadedImage, imageLoaded, drawTextElements]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Load template from URL parameters
  useEffect(() => {
    const templateUrl = searchParams.get('template');
    if (templateUrl) {
      const decodedUrl = decodeURIComponent(templateUrl);
      setUploadedImage(decodedUrl);
      setImageLoaded(false);
      
      // Cache the image for better performance
      const img = new Image();
      img.onload = () => {
        imageRef.current = img; // Cache the loaded image
        setImageLoaded(true);
      };
      img.onerror = () => {
        console.error('Failed to load template image:', decodedUrl);
        setUploadedImage(null);
        setImageLoaded(false);
      };
      img.src = decodedUrl;
    }
  }, [searchParams]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setUploadedImage(imgUrl);
        setImageLoaded(false);
        
        // Cache the image for better performance
        const img = new Image();
        img.onload = () => {
          imageRef.current = img; // Cache the loaded image
          setImageLoaded(true);
        };
        img.src = imgUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const addText = () => {
    const newText: TextElement = {
      id: Date.now().toString(),
      text: textSettings.text,
      x: 100,
      y: 100,
      fontSize: textSettings.fontSize,
      fontFamily: textSettings.fontFamily,
      color: textSettings.color,
      bold: textSettings.bold,
      italic: textSettings.italic,
      alignment: textSettings.alignment,
      isSelected: false
    };
    
    setTextElements(prev => prev.map(el => ({ ...el, isSelected: false })).concat(newText));
    setSelectedTextId(newText.id);
  };

  const deleteSelected = () => {
    if (selectedTextId) {
      setTextElements(prev => prev.filter(el => el.id !== selectedTextId));
      setSelectedTextId(null);
    }
  };

  const clearCanvas = () => {
    setUploadedImage(null);
    setImageLoaded(false);
    setTextElements([]);
    setSelectedTextId(null);
    imageRef.current = null; // Clear cached image
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if clicked on any text element
    let clickedElement: TextElement | null = null;
    
    for (let i = textElements.length - 1; i >= 0; i--) {
      const element = textElements[i];
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;
      
      ctx.font = `${element.italic ? "italic" : ""} ${element.bold ? "bold" : ""} ${element.fontSize}px ${element.fontFamily}`.trim();
      const metrics = ctx.measureText(element.text);
      const textWidth = metrics.width;
      const textHeight = element.fontSize;
      
      const textX = element.x - (element.alignment === "center" ? textWidth / 2 : element.alignment === "right" ? textWidth : 0);
      const textY = element.y - textHeight;
      
      if (x >= textX && x <= textX + textWidth && y >= textY && y <= textY + textHeight) {
        clickedElement = element;
        break;
      }
    }

    if (clickedElement) {
      setTextElements(prev => prev.map(el => ({ 
        ...el, 
        isSelected: el.id === clickedElement!.id 
      })));
      setSelectedTextId(clickedElement.id);
      
      // Update text settings to match selected element
      setTextSettings({
        text: clickedElement.text,
        fontSize: clickedElement.fontSize,
        fontFamily: clickedElement.fontFamily,
        color: clickedElement.color,
        bold: clickedElement.bold,
        italic: clickedElement.italic,
        alignment: clickedElement.alignment
      });
    } else {
      // Clicked on empty area
      setTextElements(prev => prev.map(el => ({ ...el, isSelected: false })));
      setSelectedTextId(null);
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTextId) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const selectedElement = textElements.find(el => el.id === selectedTextId);
      if (selectedElement) {
        setIsDragging(true);
        setDragOffset({
          x: x - selectedElement.x,
          y: y - selectedElement.y
        });
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging && selectedTextId) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setTextElements(prev => prev.map(el => 
        el.id === selectedTextId 
          ? { ...el, x: x - dragOffset.x, y: y - dragOffset.y }
          : el
      ));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temporary canvas for high-resolution export
    const exportCanvas = document.createElement("canvas");
    const exportCtx = exportCanvas.getContext("2d");
    if (!exportCtx) return;

    // Set high resolution
    const scale = 2;
    exportCanvas.width = canvas.width * scale;
    exportCanvas.height = canvas.height * scale;
    exportCtx.scale(scale, scale);

    // Clear and set background
    exportCtx.fillStyle = uploadedImage ? "transparent" : "#f8fafc";
    exportCtx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw image if exists (using cached image)
    if (uploadedImage && imageLoaded && imageRef.current) {
      const img = imageRef.current;
      const canvasAspectRatio = canvas.width / canvas.height;
      const imgAspectRatio = img.width / img.height;
      
      let drawWidth, drawHeight, offsetX, offsetY;
      
      if (imgAspectRatio > canvasAspectRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgAspectRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgAspectRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }
      
      exportCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      
      // Draw text elements (without selection borders)
      textElements.forEach((element) => {
        exportCtx.font = `${element.italic ? "italic" : ""} ${element.bold ? "bold" : ""} ${element.fontSize}px ${element.fontFamily}`.trim();
        exportCtx.fillStyle = element.color;
        exportCtx.textAlign = element.alignment;
        
        const lines = element.text.split("\n");
        lines.forEach((line, index) => {
          exportCtx.fillText(line, element.x, element.y + (index * element.fontSize * 1.2));
        });
      });
      
      // Download immediately
      exportCanvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "edited-image.png";
          a.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } else {
      // Draw text elements only
      textElements.forEach((element) => {
        exportCtx.font = `${element.italic ? "italic" : ""} ${element.bold ? "bold" : ""} ${element.fontSize}px ${element.fontFamily}`.trim();
        exportCtx.fillStyle = element.color;
        exportCtx.textAlign = element.alignment;
        
        const lines = element.text.split("\n");
        lines.forEach((line, index) => {
          exportCtx.fillText(line, element.x, element.y + (index * element.fontSize * 1.2));
        });
      });
      
      // Download
      exportCanvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "edited-image.png";
          a.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden selection:bg-cyan-400/30">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-pink-400/20 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-emerald-400/25 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/6 w-2.5 h-2.5 bg-blue-400/20 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-xl border-b border-white/20 px-6 py-4 z-50 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="group flex items-center space-x-3 text-cyan-400 hover:text-cyan-300 transition-all duration-300">
            <div className="relative">
              <Palette className="h-10 w-10 text-cyan-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              <div className="absolute inset-0 h-10 w-10 text-cyan-400 opacity-0 group-hover:opacity-30 animate-ping">
                <Palette className="h-10 w-10" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Memity</h1>
              <span className="text-xs text-gray-400">Meme Editor</span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/CaliburVolt/Memity" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 bg-gradient-to-r from-purple-600/80 to-purple-700/80 hover:from-purple-500 hover:to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-purple-500/30"
            >
              <Star className="h-4 w-4 text-yellow-300 group-hover:text-yellow-200 group-hover:animate-pulse transition-all" />
              <span className="hidden sm:inline font-medium">Star on GitHub</span>
            </a>
            <button
              onClick={clearCanvas}
              className="group flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <RotateCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
              <span className="hidden sm:inline">Clear</span>
            </button>
            <button
              onClick={downloadImage}
              disabled={!uploadedImage}
              className="group flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600/50 disabled:to-gray-700/50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-cyan-500/30 border border-cyan-400/30"
            >
              <Download className="h-4 w-4 group-hover:animate-bounce" />
              <span className="font-medium">Download</span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 pt-24 max-w-full mx-auto">
        <div className="flex flex-col xl:flex-row gap-6 min-h-screen">
          {/* Sidebar Controls */}
          <div className="xl:w-80 xl:min-w-80 px-6">
            <div className="space-y-6 xl:sticky xl:top-24 xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto scrollbar-hide hover:scrollbar-show transition-all duration-300 pr-2">
            {/* Upload Section */}
            <div className="group bg-black/50 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 hover:border-cyan-400/40 transition-all duration-500 hover:shadow-cyan-500/10">
              <h3 className="text-xl font-bold mb-6 flex items-center text-white">
                <div className="relative mr-3">
                  <Upload className="h-6 w-6 text-cyan-400" />
                  <div className="absolute inset-0 h-6 w-6 text-cyan-400 opacity-0 hover:opacity-30 animate-ping">
                    <Upload className="h-6 w-6" />
                  </div>
                </div>
                Upload Image
              </h3>
              <div className="space-y-4">
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="group border-2 border-dashed border-cyan-400/30 rounded-lg p-4 text-center cursor-pointer hover:border-cyan-400/60 hover:bg-cyan-400/5 transition-all duration-300 transform hover:scale-105">
                    <Upload className="h-6 w-6 text-cyan-400 mx-auto mb-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Text Controls */}
            <div className="group bg-black/50 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 hover:border-purple-400/40 transition-all duration-500 hover:shadow-purple-500/10">
              <h3 className="text-xl font-bold mb-6 flex items-center text-white">
                <div className="relative mr-3">
                  <Type className="h-6 w-6 text-purple-400" />
                  <div className="absolute inset-0 h-6 w-6 text-purple-400 opacity-0 hover:opacity-30 animate-ping">
                    <Type className="h-6 w-6" />
                  </div>
                </div>
                Text Settings
              </h3>
              
              {selectedTextId && (
                <div className="mb-6 p-4 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-xl border border-emerald-500/30 backdrop-blur-sm">
                  <p className="text-sm text-emerald-300 flex items-center font-medium">
                    <Move className="h-4 w-4 mr-2 animate-pulse" />
                    Text selected! Changes apply automatically as you edit.
                  </p>
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                    Text Content
                  </label>
                  <input
                    type="text"
                    value={textSettings.text}
                    onChange={(e) => setTextSettings({...textSettings, text: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 hover:bg-gray-700/70 focus:bg-gray-700/80 focus:shadow-lg focus:shadow-cyan-500/20"
                    placeholder="Enter your meme text..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    Font Family
                  </label>
                  <select
                    value={textSettings.fontFamily}
                    onChange={(e) => setTextSettings({...textSettings, fontFamily: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-300 hover:bg-gray-700/70 cursor-pointer"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Comic Sans MS">Comic Sans MS</option>
                    <option value="Impact">Impact</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Font Size: {textSettings.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="100"
                    value={textSettings.fontSize}
                    onChange={(e) => setTextSettings({...textSettings, fontSize: parseInt(e.target.value)})}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Color
                  </label>
                  <input
                    type="color"
                    value={textSettings.color}
                    onChange={(e) => setTextSettings({...textSettings, color: e.target.value})}
                    className="w-full h-10 border border-gray-600 rounded-md cursor-pointer bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Style
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setTextSettings({...textSettings, bold: !textSettings.bold})}
                      className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md border transition-colors ${
                        textSettings.bold 
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300" 
                          : "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50"
                      }`}
                    >
                      <Bold className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setTextSettings({...textSettings, italic: !textSettings.italic})}
                      className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md border transition-colors ${
                        textSettings.italic 
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300" 
                          : "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50"
                      }`}
                    >
                      <Italic className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Alignment
                  </label>
                  <div className="flex space-x-1">
                    {(["left", "center", "right"] as const).map((align) => (
                      <button
                        key={align}
                        onClick={() => setTextSettings({...textSettings, alignment: align})}
                        className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md border transition-colors ${
                          textSettings.alignment === align
                            ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300"
                            : "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50"
                        }`}
                      >
                        {align === "left" && <AlignLeft className="h-4 w-4" />}
                        {align === "center" && <AlignCenter className="h-4 w-4" />}
                        {align === "right" && <AlignRight className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={addText}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md hover:from-purple-600 hover:to-pink-600 transition-all mb-4"
                >
                  Add Text
                </button>

                <button
                  onClick={deleteSelected}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-md hover:from-red-600 hover:to-red-700 transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Selected</span>
                </button>
              </div>
            </div>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 px-6 pb-6">
            <div className="bg-black/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 hover:border-cyan-400/50 transition-all duration-500 h-full group">
              <h3 className="text-2xl font-bold mb-8 flex items-center justify-center text-white">
                <div className="relative mr-3">
                  <Move className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 h-6 w-6 text-emerald-400 opacity-0 group-hover:opacity-30 animate-ping">
                    <Move className="h-6 w-6" />
                  </div>
                </div>
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Meme Canvas</span>
                <div className="ml-auto flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Ready to edit</span>
                </div>
              </h3>
              <div className="flex justify-center items-center min-h-[600px] group/canvas">
                <div className="relative border-2 border-cyan-500/20 hover:border-cyan-500/40 rounded-2xl overflow-hidden shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm group-hover/canvas:scale-[1.01]">
                  <canvas 
                    ref={canvasRef}
                    width={800}
                    height={600}
                    onClick={handleCanvasClick}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className="cursor-crosshair transition-all duration-300 max-w-full h-auto rounded-xl"
                    style={{ maxWidth: "800px", height: "auto" }}
                  />
                  
                  {!uploadedImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm rounded-xl">
                      <div className="text-center p-8 group/empty">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center group-hover/empty:scale-110 transition-transform duration-300">
                          <Upload className="h-12 w-12 text-cyan-400 animate-bounce group-hover/empty:animate-pulse" />
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Upload an image to start</h4>
                        <p className="text-gray-400 text-lg">Choose from templates or upload your own image</p>
                        <div className="mt-4 flex justify-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedTextId && (
                <div className="mt-6 p-4 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                  <p className="text-sm text-cyan-300 flex items-center">
                    <Move className="h-4 w-4 mr-2" />
                    Text selected. Click and drag to move, or use the controls to edit.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
