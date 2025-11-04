import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import perkRoutes from './routes/perks.js';

const app = express();

app.use(morgan('dev'));
// In development allow requests from local dev servers. Using `origin: true`
// will echo back the request Origin header which is convenient for local dev
// (vite typically runs on 5173). For production set a specific origin instead.
app.use(cors({ origin: true, credentials: false }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/perks', perkRoutes);

// Not found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

export default app;
