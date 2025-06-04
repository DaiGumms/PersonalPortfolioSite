# Gmail OAuth2 Setup for Contact Form

This guide will help you set up Gmail OAuth2 credentials for the contact form in your portfolio website.

## IMPORTANT: Enable Gmail API FIRST

Before creating credentials, you need to enable the Gmail API:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use an existing one)
3. Give it a recognizable name like "Portfolio Contact Form"
4. In your Google Cloud project, go to "APIs & Services" > "Library"
5. Search for "Gmail API"
6. Click on "Gmail API" and then click "Enable"

❗ **The API must be enabled before you create credentials and generate tokens**

## Step 1: Configure the OAuth Consent Screen

1. In your Google Cloud project, go to "APIs & Services" > "OAuth consent screen"
2. Select "External" user type (unless you have a Google Workspace account)
3. Fill in the required fields:
   - App name: "Portfolio Contact Form"
   - User support email: Your email address
   - Developer contact information: Your email address
4. Click "Save and Continue"
5. Under Scopes, click "ADD OR REMOVE SCOPES" and add:
   - `https://mail.google.com/` (Gmail API)
6. Click "Save and Continue"
7. Add the email address that you will use to send emails as a test user
8. Click "Save and Continue"
9. Review the summary and click "Back to Dashboard"

## Step 2: Create OAuth2 Credentials

1. In your Google Cloud project, go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" and select "OAuth client ID"
3. Select "Web application" as the application type
4. Give it a name like "Portfolio Contact Form"
5. Add "https://developers.google.com/oauthplayground" to the "Authorized redirect URIs"
6. Click "Create"
7. A popup will display your credentials - write down the "Client ID" and "Client Secret"

## Step 3: Generate Refresh Token

1. Go to [OAuth2 Playground](https://developers.google.com/oauthplayground/)
2. Click the gear icon in the upper right corner
3. Check "Use your own OAuth credentials"
4. Enter your Client ID and Client Secret from Step 2
5. Close the configuration dialog
6. In the left sidebar, find and select "Gmail API v1" and check:
   - `https://mail.google.com/`
7. Click "Authorize APIs"
8. Log in with your Google account (must be the same account you added as a test user)
9. Review and approve the permissions
10. You will be returned to the OAuth Playground. Click "Exchange authorization code for tokens"
11. Write down the "Refresh token" value (the access token will be refreshed automatically)

## Step 4: Update Environment Variables

Update your `.env.local` file with the following values:

```
GMAIL_CLIENT_ID=your_client_id_from_step_2
GMAIL_CLIENT_SECRET=your_client_secret_from_step_2
GMAIL_REFRESH_TOKEN=your_refresh_token_from_step_3
GMAIL_SENDER_EMAIL=your_gmail_address@gmail.com
GMAIL_RECIPIENT_EMAIL=email_where_you_want_to_receive_messages@example.com
```

❗ **Important:** The `GMAIL_SENDER_EMAIL` must be the same email account you used to authorize the APIs in Step 3.

## Step 5: Test Your Configuration

Run the test script to verify your configuration:

```
node scripts/test-email.js
```

## Troubleshooting Common Issues

### "Invalid login" or "Invalid credentials"
- Ensure `GMAIL_SENDER_EMAIL` matches exactly the email you used to create the OAuth credentials
- Verify you've enabled the Gmail API in your Google Cloud project
- Make sure you authorized the correct scopes (`https://mail.google.com/`)
- Check if your Google Account has Advanced Protection enabled (may need additional steps)

### "Access Not Configured" or "API not enabled"
- Go back to the Google Cloud Console and verify the Gmail API is enabled
- Wait a few minutes for the API enablement to propagate

### "Invalid Grant"
- Your refresh token may have expired (they expire if unused for 6+ months)
- Go through Step 3 again to generate a new refresh token

### Account Security Considerations
- If you use 2-factor authentication, OAuth2 will still work properly
- You don't need to enable "Less secure app access" as we're using OAuth2
- If you get security alerts from Google, review them and confirm the access

## Important Notes

- **Keep your credentials secure** - never commit them to public repositories
- The refresh token is long-lived but can expire if unused for extended periods
- The access token expires after a short time but is automatically refreshed
- For production, consider setting up a separate Google Cloud project
