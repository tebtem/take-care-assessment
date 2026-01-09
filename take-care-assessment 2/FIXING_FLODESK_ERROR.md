# How to Add Your Flodesk API Key in Vercel

## The Issue
You're seeing this error:
```
Environment Variable "FLODESK_API_KEY" references Secret "flodesk-api-key", which does not exist.
```

## The Solution

I've updated `vercel.json` to fix this. Now follow these steps:

### Step 1: Get Your Flodesk API Key

1. Log in to [Flodesk](https://app.flodesk.com)
2. Click on your profile/avatar (bottom left)
3. Go to **Settings**
4. Click **Integrations** in the left sidebar
5. Click **API**
6. Copy your API key (it's a long string)

### Step 2: Add It in Vercel Dashboard

#### Option A: During Initial Deployment

1. When you click "Deploy" in Vercel
2. You'll see "Environment Variables" section
3. Click **Add Environment Variable**
4. Enter:
   - **Name**: `FLODESK_API_KEY`
   - **Value**: [paste your Flodesk API key]
   - **Environment**: Select **All** (Production, Preview, Development)
5. Click "Deploy"

#### Option B: After Deployment (Fix Existing Project)

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project name
3. Click **Settings** tab (top menu)
4. Click **Environment Variables** in left sidebar
5. Click **Add New**
6. Enter:
   - **Key**: `FLODESK_API_KEY`
   - **Value**: [paste your Flodesk API key]
   - **Environment**: Check **Production**, **Preview**, and **Development**
7. Click **Save**
8. **Important**: Click **Redeploy** to apply the changes
   - Go to **Deployments** tab
   - Click the three dots (...) on your latest deployment
   - Click **Redeploy**

### Step 3: Verify It Works

1. Visit your deployed site
2. Try to submit an email on the intro page
3. Check your Flodesk dashboard to see if the subscriber was added

## Common Issues

### Issue 1: "Still getting the error after adding the variable"

**Solution**: You need to redeploy!
- Go to Deployments tab
- Click (...) menu on latest deployment  
- Click "Redeploy"

### Issue 2: "Can't find the API key in Flodesk"

**Solution**: 
- Make sure you're logged in as the account owner
- API access might need to be enabled for your Flodesk plan
- Contact Flodesk support if you don't see the API option

### Issue 3: "Variable added but email subscription not working"

**Solution**: Check the browser console (F12) for errors:
- If you see 401 Unauthorized → API key is incorrect
- If you see 404 → API endpoint might be wrong (shouldn't happen)
- If you see CORS error → This shouldn't happen with API routes

## Testing Your API Key

You can test if your API key works with this command (replace YOUR_API_KEY):

```bash
curl -X POST https://api.flodesk.com/v1/subscribers \
  -H "Authorization: Basic $(echo -n 'YOUR_API_KEY:' | base64)" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "first_name": "Test"
  }'
```

If it works, you'll get a response with subscriber details!

## Alternative: Using .env.local for Local Development

If you want to test locally first:

1. Create a file called `.env.local` in your project root
2. Add this line:
   ```
   FLODESK_API_KEY=your_actual_api_key_here
   ```
3. Run `npm run dev`
4. Test on `http://localhost:3000`

**Note**: `.env.local` is in `.gitignore` so it won't be committed to Git (this is good for security!)

## Security Note

⚠️ **Never** commit your API key to Git or share it publicly!
- Always use environment variables
- Never hardcode the key in your code
- The `.env.local` file is automatically ignored by Git

---

Once you add the environment variable and redeploy, everything should work! 🎉
