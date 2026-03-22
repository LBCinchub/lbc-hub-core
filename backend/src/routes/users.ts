import { Router } from 'express';
import type { User } from '@lbc/shared';

export const usersRouter = Router();

// GET /api/v1/users — placeholder
usersRouter.get('/', (_req, res) => {
  const users: Partial<User>[] = [
    {
      id: '1',
      displayName: 'Diamond Founder',
      isFounder: true,
      prestigeLevel: 'Diamond',
    },
  ];
  res.json({ data: users });
});
