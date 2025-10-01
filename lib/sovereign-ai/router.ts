import fetch from 'node-fetch';

interface AIResponse {
  content: string;
  model: 'groq';
  cost: number;
  sovereign: boolean;
}

export class SovereignAI {
  async generate(prompt: string): Promise<AIResponse> {
    console.log('☁️  Using Groq API (isolated to this project only)...');
    
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey || apiKey === 'optional_fallback') {
      throw new Error('GROQ_API_KEY not found in .env file');
    }
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [{ 
          role: 'user', 
          content: prompt 
        }],
        temperature: 0.7,
        max_tokens: 2048
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Groq API failed: ${error}`);
    }
    
    const data: any = await response.json();
    
    return {
      content: data.choices[0].message.content,
      model: 'groq',
      cost: 0.0002,
      sovereign: false
    };
  }
}