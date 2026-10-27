# 🚀 Easy Start - Without PostgreSQL Setup

## Quick Demo Mode (SQLite)

Agar PostgreSQL setup mein problem aa rahi hai, to SQLite use kar sakte hain (file-based database, no setup needed!)

---

## ✅ Convert to SQLite (5 Steps)

### Step 1: Edit prisma/schema.prisma

File: `taskflow-app\backend\prisma\schema.prisma`

**Change:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**To:**
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

### Step 2: Edit backend/.env

File: `taskflow-app\backend\.env`

**Comment out PostgreSQL, add SQLite:**
```env
# PostgreSQL (commented out)
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskflow"

# SQLite (for quick demo)
DATABASE_URL="file:./dev.db"
```

### Step 3: Run Setup Commands

```powershell
cd "C:\Users\USer\Desktop\final task internship\taskflow-app\backend"

# Generate Prisma client
npx prisma generate

# Create database (creates dev.db file)
npx prisma migrate dev --name init

# Add demo data
npx prisma db seed
```

### Step 4: Start Backend

```powershell
npm run dev
```

### Step 5: Start Frontend (New Terminal)

```powershell
cd "C:\Users\USer\Desktop\final task internship\taskflow-app\frontend"
npm run dev
```

### Step 6: Login!

- URL: http://localhost:5173
- Email: admin@taskflow.com
- Password: demo123

**Works without PostgreSQL!** ✅

---

## 🔄 Convert Back to PostgreSQL Later

Jab PostgreSQL ready ho jaye:

1. Change schema.prisma back to postgresql
2. Update .env with PostgreSQL URL
3. Run migrations again
4. Done!

---

## ⭐ Pros of SQLite for Demo:

- ✅ No password needed
- ✅ No PostgreSQL install needed
- ✅ Just works!
- ✅ Perfect for testing
- ✅ Database is just a file (dev.db)

## ❌ Cons:

- ❌ Not for production
- ❌ No real-time features work perfectly
- ❌ Less concurrent users

---

**For Quick Demo: SQLite**
**For Production: PostgreSQL**

Choose based on your need! 🚀
