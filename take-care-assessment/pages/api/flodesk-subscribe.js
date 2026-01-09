// API Route: /api/flodesk-subscribe.js
// This handles subscribing users to Flodesk

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, firstName } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({ error: 'Email and first name are required' });
  }

  try {
    // Flodesk API endpoint
    const FLODESK_API_KEY = process.env.FLODESK_API_KEY;
    
    if (!FLODESK_API_KEY) {
      console.error('FLODESK_API_KEY is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const response = await fetch('https://api.flodesk.com/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(FLODESK_API_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        first_name: firstName,
        // Optional: Add custom fields or tags
        custom_fields: {
          assessment_date: new Date().toISOString(),
        },
        // Optional: Add to specific segment
        // segment_ids: ['YOUR_SEGMENT_ID']
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Flodesk API error:', errorData);
      
      // If subscriber already exists, that's okay
      if (response.status === 409) {
        return res.status(200).json({ 
          success: true, 
          message: 'Subscriber already exists' 
        });
      }
      
      return res.status(response.status).json({ 
        error: 'Failed to subscribe to Flodesk',
        details: errorData 
      });
    }

    const data = await response.json();
    
    return res.status(200).json({ 
      success: true, 
      subscriber: data 
    });
    
  } catch (error) {
    console.error('Error subscribing to Flodesk:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
