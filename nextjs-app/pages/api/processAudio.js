import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { Configuration, OpenAIApi } from 'openai';
import { createClient } from '@supabase/supabase-js';
import multer from 'multer';
import fs from 'fs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ffmpeg = createFFmpeg({ log: true });
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const upload = multer({ storage: multer.memoryStorage() });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      if (!ffmpeg.isLoaded()) await ffmpeg.load();
      const audioData = req.file.buffer;
      ffmpeg.FS('writeFile', 'input.webm', audioData);
      await ffmpeg.run('-i', 'input.webm', '-b:a', '192k', 'output.mp3');
      const mp3Data = ffmpeg.FS('readFile', 'output.mp3');
      const mp3Buffer = Buffer.from(mp3Data.buffer);
      // Transcribe MP3 to text using OpenAI's Whisper
      const transcriptionResponse = await openai.createTranscription({
        model: "whisper-1",
        file: Buffer.from(mp3Buffer),
      });

      // Convert transcription to JSON
      const transcriptionJson = {
        transcription: transcriptionResponse.data.text,
        timestamp: new Date().toISOString()
      };

      //convert transcriptionJson to jsonstring
      const transcriptionJsonString = JSON.stringify(transcriptionJson);

      //write to json file
      fs.writeFileSync('transcription.json', transcriptionJsonString);

      // Insert transcription JSON into Supabase
      const { data, error } = await supabase
        .from('Language_Questions')
        .insert([{ response: transcriptionJson }], { returning: 'minimal' });

      if (error) throw error;

      res.status(200).json({ message: 'Transcription saved successfully' });
    } catch (error) {
      console.error('Error processing audio:', error);
      res.status(500).json({ error: 'Failed to process audio' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}