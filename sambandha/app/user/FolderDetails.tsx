'use client';

import React, { useState } from 'react';
import { ChevronLeft, Edit } from 'lucide-react';

interface FolderDetailProps {
  onBack: () => void;
  folderName?: string;
  onHomeClick: () => void;
}

export default function FolderDetail({ onBack, folderName = 'Folder Name', onHomeClick }: FolderDetailProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Sample images for the folder
  const images = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&q=80',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80',
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 flex items-center justify-center">
      {/* Phone Frame */}
      <div className="w-full max-w-sm bg-white flex flex-col h-full">
        
        {/* Header */}
        <div className="p-6 flex items-center justify-between flex-shrink-0 border-b border-gray-100">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Folder Info with Edit Button */}
        <div className="px-6 pt-4 pb-6 flex-shrink-0 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{folderName}</h1>
            <p className="text-sm text-gray-500">Created on 18th Dec 2021</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all">
            <Edit className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Image Grid - Scrollable */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-6">
          <div className="grid grid-cols-2 gap-6">
            {images.map((img, index) => (
              <div 
                key={index}
                className="rounded-2xl overflow-hidden hover:opacity-90 transition-all cursor-pointer border-8 border-white shadow-lg"
                onClick={() => setSelectedImage(img)}
                style={{ 
                  transform: index % 2 === 0 ? 'rotate(-2deg)' : 'rotate(2deg)',
                  aspectRatio: '3/4'
                }}
              >
                <img 
                  src={img}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full">
            <img 
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}