import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, name, userId } = await req.json();

    // Send welcome email via Resend (if configured)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'Marisa Peer <hello@yourdomain.com>', // Update with your verified domain
        to: email,
        subject: `${name}, your coaching report is ready`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #FDF8F0;">
            <p style="color: #C9A96E; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; text-align: center;">
              MARISA PEER
            </p>

            <h1 style="color: #1A1A2E; font-size: 28px; text-align: center; margin: 20px 0;">
              ${name}, your results are in.
            </h1>

            <p style="color: #1A1A2E; opacity: 0.7; font-size: 16px; line-height: 1.6;">
              Thank you for taking the time to answer those questions with such honesty, ${name}.
              Your personalised coaching report — built from YOUR specific answers — is ready to read.
            </p>

            <p style="color: #1A1A2E; opacity: 0.7; font-size: 16px; line-height: 1.6;">
              Inside your report, you'll discover:
            </p>

            <ul style="color: #1A1A2E; opacity: 0.7; font-size: 15px; line-height: 1.8;">
              <li>Your true calling archetype (and what it means)</li>
              <li>The hidden belief that's been running your life</li>
              <li>Where it came from (this might surprise you)</li>
              <li>The mind-body connection specific to YOUR pattern</li>
              <li>Your personalised next step</li>
            </ul>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/report/${userId}"
                 style="background: #1A1A2E; color: #FDF8F0; padding: 16px 40px; border-radius: 50px;
                        text-decoration: none; font-size: 16px; display: inline-block;">
                Read ${name}'s Coaching Report
              </a>
            </div>

            <p style="color: #1A1A2E; opacity: 0.4; font-size: 13px; text-align: center; margin-top: 40px;">
              With love, Marisa Peer<br/>
              Rapid Transformational Therapy
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
