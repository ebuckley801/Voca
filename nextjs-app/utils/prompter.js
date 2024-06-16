"use client"
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
      messages: [{role: "assistant", content: "List the conjugations of the verb 'to be' in Italian in the present tense."}],
      max_tokens: 100
    });
    console.log("API Response:", completion); // Log the full API response
    const content = completion.choices[0].message.content; // Log the first choice to see its contents
    // if (completion.choices && completion.choices.length > 0 && completion.choices[0].text) {
    //   const text = completion.choices[0].text.trim();
    //   callback(text);  // Use the callback to update state
    // } else {
    //   console.error('No text available in the API response');
    //   callback(''); // Handle the case where no text is available
    // }
    if(completion) {
      console.log("Successfully fetched data from OpenAI");
      return content;
    } else {
      console.error("Failed to fetch data from OpenAI");
    }
  } catch (error) {
    console.error('Failed to fetch conjugations from OpenAI:', error);
    //callback(''); // Handle errors by calling back with empty string or appropriate error message
  }
};
export default FetchConjugations;