/**
 * Security & Data Sanitization Utilities
 * Kijana Kreatives Foundation
 */

/**
 * Sanitizes generic user text input to neutralize potential HTML / script injection
 * and enforce maximum length limits.
 */
export function sanitizeText(input: string, maxLength: number = 500): string {
  if (typeof input !== 'string') return '';
  
  // Truncate to maximum permissible length
  let clean = input.slice(0, maxLength);
  
  // Remove dangerous control characters and null bytes
  clean = clean.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F]/g, '');
  
  // Strip potential script / html tag injections
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<[^>]+>/g, '');
  
  return clean.trim();
}

/**
 * Validates email format strictly against RFC 5322 compliance pattern
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 254) return false;
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates phone numbers (supports Kenyan national and international E.164 formats)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return true; // Optional field in some forms
  const cleanPhone = phone.replace(/[\s\-()]/g, '');
  // Allow empty or 7 to 15 digits optionally starting with '+'
  return /^\+?[0-9]{7,15}$/.test(cleanPhone);
}

/**
 * Sanitizes and bounds numeric financial amounts
 */
export function sanitizeAmount(amount: number | string, min: number = 1, max: number = 10000000): number {
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.]/g, '')) : amount;
  if (isNaN(num) || !isFinite(num)) return min;
  return Math.min(Math.max(Math.round(num), min), max);
}

/**
 * Client-side in-memory rate limiter to mitigate automated form spam
 */
const submissionTimestamps: Record<string, number> = {};

export function isRateLimited(actionKey: string, cooldownMs: number = 3000): boolean {
  const now = Date.now();
  const lastTime = submissionTimestamps[actionKey] || 0;
  
  if (now - lastTime < cooldownMs) {
    return true;
  }
  
  submissionTimestamps[actionKey] = now;
  return false;
}
