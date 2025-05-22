import express from 'express';
import cors from 'cors';
import { YoutubeTranscript } from 'youtube-transcript';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint to fetch YouTube transcript
app.get('/api/transcript/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    
    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }
    
    console.log(`Fetching transcript for video ID: ${videoId}`);
    
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      
      // Debug log to see the actual format
      if (transcript && transcript.length > 0) {
        console.log('First transcript segment sample:', JSON.stringify(transcript[0]));
      }
      
      // Validate and normalize transcript data
      const normalizedTranscript = transcript.map(segment => {
        // Ensure we're handling the data format correctly
        console.log(`Segment offset: ${segment.offset}, type: ${typeof segment.offset}`);
        console.log(`Segment duration: ${segment.duration}, type: ${typeof segment.duration}`);
        
        return {
          text: segment.text || '',
          offset: typeof segment.offset === 'number' ? segment.offset : 0,
          duration: typeof segment.duration === 'number' ? segment.duration : 0
        };
      });
      
      return res.json(normalizedTranscript);
    } catch (transcriptError) {
      // Check if this is a disabled transcript error
      if (transcriptError.message && transcriptError.message.includes('Transcript is disabled')) {
        return res.status(404).json({ 
          error: 'Transcript is disabled or not available for this video.',
          details: 'The video owner may have disabled captions or they are not available in any language.'
        });
      }
      
      // Handle other specific errors
      throw transcriptError;
    }
  } catch (error) {
    console.error('Error fetching transcript:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch transcript. Please check if the video has captions available.',
      details: error.message
    });
  }
});

// Catch-all route to serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
