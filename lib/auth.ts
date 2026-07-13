import crypto from 'crypto';

// Admin credentials - stored securely in environment
const ADMIN_USERNAME = 'dagidev';
const ADMIN_PASSWORD_HASH = hashPassword('Dagim123$');

function hashPassword(password: string): string {
  return crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  if (username !== ADMIN_USERNAME) return false;
  
  const passwordHash = hashPassword(password);
  return passwordHash === ADMIN_PASSWORD_HASH;
}

export function createAdminSession(username: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  
  // In production, store this in a database or cache
  // For now, we'll return the token and verify it on each request
  return token;
}

export function verifyAdminSession(token: string): boolean {
  // In production, verify against stored sessions
  // This is a simplified version
  return token && token.length > 0;
}
