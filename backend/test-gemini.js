import { GoogleGenAI } from '@google/genai';

const client = new GoogleGenAI({ apiKey: 'AIzaSyA0ZYKmg3JufPcUL6GVszwWhZ4zDIGyLO4' });

try {
  const response = await client.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: 'Say hello' }] }],
    generationConfig: { responseMimeType: 'application/json' },
  });
  
  console.log('Response type:', typeof response);
  console.log('Response keys:', Object.keys(response));
  console.log('Response.text:', response.text);
  console.log('Full response:', JSON.stringify(response, null, 2));
} catch (error) {
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
}
