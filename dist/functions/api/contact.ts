export async function onRequestGet(context) {
  return new Response(JSON.stringify({ 
    status: 'ok', 
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString()
  }), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    
    // Validate required fields
    const { name, email, subject, message } = data;
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ 
        error: 'All fields are required' 
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // 🛡️ Security enhancement: Validate input types and lengths
    if (typeof name !== 'string' || typeof email !== 'string' || typeof subject !== 'string' || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid input types' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    if (name.length > 100 || email.length > 254 || subject.length > 200 || message.length > 5000) {
      return new Response(JSON.stringify({ error: 'Input exceeds maximum allowed length' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 🛡️ Security enhancement: Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 🛡️ Security enhancement: Sanitize inputs slightly before logging
    const sanitizedName = name.replace(/[<>]/g, '');
    const sanitizedEmail = email.replace(/[<>]/g, '');
    const sanitizedSubject = subject.replace(/[<>]/g, '');
    const sanitizedMessage = message.replace(/[<>]/g, '');

    // Log contact submission
    const contactEntry = {
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage,
      timestamp: new Date().toISOString(),
      ip: context.request.headers.get('CF-Connecting-IP') || 'unknown'
    };

    console.log('New contact submission:', JSON.stringify(contactEntry, null, 2));

    // Here you would typically:
    // 1. Send email via Resend, SendGrid, or similar
    // 2. Store in a database
    // 3. Send to a webhook

    // For now, we'll just log it and return success
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Thank you for your message! I\'ll get back to you soon.',
      data: contactEntry
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process your message. Please try again.' 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}
