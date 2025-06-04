/**
 * This script tests the Gmail OAuth2 setup for the contact form.
 * It sends a test email to verify that the configuration is working correctly.
 * 
 * Before running:
 * 1. Make sure you've set up your Gmail OAuth2 credentials
 * 2. Update .env.local with your credentials (see docs/gmail-oauth-setup.md)
 * 3. Make sure you've enabled the Gmail API in Google Cloud Console
 * 
 * To run this script:
 * Open a terminal in the root of the project and run:
 * node scripts/test-email.js
 * 
 * If you're using PowerShell:
 * & node scripts\test-email.js
 */

require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const requiredEnvVars = [
  'GMAIL_CLIENT_ID',
  'GMAIL_CLIENT_SECRET',
  'GMAIL_REFRESH_TOKEN',
  'GMAIL_SENDER_EMAIL',
  'GMAIL_RECIPIENT_EMAIL'
  // Note: ACCESS_TOKEN is optional as we can refresh it
];

// Verify all required environment variables are present
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => console.error(`   - ${varName}`));
  console.error('\n📝 Please follow the setup instructions in docs/gmail-oauth-setup.md');
  process.exit(1);
}

async function main() {
  try {    console.log('🔑 Creating OAuth2 client...');
    const oauth2Client = new OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    // Log credential information for debugging (never log in production)
    console.log('📋 Checking OAuth2 credentials:');
    console.log(`   Client ID: ${process.env.GMAIL_CLIENT_ID ? '✓ Set' : '✗ Missing'}`);
    console.log(`   Client Secret: ${process.env.GMAIL_CLIENT_SECRET ? '✓ Set' : '✗ Missing'}`);
    console.log(`   Refresh Token: ${process.env.GMAIL_REFRESH_TOKEN ? '✓ Set' : '✗ Missing'}`);
    console.log(`   Sender Email: ${process.env.GMAIL_SENDER_EMAIL || 'Not set'}`);
    console.log(`   Recipient Email: ${process.env.GMAIL_RECIPIENT_EMAIL || 'Not set'}`);

    // Set the credentials for the OAuth2 client - only use refresh_token
    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    // Try to get a new access token to verify OAuth2 is working
    console.log('🔄 Obtaining fresh access token...');
    let accessToken;
    try {
      const tokens = await oauth2Client.getAccessToken();
      console.log('✅ OAuth2 token refresh successful!');
      accessToken = tokens.token;
      console.log(`   New access token obtained: ${accessToken ? '✓' : '✗'}`);
    } catch (tokenError) {
      console.error('❌ OAuth2 token refresh failed:', tokenError.message);
      console.error('\nPossible issues:');
      console.error('1. Your credentials in .env.local might be invalid');
      console.error('2. The refresh token might have expired (they can expire if unused for 6+ months)');
      console.error('3. Gmail API might not be enabled in your Google Cloud Console');
      console.error('4. You might need to re-authorize the application');
      console.error('\nPlease follow these steps:');
      console.error('1. Double-check all credentials in .env.local');
      console.error('2. Verify the Gmail API is enabled in your Google Cloud Console');
      console.error('3. If needed, generate a new refresh token following docs/gmail-oauth-setup.md');
      process.exit(1);
    }    console.log('📧 Creating email transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_SENDER_EMAIL,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken, // Use the newly obtained access token
      },
    });

    console.log('📬 Sending test email...');
    const info = await transporter.sendMail({
      from: `"Test Email" <${process.env.GMAIL_SENDER_EMAIL}>`,
      to: process.env.GMAIL_RECIPIENT_EMAIL,
      subject: 'Portfolio Contact Form Test',
      text: 'This is a test email to verify that your Gmail OAuth2 setup is working correctly.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2 style="color: #333;">Contact Form Test Email</h2>
          <p>This is a test email to verify that your Gmail OAuth2 setup is working correctly for your portfolio contact form.</p>
          <p>If you've received this email, your configuration is working properly!</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 4px;">
            <h3 style="margin-top: 0; color: #555;">Next Steps:</h3>
            <ol>
              <li>Test the contact form from your portfolio website</li>
              <li>Ensure error handling works properly</li>
              <li>Test on different devices and screen sizes</li>
              <li>Create a pull request to merge your changes</li>
            </ol>
          </div>
          <p style="font-size: 12px; color: #777; margin-top: 30px;">This is an automated test message.</p>
        </div>
      `,
    });

    console.log('✅ Test email sent successfully!');
    console.log(`📋 Message ID: ${info.messageId}`);
    console.log(`📤 Sent from: ${process.env.GMAIL_SENDER_EMAIL}`);
    console.log(`📥 Sent to: ${process.env.GMAIL_RECIPIENT_EMAIL}`);

    console.log('\n🎉 Your Gmail OAuth2 setup is working correctly!');
    console.log('You can now use the contact form in your portfolio website.');  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    
    // Show more detailed troubleshooting based on error message
    if (error.message.includes('Invalid login')) {
      console.error('\n🔑 Authentication Error - Possible causes:');
      console.error('1. The GMAIL_SENDER_EMAIL in .env.local might not match the account used for OAuth2');
      console.error('2. Your Gmail account may have additional security settings blocking this access');
      console.error('3. The OAuth2 tokens may be for a different Gmail account than specified in GMAIL_SENDER_EMAIL');
    } else if (error.message.includes('Invalid credentials')) {
      console.error('\n🔑 Invalid Credentials Error:');
      console.error('1. Your Client ID or Client Secret might be incorrect');
      console.error('2. Your refresh token might be invalid or expired');
      console.error('3. You might need to enable "Less secure app access" or create an App Password');
    } else if (error.message.includes('service not enabled')) {
      console.error('\n⚠️ API Error:');
      console.error('The Gmail API is not enabled in your Google Cloud project.');
      console.error('Go to Google Cloud Console and ensure the Gmail API is enabled.');
    }
    
    // Output response details if available
    if (error.response) {
      console.error('\n📝 Error Details:', error.response.data);
    }
    
    // General troubleshooting guidance
    console.error('\n🛠️ Troubleshooting Steps:');
    console.error('1. Double-check all values in your .env.local file');
    console.error('2. Follow the Gmail OAuth2 setup guide step-by-step: docs/gmail-oauth-setup.md');
    console.error('3. Ensure your Google Cloud project has the Gmail API enabled');
    console.error('4. Try creating new OAuth2 credentials and refresh token');
    console.error('5. Check that your account does not have Advanced Protection enabled');
    
    process.exit(1);
  }
}

main();
