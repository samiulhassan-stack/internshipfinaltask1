# 🚂 Deploy to Railway (Best for Backend with WebSocket)

## Why Railway for Backend?

✅ **WebSocket Support** - Real-time features work perfectly  
✅ **Always-on Server** - Not serverless  
✅ **PostgreSQL Included** - Free database  
✅ **Easy Setup** - 5 minutes deploy  
✅ **Auto-deploy** - Push to GitHub = auto update  

---

## 🎯 Deployment Steps

### Step 1: Deploy Backend to Railway

#### 1.1 Go to Railway
👉 **https://railway.app**

#### 1.2 Sign Up
1. Click **"Login"** or **"Start a New Project"**
2. Click **"Login with GitHub"**
3. Authorize Railway
4. Done! ✅

#### 1.3 Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find and select: `samiulhassan-stack/internshipfinaltask1`
4. Railway will show you the repo files

#### 1.4 Configure Backend
1. Railway will auto-detect it's a Node.js project ✅
2. Click on the service (it will say "Node")
3. Go to **"Settings"** tab

**Root Directory:**
```
backend
```

**Build Command:**
```bash
npm install && npx prisma generate && npm run build
```

**Start Command:**
```bash
npm start
```

**Watch Paths:**
```
backend/**
```

#### 1.5 Add PostgreSQL Database
1. In your project, click **"New"**
2. Select **"Database"**
3. Choose **"Add PostgreSQL"**
4. Railway will create database automatically ✅
5. Database URL is automatically available as `DATABASE_URL`

#### 1.6 Add Environment Variables
1. Click on your backend service
2. Go to **"Variables"** tab
3. Click **"Raw Editor"**
4. Add these:

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-railway
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
PORT=5000
```

**Note:** `${{Postgres.DATABASE_URL}}` auto-references Railway's Postgres

#### 1.7 Deploy!
1. Click **"Deploy"**
2. Watch logs (you'll see build progress)
3. Wait 2-3 minutes ⏳
4. Done! ✅

#### 1.8 Get Your Backend URL
1. Go to **"Settings"** tab
2. Scroll to **"Domains"**
3. Click **"Generate Domain"**
4. You'll get: `https://taskflow-backend-production.up.railway.app`
5. **Copy this URL!**

---

### Step 2: Setup Database on Railway

#### 2.1 Access Database
1. In Railway dashboard, click on **"Postgres"** service
2. Go to **"Data"** tab
3. You can see tables here after migration

#### 2.2 Run Migrations Locally (Pointing to Railway DB)

In your local terminal:

```bash
cd "c:\Users\USer\Desktop\final task internship\taskflow-app\backend"

# Get Railway database URL
# Go to Railway → Postgres → Variables → Copy DATABASE_URL

# Temporarily update your local .env
DATABASE_URL="postgresql://postgres:password@host.railway.app:5432/railway"

# Push schema to Railway database
npx prisma db push

# Seed demo data to Railway
node setup-db.js
```

#### 2.3 Verify
1. Go back to Railway dashboard
2. Click Postgres → Data tab
3. You should see: users, projects, tasks, etc. tables ✅

---

### Step 3: Deploy Frontend to Vercel

#### 3.1 Go to Vercel
👉 **https://vercel.com/new**

#### 3.2 Import Repository
1. Click **"Add New Project"**
2. Select: `samiulhassan-stack/internshipfinaltask1`
3. Click **"Import"**

#### 3.3 Configure Frontend
```
Project Name: taskflow-frontend
Framework: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
```

#### 3.4 Environment Variables
```env
VITE_API_URL=https://taskflow-backend-production.up.railway.app/api
VITE_WS_URL=https://taskflow-backend-production.up.railway.app
```

**Important:** Use your actual Railway backend URL!

#### 3.5 Deploy!
Click **"Deploy"** → Wait 2 minutes → Done! ✅

You'll get: `https://taskflow-frontend.vercel.app`

---

### Step 4: Update Backend CORS

1. Go to Railway dashboard
2. Click on backend service
3. Go to **"Variables"** tab
4. Update `FRONTEND_URL` to your Vercel URL:
   ```
   FRONTEND_URL=https://taskflow-frontend.vercel.app
   ```
