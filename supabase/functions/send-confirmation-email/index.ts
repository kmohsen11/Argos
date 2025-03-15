import { serve } from 'https://deno.fresh.dev/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

serve(async (req) => {
  const { email, firstName, lastName, size, deviceType } = await req.json();

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'AI Performance Wear <orders@aiperformance.com>',
        to: email,
        subject: 'Your Pre-order Confirmation',
        html: `
          <h1>Thank you for your pre-order, ${firstName}!</h1>
          <p>We're excited to confirm your pre-order for our AI Performance Shorts.</p>
          <h2>Order Details:</h2>
          <ul>
            <li>Size: ${size}</li>
            <li>Compatible Device: ${deviceType}</li>
          </ul>
          <p>We'll keep you updated on the status of your order and notify you when your shorts are ready for shipping.</p>
          <p>If you have any questions, please don't hesitate to reach out to our support team.</p>
          <p>Best regards,<br>The AI Performance Wear Team</p>
        `,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to send email');
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to send confirmation email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});