import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const ffmpeg = createFFmpeg({ log: true });
      await ffmpeg.load();

      const audioData = await req.arrayBuffer();
      ffmpeg.FS('writeFile', 'input.webm', new Uint8Array(audioData));
      await ffmpeg.run('-i', 'input.webm', '-b:a', '192k', 'output.mp3');
      const mp3Data = ffmpeg.FS('readFile', 'output.mp3');
      const mp3Buffer = Buffer.from(mp3Data.buffer);

      // Transcribe using OpenAI
      const transcription = await openai.audio.transcriptions.create({
        file: new Blob([mp3Buffer], { type: 'audio/mpeg' }),
        model: "whisper-1",
        language: "it"  // Specify Italian language
      });

      console.log('Transcription:', transcription.text);

      res.status(200).json({ 
        transcription: transcription.text
      });
    } catch (error) {
      console.error('Error processing audio:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}