import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request interface to attach decoded user payload
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    name: string;
  };
}

/**
 * Authentication Middleware
 * Validates JSON Web Token (JWT) sent in Authorization header ("Bearer <token>")
 */
export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  // Extract Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({
      error: 'Access denied. Authentication token missing.',
    });
  }

  // Get secret key from environment variables
  const jwtSecret = process.env.JWT_SECRET || 'fallback_jwt_secret_key_2026';

  try {
    // Verify JWT token signature and expiration
    const decoded = jwt.verify(token, jwtSecret) as {
      userId: string;
      email: string;
      name: string;
    };

    // Attach decoded user info to request object
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid or expired token. Please log in again.',
    });
  }
}
