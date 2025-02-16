import { Injectable } from '@nestjs/common';
import { ElevenLabs } from '@elevenlabs/node'; // Import ElevenLabs
import * as ffmpeg from 'fluent-ffmpeg';

@Injectable()
export class PodcastService {
  private elevenLabs: ElevenLabs;

  constructor() {
    this.elevenLabs = new ElevenLabs({
      apiKey: process.env.ELEVENLABS_API_KEY, // From environment variables!
    });
  }

  async generateSpeech(text: string, voiceId: string, outputPath: string): Promise<string> { // voiceId is important
      try {
          const audioStream = await this.elevenLabs.generate({
              text,
              voice: voiceId, // Example: "21m00Tcm4ObHF4m9eFjX" - Replace with your voice ID
          });
          // ... (Save the audioStream to a file using fs.promises) ...
          ffmpeg(audioStream)
          .output(outputPath)
          .on('end', () => console.log('Podcast generated successfully'))
          .run();
          return 'path/to/audioStream.wav'; // Return the path
      } catch (error) {
          console.error('Error generating speech:', error);
          throw new Error(`Error generating speech: ${error.message}`);
      }
  }
}