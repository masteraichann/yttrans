
export interface TranscriptSegment {
  text: string;
  duration: number;
  offset: number;
}

export async function fetchTranscript(videoId: string): Promise<TranscriptSegment[]> {
  try {
    // Define the API URL (using relative URL for same-origin requests)
    const apiUrl = `/api/transcript/${videoId}`;
    
    // Fetch transcript from our backend server
    console.log(`Fetching transcript from server for video ID: ${videoId}`);
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch transcript');
    }
    
    const transcript = await response.json();
    
    if (!transcript || transcript.length === 0) {
      throw new Error('No transcript available for this video');
    }
    
    return transcript;
  } catch (error) {
    console.error('Error in fetchTranscript:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to fetch transcript. Please check if the video has captions available.'
    );
  }
}

// Function to extract YouTube video ID from various URL formats
export function extractVideoId(url: string): string {
  // Handle direct video ID input
  if (url.length === 11) {
    return url;
  }

  // Handle various YouTube URL formats
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  
  if (match && match[1]) {
    return match[1];
  }
  
  throw new Error('Invalid YouTube URL or video ID');
}

// Format transcript for download
export function formatTranscript(transcript: TranscriptSegment[], format: 'txt' | 'json' | 'srt'): string {
  if (format === 'json') {
    return JSON.stringify(transcript, null, 2);
  }
  
  if (format === 'txt') {
    return transcript.map(segment => segment.text).join('\n\n');
  }
  
  if (format === 'srt') {
    return transcript.map((segment, index) => {
      const startTime = formatSrtTime(segment.offset);
      const endTime = formatSrtTime(segment.offset + segment.duration);
      
      return `${index + 1}
${startTime} --> ${endTime}
${segment.text}
`;
    }).join('\n\n');
  }
  
  return '';
}

// Helper function for SRT time format
function formatSrtTime(seconds: number): string {
  // The YouTube Transcript API returns timestamps in seconds
  const totalSeconds = seconds;
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);
  const ms = Math.floor((totalSeconds - Math.floor(totalSeconds)) * 1000);
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
}

// Download transcript file
export function downloadTranscript(transcript: TranscriptSegment[], format: 'txt' | 'json' | 'srt', videoId: string): void {
  const content = formatTranscript(transcript, format);
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  a.href = url;
  a.download = `transcript_${videoId}.${format}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
