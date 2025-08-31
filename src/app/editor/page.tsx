"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TextElement, TextSettings } from "@/types/editor";
import { 
  Upload, 
  Type, 
  Download, 
  Home, 
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <Palette className="h-8 w-8 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">Memity - Meme Editor</h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/CaliburVolt/Memity" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white px-4 py-2 rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-200 backdrop-blur-sm"
            >
              <Star className="h-4 w-4 hover:text-yellow-400 transition-colors" />
              <span className="hidden sm:inline">Star on GitHub</span>
            </a>
            <button
              onClick={clearCanvas}
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
            <button
              onClick={downloadImage}
              disabled={!uploadedImage}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <Upload className="h-5 w-5 mr-2 text-cyan-400" />
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
                  <div className="border-2 border-dashed border-cyan-400/30 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-400/60 hover:bg-cyan-400/5 transition-colors">
                    <Upload className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-300">
                      Click to upload or drag and drop
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Text Controls */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <Type className="h-5 w-5 mr-2 text-purple-400" />
                Text Settings
              </h3>
              
              {selectedTextId && (
                <div className="mb-4 p-3 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                  <p className="text-sm text-emerald-300 flex items-center">
                    <Move className="h-4 w-4 mr-2" />
                    Text selected! Changes apply automatically as you edit.
                  </p>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Text Content
                  </label>
                  <input
                    type="text"
                    value={textSettings.text}
                    onChange={(e) => setTextSettings({...textSettings, text: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Font Family
                  </label>
                  <select
                    value={textSettings.fontFamily}
                    onChange={(e) => setTextSettings({...textSettings, fontFamily: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
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

          {/* Canvas Area */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <Move className="h-5 w-5 mr-2 text-emerald-400" />
                Canvas
              </h3>
              <div className="flex justify-center">
                <div className="border border-gray-600 rounded-lg overflow-hidden shadow-2xl">
                  <canvas 
                    ref={canvasRef}
                    width={800}
                    height={600}
                    onClick={handleCanvasClick}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className="cursor-crosshair"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              </div>
              
              {!uploadedImage && (
                <div className="mt-4 text-center text-gray-400">
                  <p>Upload a meme template or image to start creating memes, or add text directly to the canvas</p>
                </div>
              )}

              {selectedTextId && (
                <div className="mt-4 p-4 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
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
