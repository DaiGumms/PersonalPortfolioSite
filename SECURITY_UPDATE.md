# Important: Update Your Gmail OAuth2 Setup

I noticed that your `.env.local` file contains actual Google API credentials. Here are the steps you should take:

## 1. Revoke the Existing Credentials

For security reasons, you should revoke the credentials that were shared in the workspace:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Go to "APIs & Services" > "Credentials"
3. Find the OAuth 2.0 Client ID for "Portfolio Contact Form"
4. Delete it and create a new one with the same settings

## 2. Generate New Refresh Token

1. Follow the instructions in `docs/gmail-oauth-setup.md` to generate a new refresh token
2. Make sure the Gmail API is enabled in your Google Cloud project

## 3. Update Your `.env.local` File

Replace the current values with your new credentials:

```
GMAIL_CLIENT_ID=your_new_client_id
GMAIL_CLIENT_SECRET=your_new_client_secret
GMAIL_REFRESH_TOKEN=your_new_refresh_token
# Note: You can remove the GMAIL_ACCESS_TOKEN line, it's no longer needed
GMAIL_SENDER_EMAIL=your_email@gmail.com
GMAIL_RECIPIENT_EMAIL=your_email@gmail.com
```

## 4. Test the Configuration

Run the test script to verify your configuration:

```bash
# On Windows PowerShell:
& node scripts\test-email.js
```

## 5. Common Issues and Solutions

If you're still experiencing "Invalid login" issues:

1. **Google API not enabled**: Make sure the Gmail API is enabled in your Google Cloud Console
2. **Wrong Scopes**: Verify you selected `https://mail.google.com/` when creating the tokens
3. **Email Mismatch**: Ensure the GMAIL_SENDER_EMAIL matches exactly the email you used for OAuth
4. **Security Settings**: Check if your Google account has additional security features like Advanced Protection

The updated code should now refresh tokens automatically and provide better error messages.
