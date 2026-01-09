// API Route: /api/generate-results.js
// This generates the PDF results and sends via email

import { jsPDF } from 'jspdf';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, firstName, answers } = req.body;

  if (!email || !firstName || !answers) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Calculate scores
    const scores = calculateScores(answers);
    
    // Generate PDF
    const pdfBuffer = await generatePDF(firstName, scores);
    
    // Send email with PDF attachment
    await sendResultsEmail(email, firstName, pdfBuffer);
    
    return res.status(200).json({ 
      success: true,
      scores: scores
    });
    
  } catch (error) {
    console.error('Error generating results:', error);
    return res.status(500).json({ 
      error: 'Failed to generate results',
      message: error.message 
    });
  }
}

function calculateScores(answers) {
  const SCORE_MAP = {
    "Strongly Disagree": 0,
    "Disagree": 3,
    "Neutral": 5,
    "Agree": 7,
    "Strongly Agree": 10
  };

  const REVERSE_SCORE_MAP = {
    "Strongly Disagree": 10,
    "Disagree": 7,
    "Neutral": 5,
    "Agree": 3,
    "Strongly Agree": 0
  };

  // Define question structure with reverse scoring
  const questionStructure = {
    "Physical": {
      "Embodiment": [
        { id: 1, reverse: true },
        { id: 2, reverse: false },
        { id: 3, reverse: true },
        { id: 4, reverse: false },
        { id: 5, reverse: false }
      ],
      "Body Awareness": [
        { id: 6, reverse: false },
        { id: 7, reverse: false },
        { id: 8, reverse: false },
        { id: 9, reverse: false },
        { id: 10, reverse: false }
      ],
      "Body Acceptance": [
        { id: 11, reverse: false },
        { id: 12, reverse: true },
        { id: 13, reverse: false },
        { id: 14, reverse: false },
        { id: 15, reverse: true }
      ]
    },
    "Energetic": {
      "Breath Quality": [
        { id: 16, reverse: true },
        { id: 17, reverse: true },
        { id: 18, reverse: false },
        { id: 19, reverse: false },
        { id: 20, reverse: true }
      ],
      "Energy Points": [
        { id: 21, reverse: false },
        { id: 22, reverse: false },
        { id: 23, reverse: false },
        { id: 24, reverse: true },
        { id: 25, reverse: true },
        { id: 26, reverse: false },
        { id: 27, reverse: true },
        { id: 28, reverse: false },
        { id: 29, reverse: true },
        { id: 30, reverse: false },
        { id: 31, reverse: true },
        { id: 32, reverse: true },
        { id: 33, reverse: false },
        { id: 34, reverse: true }
      ]
    },
    "Mental + Emotional": {
      "Input": [
        { id: 35, reverse: true },
        { id: 36, reverse: false },
        { id: 37, reverse: false },
        { id: 38, reverse: false },
        { id: 39, reverse: false }
      ],
      "Sleep": [
        { id: 40, reverse: false },
        { id: 41, reverse: false },
        { id: 42, reverse: true },
        { id: 43, reverse: true },
        { id: 44, reverse: false }
      ],
      "Emotions": [
        { id: 45, reverse: false },
        { id: 46, reverse: false },
        { id: 47, reverse: false },
        { id: 48, reverse: true },
        { id: 49, reverse: false }
      ]
    },
    "Wisdom": {
      "Self-trust": [
        { id: 50, reverse: false },
        { id: 51, reverse: false },
        { id: 52, reverse: false },
        { id: 53, reverse: false },
        { id: 54, reverse: false }
      ],
      "Focus": [
        { id: 55, reverse: true },
        { id: 56, reverse: true },
        { id: 57, reverse: true },
        { id: 58, reverse: false },
        { id: 59, reverse: false }
      ],
      "Aligned Action": [
        { id: 60, reverse: false },
        { id: 61, reverse: false },
        { id: 62, reverse: false },
        { id: 63, reverse: false },
        { id: 64, reverse: true }
      ]
    },
    "Bliss": {
      "Connection to Self": [
        { id: 65, reverse: false },
        { id: 66, reverse: false },
        { id: 67, reverse: false }
      ],
      "Connection to Community": [
        { id: 68, reverse: false },
        { id: 69, reverse: false },
        { id: 70, reverse: false },
        { id: 71, reverse: false },
        { id: 72, reverse: true }
      ],
      "Connection to Something Bigger": [
        { id: 73, reverse: false },
        { id: 74, reverse: false },
        { id: 75, reverse: false }
      ]
    }
  };

  const scores = {};

  Object.keys(questionStructure).forEach(dimension => {
    scores[dimension] = {
      subdimensions: {}
    };

    let dimensionTotal = 0;
    let dimensionCount = 0;

    Object.keys(questionStructure[dimension]).forEach(subdimension => {
      const questions = questionStructure[dimension][subdimension];
      let total = 0;
      let count = 0;

      questions.forEach(q => {
        const answer = answers[q.id];
        if (answer) {
          const scoreMap = q.reverse ? REVERSE_SCORE_MAP : SCORE_MAP;
          total += scoreMap[answer];
          count++;
        }
      });

      const percentage = count > 0 ? Math.round((total / (count * 10)) * 100) : 0;
      scores[dimension].subdimensions[subdimension] = percentage;
      
      dimensionTotal += total;
      dimensionCount += count;
    });

    scores[dimension].overall = dimensionCount > 0 
      ? Math.round((dimensionTotal / (dimensionCount * 10)) * 100) 
      : 0;
  });

  return scores;
}

async function generatePDF(firstName, scores) {
  // This is a placeholder - you'll need to implement full PDF generation
  // using a library like jsPDF or PDFKit with the profile template
  
  const doc = new jsPDF();
  
  doc.setFontSize(24);
  doc.text('Your Take Care Profile', 105, 30, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(`${firstName}`, 105, 45, { align: 'center' });
  doc.text(`Assessment Completed: ${new Date().toLocaleDateString()}`, 105, 55, { align: 'center' });
  
  let y = 80;
  doc.setFontSize(16);
  doc.text('Your Results:', 20, y);
  
  y += 15;
  doc.setFontSize(12);
  
  Object.keys(scores).forEach(dimension => {
    doc.text(`${dimension}: ${scores[dimension].overall}%`, 20, y);
    y += 10;
    
    Object.keys(scores[dimension].subdimensions).forEach(subdimension => {
      doc.text(`  ${subdimension}: ${scores[dimension].subdimensions[subdimension]}%`, 30, y);
      y += 8;
    });
    
    y += 5;
  });
  
  return doc.output('arraybuffer');
}

async function sendResultsEmail(email, firstName, pdfBuffer) {
  // This would integrate with your email service (SendGrid, Resend, etc.)
  // For now, this is a placeholder
  
  console.log(`Would send email to ${email} with PDF attachment`);
  
  // Example with a service like Resend:
  /*
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Inner Workout <noreply@yourdomain.com>',
      to: email,
      subject: 'Your Take Care Profile Results',
      html: `<p>Hi ${firstName},</p><p>Thank you for completing the Take Care assessment! Your personalized profile is attached.</p>`,
      attachments: [{
        filename: 'take-care-profile.pdf',
        content: Buffer.from(pdfBuffer).toString('base64'),
      }],
    }),
  });
  */
}
