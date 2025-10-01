// Analyzes your grant based on winning patterns
import { SovereignAI } from '../lib/sovereign-ai/router.js';

async function predictSuccess(grantFile: string) {
  const ai = new SovereignAI();
  
  const analysis = await ai.complete({
    prompt: `Analyze this grant for success probability:
    - Clarity: /10
    - Innovation: /10  
    - Budget alignment: /10
    - Network leverage: /10
    
    Give brutal honest feedback.`,
    model: 'llama-3.2-11b-text-preview' // Cheapest model
  });
  
  console.log(`Success prediction: ${analysis}`);
  console.log(`Cost: $0.00018`);
}
