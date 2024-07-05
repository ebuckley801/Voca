import { OpenAI } from 'openai';
//import { createClient } from '@supabase/supabase-js';
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});
export const FetchConjugations = async () => {
  console.log("Attempting to fetch data...");
  let attempts = 0;
  while (attempts < 3) {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ 
          role: "assistant", 
          content: "List one of the 10 most common verbs in Italian in its infinitive form. Right next to it put its translation into English, and then in a table, provide the conjugation for the present tense"
        }],
        max_tokens: 100
      });
      console.log("API Response:", completion);
      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Attempt', attempts + 1, 'Failed:', error);
      if (error.response && error.response.status === 429) {
        console.error('Rate limit exceeded, retrying in 20 seconds...');
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 20000));
      } else {
        throw error;
      }
    }
  }
  throw new Error('Failed to fetch conjugations after 3 attempts');
};

export default FetchConjugations;
