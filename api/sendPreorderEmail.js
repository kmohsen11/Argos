const nodemailer = require('nodemailer');

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || '',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get data from request body
  const { firstName, lastName, email, productType, size, deviceType } = req.body;

  if (!firstName || !lastName || !email || !productType || !size) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Send email
    await transporter.sendMail({
      from: '"NoLimit Pre-Orders" <no-reply@nolimit.pro>',
      to: 'contact@nolimit.pro',
      subject: `🛒 New Pre-Order from ${firstName} ${lastName}`,
      html: `
        <h2>New Pre-Order</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Product:</strong> ${productType === 'shorts' ? 'AI Performance Shorts' : 'AI Performance Shirts'}</p>
        <p><strong>Size:</strong> ${size}</p>
        <p><strong>Device Type:</strong> ${deviceType}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Email sending error:', err);
    return res.status(500).json({ error: 'mail_error', message: err.message });
  }
}; 