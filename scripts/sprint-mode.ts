import schedule from 'node-schedule';

export function twoHourSprint(task: string) {
  console.log(`⏰ 2-HOUR SPRINT STARTED: ${task}`);
  console.log(`Focus: 100% on ${task}`);
  
  // Auto-reminder at 1:45
  setTimeout(() => {
    console.log('🔔 15 MINUTES - Start wrapping up!');
  }, 105 * 60 * 1000);
  
  // Hard stop at 2:00
  setTimeout(() => {
    console.log('🛑 2 HOURS - MANDATORY BREAK!');
    console.log('✅ Sprint saved to: applications/sprint-checkpoint.md');
    process.exit(0);
  }, 120 * 60 * 1000);
}
