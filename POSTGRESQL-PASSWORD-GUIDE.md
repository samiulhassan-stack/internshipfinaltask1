# 🔐 PostgreSQL Password - Complete Guide

## 🎯 PostgreSQL Password Kaise Pata Karein Ya Set Karein

---

## Option 1: Password Yaad Hai? ✅

Agar aap ko PostgreSQL install karte waqt jo password set kiya tha **yaad hai**, to:

### **Simply Edit .env File:**

1. Open: `taskflow-app\backend\.env`
2. Find this line:
   ```
   DATABASE_URL="postgresql://postgres:APNA_PASSWORD@localhost:5432/taskflow"
   ```
3. Replace `APNA_PASSWORD` with your actual password
4. Example (if password is "admin123"):
   ```
   DATABASE_URL="postgresql://postgres:admin123@localhost:5432/taskflow"
   ```
5. Save file
6. Done! ✅

---

## Option 2: Password Nahi Yaad? 🤔

No problem! Naya password set kar sakte hain.

### **Method A: Using pgAdmin (GUI - Easiest)**

#### Step 1: Open pgAdmin
- Start Menu → Search "pgAdmin"
- Ya C:\Program Files\PostgreSQL\XX\pgAdmin 4\bin\pgAdmin4.exe

#### Step 2: Connect to Server
- Agar pehli baar khol rahe ho, password maangega
- Agar nahi yaad, next method use karo

#### Step 3: Change Password
1. Left panel mein → Servers → PostgreSQL XX
2. Right-click on "postgres" (under Login/Group Roles)
3. Select "Properties"
4. Go to "Definition" tab
5. Enter new password
6. Click "Save"

#### Step 4: Use This Password
```
DATABASE_URL="postgresql://postgres:YOUR_NEW_PASSWORD@localhost:5432/taskflow"
```

---

### **Method B: Using Command Line (PowerShell)**

#### Step 1: Open PowerShell as Administrator
- Right-click PowerShell
- "Run as Administrator"

#### Step 2: Find PostgreSQL bin folder
Default locations:
```
C:\Program Files\PostgreSQL\15\bin\
C:\Program Files\PostgreSQL\14\bin\
C:\Program Files\PostgreSQL\13\bin\
```

#### Step 3: Navigate to bin folder
```powershell
cd "C:\Program Files\PostgreSQL\15\bin"
```
(Change 15 to your version number)

#### Step 4: Connect to PostgreSQL
```powershell
.\psql.exe -U postgres
```

**Agar password maange:** Try these common defaults:
- `postgres`
- `admin`
- `password`
- `root`
- Blank (just press Enter)

#### Step 5: Change Password
Once connected, run:
```sql
ALTER USER postgres WITH PASSWORD 'newpassword123';
```

Replace `newpassword123` with your desired password!

#### Step 6: Exit
```sql
\q
```

#### Step 7: Use New Password
```
DATABASE_URL="postgresql://postgres:newpassword123@localhost:5432/taskflow"
```

---

### **Method C: Using Services Authentication (Trust)**

Agar password set karna nahi chahte, temporarily trust mode use kar sakte hain:

#### Step 1: Find pg_hba.conf file
Location (usually):
```
C:\Program Files\PostgreSQL\XX\data\pg_hba.conf
```

#### Step 2: Edit pg_hba.conf (as Administrator)
1. Right-click file → Open with Notepad (as Admin)
2. Find line:
   ```
   host    all             all             127.0.0.1/32            scram-sha-256
   ```
3. Change `scram-sha-256` to `trust`
4. Save file

#### Step 3: Restart PostgreSQL Service
- Win + R → `services.msc`
- Find "postgresql-x64-XX"
- Right-click → Restart

#### Step 4: Now No Password Needed!
```
DATABASE_URL="postgresql://postgres@localhost:5432/taskflow"
```

**⚠️ Warning:** This is less secure! Only for development.

---

## Option 3: PostgreSQL Nahi Install Hai? 📥

### **Install PostgreSQL:**

#### Step 1: Download
Go to: https://www.postgresql.org/download/windows/

Click: "Download the installer"

#### Step 2: Run Installer
- Select Components: PostgreSQL Server, pgAdmin 4
- Set Port: 5432 (default)
- **Set Password:** Choose a password (YAAD RAKHEIN!)
  - Example: `postgres123`
  - Write it down!

#### Step 3: Complete Installation
- Finish installation
- Remember your password!

#### Step 4: Use Password in .env
```
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/taskflow"
```

---

## ✅ After Setting Password

### **Test Connection:**

```powershell
cd "C:\Program Files\PostgreSQL\15\bin"
.\psql.exe -U postgres -d postgres
```

Enter your password when prompted.

**If successful:** You'll see `postgres=#` prompt

**This means password is correct!** ✅

---

## 🎯 Complete Example:

### **Scenario: Password is "mypass123"**

1. **Open:** `taskflow-app\backend\.env`

2. **Change this:**
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/taskflow"
   ```

3. **To this:**
   ```env
   DATABASE_URL="postgresql://postgres:mypass123@localhost:5432/taskflow"
   ```

4. **Save file**

5. **Create database:**
   ```powershell
   cd "C:\Program Files\PostgreSQL\15\bin"
   .\psql.exe -U postgres
   # Enter password: mypass123
   CREATE DATABASE taskflow;
   \q
   ```

6. **Run setup:**
   ```powershell
   cd "C:\Users\USer\Desktop\final task internship\taskflow-app\backend"
   npx prisma generate
   npx prisma migrate deploy
   npx prisma db seed
   ```

7. **Done!** ✅

---

## 🔍 How to Verify Password is Correct

### **Test 1: Command Line**
```powershell
cd "C:\Program Files\PostgreSQL\15\bin"
.\psql.exe -U postgres -c "SELECT version();"
```

If password wrong: `password authentication failed`
If correct: Shows PostgreSQL version

### **Test 2: Using TaskFlow Backend**
After setting password in .env:
```powershell
cd taskflow-app\backend
npx prisma db push
```

If password wrong: `Authentication failed`
If correct: `Database synchronized`

---

## 📝 Summary:

1. **Find your PostgreSQL password** (or set new one)
2. **Edit** `taskflow-app\backend\.env`
3. **Replace** `APNA_PASSWORD` with real password
4. **Save** file
5. **Test** connection
6. **Run** database setup commands

---

## 🆘 Still Having Issues?

### **Quick Fix: Use Simple Password**

1. Set PostgreSQL password to: `postgres`
2. Then use:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskflow"
   ```

Simple! ✅

---

## 💡 Pro Tips:

- **Write down your password** somewhere safe
- **Use simple password** for development (e.g., "postgres", "admin123")
- **Test connection** before running migrations
- **Restart PostgreSQL service** after any config changes

---

**Agar abhi bhi issue ho to mujhe batao! Main help karunga!** 🚀
