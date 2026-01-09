# Deployment Guide: Take Care Assessment to Vercel

## Prerequisites

- GitHub account
- Vercel account (free tier is fine)
- Flodesk account with API access

## Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Create a new GitHub repository**
   - Go to github.com and create a new repository
   - Name it something like `take-care-assessment`
   - Keep it private or public (your choice)

2. **Upload your files**
   - Upload all files from your project directory
   - Make sure to include:
     - `pages/` directory
     - `api/` directory (inside pages)
     - `take-care-assessment.jsx`
     - `package.json`
     - `README.md`
     - `vercel.json`

### Step 2: Connect to Vercel

1. **Log in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

### Step 3: Configure Environment Variables

1. **In Vercel Dashboard:**
   - Go to Settings → Environment Variables
   - Add the following variable:
     - Name: `FLODESK_API_KEY`
     - Value: Your Flodesk API key
     - Environment: All (Production, Preview, Development)

2. **Get Your Flodesk API Key:**
   - Log in to Flodesk
   - Go to Settings → Integrations → API
   - Copy your API key

### Step 4: Deploy

1. **Click "Deploy"**
   - Vercel will automatically build and deploy your project
   - This usually takes 1-2 minutes

2. **Visit Your Site**
   - Once deployed, you'll get a URL like: `your-project.vercel.app`
   - Click to visit and test your assessment

### Step 5: Custom Domain (Optional)

1. **Purchase a domain** (if you don't have one)
   - Recommended: Namecheap, Google Domains, or Vercel

2. **Add Domain in Vercel**
   - Go to Settings → Domains
   - Click "Add"
   - Enter your domain name
   - Follow Vercel's instructions to configure DNS

3. **Wait for SSL**
   - Vercel automatically provisions SSL certificates
   - This can take a few minutes to 24 hours

## Testing Your Deployment

### 1. Test the Intro Page
- [ ] Visit your deployed URL
- [ ] Check that the Inner Workout branding displays correctly
- [ ] Verify the intro text is readable

### 2. Test Email Submission
- [ ] Enter a test email and name
- [ ] Click "BEGIN ASSESSMENT"
- [ ] Verify you receive a welcome email from Flodesk

### 3. Test Assessment Flow
- [ ] Complete all 75 questions (across 8 pages)
- [ ] Verify questions randomize on each page load
- [ ] Check that the progress bar updates correctly
- [ ] Ensure you can navigate back and forth

### 4. Test Results
- [ ] Complete the assessment
- [ ] Verify the results page displays
- [ ] Check that the completion date is correct

## Common Issues and Solutions

### Issue: API Route Not Found

**Solution:**
- Make sure `api/` folder is inside `pages/`
- Correct structure: `pages/api/flodesk-subscribe.js`

### Issue: Environment Variable Not Working

**Solution:**
- Go to Vercel Dashboard → Settings → Environment Variables
- Make sure `FLODESK_API_KEY` is set for all environments
- Redeploy your project after adding variables

### Issue: Flodesk Subscription Fails

**Solution:**
1. Check your API key is correct
2. Verify your Flodesk account is active
3. Check the browser console for error messages
4. Test the API key with a curl command:

```bash
curl -X POST https://api.flodesk.com/v1/subscribers \
  -H "Authorization: Basic $(echo -n 'YOUR_API_KEY:' | base64)" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","first_name":"Test"}'
```

### Issue: Build Fails

**Solution:**
1. Check that `package.json` is at the root level
2. Verify all dependencies are listed
3. Check build logs in Vercel dashboard
4. Make sure Node.js version is compatible (18+)

## Monitoring Your Deployment

### Analytics

Add Vercel Analytics (optional):
1. Go to your project in Vercel
2. Navigate to Analytics tab
3. Enable Vercel Analytics
4. View real-time visitor data

### Error Tracking

Check function logs:
1. Go to your project in Vercel
2. Navigate to Logs tab
3. Filter by "Errors" to see any issues
4. View API route invocations

## Updating Your Deployment

### Method 1: Git Push (Recommended)

1. Make changes to your local files
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Update assessment"
git push
```
3. Vercel automatically deploys the changes

### Method 2: Vercel CLI

```bash
vercel --prod
```

## Production Checklist

Before sharing your assessment:

- [ ] Test on multiple devices (mobile, tablet, desktop)
- [ ] Verify email collection works
- [ ] Test with a real email address
- [ ] Check all 75 questions display correctly
- [ ] Verify scoring calculations
- [ ] Test results generation
- [ ] Add privacy policy link
- [ ] Add terms of service link
- [ ] Set up custom domain (if desired)
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Test in multiple browsers

## Backup and Maintenance

### Regular Backups
- Your code is backed up on GitHub
- Vercel keeps deployment history
- Download Flodesk subscriber list regularly

### Updates
- Keep dependencies updated: `npm update`
- Monitor for security vulnerabilities: `npm audit`
- Test changes in a preview deployment first

## Getting Help

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Flodesk Support**: [help.flodesk.com](https://help.flodesk.com)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

## Cost Estimate

- **Vercel**: Free for personal projects
- **Domain**: $10-15/year (if using custom domain)
- **Flodesk**: Based on your plan (handles email)
- **Total**: Free to ~$15/year

---

Congratulations! Your Take Care Assessment is now live! 🎉
