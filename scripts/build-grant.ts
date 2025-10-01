import { SovereignAI } from '../lib/sovereign-ai/router.js';
import { renderTemplate } from './render-template.js';
import Database from 'better-sqlite3';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ai = new SovereignAI();
const db = new Database(path.join(__dirname, '..', 'grants.db'));

interface GrantOptions {
  template?: string;
  amount?: number;
  deadline?: string;
  customData?: any;
}

async function buildGrant(grantType: string, options: GrantOptions = {}) {
  console.log(`\n🏗️  Building ${grantType} grant application...`);
  
  // Insert into database
  const insert = db.prepare(`
    INSERT INTO applications (grant_name, grant_type, amount_requested, deadline, status)
    VALUES (?, ?, ?, ?, 'draft')
  `);
  
  const result = insert.run(grantType, options.template || 'general', options.amount || 0, options.deadline || null);
  const appId = result.lastInsertRowid;
  
  // Render template if specified
  let baseContent = '';
  if (options.template) {
    try {
      baseContent = await renderTemplate(options.template, {
        grant_name: grantType,
        amount_requested: options.amount,
        ...options.customData
      });
      console.log(`📄 Template rendered: ${options.template}`);
    } catch (e) {
      console.log(`⚠️  Template not found, using AI generation only`);
    }
  }
  
  const prompt = `${baseContent}\n\nEnhance this grant application with additional details and polish the language. Keep all existing information but expand where appropriate.`;
  
  const startTime = Date.now();
  const result_ai = await ai.generate(prompt);
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log(`\n✅ Generated in ${duration}s`);
  console.log(`📊 Model: ${result_ai.model.toUpperCase()}`);
  console.log(`💰 Cost: $${result_ai.cost.toFixed(4)}`);
  
  const filename = `${grantType}-${Date.now()}.md`;
  const filepath = path.join(__dirname, '..', 'applications', filename);
  
  await fs.mkdir(path.join(__dirname, '..', 'applications'), { recursive: true });
  await fs.writeFile(filepath, result_ai.content);
  
  // Record document
  db.prepare(`
    INSERT INTO documents (application_id, filename, filepath)
    VALUES (?, ?, ?)
  `).run(appId, filename, filepath);
  
  console.log(`💾 Saved to: applications/${filename}`);
  console.log(`🗄️  Database ID: ${appId}\n`);
}

// Parse command line args
const grantType = process.argv[2] || 'general';
const options: GrantOptions = {};

for (let i = 3; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (arg.startsWith('--template=')) options.template = arg.split('=')[1];
  if (arg.startsWith('--amount=')) options.amount = parseInt(arg.split('=')[1]);
  if (arg.startsWith('--deadline=')) options.deadline = arg.split('=')[1];
}

buildGrant(grantType, options).catch(console.error);
