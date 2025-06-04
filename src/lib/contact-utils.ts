/**
 * Utility functions for the contact form
 */

/**
 * Validates an email address format
 * 
 * @param email The email address to validate
 * @returns Boolean indicating if the email format is valid
 */
export const isValidEmail = (email: string): boolean => {
  // More comprehensive email validation regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.length <= 320 && emailRegex.test(email);
};

/**
 * Sanitizes user input to prevent potential XSS attacks
 * 
 * @param input The string to sanitize
 * @returns Sanitized string
 */
export const sanitizeInput = (input: string): string => {
  // More comprehensive sanitization for preventing XSS attacks
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\\/g, '&#92;')
    .replace(/`/g, '&#96;')
    .trim();
};

/**
 * Validates user input against length constraints and unwanted patterns
 * 
 * @param input The string to validate
 * @param minLength Minimum acceptable length
 * @param maxLength Maximum acceptable length
 * @returns Boolean indicating if the input is valid
 */
export const isValidInput = (input: string, minLength: number, maxLength: number): boolean => {
  if (!input || input.trim().length < minLength || input.length > maxLength) {
    return false;
  }
  
  // Check for potentially suspicious patterns like excessive HTML or scripts
  const suspiciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+=/gi, // matches onClick=, onLoad=, etc.
    /data:/gi // data: URLs that could be used for XSS
  ];
  
  return !suspiciousPatterns.some(pattern => pattern.test(input));
};

/**
 * Rate limiting helper to prevent abuse
 */
export const rateLimitMap = new Map<string, { count: number, timestamp: number }>();

/**
 * Checks if a request from an IP exceeds rate limits
 * 
 * @param ip The IP address of the requester
 * @param limitWindow Time window in ms (e.g., 3600000 for 1 hour)
 * @param maxRequests Maximum allowed requests in the time window
 * @returns Boolean indicating if the request should be rate limited
 */
export const shouldRateLimit = (ip: string, limitWindow = 3600000, maxRequests = 10): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record) {
    // First request from this IP
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }
  
  if (now - record.timestamp > limitWindow) {
    // Reset if outside time window
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }
  
  // Increment counter
  record.count += 1;
  rateLimitMap.set(ip, record);
  
  // Return true if rate limit exceeded
  return record.count > maxRequests;
};

/**
 * Generates a simple HTML template for email responses
 * 
 * @param title Email title
 * @param message Email message content
 * @returns HTML string for the email
 */
export const generateEmailTemplate = (title: string, message: string): string => {
  return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
  <h2 style="color: #333;">${title}</h2>
  ${message}
  <p style="font-size: 12px; color: #777; margin-top: 30px;">This is an automated message from the portfolio website contact form.</p>
</div>
  `;
};

/**
 * Contact form submission types
 */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  error?: string;
}
