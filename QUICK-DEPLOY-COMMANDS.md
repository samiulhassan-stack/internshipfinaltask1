# ⚡ Quick Deploy Commands (5 Minutes!)

## 🎯 Fastest Method - Vercel (Frontend Only First)

### Step 1: Frontend Deploy (2 minutes)

```bash
# Navigate to project
cd "c:\Users\USer\Desktop\final task internship\taskflow-app"

# Login to Vercel (agar pehli baar hai)
vercel login

# Deploy frontend
cd frontend
vercel --prod
```

**Follow prompts:**
1. Set up and deploy? → **Y**
2. Which scope? → Select your account
3. Link to existing project? → **N**
4. Project name? → `taskflow-app` (or press Enter)
5. Which directory? → Press Enter (current: frontend)
6. Override settings? → **N**

**Result:** Frontend live URL milega! (Example: https://taskflow-app.vercel.app)

---

## 🚀 Step 2: Backend Deploy to Render.com

**Manual method (easier for first time):**

### A. Create Account
1. Go to: **https://render.com**
2. Sign up with GitHub

### B. Deploy Database (3 minutes)
1. Click **"New +"** → **"PostgreSQL"**
2. Fill:
   - Name: `taskflow-db`
   - Plan: **Free**
3. Click **"Create Database"**
4. Wait 2 minutes
5. Copy **Internal Database URL**

### C. Deploy Backend (5 minutes)
1. Click **"New +"** → **"Web Service"**
2. Connect GitHub repo: `samiulhassan-stack/internshipfinaltask1`
3. Fill:
   ```
   Name: taskflow-backend
   Root Directory: backend
   Build Command: npm install && npx prisma generate
   Start Command: npm start
   ```
4. Add Environment Variables:
   ```
   DATABASE_URL = [Database URL from step B.5]
   JWT_SECRET = super-secret-jwt-key-2024
   NODE_ENV = production
   FRONTEND_URL = [Your Vercel URL from Step 1]
   PORT = 10000
   ```
5. Click **"Create Web Service"**
6. Wait 5-7 minutes for deployment

### D. Run Database Setup
1. In Render dashboard, click **"Shell"** tab
2. Run:
   ```bash
   npx prisma migrate deploy
   node setup-db.js
   ```

---

## 🔗 Step 3: Connect Frontend to Backend

### Update Frontend Environment:

1. Go to Vercel dashboard: **https://vercel.com**
2. Open your project: **taskflow-app**
3. Go to **Settings** → **Environment Variables**
4. Add:
   ```
   VITE_API_URL = [Your Render backend URL]/api
   VITE_WS_URL = [Your Render backend URL]
   ```
   Example:
   ```
   VITE_API_URL = https://taskflow-backend-abc.onrender.com/api
   VITE_WS_URL = https://taskflow-backend-abc.onrender.com
   ```
5. Go to **Deployments** tab
6. Click **"Redeploy"** on latest deployment

---

## ✅ Done! Test Your Live App

Your app is now live at:
- **Frontend:** https://taskflow-app.vercel.app
- **Backend:** https://taskflow-backend-abc.onrender.com

**Login:**
```
Email: admin@taskflow.com
Password: demo123
```

---

## 🎯 Alternative: All-in-One Vercel (If you have Pro account)

```bash
cd "c:\Users\USer\Desktop\final task internship\taskflow-app"
vercel --prod
```

But this requires Vercel Pro for serverless functions with database.

---

## 📊 Deployment Status Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] Database created on Render
- [ ] Database migrated
- [ ] Demo user seeded
- [ ] Environment variables set
- [ ] Frontend connected to backend
- [ ] Live app tested
- [ ] Login works
- [ ] Real-time updates work

---

## 🆘 Quick Troubleshooting

**Issue:** "Network Error" on frontend
→ Check VITE_API_URL in Vercel environment variables

**Issue:** Backend not starting
→ Check DATABASE_URL in Render environment variables

**Issue:** Login not working
→ Run `node setup-db.js` in Render Shell

**Issue:** CORS error
→ Check FRONTEND_URL in Render matches your Vercel URL

---

**Ready? Start with Step 1 above! 🚀**
