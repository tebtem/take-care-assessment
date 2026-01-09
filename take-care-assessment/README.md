# Take Care Assessment

A self-care assessment tool created by Inner Workout (formerly run by Taylor Elyse Morrison). This assessment measures wellbeing across 5 dimensions and provides personalized self-care practices.

## Features

- **75 randomized questions** across 5 dimensions of wellbeing
- **Email collection** with Flodesk integration
- **10 questions per page** with progress tracking
- **Automatic scoring** across dimensions and subdimensions
- **Personalized results** sent via email

## Assessment Dimensions

1. **Physical** - Embodiment, Body Awareness, Body Acceptance
2. **Energetic** - Breath Quality, Energy Points
3. **Mental + Emotional** - Input, Sleep, Emotions
4. **Wisdom** - Self-trust, Focus, Aligned Action
5. **Bliss** - Connection to Self, Community, Something Bigger

## Setup Instructions

### 1. Clone or Download the Project

Place all files in your project directory.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Flodesk API key:

```
FLODESK_API_KEY=your_actual_flodesk_api_key
```

#### Getting Your Flodesk API Key

1. Log in to your Flodesk account
2. Go to Settings → API
3. Generate or copy your API key
4. Paste it into your `.env.local` file

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Deploy to Vercel

#### Option A: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

#### Option B: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variable `FLODESK_API_KEY` in the Vercel dashboard
6. Deploy!

## Project Structure

```
take-care-assessment/
├── pages/
│   ├── index.js                  # Main page
│   └── api/
│       ├── flodesk-subscribe.js  # Flodesk subscription endpoint
│       └── generate-results.js   # Results generation endpoint
├── take-care-assessment.jsx      # Main assessment component
├── package.json
├── .env.local.example
└── README.md
```

## How It Works

### 1. Intro Page
- User enters their first name and email
- Subscribes to Flodesk mailing list
- Reads assessment instructions

### 2. Assessment
- 75 questions presented in randomized order
- 10 questions per page (8 pages total)
- Progress bar shows completion percentage
- Users must answer all questions on a page before proceeding

### 3. Results
- Scores calculated for each dimension and subdimension
- Results emailed to user's provided email address
- Confirmation shown on screen

## Scoring Logic

- **Strongly Disagree** = 0 or 10 (reverse scored)
- **Disagree** = 3 or 7 (reverse scored)
- **Neutral** = 5
- **Agree** = 7 or 3 (reverse scored)
- **Strongly Agree** = 10 or 0 (reverse scored)

Final scores are calculated as percentages (0-100%) for each dimension and subdimension.

## Customization

### Styling

The component uses inline styles for simplicity. To customize:

1. Update color schemes in the component
2. Adjust spacing and typography
3. Modify the gradient backgrounds

Current color palette:
- Primary: `#457b9d` (blue)
- Secondary: `#a8dadc` (light blue)
- Background: `#fffbeb` (cream)
- Text: `#1e293b` (dark slate)

### Adding Custom Fields

To add custom fields to Flodesk:

Edit `api/flodesk-subscribe.js`:

```javascript
custom_fields: {
  assessment_date: new Date().toISOString(),
  // Add more custom fields here
  source: 'website',
  assessment_type: 'take_care'
}
```

### Email Results Service

To send PDF results via email, you'll need to set up an email service:

#### Option 1: Resend

```bash
npm install resend
```

Add to `.env.local`:
```
RESEND_API_KEY=your_resend_key
```

#### Option 2: SendGrid

```bash
npm install @sendgrid/mail
```

Add to `.env.local`:
```
SENDGRID_API_KEY=your_sendgrid_key
```

## PDF Generation

The `generate-results.js` endpoint includes basic PDF generation. To create a more detailed PDF matching the original design:

1. Install additional dependencies:
```bash
npm install pdfkit
```

2. Create PDF templates matching the uploaded profile design
3. Include visualizations (circle charts) for dimension scores
4. Add personalized practice recommendations based on lowest scores

## Troubleshooting

### Flodesk API Issues

- **401 Unauthorized**: Check your API key is correct
- **409 Conflict**: Subscriber already exists (this is handled gracefully)
- **Rate Limiting**: Flodesk may rate limit requests

### Development Issues

- **Module not found**: Run `npm install`
- **Port already in use**: Change port with `PORT=3001 npm run dev`
- **Environment variables not loading**: Make sure `.env.local` is in the root directory

## Production Checklist

Before deploying to production:

- [ ] Add Flodesk API key to Vercel environment variables
- [ ] Test email subscription flow
- [ ] Verify all 75 questions are present and randomized
- [ ] Test scoring calculations
- [ ] Set up email service for results delivery
- [ ] Add Terms of Service and Privacy Policy links
- [ ] Test on mobile devices
- [ ] Add analytics tracking (optional)

## Support

For questions about:
- **The assessment content**: Contact Taylor Elyse Morrison
- **Technical implementation**: Check this README or create an issue
- **Flodesk integration**: Visit [Flodesk documentation](https://developers.flodesk.com/)

## License

This assessment is the intellectual property of Inner Workout / Taylor Elyse Morrison. The code is provided for implementation purposes.

---

Built with ❤️ for Inner Workout
