import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { to, subject, body: emailBody, certificateDataUrl } = body;

    if (!to || !subject || !emailBody || !certificateDataUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Convert base64 image to PDF-like attachment format
    // For now, we'll send the image directly. In production, you might want to convert to PDF
    const imageData = certificateDataUrl.split(',')[1]; // Remove data:image/png;base64, prefix
    
    // Create the email with attachment
    const email = [
      'Content-Type: multipart/mixed; boundary="boundary123"',
      'MIME-Version: 1.0',
      `To: ${to}`,
      `Subject: ${subject}`,
      '',
      '--boundary123',
      'Content-Type: text/plain; charset="UTF-8"',
      '',
      emailBody,
      '',
      '--boundary123',
      'Content-Type: image/png',
      'Content-Disposition: attachment; filename="certificate.png"',
      'Content-Transfer-Encoding: base64',
      '',
      imageData,
      '--boundary123--'
    ].join('\n');

    const encodedEmail = btoa(email).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    // Send email using Gmail API
    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        raw: encodedEmail,
      }),
    });

    if (!response.ok) {
      // Check if it's an API not enabled error
      if (response.status === 403) {
        return NextResponse.json({ 
          error: 'Gmail API is not enabled. Please enable Gmail API in Google Cloud Console.',
          enableUrl: 'https://console.developers.google.com/apis/api/gmail.googleapis.com/overview?project=4357985379'
        }, { status: 403 });
      }
      
      throw new Error(`Failed to send email: ${response.statusText}`);
    }

    const result = await response.json();
    
    return NextResponse.json({
      success: true,
      messageId: result.id,
    });
    
  } catch {
    return NextResponse.json(
      { error: 'Failed to send certificate' },
      { status: 500 }
    );
  }
}
