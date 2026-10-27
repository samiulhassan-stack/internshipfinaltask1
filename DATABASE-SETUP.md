# 🗄️ Database Setup Guide

## Problem: Database Not Setup

Login fail ho raha hai kyunki database properly setup nahi hai.

---

## ✅ Complete Database Setup (Step by Step)

### **Step 1: PostgreSQL Password Find Karein**

Aap ko apna PostgreSQL password chahiye jo installation ke time set kiya tha.

**Yaad nahi?** No problem - naya user create kar sakte hain.

---

### **Step 2: Edit Backend .env File**

File location: `taskflow-app\backend\.env`

**Change this line:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/taskflow?schema=public"
```

**To this (with your password):**
```env
DATABASE_URL="postgresql://postgres:YOUR_REAL_PASSWORD@localhost:5432/taskflow?schema=public"
```

**Example (if password is "admin123"):**
```env
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/taskflow?schema=public"
```

---

### **Step 3: Create Database**

#### **Option A: Using pgAdmin (GUI)**

1. Open pgAdmin
2. Connect to PostgreSQL server
3. Right-click "Databases"
4. Create → Database
5. Name: `taskflow`
6. Save

#### **Option B: Using Command Line**

```powershell
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE taskflow;

# Exit
\q
```

---

### **Step 4: Run Prisma Commands**

Open PowerShell in `taskflow-app\backend`:

```powershell
cd "C:\Users\USer\Desktop\final task internship\taskflow-app\backend"

# Step 1: Generate Prisma Client
npx prisma generate

# Step 2: Create Tables (Run Migrations)
npx prisma migrate deploy

# Step 3: Add Demo Data (Create admin user)
npx prisma db seed
```

**Expected output:**
```
✓ Prisma client generated
✓ Migrations applied
✓ Database seeded
✓ Users created
✓ Project created
✓ Tasks created
🎉 Database seeded successfully!
```

---

### **Step 5: Verify Database**

Check database has data:

```powershell
cd taskflow-app\backend
npx prisma studio
```

This opens a browser with database viewer.

Check:
- ✅ `users` table has data (admin@taskflow.com)
- ✅ `projects` table has data
- ✅ `tasks` table has data

---

### **Step 6: Restart Backend**

1. Close backend terminal (Ctrl+C)
2. Start again:
   ```powershell
   cd taskflow-app\backend
   npm run dev
   ```

**Look for:**
```
🚀 Server running on port 5000
📡 WebSocket server ready
```

**No errors about database!**

---

### **Step 7: Test Login**

1. Go to: http://localhost:5173
2. Login with:
   - Email: `admin@taskflow.com`
   - Password: `demo123`
3. Should work! ✅

---

## ❌ Common Errors & Solutions

### Error: "Authentication failed for user"
**Problem:** Password wrong in .env
**Fix:** Double-check password in DATABASE_URL

### Error: "database does not exist"
**Problem:** taskflow database not created
**Fix:** Create database first (Step 3)

### Error: "Connection refused"
**Problem:** PostgreSQL not running
**Fix:** Start PostgreSQL service

### Error: "Prisma schema not found"
**Problem:** Running command from wrong directory
**Fix:** Make sure you're in `taskflow-app\backend`

### Error: "P1001: Can't reach database server"
**Problem:** PostgreSQL not running OR wrong host
**Fix:** 
1. Check PostgreSQL service is running
2. Check DATABASE_URL is correct

---

## 🎯 Quick Setup Script

Save this as `setup-database.bat` in `taskflow-app` folder:

```batch
@echo off
echo Setting up database...
cd backend
echo Step 1: Generate Prisma Client...
call npx prisma generate
echo Step 2: Run Migrations...
call npx prisma migrate deploy
echo Step 3: Seed Database...
call npx prisma db seed
echo Done! Database is ready.
pause
```

Then just double-click to run!

---

## ✅ Verification Checklist

After setup, verify:

- [ ] PostgreSQL service is running
- [ ] Database "taskflow" exists
- [ ] backend\.env has correct password
- [ ] `npx prisma generate` completed
- [ ] `npx prisma migrate deploy` completed
- [ ] `npx prisma db seed` completed
- [ ] Backend starts without errors
- [ ] Can login with admin@taskflow.com

---

## 🎉 Success!

Jab sab steps complete ho jaye, login will work perfectly!

**Demo Credentials:**
- Email: `admin@taskflow.com`
- Password: `demo123`

Enjoy TaskFlow! 🚀
