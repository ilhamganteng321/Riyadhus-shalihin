'use client'

import React, { useEffect, useState } from 'react';
import { BookOpen, Search, Menu, ArrowRight, Heart } from 'lucide-react';

const RiyadhusShalihinApp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showArabic, setShowArabic] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);

  // Function to clean HTML content and convert to readable text
  // Function to clean HTML content and convert to readable text
const cleanHtmlContent = (htmlString) => {
  if (!htmlString) return '';
  
  return htmlString
    // Replace escaped characters first
    .replace(/\\r\\n|\\r|\\n/g, '\n')
    // Replace HTML line breaks with actual line breaks
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<p[^>]*>/gi, '')
    // Remove specific HTML tags but keep content
    .replace(/<b>/gi, '**')
    .replace(/<\/b>/gi, '**')
    .replace(/<i>/gi, '*')
    .replace(/<\/i>/gi, '*')
    .replace(/<strong>/gi, '**')
    .replace(/<\/strong>/gi, '**')
    .replace(/<em>/gi, '*')
    .replace(/<\/em>/gi, '*')
    // Remove other HTML tags but keep content
    .replace(/<[^>]+>/g, '')
    // Convert HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    // Clean up multiple spaces and line breaks
    .replace(/\s+/g, ' ')
    .replace(/\n\s+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

// Function to render HTML content safely with formatting
const renderHtmlContent = (htmlString) => {
  if (!htmlString) return '';
  
  // Process the HTML content for safe rendering
  let processedHtml = htmlString
    // Replace escaped characters
    .replace(/\\r\\n|\\r|\\n/g, '\n')
    // Convert newlines to HTML breaks (handle multiple newlines properly)
    .replace(/\n{3,}/g, '<br><br>')
    .replace(/\n{2}/g, '<br><br>')
    .replace(/\n/g, '<br>');

  // Handle bold tags separately to avoid being removed
  processedHtml = processedHtml
    .replace(/<b>(.*?)<\/b>/gi, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/<strong>(.*?)<\/strong>/gi, '<strong class="font-semibold text-gray-900">$1</strong>');

  // Handle other formatting
  processedHtml = processedHtml
    .replace(/<i>(.*?)<\/i>/gi, '<em class="italic">$1</em>')
    .replace(/<em>(.*?)<\/em>/gi, '<em class="italic">$1</em>')
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '<h1 class="text-2xl font-bold text-emerald-700 my-4">$1</h1>')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '<p class="mb-4">$1</p>')
    // Convert HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');

  // Remove only potentially dangerous tags, keep the safe ones we've processed
  processedHtml = processedHtml
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

  return processedHtml;
};

