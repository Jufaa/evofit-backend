import { UserPayload } from '@utils/jwt'; // Import your User type

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    // eslint-disable-next-line no-unused-vars
    interface Request {
      user?: UserPayload; // Add user property to Request
    }
  }
}
