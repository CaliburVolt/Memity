"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImageIcon, Palette, Download, Sparkles, Star, Menu, X, Upload, Type } from "lucide-react";

export default function Home() {
  const [imageError, setImageError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden relative">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-pink-400/20 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-emerald-400/35 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-1/3 right-1/6 w-2.5 h-2.5 bg-blue-400/25 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
      </div>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 px-6 py-4 bg-black/30 backdrop-blur-xl border-b border-white/20 relative z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="group flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <Palette className="h-10 w-10 text-cyan-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              <div className="absolute inset-0 h-10 w-10 text-cyan-400 opacity-0 group-hover:opacity-30 animate-ping">
                <Palette className="h-10 w-10" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:via-cyan-400 group-hover:to-pink-400 transition-all duration-500">Memity</h1>
              <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Meme Editor</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link href="#features" className="group relative px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10">
              <span className="relative z-10">Features</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link href="#how-it-works" className="group relative px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10">
              <span className="relative z-10">How it Works</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link href="/templates" className="group relative px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10">
              <span className="relative z-10">Templates</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <a 
              href="https://github.com/CaliburVolt/Memity" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 bg-gradient-to-r from-purple-600/80 to-purple-700/80 hover:from-purple-500 hover:to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 hover:rotate-1 backdrop-blur-sm border border-purple-500/30"
            >
              <Star className="h-4 w-4 text-yellow-300 group-hover:text-yellow-200 group-hover:animate-pulse transition-all" />
              <span className="font-medium">Star on GitHub</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <Link href="/editor" className="group relative ml-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:-rotate-1 shadow-lg hover:shadow-cyan-500/30 border border-cyan-400/30">
              <span className="relative z-10 flex items-center gap-2 font-semibold">
                <Sparkles className="h-4 w-4 group-hover:animate-spin transition-transform" />
                Get Started
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="group md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? 
              <X className="h-6 w-6 text-white group-hover:rotate-90 transition-transform duration-300" /> : 
              <Menu className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
            }
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/20 animate-in slide-in-from-top-2 duration-300">
            <nav className="px-6 py-6 space-y-4">
              <Link href="#features" className="group flex items-center justify-between text-gray-300 hover:text-white transition-all duration-300 p-3 rounded-lg hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>
                <span>Features</span>
                <div className="w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link href="#how-it-works" className="group flex items-center justify-between text-gray-300 hover:text-white transition-all duration-300 p-3 rounded-lg hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>
                <span>How it Works</span>
                <div className="w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link href="/templates" className="group flex items-center justify-between text-gray-300 hover:text-white transition-all duration-300 p-3 rounded-lg hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>
                <span>Templates</span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <a 
                href="https://github.com/CaliburVolt/Memity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between bg-gradient-to-r from-purple-600 to-purple-700 text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-300" />
                  Star on GitHub
                </span>
                <div className="w-2 h-2 bg-yellow-400 rounded-full group-hover:animate-pulse"></div>
              </a>
              <Link href="/editor" className="group flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold" onClick={() => setMobileMenuOpen(false)}>
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 group-hover:animate-spin" />
                  Get Started
                </span>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
            {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden z-10">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-ping"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <div className="relative inline-block mb-6">
              <Sparkles className="h-20 w-20 text-cyan-400 mx-auto animate-bounce" />
              <div className="absolute inset-0 h-20 w-20 text-cyan-400 mx-auto animate-ping opacity-30">
                <Sparkles className="h-20 w-20" />
              </div>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Create Memes Like a
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-pulse"> Pro</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Upload images and create <span className="text-cyan-400 font-semibold">hilarious memes</span> with powerful text overlay tools. 
              Make <span className="text-purple-400 font-semibold">viral content</span> in minutes with our intuitive drag-and-drop meme editor.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="/editor"
              className="group bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white px-10 py-5 rounded-xl text-lg font-bold hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <Sparkles className="h-5 w-5 group-hover:animate-spin" />
                <span>Start Creating Memes</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="#how-it-works"
              className="group bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30 hover:border-white/50 transform hover:scale-105 shadow-lg hover:shadow-white/10"
            >
              <span className="flex items-center justify-center space-x-2">
                <Download className="h-5 w-5 group-hover:animate-bounce" />
                <span>Learn More</span>
              </span>
            </Link>
          </div>

          {/* Demo Preview */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30 hover:border-white/40 transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center overflow-hidden relative">
                {!imageError ? (
                  <Image 
                    src="/Drake_Hotline_Bling_Meme_Template_V1.jpg" 
                    alt="Drake meme template - example of what you can create with Memity"
                    width={800}
                    height={600}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                    onError={() => setImageError(true)}
                    priority
                  />
                ) : (
                  <div className="text-center">
                    <ImageIcon className="h-20 w-20 text-gray-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-300 text-xl">Your hilarious memes will look amazing here</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-cyan-500 rounded-full animate-pulse shadow-lg shadow-cyan-500/50"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-purple-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50"></div>
            <div className="absolute top-1/2 -right-8 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-black/20 relative overflow-hidden z-10">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h3 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Meme Creation Tools
            </h3>
            <p className="text-2xl text-gray-300 max-w-2xl mx-auto">Everything you need to create <span className="text-cyan-400">viral memes</span></p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-10 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 hover:from-cyan-500/20 hover:to-cyan-500/10 transition-all duration-500 border border-cyan-500/30 hover:border-cyan-500/50 transform hover:scale-105 hover:-rotate-1 shadow-lg hover:shadow-cyan-500/20">
              <div className="relative mb-6">
                <ImageIcon className="h-16 w-16 text-cyan-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 h-16 w-16 text-cyan-400 mx-auto opacity-0 group-hover:opacity-30 animate-ping">
                  <ImageIcon className="h-16 w-16" />
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors">Easy Upload</h4>
              <p className="text-gray-300 text-lg leading-relaxed">Drag and drop or click to upload your meme images instantly. Supports all major formats.</p>
            </div>
            
            <div className="group text-center p-10 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 hover:from-purple-500/20 hover:to-purple-500/10 transition-all duration-500 border border-purple-500/30 hover:border-purple-500/50 transform hover:scale-105 hover:rotate-1 shadow-lg hover:shadow-purple-500/20">
              <div className="relative mb-6">
                <Palette className="h-16 w-16 text-purple-400 mx-auto group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 h-16 w-16 text-purple-400 mx-auto opacity-0 group-hover:opacity-30 animate-ping">
                  <Palette className="h-16 w-16" />
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">Meme Text</h4>
              <p className="text-gray-300 text-lg leading-relaxed">Add hilarious text overlays with custom fonts, colors, and positioning to create viral memes.</p>
            </div>
            
            <div className="group text-center p-10 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 hover:from-emerald-500/20 hover:to-emerald-500/10 transition-all duration-500 border border-emerald-500/30 hover:border-emerald-500/50 transform hover:scale-105 hover:-rotate-1 shadow-lg hover:shadow-emerald-500/20">
              <div className="relative mb-6">
                <Download className="h-16 w-16 text-emerald-400 mx-auto group-hover:scale-110 group-hover:animate-bounce transition-transform duration-300" />
                <div className="absolute inset-0 h-16 w-16 text-emerald-400 mx-auto opacity-0 group-hover:opacity-30 animate-ping">
                  <Download className="h-16 w-16" />
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-300 transition-colors">Share & Download</h4>
              <p className="text-gray-300 text-lg leading-relaxed">Download your memes in high quality and share them instantly to make them go viral.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="px-6 py-20 bg-gray-900/50 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-cyan-900/10 to-pink-900/20"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-l from-pink-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h3 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-pink-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">How It Works</h3>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">Get started in just <span className="text-pink-400">three simple steps</span></p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group text-center relative">
              <div className="relative mb-8 mx-auto">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-full flex items-center justify-center border-4 border-cyan-400/30 group-hover:border-cyan-400/60 transition-all duration-500 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 group-hover:scale-110 mx-auto">
                  <Upload className="h-16 w-16 text-cyan-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold group-hover:scale-125 transition-transform shadow-lg mx-auto">1</div>
                <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-cyan-400/0 group-hover:border-cyan-400/30 animate-ping mx-auto"></div>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors">Upload Meme Template</h4>
              <p className="text-gray-300 text-lg leading-relaxed">Choose a meme template or upload your own image to create custom memes</p>
            </div>
            
            <div className="group text-center relative">
              <div className="relative mb-8 mx-auto">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-full flex items-center justify-center border-4 border-purple-400/30 group-hover:border-purple-400/60 transition-all duration-500 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 group-hover:scale-110 mx-auto">
                  <Type className="h-16 w-16 text-purple-400 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300" />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold group-hover:scale-125 transition-transform shadow-lg mx-auto">2</div>
                <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-purple-400/0 group-hover:border-purple-400/30 animate-ping mx-auto"></div>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">Add Funny Text</h4>
              <p className="text-gray-300 text-lg leading-relaxed">Write hilarious captions with different fonts, colors, and positioning to make it viral</p>
            </div>
            
            <div className="group text-center relative">
              <div className="relative mb-8 mx-auto">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-full flex items-center justify-center border-4 border-emerald-400/30 group-hover:border-emerald-400/60 transition-all duration-500 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 group-hover:scale-110 mx-auto">
                  <Sparkles className="h-16 w-16 text-emerald-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold group-hover:scale-125 transition-transform shadow-lg mx-auto">3</div>
                <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-emerald-400/0 group-hover:border-emerald-400/30 animate-ping mx-auto"></div>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-300 transition-colors">Share Your Meme</h4>
              <p className="text-gray-300 text-lg leading-relaxed">Download your meme and share it on social media to make it go viral</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 relative overflow-hidden z-10">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-300"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <div className="mb-8">
            <h3 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent animate-pulse">
              Ready to Create Viral Memes?
            </h3>
            <p className="text-2xl mb-8 opacity-90 leading-relaxed">Join thousands of meme creators who use <span className="font-bold text-cyan-200">Memity</span> to make hilarious content</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/editor"
              className="group relative bg-white text-blue-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-110 hover:-rotate-1 shadow-2xl hover:shadow-white/30 inline-block overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="h-6 w-6 group-hover:animate-spin" />
                Start Creating for Free
                <Sparkles className="h-6 w-6 group-hover:animate-spin" />
              </span>
            </Link>
            
            <Link 
              href="/templates"
              className="group bg-transparent border-2 border-white/50 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 hover:border-white transition-all transform hover:scale-105 hover:rotate-1 shadow-lg hover:shadow-white/20 inline-block"
            >
              <span className="flex items-center gap-3">
                <ImageIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                Browse Templates
              </span>
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-lg">Free Forever</span>
            </div>
            <div className="w-px h-6 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-150"></div>
              <span className="text-lg">No Watermarks</span>
            </div>
            <div className="w-px h-6 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-300"></div>
              <span className="text-lg">Instant Download</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-black text-white relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-64 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6 group">
              <div className="relative">
                <Palette className="h-8 w-8 text-cyan-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <div className="absolute inset-0 h-8 w-8 text-cyan-400 opacity-0 group-hover:opacity-30 animate-ping">
                  <Palette className="h-8 w-8" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Memity</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 mb-8 text-gray-400">
              <Link href="/editor" className="hover:text-cyan-400 transition-colors text-lg">Editor</Link>
              <Link href="/templates" className="hover:text-purple-400 transition-colors text-lg">Templates</Link>
              <Link href="#features" className="hover:text-pink-400 transition-colors text-lg">Features</Link>
              <Link href="#how-it-works" className="hover:text-emerald-400 transition-colors text-lg">How it Works</Link>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-lg">© 2025 Memity. All rights reserved. Made with ❤️ for meme creators worldwide.</p>
            <div className="mt-4 flex justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Creating viral memes since 2025
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
