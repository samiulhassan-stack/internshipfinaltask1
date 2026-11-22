# 🚀 Deploy to Vercel - Step by Step Guide

## Quick Summary
Vercel pe deploy karna bohot easy hai! Just follow these steps.

---

## 📋 Prerequisites

1. **GitHub Account** ✅ (Already done)
2. **Vercel Account** - [Sign up](https://vercel.com/signup)
3. **GitHub Repository** ✅ (Already pushed)

---

## 🎯 Deployment Steps

### Step 1: Create Vercel Account

1. Go to: https://vercel.com/signup
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub
4. Done! ✅

---

### Step 2: Deploy Backend

#### 2.1 Import Project
1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select: `samiulhassan-stack/internshipfinaltask1`
4. Click **"Import"**

#### 2.2 Configure Backend
1. **Project Name:** `taskflow-backend`
2. **Framework Preset:** Other
3. **Root Directory:** Click "Edit" → Select `backend`
4. **Build Command:**
   ```bash
   npm install && npx prisma generate && npm run build
   ```
5. **Output Directory:** `dist`
6. **Install Command:** `npm install`

#### 2.3 Environment Variables
Click **"Environment Variables"** and add these:

| Name | Value |
|------|-------|
| `DATABASE_URL` | `file:./dev.db` |
| `JWT_SECRET` | `your-super-secret-jwt-key-change-this-in-production-vercel` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://your-frontend.vercel.app` (update after frontend deploy) |
| `PORT` | `3000` |

#### 2.4 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes ⏳
3. You'll get URL like: `https://taskflow-backend.vercel.app`
4. **Copy this URL!** (You'll need it for frontend)

---

### Step 3: Deploy Frontend

#### 3.1 Import Project Again
1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select: `samiulhassan-stack/internshipfinaltask1`
4. Click **"Import"**

#### 3.2 Configure Frontend
1. **Project Name:** `taskflow-frontend`
2. **Framework Preset:** Vite
3. **Root Directory:** Click "Edit" → Select `frontend`
4. **Build Command:**
   ```bash
   npm run build
   ```
5. **Output Directory:** `dist`
6. **Install Command:** `npm install`

#### 3.3 Environment Variables
Click **"Environment Variables"** and add these:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://taskflow-backend.vercel.app/api` (your backend URL) |
| `VITE_WS_URL` | `https://taskflow-backend.vercel.app` (your backend URL) |

#### 3.4 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes ⏳
3. You'll get URL like: `https://taskflow-frontend.vercel.app`
4. **This is your live app!** 🎉

---

### Step 4: Update Backend Environment

1. Go to backend project: https://vercel.com/dashboard
2. Click on `taskflow-backend`
3. Go to **Settings** → **Environment Variables**
4. Edit `FRONTEND_URL`
5. Set to: `https://taskflow-frontend.vercel.app` (your actual frontend URL)
6. Click **"Save"**
7. Go to **Deployments** tab
8. Click **"Redeploy"** (3 dots menu)

---

### Step 5: Setup Database on Vercel

Since SQLite doesn't work on Vercel (filesystem is read-only), we need to use Vercel Postgres.

#### Option A: Use Vercel Postgres (Recommended)

1. Go to backend project dashboard
2. Click **"Storage"** tab
3. Click **"Create Database"**
4. Select **"Postgres"**
5. Click **"Continue"**
6. Database name: `taskflow-db`
7. Click **"Create"**
8. Copy the `DATABASE_URL` (automatically added to env vars)
9. In your local terminal:
   ```bash
   cd backend
   # Update DATABASE_URL in .env to Vercel Postgres URL
   npx prisma db push
   node setup-db.js
   ```

#### Option B: Use External Database (Easier)

Use **Neon** (Free PostgreSQL):

1. Go to: https://neon.tech
2. Sign up with GitHub
3. Create new project: `taskflow-db`
4. Copy connection string (looks like: `postgresql://user:pass@host/db?sslmode=require`)
5. Go to Vercel backend → Settings → Environment Variables
6. Update `DATABASE_URL` to Neon connection string
7. Redeploy backend

---

## ✅ Verification Steps

### Test Backend
1. Open: `https://taskflow-backend.vercel.app/api/health`
2. Should see: `{"status": "ok"}`

### Test Frontend
1. Open: `https://taskflow-frontend.vercel.app`
2. Should see login page
3. Try login: `admin@taskflow.com` / `demo123`

---

## 🔧 Common Issues & Fixes

### Issue 1: Backend 404 Error
**Fix:**
- Check `vercel.json` in backend folder exists
- Verify build command includes `npm run build`
- Check logs in Vercel dashboard

### Issue 2: Frontend can't connect to backend
**Fix:**
- Verify `VITE_API_URL` has correct backend URL
- Check CORS settings in backend
- Redeploy frontend after env var change

### Issue 3: Database connection error
**Fix:**
- Use external database (Neon/PlanetScale)
- Don't use SQLite on Vercel
- Update `DATABASE_URL` in Vercel environment variables

### Issue 4: WebSocket not working
**Note:** Vercel serverless functions don't support WebSocket well.
**Solution:** Deploy backend to Railway instead (see below)

---

## 🎯 Better Alternative: Vercel Frontend + Railway Backend

### Why?
- Vercel is perfect for frontend
- Railway is better for backend (supports WebSocket)
- Best of both worlds!

### Deploy Backend to Railway

1. Go to: https://railway.app
2. Sign up with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose: `samiulhassan-stack/internshipfinaltask1`
6. Root directory: `backend`
7. Add environment variables (same as above)
8. Railway will auto-detect Node.js
9. Get URL like: `https://taskflow-backend.railway.app`

### Benefits:
- ✅ WebSocket support (real-time features work!)
- ✅ PostgreSQL database included
- ✅ Better for Node.js apps
- ✅ Always-on server (not serverless)

---

## 📝 Update GitHub with Live URLs

After deployment, update README.md:

```bash
cd "c:\Users\USer\Desktop\final task internship\taskflow-app"
# Edit README.md and add:
# - Live Demo: https://taskflow-frontend.vercel.app
# - API URL: https://taskflow-backend.vercel.app

git add README.md
git commit -m "Add live deployment URLs"
git push
```

---

## 🎉 Final Checklist

- [ ] Vercel account created
- [ ] Backend deployed to Vercel/Railway
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] Database setup (Neon/PlanetScale)
- [ ] Frontend can connect to backend
- [ ] Login works with demo credentials
- [ ] Updated GitHub README with live URLs

---

## 🔗 Important Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Railway Dashboard:** https://railway.app/dashboard
- **Neon Dashboard:** https://console.neon.tech
- **GitHub Repo:** https://github.com/samiulhassan-stack/internshipfinaltask1

---

## ⚡ Quick Deploy Commands

If you have Vercel CLI installed:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy backend
cd backend
vercel --prod

# Deploy frontend
cd ../frontend
vercel --prod
```

---

## 🎓 What You'll Have After Deployment

✅ Live frontend URL (Vercel)  
✅ Live backend URL (Vercel/Railway)  
✅ Working database (Neon/PlanetScale)  
✅ SSL certificates (HTTPS)  
✅ Auto-deploy on git push  
✅ Professional portfolio piece  

---

## 📸 Screenshots to Take

After deployment, take screenshots:
1. Login page
2. Dashboard with charts
3. Project list
4. Task board
5. Dark mode
6. Real-time update (2 tabs)

Add these to GitHub repo!

---

## 🚀 You're Ready!

Follow the steps above and your app will be live in 15 minutes!

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app

Good luck! 🎉

