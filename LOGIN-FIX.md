# 🔧 Login Issue - Troubleshooting Guide

## ❌ Problem: Login Nahi Ho Raha

Ye issue hone ke 3 main reasons hain:

---

## 🔍 Diagnosis: Check Kya Issue Hai

### **Step 1: Backend Check Karein**

Browser mein open karein:
```
http://localhost:5000/health
```

**Expected:** `{"status":"ok","message":"TaskFlow API is running"}`

**Agar ye nahi dikha:**
- ❌ Backend running nahi hai
- ❌ Port 5000 blocked hai

---

### **Step 2: Browser Console Check Karein**

1. Login page pe jao
2. Press `F12` (Developer Tools)
3. "Console" tab kholo
4. Login try karo
5. Red errors dekho

**Common Errors:**

#### Error 1: "Network Error" / "ERR_CONNECTION_REFUSED"
**Problem:** Backend nahi chal raha
**Solution:** Backend start karo

#### Error 2: "404 Not Found"
**Problem:** Wrong API URL
**Solution:** Check frontend `.env`

#### Error 3: "500 Internal Server Error" / "Cannot connect to database"
**Problem:** Database issue
**Solution:** Neeche dekho ⬇️

---

## ✅ Solution 1: Database Setup Nahi Hai

### **Problem:**
Backend `.env` file mein database URL **dummy** hai:
```
DATABASE_URL="postgresql://user:password@localhost:5432/taskflow"
                        ↑    ↑
                     Ye fake hai!
```

### **Fix:**

1. **PostgreSQL password check karein**
   - Aap ko apna PostgreSQL password yaad hai?
   - Usually installation ke time set kiya tha

2. **Edit backend\.env file:**
   ```env
   DATABASE_URL="postgresql://postgres:APNA_REAL_PASSWORD@localhost:5432/taskflow"
   ```
   
   Replace `APNA_REAL_PASSWORD` with your actual password!

3. **Database setup karein:**
   ```powershell
   cd taskflow-app\backend
   
   # Generate Prisma client
   npx prisma generate
   
   # Create database & tables
   npx prisma migrate deploy
   
   # Add demo data (admin user)
   npx prisma db seed
   ```

4. **Backend restart karein:**
   - Backend terminal ko close karo
   - Phir se start karo: `npm run dev`

---

## ✅ Solution 2: Database User Create Karein

Agar password nahi pata ya database access nahi hai:

### **Create New Database:**

1. **Open pgAdmin or psql**

2. **Create database:**
   ```sql
   CREATE DATABASE taskflow;
   ```

3. **Or use default postgres database:**
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/postgres"
   ```

4. **Run migrations again:**
   ```powershell
   cd taskflow-app\backend
   npx prisma migrate deploy
   npx prisma db seed
   ```

---

## ✅ Solution 3: Backend Se Direct Test Karein

Test API directly:

### **Method 1: Browser**
```
http://localhost:5000/api/auth/login
```

Should show: "Cannot GET..." (normal - needs POST request)

### **Method 2: PowerShell (Test Login)**
```powershell
$body = @{
    email = "admin@taskflow.com"
    password = "demo123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

**Agar error aaya:**
- Check backend terminal for error message
- Probably database issue hai

---

## ✅ Solution 4: Fresh Database Setup

Sab kuch reset karke new start:

```powershell
cd taskflow-app\backend

# Reset database
npx prisma migrate reset --force

# Seed again
npx prisma db seed

# Restart backend
npm run dev
```

---

## 📋 Quick Checklist:

Before trying login again:

- [ ] PostgreSQL service running hai
- [ ] backend\.env file mein REAL password hai
- [ ] `npx prisma generate` run kiya
- [ ] `npx prisma migrate deploy` run kiya
- [ ] `npx prisma db seed` run kiya
- [ ] Backend running hai (port 5000)
- [ ] Frontend running hai (port 5173)
- [ ] http://localhost:5000/health works
- [ ] Browser console mein koi error nahi

---

## 🎯 Most Common Fix:

```powershell
# 1. Edit backend\.env with real PostgreSQL password
# 2. Then run:

cd taskflow-app\backend
npx prisma generate
npx prisma migrate deploy
npx prisma db seed

# 3. Restart backend
npm run dev

# 4. Try login again!
```

---

## 🆘 Still Not Working?

**Check backend terminal for errors:**
- Look for "database" errors
- Look for "connection" errors
- Copy paste error message

**Most likely:**
- Database password wrong in .env
- PostgreSQL not running
- Database not created

---

## 💡 Pro Tip:

Backend terminal mein error message dikhayi dega!

Jab login try karo, backend terminal check karo kya error aa raha hai.

---

**Fix karne ke baad login credentials:**
- Email: `admin@taskflow.com`
- Password: `demo123`

This will work after database is properly setup! 🚀
