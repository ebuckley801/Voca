import fs from 'fs';
import OpenAI from 'openai';
import path from 'path';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const filePath = path.resolve('public', 'testfile');
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1",
      });

      res.status(200).json({ transcription: transcription.text });
    } catch (error) {
      console.error('Error transcribing audio:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
