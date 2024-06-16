import { OpenAI } from 'openai';
//import { createClient } from '@supabase/supabase-js';
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});
export const FetchConjugations = async (callback) => {
  console.log("Attempting to fetch data...");
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{role: "assistant", content: "List one of the 10 most common verbs in Italian in its infinitive form. right next to it put its translation into English, and then in a table, provide the conjugation for the present tense"}],
      max_tokens: 100
    });
    console.log("API Response:", completion); // Log the full API response
    const content = completion.choices[0].message.content; // Log the first choice to see its contents

    if(completion) {
      console.log("Successfully fetched data from OpenAI");
      return content;
    } else {
      console.error("Failed to fetch data from OpenAI");
    }
  } catch (error) {
    console.error('Failed to fetch conjugations from OpenAI:', error);
    if (error.response && error.response.status === 429) {
      console.error('Rate limit exceeded, retrying in 30 seconds...');
      setTimeout(() => FetchConjugations(callback), 30000);
    } else {
      // Handle other types of errors
    }
  }
};
export default FetchConjugations;
