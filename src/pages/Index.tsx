
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2, Youtube } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import TranscriptDisplay from '@/components/TranscriptDisplay';
import VideoInfoDisplay from '@/components/VideoInfoDisplay';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HowToUseSection from '@/components/HowToUseSection';
import FaqSection from '@/components/FaqSection';
import { 
  TranscriptSegment, 
  downloadTranscript, 
  extractVideoId, 
  fetchTranscript 
} from '@/utils/transcript';

const Index = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error('Please enter a YouTube URL or video ID');
      return;
    }
    
    try {
      const id = extractVideoId(url.trim());
      setVideoId(id);
    } catch (error) {
      toast.error('Invalid YouTube URL or video ID');
      console.error(error);
    }
  };
  
  // Fetch transcript data
  const { 
    data: transcript, 
    isLoading, 
    error,
    isError
  } = useQuery({
    queryKey: ['transcript', videoId],
    queryFn: () => videoId ? fetchTranscript(videoId) : Promise.resolve([]),
    enabled: !!videoId,
    retry: 1, // Only retry once to avoid excessive requests
  });
  
  // Handle errors from the query
  React.useEffect(() => {
    if (isError && error instanceof Error) {
      toast.error(error.message);
    }
  }, [isError, error]);
  
  // Handle download button click
  const handleDownload = (format: 'txt' | 'json' | 'srt') => {
    if (transcript && videoId) {
      downloadTranscript(transcript, format, videoId);
    }
  };
  
  // Display error if needed
  if (isError && error instanceof Error) {
    toast.error(error.message);
  }
  
  return (
    <>
      <Helmet>
        <title>YT Scribe - YouTube Transcript Extracter</title>
        <meta name="description" content="Extract and download transcripts from YouTube videos easily. Get subtitles in TXT, JSON, or SRT format for any YouTube video with captions." />
        <meta name="keywords" content="YouTube, transcript, subtitles, captions, download, converter, SRT, JSON, text" />
        <meta property="og:title" content="YT Scribe - YouTube Transcript Extracter" />
        <meta property="og:description" content="Extract and download transcripts from YouTube videos easily." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YT Scribe - YouTube Transcript Extracter" />
        <meta name="twitter:description" content="Extract and download transcripts from YouTube videos easily." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <section className="bg-gradient-to-b from-muted/50 to-background py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold sm:text-5xl">
                  YouTube Transcript Extracter
                </h1>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground">
                  Get the transcript for any YouTube video and download it in your preferred format
                </p>
              </div>
              
              <div className="bg-card shadow rounded-lg p-6 mb-8">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      type="text" 
                      value={url} 
                      onChange={(e) => setUrl(e.target.value)} 
                      placeholder="Paste YouTube URL or video ID"
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading || !url.trim()}
                    className="w-full sm:w-auto"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
                      </>
                    ) : (
                      'Get Transcript'
                    )}
                  </Button>
                </form>
              </div>
              
              {/* Display video if ID is available */}
              {videoId && <VideoInfoDisplay videoId={videoId} />}
              
              {/* Display transcript data */}
              {videoId && (
                <TranscriptDisplay 
                  transcript={transcript || []} 
                  isLoading={isLoading} 
                  videoId={videoId}
                  onDownload={handleDownload}
                />
              )}
            </div>
          </section>
          
          <HowToUseSection />
          <FaqSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
