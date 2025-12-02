# Judge0 API Setup Guide - Global Code Execution

Your website now uses **Judge0 API** for code execution, which works globally from anywhere! 🌍

## 🎯 Why Judge0?

- ✅ **Works Globally** - No need for local Java installation
- ✅ **Secure Sandboxing** - Isolated execution environment
- ✅ **Production Ready** - Used by major coding platforms
- ✅ **Easy Deployment** - Deploy your backend anywhere (Heroku, Railway, Render, etc.)
- ✅ **Multiple Languages** - Supports 60+ programming languages

---

## 📋 Setup Steps

### Step 1: Get Judge0 API Key (FREE)

1. Go to: https://rapidapi.com/judge0-official/api/judge0-ce
2. Click **"Sign Up"** (free account)
3. Click **"Subscribe to Test"** button
4. Select **"Basic"** plan (FREE - 50 requests/day)
5. Copy your **API Key** from the code snippets

### Step 2: Add API Key to .env File

Open `backend/.env` and replace:
```
JUDGE0_API_KEY=YOUR_RAPIDAPI_KEY_HERE
```

With your actual key:
```
JUDGE0_API_KEY=your_actual_key_from_rapidapi
```

### Step 3: Test Locally

```bash
# Start backend
cd backend
npm run dev

# Start frontend (in another terminal)
cd ..
npm run dev
```

Visit http://localhost:8080 and test submitting code!

---

## 🚀 Deploy to Production

### Option A: Deploy to Railway (Recommended - FREE)

1. **Sign up**: https://railway.app
2. **Create New Project** → Deploy from GitHub
3. **Add Environment Variables**:
   ```
   MONGODB_URI=your_mongodb_atlas_url
   JUDGE0_API_KEY=your_judge0_api_key
   JWT_SECRET=your_secret_key
   FRONTEND_URL=https://your-frontend-url.com
   ```
4. Railway will auto-deploy your backend!

### Option B: Deploy to Render (FREE)

1. **Sign up**: https://render.com
2. **New Web Service** → Connect GitHub repo
3. Build Command: `cd backend && npm install && npm run build`
4. Start Command: `cd backend && npm start`
5. Add environment variables from Railway example above

### Option C: Deploy to Heroku (FREE Tier Available)

1. **Sign up**: https://heroku.com
2. Create new app
3. Connect GitHub repo
4. Add buildpack: `heroku/nodejs`
5. Add environment variables
6. Deploy!

---

## 💰 Pricing Plans

### Judge0 Free Tier
- **50 requests/day** - Perfect for testing
- **1 request/second** rate limit

### Judge0 Paid Plans (for production)
- **Basic**: $10/month - 10,000 requests/month
- **Pro**: $20/month - 50,000 requests/month  
- **Mega**: $50/month - 200,000 requests/month

*Note: Each code submission = 1 request per test case*

---

## 🔍 How It Works

```
User Submits Code
    ↓
Your Backend (Express)
    ↓
Judge0 API (RapidAPI)
    ↓
Secure Sandbox Environment
    ↓
Returns Results
    ↓
Your Backend
    ↓
User sees Pass/Fail
```

---

## 🛠️ Advanced Configuration

### Custom Judge0 Instance (Self-Hosted)

If you want unlimited requests for free, you can host your own Judge0 instance:

1. **Using Docker**:
```bash
docker run -p 2358:2358 -d judge0/judge0:latest
```

2. **Update .env**:
```
JUDGE0_API_URL=http://your-judge0-server.com:2358
JUDGE0_API_KEY=not_needed_for_self_hosted
```

3. **Deploy Judge0 to**:
   - AWS EC2 / DigitalOcean / Linode
   - Railway / Render with Docker support
   - Your own VPS

**Self-hosting guide**: https://github.com/judge0/judge0/blob/master/CHANGELOG.md

---

## 🔐 Security Best Practices

1. **Never commit .env file** to GitHub
2. **Use environment variables** in production
3. **Limit API key exposure** - only backend should have it
4. **Monitor usage** - check RapidAPI dashboard
5. **Set rate limits** on your own API endpoints

---

## 🐛 Troubleshooting

### "Request failed with status code 401"
- Your API key is invalid or not set
- Check `.env` file has correct `JUDGE0_API_KEY`

### "Request failed with status code 429"
- You exceeded rate limit (50/day on free tier)
- Upgrade plan or wait 24 hours
- Or use self-hosted Judge0

### "Compilation error" in all submissions
- Your Java code syntax might be wrong
- Check Judge0 supports Java (it does - language_id: 62)
- Ensure `public class Solution` is in your code

### Slow execution (>5 seconds)
- Judge0 queue might be busy
- Consider self-hosted instance
- Or upgrade to paid plan

---

## 📊 Monitoring

Check your usage at:
- **RapidAPI Dashboard**: https://rapidapi.com/developer/billing
- **Judge0 Logs**: Available in your RapidAPI console

---

## 🎓 Alternative Services (if needed)

If Judge0 doesn't work for you:

1. **Piston** - https://github.com/engineer-man/piston
   - Free, open source
   - Self-hosted or use public instance
   
2. **JDoodle API** - https://www.jdoodle.com/compiler-api
   - Commercial service
   - Good Java support

3. **Sphere Engine** - https://sphere-engine.com
   - Enterprise-grade
   - Used by HackerRank

---

## 📝 Summary

Your website is now **production-ready** and can work from anywhere! 🎉

**Next Steps**:
1. ✅ Get Judge0 API key (free)
2. ✅ Add it to `.env`
3. ✅ Test locally
4. 🚀 Deploy to Railway/Render/Heroku
5. 🌍 Your website works globally!

**Questions?**
- Judge0 Docs: https://ce.judge0.com
- RapidAPI Support: https://rapidapi.com/support
- GitHub Issues: https://github.com/judge0/judge0/issues

---

Made with ❤️ for JavaCode Fortress
