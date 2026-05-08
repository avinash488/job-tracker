const cron = require('node-cron');
const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

// Runs every day at 8 AM
cron.schedule('0 8 * * *', async () => {
  console.log('Running follow-up reminder cron job...');

  const today = new Date().toISOString().split('T')[0];

  // Fetch all applications with follow-up date = today
  const { data: applications, error } = await supabase
    .from('applications')
    .select('*, auth.users!user_id(email)')
    .eq('follow_up_date', today);

  if (error) {
    console.error('Cron job error:', error.message);
    return;
  }

  if (applications.length === 0) {
    console.log('No follow-ups due today.');
    return;
  }

  // Group applications by user email
  const grouped = {};
  for (const app of applications) {
    const email = app.users?.email;
    if (!email) continue;
    if (!grouped[email]) grouped[email] = [];
    grouped[email].push(app);
  }

  // Send email to each user
  for (const [email, apps] of Object.entries(grouped)) {
    const appList = apps
      .map(a => `<li><strong>${a.company}</strong> — ${a.role} (${a.status})</li>`)
      .join('');

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `📬 You have ${apps.length} follow-up(s) due today!`,
      html: `
        <h2>Job Application Follow-ups Due Today</h2>
        <p>Don't forget to follow up on these applications:</p>
        <ul>${appList}</ul>
        <p>Good luck! 🚀</p>
      `
    });

    console.log(`Reminder sent to ${email}`);
  }
});