import fetch from 'node-fetch';

const data = {
  input: "Generate a 2-day meal plan for Vegetarian diet with a focus on Weight Loss."
};

try {
  console.log('Sending request...');
  const response = await fetch('http://localhost:5000/generate-meal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  console.log('Response status:', response.status);
  const text = await response.text();
  console.log('Response text:', text);
  
  const parsed = JSON.parse(text);
  console.log('Parsed JSON:', JSON.stringify(parsed, null, 2).substring(0, 500));
} catch (error) {
  console.error('Test error:', error.message);
}
