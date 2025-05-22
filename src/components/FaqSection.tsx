
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: "What is YT Scribe?",
    answer: "YT Scribe is a free tool that allows you to extract and download transcripts from YouTube videos in various formats."
  },
  {
    question: "Which video formats are supported?",
    answer: "YT Scribe supports standard YouTube video URLs, shortened youtu.be links, and direct video IDs."
  },
  {
    question: "What format options are available for download?",
    answer: "You can download transcripts in plain text (TXT), JSON format with timestamps, or SubRip Subtitle format (SRT) for video editing."
  },
  {
    question: "Why can't I get the transcript for certain videos?",
    answer: "Some videos don't have transcripts available, or they might be disabled by the content creator. Additionally, private videos or those with restricted access won't work with this tool."
  },
  {
    question: "Is this tool free to use?",
    answer: "Yes, YT Scribe is completely free to use without any limitations."
  },
  {
    question: "Does YT Scribe support languages other than English?",
    answer: "Yes, YT Scribe can extract transcripts in any language that YouTube provides captions for."
  },
  {
    question: "Do I need to create an account?",
    answer: "No, YT Scribe doesn't require any account creation or login to use all features."
  }
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about using YT Scribe to download YouTube transcripts.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-left">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
