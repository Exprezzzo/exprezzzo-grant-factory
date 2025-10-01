import Database from 'better-sqlite3';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db = new Database(path.join(__dirname, '..', 'grants.db'));

const apps = db.prepare(`
  SELECT * FROM applications 
  WHERE deadline IS NOT NULL 
  AND status NOT IN ('approved', 'rejected')
  ORDER BY deadline ASC
`).all();

console.log('\n📅 Upcoming Deadlines:\n');

const now = new Date();

apps.forEach((app: any) => {
  const deadline = new Date(app.deadline);
  const daysUntil = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  let urgency = '✅';
  if (daysUntil <= 3) urgency = '🔴';
  else if (daysUntil <= 7) urgency = '🟡';
  
  console.log(`${urgency} ${app.grant_name}`);
  console.log(`   Deadline: ${app.deadline} (${daysUntil} days)`);
  console.log(`   Status: ${app.status}\n`);
});

db.close();
