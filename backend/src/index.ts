import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import sentinelConfig from '../../sentinel.config';
import { healthRouter } from './routes/health';
import { usersRouter } from './routes/users';
import { productsRouter } from './routes/products';

const app = express();
const PORT = process.env.PORT ?? 3001;

// ── Security middleware (Sentinel protocols) ─────────────────────────────────
app.use(helmet());

app.use(
  cors({
    origin: sentinelConfig.cors.allowedOrigins,
    methods: sentinelConfig.cors.allowedMethods,
    credentials: sentinelConfig.cors.allowCredentials,
  }),
);

// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: sentinelConfig.rateLimit.global.windowSeconds * 1000,
  max: sentinelConfig.rateLimit.global.maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});
app.use(globalLimiter);

// ── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/health', healthRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/products', productsRouter);

// ── 404 handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Error handler ─────────────────────────────────────────────────────────────
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
  },
);

app.listen(PORT, () => {
  console.log(
    `🚀 LBC Hub Backend running on http://localhost:${PORT} [${sentinelConfig.environment}]`,
  );
});

export default app;
