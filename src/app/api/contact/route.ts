import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import {
  sanitizeInput,
  isValidEmail,
  isValidInput,
  shouldRateLimit,
  generateEmailTemplate,
  type ContactFormData,
  type ContactFormResponse
} from '@/lib/contact-utils';

const { OAuth2 } = google.auth;

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground' // Redirect URL
    );

    // Only set the refresh token - we'll always get a fresh access token
    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    // Always get a fresh access token to avoid expiration issues
    const tokens = await oauth2Client.getAccessToken();
    const accessToken = tokens.token;

    if (!accessToken) {
      throw new Error('Failed to obtain access token');
    } const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_SENDER_EMAIL,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken, // Use freshly obtained access token
      },
    } as any); // Use 'as any' due to potential type mismatches in nodemailer

    return transporter;
  } catch (error) {
    console.error('Error creating email transporter:', error);
    throw new Error(`Failed to create email transporter: ${(error as Error).message}`);
  }
};

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    // Check rate limiting
    if (shouldRateLimit(clientIp, 3600000, 5)) { // 5 requests per hour
      return NextResponse.json({
        success: false,
        message: 'Too many requests. Please try again later.'
      }, { status: 429 });
    }

    // Parse request body
    const body = await request.json() as ContactFormData;
    const { name, email, message } = body;

    // Check for required fields
    if (!name || !email || !message) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields'
      }, { status: 400 });
    }

    // Validate name (2-50 characters)
    if (!isValidInput(name, 2, 50)) {
      return NextResponse.json({
        success: false,
        message: 'Name must be between 2 and 50 characters and contain no malicious content'
      }, { status: 400 });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email format'
      }, { status: 400 });
    }

    // Validate message (10-1000 characters)
    if (!isValidInput(message, 10, 1000)) {
      return NextResponse.json({
        success: false,
        message: 'Message must be between 10 and 1000 characters and contain no malicious content'
      }, { status: 400 });
    }

    // Sanitize inputs to prevent XSS
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    // Create the email transporter using OAuth2
    const transporter = await createTransporter();

    // Get timestamp for tracking
    const timestamp = new Date().toISOString();
    const ipInfo = request.headers.get('x-forwarded-for') || 'Unknown IP';
    const userAgent = request.headers.get('user-agent') || 'Unknown Browser';

    // Format the email to site owner with HTML and plain text alternatives
    const ownerMailOptions = {
      from: `"Portfolio Contact Form" <${process.env.GMAIL_SENDER_EMAIL}>`,
      replyTo: `"${sanitizedName}" <${sanitizedEmail}>`, // Set reply-to as the sender's email
      to: process.env.GMAIL_RECIPIENT_EMAIL,
      subject: `Portfolio Contact: ${sanitizedName}`,
      text: `
Name: ${sanitizedName}
Email: ${sanitizedEmail}

Message:
${sanitizedMessage}

---
Timestamp: ${timestamp}
IP: ${ipInfo}
User-Agent: ${userAgent}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="text-align: center; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eaeaea;">
    <h2 style="color: #333; margin: 0;">New Contact Form Submission</h2>
    <p style="color: #666; font-size: 14px; margin: 5px 0 0;">Received on ${new Date().toLocaleString()}</p>
  </div>
  
  <div style="margin-bottom: 25px;">
    <h3 style="color: #444; margin-bottom: 10px; font-size: 18px;">Contact Details</h3>
    <p><strong>Name:</strong> ${sanitizedName}</p>
    <p><strong>Email:</strong> <a href="mailto:${sanitizedEmail}" style="color: #0070f3; text-decoration: none;">${sanitizedEmail}</a></p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
    <h3 style="color: #444; margin-top: 0; margin-bottom: 10px; font-size: 18px;">Message</h3>
    <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${sanitizedMessage}</p>
  </div>
  
  <div style="font-size: 12px; color: #777; background-color: #f0f0f0; padding: 10px; border-radius: 6px;">
    <p style="margin: 0 0 5px;"><strong>Additional Information:</strong></p>
    <p style="margin: 0 0 3px;">Timestamp: ${timestamp}</p>
    <p style="margin: 0 0 3px;">IP: ${ipInfo}</p>
    <p style="margin: 0 0 3px;">User-Agent: ${userAgent}</p>
    <p style="margin: 10px 0 0;">This is an automated message from your portfolio website contact form.</p>
  </div>
</div>
      `,
    };

    // Define auto-responder email to send to the user
    const autoReplyOptions = {
      from: `"David Morgan-Gumm" <${process.env.GMAIL_SENDER_EMAIL}>`,
      to: `"${sanitizedName}" <${sanitizedEmail}>`,
      subject: 'Thank you for your message',
      text: `
Hello ${sanitizedName},

Thank you for contacting me through my portfolio website. I've received your message and will review it soon.

I typically respond within 1-2 business days. If your matter is urgent, please let me know.

Best regards,
David Morgan-Gumm
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="text-align: center; margin-bottom: 20px;">
    <h2 style="color: #333;">Thank You for Your Message</h2>
  </div>
  
  <div style="line-height: 1.6; color: #444;">
    <p>Hello ${sanitizedName},</p>
    
    <p>Thank you for contacting me through my portfolio website. I've received your message and will review it soon.</p>
    
    <p>I typically respond within 1-2 business days. If your matter is urgent, please let me know.</p>
    
    <p style="margin-top: 25px;">Best regards,<br>David Morgan-Gumm</p>
  </div>
  
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea; font-size: 12px; color: #777; text-align: center;">
    <p>This is an automated response. Please do not reply directly to this email.</p>
  </div>
</div>
      `,
    };

    // Send both emails
    console.log('Sending notification email to site owner...');
    await transporter.sendMail(ownerMailOptions);

    console.log('Sending auto-reply to user...');
    await transporter.sendMail(autoReplyOptions);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    // Log the error with detailed information
    console.error('Error sending email:', error);

    // Determine the specific error type for better user feedback
    let errorMessage = 'Failed to send email. Please try again later.';
    let statusCode = 500;

    if (error instanceof Error) {
      const errorString = error.toString().toLowerCase();

      if (errorString.includes('authentication') || errorString.includes('auth')) {
        errorMessage = 'Authentication error with email service. Please contact the site administrator.';
        console.error('OAuth2 authentication error. Check your credentials.');
      } else if (errorString.includes('timeout') || errorString.includes('timed out')) {
        errorMessage = 'Email service timed out. Please try again later.';
      } else if (errorString.includes('quota') || errorString.includes('limit')) {
        errorMessage = 'Email sending limit reached. Please try again tomorrow.';
      }

      // Log additional details for debugging
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack?.split('\n').slice(0, 3)
      });
    }

    // Return a user-friendly error response
    return NextResponse.json({
      success: false,
      message: errorMessage,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: statusCode });
  }
}

// Handle non-POST requests
export async function GET() {
  return NextResponse.json({
    success: false,
    message: 'Method Not Allowed'
  }, { status: 405 });
}
