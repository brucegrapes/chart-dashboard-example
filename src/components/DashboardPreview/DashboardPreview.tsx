import React from 'react';
import { Layout } from '@/types/layout';

interface DashboardPreviewProps {
  layout: Layout[];
  className?: string;
}

export default function DashboardPreview({ layout, className = '' }: DashboardPreviewProps) {
  const gridSize = { width: 120, height: 80 }; // Small preview size
  const cols = 12;
  const padding = 2;

  // Scale the layout coordinates to fit the preview size
  const scaledLayout = layout.map(item => ({
    ...item,
    x: (item.x * gridSize.width) / cols,
    y: item.y * (gridSize.height / 6), // Assuming 6 rows max
    w: (item.w * gridSize.width) / cols,
    h: item.h * (gridSize.height / 6),
  }));

  return (
    <div 
      className={`relative bg-gray-100 rounded ${className}`}
      style={{ width: gridSize.width, height: gridSize.height, overflow: 'clip' }}
    >
      {scaledLayout.map((item) => (
        <div
          key={item.i}
          className="absolute bg-white border border-gray-200 rounded shadow-sm"
          style={{
            left: item.x + padding,
            top: item.y + padding,
            width: Math.max(item.w - padding * 2, 0),
            height: Math.max(item.h - padding * 2, 0),
          }}
        >
          <div className="w-full h-1.5 bg-blue-500 rounded-t"></div>
        </div>
      ))}
    </div>
  );
}