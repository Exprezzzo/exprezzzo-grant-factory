import { SovereignAI } from '../lib/sovereign-ai/router.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ai = new SovereignAI();

async function buildGrant(grantType: string) {
  console.log(`\n🏗️  Building ${grantType} grant application...`);
  
  const prompt = `Generate a ${grantType} grant application for EXPREZZZO platform. 
  
Key points:
- Founder: Jay, 53, kidney transplant survivor, 23 years Vegas hospitality
- $0.001 per operation vs BigTech $0.15
- 800+ vendor network ready
- Sovereign AI architecture
  
Create sections: Executive Summary, Founder Story, Problem, Solution, Market, Use of Funds.
Keep under 2000 words.`;

  const startTime = Date.now();
  const result = await ai.generate(prompt);
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log(`\n✅ Generated in ${duration}s`);
  console.log(`📊 Model: ${result.model.toUpperCase()}`);
  console.log(`💰 Cost: $${result.cost.toFixed(4)}`);
  
  const filename = `${grantType}-${Date.now()}.md`;
  const filepath = path.join(__dirname, '..', 'applications', filename);
  
  await fs.mkdir(path.join(__dirname, '..', 'applications'), { recursive: true });
  await fs.writeFile(filepath, result.content);
  
  console.log(`💾 Saved to: applications/${filename}\n`);
}

const grantType = process.argv[2] || 'general';
buildGrant(grantType).catch(console.error);