5. Backend will auto-redeploy ✅

---

## ✅ Testing Your Live App

### Test Backend
1. Open: `https://taskflow-backend-production.up.railway.app/api/auth/login`
2. Should see API response (or 404 is fine, means it's running)

### Test Frontend
1. Open: `https://taskflow-frontend.vercel.app`
2. Login: `admin@taskflow.com` / `demo123`
3. Create a project
4. Create a task
5. **Open 2 browser tabs**
6. Update task in tab 1
7. See instant update in tab 2 ✅ (Real-time working!)

---

## 🎉 You're Live with Full Features!

### Your Live URLs:
- **Frontend:** `https://taskflow-frontend.vercel.app`
- **Backend:** `https://taskflow-backend-production.up.railway.app`
- **Database:** Railway PostgreSQL

### All Features Working:
✅ Authentication  
✅ Projects & Tasks CRUD  
✅ **Real-time Updates** (WebSocket)  
✅ Dashboard with Charts  
✅ Dark Mode  
✅ Role-based Permissions  

---

## 📝 Update GitHub README

```bash
cd "c:\Users\USer\Desktop\final task internship\taskflow-app"

# Edit README.md to add:
# - Live Demo: https://taskflow-frontend.vercel.app
# - Backend API: https://taskflow-backend-production.up.railway.app

git add .
git commit -m "Add Railway backend and Vercel frontend deployment"
git push
```

---

## 💰 Pricing (All FREE!)

### Railway Free Tier:
- ✅ $5 free credit/month
- ✅ Enough for hobby projects
- ✅ 500 hours/month
- ✅ 1GB RAM

### Vercel Free Tier:
- ✅ Unlimited projects
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Perfect for frontend

---

## 🔧 Common Issues

### Issue 1: Railway build fails
**Fix:**
- Check logs in Railway dashboard
- Verify root directory is `backend`
- Ensure `package.json` has correct scripts

### Issue 2: Database connection error
**Fix:**
- Ensure PostgreSQL is added to project
- Check `DATABASE_URL` variable exists
- Run `npx prisma db push` locally with Railway URL

### Issue 3: Frontend can't connect
**Fix:**
- Verify `VITE_API_URL` in Vercel has correct Railway URL
- Check Railway backend has `FRONTEND_URL` set to Vercel URL
- Redeploy both after env changes

---

## 🚀 Auto-Deploy Setup

### Frontend (Vercel)
✅ Already setup! Push to GitHub = auto-deploy

### Backend (Railway)
✅ Already setup! Push to GitHub = auto-deploy

**How it works:**
1. You push code to GitHub
2. Railway detects changes in `backend/` folder
3. Vercel detects changes in `frontend/` folder
4. Both auto-deploy! 🎉

---

## 📊 Monitoring

### Railway Dashboard
- View logs in real-time
- Monitor CPU/RAM usage
- Check deployment history
- View database metrics

### Vercel Dashboard
- View build logs
- Check analytics
- Monitor bandwidth
- View deployment history

---

## 🎯 Next Steps

1. ✅ Share live URL with friends
2. ✅ Add to your resume
3. ✅ Include in portfolio
4. ✅ Submit for capstone
5. ✅ Show in interviews!

---

## 🔗 Important Links

- **Railway Dashboard:** https://railway.app/dashboard
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** https://github.com/samiulhassan-stack/internshipfinaltask1
- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs

---

## ⭐ Best Deployment Setup

**Recommended Architecture:**
```
Frontend (Vercel)
    ↓ HTTPS
Backend (Railway)
    ↓ PostgreSQL
Database (Railway)
```

**Why This Setup:**
- ✅ Fastest frontend (Vercel CDN)
- ✅ Reliable backend (Railway always-on)
- ✅ Real-time works (WebSocket supported)
- ✅ Managed database (Railway Postgres)
- ✅ Free tier available
- ✅ Auto-deploy on push
- ✅ HTTPS included
- ✅ Professional URLs

---

**Deployment Time: 10-15 minutes**  
**Cost: $0 (Free tier)**  
**Features: All working including WebSocket! ✅**

Happy deploying! 🚀

