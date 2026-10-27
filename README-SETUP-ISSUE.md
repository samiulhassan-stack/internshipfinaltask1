# ⚠️ Setup Issue - Path Contains Spaces

## Problem

Aap ka folder path mein **space hai**:
```
C:\Users\USer\Desktop\final task internship\taskflow-app
                      ↑     ↑    ↑
                      Spaces causing issues
```

NPM aur Windows sometimes spaces se issues create karte hain.

---

## 🔧 Solutions (3 Options)

### **Option 1: Folder Rename (Easiest) ⭐ Recommended**

1. Folder `final task internship` ko rename karein
2. New name: `final-task-internship` (no spaces!)
3. New path: `C:\Users\USer\Desktop\final-task-internship\taskflow-app`
4. Commands phir se run karein

---

### **Option 2: Move to C:\ Drive (Best)**

1. `taskflow-app` folder ko copy karein
2. `C:\` drive mein paste karein
3. New path: `C:\taskflow-app\`
4. Commands is path se run karein:

```powershell
cd C:\taskflow-app\backend
npm install
```

---

### **Option 3: Use Quotes (Temporary Fix)**

Har command mein **quotes** use karein:

```powershell
cd "C:\Users\USer\Desktop\final task internship\taskflow-app\backend"
npm install --force
```

---

## ✅ Recommended Steps

1. **Move folder to C:\**
   ```
   Old: C:\Users\USer\Desktop\final task internship\taskflow-app
   New: C:\taskflow-app
   ```

2. **Install Backend Dependencies**
   ```powershell
   cd C:\taskflow-app\backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```powershell
   cd C:\taskflow-app\frontend
   npm install
   ```

4. **Follow Setup Guide**
   - Read: `SETUP-SIMPLE.md`
   - Or: `START.md`

---

## 🎯 After Moving Folder

```powershell
# Backend
cd C:\taskflow-app\backend
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev

# Frontend (new terminal)
cd C:\taskflow-app\frontend
npm install
npm run dev
```

Open: http://localhost:5173

---

## 🆘 Still Having Issues?

1. **Check Node.js is installed:**
   ```powershell
   node --version
   npm --version
   ```

2. **Clear npm cache:**
   ```powershell
   npm cache clean --force
   ```

3. **Run as Administrator:**
   - Right-click PowerShell
   - "Run as Administrator"

---

**Best Solution:** Move `taskflow-app` to `C:\taskflow-app\` and work from there!
