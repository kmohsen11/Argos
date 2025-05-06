# NoLimit - AI Athletic Wear

## Email Notification Setup

The pre-order form on the website sends email notifications to the NoLimit team whenever a customer submits a pre-order.

### Configuration

To set up the email notification system, follow these steps:

1. Create a `.env.local` file in the root directory with the following environment variables:

```
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_USER=your-username
SMTP_PASS=your-password
```

Replace the placeholder values with your actual SMTP server details. We recommend using a service like SendGrid, Mailgun, or a Gmail workspace account.

2. Deploy the serverless function to your hosting provider:

- **Vercel**: The function will be automatically deployed when you push to your repository.
- **Netlify**: Configure the functions directory in your `netlify.toml` file.

### Email Template

The email notification includes:
- Customer's name (first and last)
- Email address
- Product type (shorts or shirts)
- Size
- Device type for integration

### Security Considerations

- Never commit your `.env.local` file or any file containing SMTP credentials to version control
- Use environment variables for sensitive information
- Consider rotating SMTP credentials periodically

### Local Development

To test the email functionality locally:

1. Install dependencies: `npm install`
2. Set up your `.env.local` file with valid SMTP credentials
3. Start the development server: `npm run dev`
4. Submit a test pre-order form 