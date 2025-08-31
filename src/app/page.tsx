import Link from "next/link";
import { ImageIcon, Palette, Download, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="px-6 py-4 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette className="h-8 w-8 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">Memity</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</Link>
            <Link href="/editor" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Sparkles className="h-16 w-16 text-cyan-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Create Memes Like a
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"> Pro</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Upload images and create hilarious memes with powerful text overlay tools. 
              Make viral content in minutes with our intuitive drag-and-drop meme editor.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/editor"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Creating Memes
            </Link>
            <Link 
              href="#how-it-works"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
            >
              Learn More
            </Link>
          </div>

          {/* Demo Preview */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 text-lg">Your hilarious memes will look amazing here</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-500 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Meme Creation Tools</h3>
            <p className="text-xl text-gray-300">Everything you need to create viral memes</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors border border-cyan-500/20">
              <ImageIcon className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3 text-white">Easy Upload</h4>
              <p className="text-gray-300">Drag and drop or click to upload your meme images instantly. Supports all major formats.</p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 transition-colors border border-purple-500/20">
              <Palette className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3 text-white">Meme Text</h4>
              <p className="text-gray-300">Add hilarious text overlays with custom fonts, colors, and positioning to create viral memes.</p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors border border-emerald-500/20">
              <Download className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3 text-white">Share & Download</h4>
              <p className="text-gray-300">Download your memes in high quality and share them instantly to make them go viral.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="px-6 py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">How It Works</h3>
            <p className="text-xl text-gray-300">Get started in just three simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h4 className="text-xl font-semibold mb-3 text-white">Upload Meme Template</h4>
              <p className="text-gray-300">Choose a meme template or upload your own image to create custom memes</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h4 className="text-xl font-semibold mb-3 text-white">Add Funny Text</h4>
              <p className="text-gray-300">Write hilarious captions with different fonts, colors, and positioning to make it viral</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h4 className="text-xl font-semibold mb-3 text-white">Share Your Meme</h4>
              <p className="text-gray-300">Download your meme and share it on social media to make it go viral</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3 className="text-4xl font-bold mb-4">Ready to Create Viral Memes?</h3>
          <p className="text-xl mb-8 opacity-90">Join thousands of meme creators who use Memity to make hilarious content</p>
          <Link 
            href="/editor"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg inline-block"
          >
            Start Creating for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Palette className="h-6 w-6 text-cyan-400" />
            <span className="text-lg font-semibold">Memity</span>
          </div>
          <p className="text-gray-400">© 2025 ImageCraft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
