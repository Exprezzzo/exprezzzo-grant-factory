import Database from 'better-sqlite3';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db = new Database(path.join(__dirname, '..', 'grants.db'));

const status = process.argv[2];

if (!status) {
  // Show all
  const apps = db.prepare(`
    SELECT * FROM applications ORDER BY deadline ASC
  `).all();
  
  console.log('\n📋 Grant Applications:\n');
  apps.forEach((app: any) => {
    console.log(`${app.id}. ${app.grant_name}`);
    console.log(`   Status: ${app.status}`);
    console.log(`   Amount: $${app.amount_requested?.toLocaleString() || '0'}`);
    console.log(`   Deadline: ${app.deadline || 'Not set'}\n`);
  });
} else {
  // Filter by status
  const apps = db.prepare(`
    SELECT * FROM applications WHERE status = ? ORDER BY deadline ASC
  `).all(status);
  
  console.log(`\n📋 ${status.toUpperCase()} Applications:\n`);
  apps.forEach((app: any) => {
    console.log(`- ${app.grant_name} (ID: ${app.id})`);
  });
}

db.close();
