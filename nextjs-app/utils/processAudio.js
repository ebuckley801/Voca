// pages/api/processAudio.js
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      if (!ffmpeg.isLoaded()) await ffmpeg.load();
      const audioData = req.body;
      ffmpeg.FS('writeFile', 'input.webm', audioData);
      await ffmpeg.run('-i', 'input.webm', '-b:a', '192k', 'output.mp3');
      const mp3Data = ffmpeg.FS('readFile', 'output.mp3');
      const mp3Buffer = Buffer.from(mp3Data.buffer);
      res.setHeader('Content-Type', 'audio/mpeg');
      res.send(mp3Buffer);
    } catch (error) {
      console.error('Error processing audio:', error);
      res.status(500).json({ error: 'Failed to process audio' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}