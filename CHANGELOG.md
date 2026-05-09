# Changelog

All notable changes to Job Tracker are documented here.

---

## [1.0.0] - 2026-05-09

### Added
- Multi-user authentication via Supabase Auth (login, register, logout)
- Add, update, and delete job applications
- Kanban board with drag and drop across status columns
- Table view with inline status updates
- Stats dashboard showing counts per status
- Daily email reminders via Resend cron job
- Browser push notifications for follow-ups due today
- Dark / Light mode toggle with Tailwind CSS
- Row Level Security on Supabase — users only see their own data
- JWT-based auth middleware on all Express API routes
- Deployed frontend to Vercel and backend to Render
