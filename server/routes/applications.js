const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const authMiddleware = require('../middleware/authMiddleware');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// GET - Fetch all applications for logged in user
router.get('/', authMiddleware, async (req, res) => {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST - Add new application
router.post('/', authMiddleware, async (req, res) => {
  const { company, role, status, job_url, notes, salary_range, location } = req.body;
  const applied_date = req.body.applied_date || null;
  const follow_up_date = req.body.follow_up_date || null;

  const { data, error } = await supabase
    .from('applications')
    .insert([{ user_id: req.user.id, company, role, status, applied_date, follow_up_date, job_url, notes, salary_range, location }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// PUT - Update an application
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const updates = {
  ...req.body,
  applied_date: req.body.applied_date || null,
  follow_up_date: req.body.follow_up_date || null,
  };

  const { data, error } = await supabase
    .from('applications')
    .update({ ...updates, updated_at: new Date() })
    .eq('id', id)
    .eq('user_id', req.user.id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// DELETE - Delete an application
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('id', id)
    .eq('user_id', req.user.id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Application deleted successfully' });
});

module.exports = router;