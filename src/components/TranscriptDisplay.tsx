
import React, { useState } from 'react';
import { TranscriptSegment } from '../utils/transcript';
import { Skeleton } from './ui/skeleton';
import { Input } from './ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Download, Search } from 'lucide-react';
import { toast } from 'sonner';

interface TranscriptDisplayProps {
  transcript: TranscriptSegment[];
  isLoading: boolean;
  videoId: string;
  onDownload: (format: 'txt' | 'json' | 'srt') => void;
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  transcript,
  isLoading,
  videoId,
  onDownload
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTranscript = searchQuery 
    ? transcript.filter(segment => 
        segment.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : transcript;
    
  const copyToClipboard = () => {
    const text = transcript.map(segment => segment.text).join('\n\n');
    navigator.clipboard.writeText(text);
    toast.success('Transcript copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-8 w-1/2" />
      </div>
    );
  }
  
  if (!transcript.length) {
    return null;
  }
  
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Transcript</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search transcript..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
          
          <Button variant="outline" size="icon" onClick={copyToClipboard} title="Copy to clipboard">
            <Copy className="h-4 w-4" />
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDownload('txt')}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" /> TXT
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDownload('json')}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" /> JSON
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDownload('srt')}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" /> SRT
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto border rounded-md p-4 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        {filteredTranscript.length > 0 ? (
          filteredTranscript.map((segment, index) => (
            <div 
              key={index} 
              className="mb-4 last:mb-0 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                {formatTime(segment.offset)}
              </p>
              <p className="text-gray-900 dark:text-gray-100">
                {highlightText(segment.text, searchQuery)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center py-8 text-gray-600 dark:text-gray-400">
            No matching text found.
          </p>
        )}
      </div>
    </div>
  );
};

// Helper function to format time display
const formatTime = (seconds: number): string => {
  // The YouTube Transcript API returns timestamps in seconds
  const totalSeconds = typeof seconds === 'number' ? seconds : 0;
  
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);
  
  // Format: HH:MM:SS or MM:SS depending on if hours exist
  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
};

// Helper function to highlight search text
const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query) return text;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) => 
    part.toLowerCase() === query.toLowerCase() 
      ? <mark key={index} className="bg-yellow-200 dark:bg-yellow-800">{part}</mark>
      : part
  );
};

export default TranscriptDisplay;
