export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, firstName } = req.body;

  // Validate input
  if (!email || !firstName) {
    return res.status(400).json({ error: 'Email and first name are required' });
  }

  // Get environment variables
  const FLODESK_API_KEY = process.env.FLODESK_API_KEY;
  const FLODESK_SEGMENT_ID = process.env.FLODESK_SEGMENT_ID;

  // Check if API key exists
  if (!FLODESK_API_KEY) {
    console.error('FLODESK_API_KEY is not set');
    return res.status(500).json({ error: 'Flodesk API key not configured' });
  }

  try {
    // Create the subscriber payload
    const payload = {
      email: email,
      first_name: firstName,
      custom_fields: {
        assessment_date: new Date().toISOString(),
        source: 'Take Care Assessment'
      }
    };

    // Add segment ID if it exists
    if (FLODESK_SEGMENT_ID) {
      payload.segment_ids = [FLODESK_SEGMENT_ID];
    }

    // Call Flodesk API
    const response = await fetch('https://api.flodesk.com/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(FLODESK_API_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Flodesk API error:', data);
      return res.status(response.status).json({ 
        error: 'Failed to subscribe',
        details: data 
      });
    }

    // Success!
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
