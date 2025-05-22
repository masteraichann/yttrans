
import React from 'react';
import { Link, Clipboard, FileDown, Search } from 'lucide-react';

const steps = [
  {
    title: "Paste YouTube URL",
    description: "Copy the URL of any YouTube video from your browser and paste it into the input field.",
    icon: Link
  },
  {
    title: "Get Transcript",
    description: "Click the 'Get Transcript' button to fetch the video's transcript. The video will display with its full transcript below.",
    icon: Clipboard
  },
  {
    title: "Search Content",
    description: "Use the search bar to quickly find specific words or phrases within the transcript.",
    icon: Search
  },
  {
    title: "Download Options",
    description: "Download the transcript in your preferred format: TXT for plain text, JSON for data with timestamps, or SRT for video subtitles.",
    icon: FileDown
  }
];

const HowToUseSection = () => {
  return (
    <section id="how-to-use" className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">How To Use YT Scribe</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to get transcripts from any YouTube video in seconds
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              <div className="mt-4 inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-foreground font-medium">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;
