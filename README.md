# 🗂️ Job Tracker

A full-stack job application tracking tool built with React, Node.js/Express, and Supabase. Track your job applications with a Kanban board, table view, email reminders, and dark/light mode.

![Job Tracker](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-24-green) ![Supabase](https://img.shields.io/badge/Supabase-Database-orange)

---

## ✨ Features

- **Authentication** — Secure multi-user login and registration via Supabase Auth
- **Kanban Board** — Drag and drop applications across status columns
- **Table View** — Sortable table with inline status updates
- **Stats Dashboard** — Live counts per status (Applied, Interview, Offer, Rejected, Ghosted)
- **Email Reminders** — Daily cron job sends follow-up reminders via Resend
- **Browser Notifications** — Alerts for follow-ups due today
- **Dark / Light Mode** — Full theme toggle across all pages
- **Responsive UI** — Built with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Email | Resend |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## 📁 Project Structure

```
job-tracker/
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── KanbanBoard.jsx
│   │   │   ├── ApplicationTable.jsx
│   │   │   └── AddApplicationModal.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── supabaseClient.js
│   │   └── App.jsx
│   └── .env
└── server/                   # Node.js backend
    ├── routes/
    │   └── applications.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── jobs/
    │   └── reminderCron.js
    ├── index.js
    └── .env
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- A [Supabase](https://supabase.com) account
- A [Resend](https://resend.com) account

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/job-tracker.git
cd job-tracker
```

### 2. Set up the database

Run the following SQL in your Supabase SQL Editor:

```sql
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT DEFAULT 'Applied',
  applied_date DATE,
  follow_up_date DATE,
  job_url TEXT,
  notes TEXT,
  salary_range TEXT,
  location TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own applications"
ON applications FOR ALL
USING (auth.uid() = user_id);
```

### 3. Configure environment variables

**client/.env**
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:5000
```

**server/.env**
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
```

### 4. Install dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 5. Run locally

Open two terminals:

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

Visit `http://localhost:5173`

---

## 🌐 Deployment

### Backend → Render
- Root Directory: `server`
- Build Command: `rm -rf node_modules && npm install`
- Start Command: `node index.js`
- Add all `server/.env` variables in Render's environment settings

### Frontend → Vercel
- Root Directory: `client`
- Framework: Vite (auto-detected)
- Add all `client/.env` variables in Vercel's environment settings
- Update `VITE_API_URL` to your Render service URL

### Supabase Auth
After deploying, update your Supabase Auth settings:
- **Site URL:** `https://your-app.vercel.app`
- **Redirect URLs:** `https://your-app.vercel.app/**`

---

## 📧 Email Reminders

The server runs a cron job every day at 8 AM that:
1. Queries all applications where `follow_up_date` equals today
2. Groups them by user
3. Sends a digest email via Resend

---

## 🔒 Security

- Row Level Security (RLS) enabled on all Supabase tables
- JWT-based auth middleware on all API routes
- Environment variables never committed to Git
- Users can only access their own data

---

## 📌 Future Improvements

- [ ] CSV export of all applications
- [ ] Stats charts (interview rate, offer rate)
- [ ] Resume version tracking per application
- [ ] Tags (Remote, Startup, Dream Job)
- [ ] Edit application modal

---

## 📄 License

MIT License — feel free to use and modify for your own projects.
