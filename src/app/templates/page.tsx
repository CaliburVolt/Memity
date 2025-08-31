"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Edit, Search, Grid, List, Star } from "lucide-react";

interface MemeTemplate {
  id: string;
  name: string;
  image: string;
  category: string;
  tags: string[];
}

const memeTemplates: MemeTemplate[] = [
  {
    id: "drake-hotline-bling",
    name: "Drake Hotline Bling",
    image: "/templates/1.jpeg",
    category: "Popular",
    tags: ["drake", "preference", "choice", "popular", "classic"]
  },
  {
    id: "distracted-boyfriend",
    name: "Distracted Boyfriend",
    image: "/templates/download (3).jpeg",
    category: "Popular",
    tags: ["choice", "temptation", "relationship", "popular"]
  },
  {
    id: "woman-yelling-cat",
    name: "Woman Yelling at Cat",
    image: "/templates/Woman yelling at cat Template.jpeg",
    category: "Popular",
    tags: ["argument", "confusion", "reaction", "popular"]
  },
  {
    id: "train",
    name: "Train crash",
    image: "/templates/Meme em branco.jpeg",
    category: "Decision",
    tags: ["decision", "dilemma", "choice", "buttons"]
  },
  {
    id: "change-my-mind",
    name: "Change My Mind",
    image: "/templates/download (4).jpeg",
    category: "Opinion",
    tags: ["opinion", "controversial", "debate", "statement"]
  },
  {
    id: "expanding-brain",
    name: "Expanding Brain",
    image: "/templates/Expanding Brain Meme Template.jpeg",
    category: "Evolution",
    tags: ["evolution", "progression", "brain", "levels"]
  }
  ,
  {
    id: "Spongebob-Burns-A-Paper",
    name: "Spongebob Burns A Paper",
    image: "/templates/download (6) - Copy.jpeg",
    category: "Decision",
    tags: ["evolution", "progression", "brain", "levels"]
  }
];

const categories = ["All", "Popular", "Decision", "Opinion", "Evolution", "Reaction"];

export default function TemplatesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredTemplates = memeTemplates.filter(template => {
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleTemplateClick = (template: MemeTemplate) => {
    router.push(`/editor?template=${encodeURIComponent(template.image)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="h-6 w-px bg-gray-600"></div>
            <h1 className="text-2xl font-bold text-white">Meme Templates</h1>
          </div>
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
            <Link 
              href="/editor"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg"
            >
              Create Custom Meme
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" 
                    ? "bg-cyan-500 text-white" 
                    : "bg-gray-800/50 text-gray-300 hover:text-white"
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" 
                    ? "bg-cyan-500 text-white" 
                    : "bg-gray-800/50 text-gray-300 hover:text-white"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid/List */}
        <div className={
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }>
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`bg-gray-800/50 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all cursor-pointer group ${
                viewMode === "list" ? "flex items-center space-x-4 p-4" : ""
              }`}
              onClick={() => handleTemplateClick(template)}
            >
              <div className={viewMode === "list" ? "flex-shrink-0 w-32 h-24" : "aspect-square"}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-meme.jpg";
                  }}
                />
              </div>
              
              <div className={viewMode === "list" ? "flex-1" : "p-4"}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {template.name}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded">
                    {template.category}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {template.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Link
                    href={`/editor?template=${encodeURIComponent(template.image)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Download template
                      const link = document.createElement('a');
                      link.href = template.image;
                      link.download = `${template.name.replace(/\s+/g, '-').toLowerCase()}-template.jpg`;
                      link.click();
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition-colors"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No templates found</h3>
            <p className="text-gray-300">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