// Mock API call - replace with actual API endpoint
const fetchData = async () => {
  setLoading(true);
  try {
    // Actual API call
    const response = await fetch('/api/riyad');
    const apiData = await response.json();
    
    // Process the data to ensure proper structure
    const processedData = apiData.map(item => ({
      ...item,
      arab: item.arab || '',
      terjemah: item.terjemah || ''
    }));
    
    setData(processedData);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching data:', error);
    
    // Fallback to mock data if API fails
    const mockData = [
      {
        id: 1,
        kitab: "riyadhus_shalihin",
        arab: "مقدمة المؤَلف الإمَام النوَوي\\rبسم الله الرحمن الرحيم\\r\\rالحمْدُ للهِ الواحدِ القَهَّارِ، العَزيزِ الغَفَّارِ، مُكَوِّرِ  اللَّيْلِ على النَّهَارِ، تَذْكِرَةً لأُولي القُلُوبِ والأَبصَارِ، وتَبْصرَةً لِذَوي الأَلبَابِ واَلاعتِبَارِ",
        terjemah: "Pendahuluan\\n\\nDengan nama Allah yang Maha Pengasih lagi Maha Penyayang\\n\\nSegala puji bagi Allah Yang Maha Esa Lagi Perkasa, Yang Maha Mulia Lagi Pengampun Dosa, Yang Menyelimutkan malam pada siang, sebagai peringatan bagi orang-orang yang memiliki hati dan nalar, dan sebagai wawasan bagi yang memiliki akal dan pikiran."
      }
    ];
    
    setData(mockData);
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter(item => 
    cleanHtmlContent(item.arab).toLowerCase().includes(searchTerm.toLowerCase()) ||
    cleanHtmlContent(item.terjemah).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleBackToList = () => {
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-emerald-700 text-lg">Memuat Riyadhus Shalihin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-emerald-500">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-10 w-10 text-emerald-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Riyadhus Shalihin</h1>
                <p className="text-gray-600">Imam An-Nawawi</p>
              </div>
            </div>
            {selectedItem && (
              <button
                onClick={handleBackToList}
                className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <ArrowRight className="h-4 w-4 transform rotate-180" />
                <span>Kembali</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!selectedItem ? (
          <>
            {/* Search Bar */}
            <div className="mb-8">
              {/* <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Cari dalam kitab..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm"
                />
              </div> */}
            </div>

            {/* Display Options */}
            <div className="mb-6 flex flex-wrap gap-4">
              <label className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border">
                <input
                  type="checkbox"
                  checked={showArabic}
                  onChange={(e) => setShowArabic(e.target.checked)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-gray-700">Tampilkan Arab</span>
              </label>
              <label className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border">
                <input
                  type="checkbox"
                  checked={showTranslation}
                  onChange={(e) => setShowTranslation(e.target.checked)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-gray-700">Tampilkan Terjemahan</span>
              </label>
            </div>

            {/* Content List */}
            <div className="space-y-6">
              {filteredData.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">
                    {searchTerm ? 'Tidak ada hasil yang ditemukan' : 'Tidak ada data tersedia'}
                  </p>
                </div>
              ) : (
                filteredData.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 hover:border-emerald-300 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                          #{item.id}
                        </span>
                        <span className="text-gray-600 text-sm capitalize">
                          {item.kitab.replace('_', ' ')}
                        </span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>

                    {showArabic && (
                      <div className="mb-4">
                        <h3 className="text-gray-700 font-medium mb-2">النص العربي</h3>
                        <p className="text-right text-lg leading-relaxed font-arabic text-gray-800" dir="rtl">
                          {cleanHtmlContent(item.arab).substring(0, 200)}...
                        </p>
                      </div>
                    )}

                    {showTranslation && (
                      <div>
                        <h3 className="text-gray-700 font-medium mb-2">Terjemahan</h3>
                        <p className="text-gray-800 leading-relaxed">
                          {cleanHtmlContent(item.terjemah).substring(0, 200)}...
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          /* Detail View */
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                  #{selectedItem.id}
                </span>
                <span className="text-gray-600 text-sm capitalize">
                  {selectedItem.kitab.replace('_', ' ')}
                </span>
              </div>
            </div>

            {showArabic && (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
      <BookOpen className="h-6 w-6 mr-2 text-emerald-600" />
      النص العربي
    </h2>
    <div className="bg-gray-50 rounded-lg p-6 border-r-4 border-emerald-500">
      <pre className="text-right text-xl leading-loose font-arabic text-gray-800 whitespace-pre-wrap" dir="rtl">
        {cleanHtmlContent(selectedItem.arab)}
      </pre>
    </div>
  </div>
)}

{showTranslation && (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
      <Heart className="h-6 w-6 mr-2 text-emerald-600" />
      Terjemahan
    </h2>
    <div className="bg-emerald-50 rounded-lg p-6 border-l-4 border-emerald-500">
      <div 
        className="text-gray-800 leading-relaxed text-lg prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: renderHtmlContent(selectedItem.terjemah)
        }}
      />
    </div>
  </div>
)}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-emerald-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-lg font-semibold">Riyadhus Shalihin</span>
          </div>
          <p className="text-emerald-200">
            Karya Imam An-Nawawi - Taman Orang-Orang Shalih
          </p>
        </div>
      </footer>
    </div>
  );
};
// Tambahkan style ini di CSS global atau menggunakan style tag
<style jsx>{`
  .font-arabic {
    font-family: 'Traditional Arabic', 'Amiri', 'Scheherazade', serif;
    font-size: 1.25rem;
    line-height: 2;
  }
  
  .prose {
    max-width: none;
  }
  
  .prose p {
    margin-bottom: 1rem;
  }
  
  .prose strong {
    font-weight: 600;
    color: #059669;
  }
  
  .prose h1 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #047857;
    margin-bottom: 1rem;
  }
  
  .prose h2 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #059669;
    margin-bottom: 0.75rem;
  }
`}</style>

export default RiyadhusShalihinApp;