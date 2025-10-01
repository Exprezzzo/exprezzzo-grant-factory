import puppeteer from 'puppeteer';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function exportPDF(mdFile: string) {
  // Fix: Don't add 'applications' if it's already in the path
  const mdPath = mdFile.startsWith('applications/') 
    ? path.join(__dirname, '..', mdFile)
    : path.join(__dirname, '..', 'applications', mdFile);
    
  const mdContent = await fs.readFile(mdPath, 'utf-8');
  
  // Convert markdown to HTML (simple version)
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; padding: 2cm; line-height: 1.6; }
      h1 { border-bottom: 2px solid #000; padding-bottom: 10px; }
      h2 { margin-top: 30px; color: #333; }
    </style>
  </head>
  <body>${mdContent.replace(/\n/g, '<br>')}</body>
  </html>
  `;
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html);
  
  const pdfPath = mdPath.replace('.md', '.pdf');
  await page.pdf({ path: pdfPath, format: 'A4' });
  
  await browser.close();
  console.log(`✅ PDF created: ${pdfPath}`);
}

const file = process.argv[2];
if (!file) {
  console.log('Usage: pnpm export:pdf <filename.md>');
  process.exit(1);
}

exportPDF(file).catch(console.error);
