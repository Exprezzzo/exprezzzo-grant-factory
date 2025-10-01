import Handlebars from 'handlebars';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load company profile
const profilePath = path.join(__dirname, '..', 'company-profile.json');
const profile = JSON.parse(await fs.readFile(profilePath, 'utf-8'));

// Handlebars helpers
Handlebars.registerHelper('currency', (value: number) => {
  return '$' + value.toLocaleString();
});

export async function renderTemplate(templateName: string, customData: any = {}) {
  const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.md`);
  const templateContent = await fs.readFile(templatePath, 'utf-8');
  
  const template = Handlebars.compile(templateContent);
  
  const data = {
    ...profile,
    ...customData,
    timestamp: new Date().toISOString()
  };
  
  return template(data);
}
