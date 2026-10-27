# TaskFlow Deployment Guide

## Quick Start with Docker

The easiest way to run TaskFlow locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/taskflow-app.git
cd taskflow-app

# Start all services with Docker Compose
docker-compose up -d

# Run database migrations
docker-compose exec backend npx prisma migrate deploy

# Seed the database (optional)
docker-compose exec backend npx prisma db seed
```

Access the app at `http://localhost:5173`

## Production Deployment

### Backend Deployment (Railway)

1. **Create a Railway account** at https://railway.app

2. **Create a new project** and add PostgreSQL database

3. **Deploy backend from GitHub:**
   - Connect your GitHub repository
   - Set root directory to `/backend`
   - Railway will auto-detect Node.js

4. **Set environment variables:**
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}  (auto-provided)
   JWT_SECRET=<generate-secure-random-string>
   FRONTEND_URL=https://your-frontend.vercel.app
   PORT=5000
   NODE_ENV=production
   ```

5. **Deploy:** Railway will automatically build and deploy

6. **Run migrations:** In Railway dashboard terminal:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

### Frontend Deployment (Vercel)

1. **Create a Vercel account** at https://vercel.com

2. **Import your GitHub repository**

3. **Configure build settings:**
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Set environment variables:**
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   VITE_WS_URL=https://your-backend.railway.app
   ```

5. **Deploy:** Vercel will automatically build and deploy

### Alternative: Netlify + Render

**Frontend (Netlify):**
- Same steps as Vercel
- Build command: `npm run build`
- Publish directory: `dist`

**Backend (Render):**
- Create new Web Service
- Connect GitHub repo, select `/backend` directory
- Build command: `npm install && npx prisma generate && npm run build`
- Start command: `npm start`
- Add PostgreSQL database
- Set environment variables

## Environment Variables Reference

### Backend
```bash
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend
```bash
VITE_API_URL=https://your-backend-url.com/api
VITE_WS_URL=https://your-backend-url.com
```

## Post-Deployment Checklist

- [ ] Backend health check: `https://your-backend-url.com/health`
- [ ] Database migrations applied
- [ ] Seed data loaded (optional)
- [ ] Frontend can connect to backend API
- [ ] WebSocket connection working
- [ ] Test authentication flow
- [ ] Test creating projects and tasks
- [ ] Test real-time updates
- [ ] Check CORS configuration
- [ ] Verify SSL/HTTPS on both services

## Monitoring & Maintenance

### Database Backups
Railway and Render provide automatic PostgreSQL backups. Configure:
- Daily automated backups
- 7-day retention minimum
- Download backup before major migrations

### Logs
- Railway: View logs in dashboard
- Vercel: Check deployment logs and function logs
- Set up error tracking (Sentry recommended)

### Scaling
- Backend: Scale dynos/instances in Railway/Render dashboard
- Frontend: Vercel handles automatic scaling
- Database: Upgrade plan for more connections/storage

## Troubleshooting

**CORS Errors:**
- Verify `FRONTEND_URL` in backend matches your frontend domain
- Check `VITE_API_URL` is correct in frontend

**Database Connection Issues:**
- Ensure `DATABASE_URL` is correctly formatted
- Check database service is running
- Verify migrations have been applied

**WebSocket Not Connecting:**
- Ensure `VITE_WS_URL` doesn't have `/api` suffix
- Check WebSocket is enabled on your hosting platform
- Verify CORS configuration allows WebSocket connections

**Build Failures:**
- Clear node_modules and reinstall
- Check Node.js version matches (18+)
- Verify all environment variables are set

## CI/CD

The project includes GitHub Actions for:
- Running tests on push/PR
- Linting code
- Building frontend

Deployment is automatic on push to `main` branch when connected to Vercel/Railway.

## Custom Domain Setup

**Vercel:**
1. Go to project settings
2. Add custom domain
3. Configure DNS records as instructed

**Railway:**
1. Go to project settings
2. Generate domain or add custom
3. Update frontend environment variable

## Security Considerations

- ✅ Use strong, unique JWT_SECRET
- ✅ Enable HTTPS/SSL on all services
- ✅ Keep dependencies updated
- ✅ Use environment variables for secrets
- ✅ Enable rate limiting (add in future)
- ✅ Regular database backups
- ✅ Monitor error logs for suspicious activity

## Cost Estimation

**Free Tier (Suitable for demo/portfolio):**
- Railway: Free tier includes $5/month credit
- Vercel: Generous free tier for hobby projects
- Estimated: $0-5/month

**Production Tier:**
- Railway: ~$10-20/month (backend + database)
- Vercel: Free tier usually sufficient
- Estimated: $10-20/month

---

**Need help?** Open an issue on GitHub or reach out via email.
