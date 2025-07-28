import { Router, Request, Response } from 'express';
import { authenticateJWT } from 'infrastructure/middlewares/authMiddleware';
import { authorizeRole } from 'infrastructure/middlewares/roleMiddleware';

const router = Router();

// General protected route
router.get('/profile', authenticateJWT, (_req: Request, res: Response) => {
  res.json({ message: 'This is a protected user profile route' });
});

// Admin-only route
router.get(
  '/admin',
  authenticateJWT,
  authorizeRole('admin'),
  (_req: Request, res: Response) => {
    res.json({ message: 'Welcome, admin. This is a protected admin route' });
  },
);

export default router;
