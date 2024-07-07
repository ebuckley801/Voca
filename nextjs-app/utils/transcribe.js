import OpenAI from 'openai';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export default async function transcribe() {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: new File([""], "testfile"), // Replace with actual file handling
      model: "whisper-1",
    });

    return transcription.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    return '';
  }
}
