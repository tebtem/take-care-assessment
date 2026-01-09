# Quick Start Guide

Get your Take Care Assessment running in 5 minutes!

## 🚀 Fastest Way to Deploy

### 1. Get Your Flodesk API Key (2 minutes)
1. Log in to [Flodesk](https://flodesk.com)
2. Go to Settings → Integrations → API
3. Copy your API key

### 2. Deploy to Vercel (2 minutes)
1. Click this button: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)
2. Sign in with GitHub
3. Name your project
4. Add environment variable:
   - Key: `FLODESK_API_KEY`
   - Value: [paste your Flodesk API key]
5. Click "Deploy"

### 3. Done! (1 minute)
Visit your new URL: `your-project.vercel.app`

## 🔧 Local Development

Want to test locally first?

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.local.example .env.local

# 3. Add your Flodesk API key to .env.local
# FLODESK_API_KEY=your_key_here

# 4. Run locally
npm run dev

# 5. Open browser
# Visit http://localhost:3000
```

## 📝 What This Does

**Intro Page:**
- Collects user's name and email
- Subscribes them to your Flodesk list
- Shows assessment instructions

**Assessment:**
- 75 randomized questions
- 10 per page, 8 pages total
- Progress tracking
- Must complete all questions

**Results:**
- Calculates scores across 5 dimensions
- Shows completion confirmation
- Sends detailed results to email

## 🎨 Customization

### Change Colors

Edit `take-care-assessment.jsx`:

```javascript
// Find this gradient and change colors:
background: 'linear-gradient(135deg, #a8dadc 0%, #457b9d 100%)'

// Change to your brand colors:
background: 'linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%)'
```

### Add Your Logo

Replace the circle div in the intro page:

```javascript
// Replace this:
<div style={{
  width: '80px',
  height: '80px',
  background: 'linear-gradient(135deg, #a8dadc 0%, #457b9d 100%)',
  borderRadius: '50%',
  margin: '0 auto 20px'
}}></div>

// With this:
<img 
  src="/your-logo.png" 
  alt="Your Logo" 
  style={{ width: '80px', margin: '0 auto 20px', display: 'block' }}
/>
```

### Change Email Provider

Edit `api/flodesk-subscribe.js` to use a different email service.

## 🆘 Need Help?

**Common Questions:**

**Q: How do I get my Flodesk API key?**
A: Flodesk → Settings → Integrations → API

**Q: Can I use a different email service?**
A: Yes! Edit the API routes to integrate with your preferred service.

**Q: How much does hosting cost?**
A: Vercel is free for personal projects!

**Q: Can I customize the questions?**
A: Yes! Edit the `QUESTIONS` array in `take-care-assessment.jsx`

**Q: How do I send the PDF results?**
A: Set up an email service (Resend, SendGrid) and implement in `api/generate-results.js`

## 📚 Next Steps

- [ ] Read the full [README.md](README.md)
- [ ] Review [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment guide
- [ ] Customize styling to match your brand
- [ ] Set up email service for results
- [ ] Add custom domain

## 🎉 You're All Set!

Your Take Care Assessment is ready to help people understand their self-care needs!

Questions? Check the full documentation or reach out for support.
