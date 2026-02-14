# ⚡ 20-Minute Deployment Guide

## What You're Deploying

A professional SMT trading journal with:
- ✅ Working tabs (React state - mobile-optimized)
- ✅ Cloud database (Supabase PostgreSQL)
- ✅ Free hosting (Vercel)
- ✅ All bugs fixed from HTML version

---

## Step 1: GitHub (5 min)

### Create Account
1. Go to https://github.com
2. Sign up (free)
3. Verify email

### Upload Code
**Option A - Website (Easiest):**
1. Click "New repository"
2. Name: `smt-trading-journal`
3. Click "uploading an existing file"
4. Drag ALL folders/files from this project
5. Click "Commit changes"

**Option B - Command Line:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/smt-trading-journal.git
git push -u origin main
```

---

## Step 2: Supabase (10 min)

### Create Account
1. Go to https://supabase.com
2. Sign up with GitHub (easier)

### Create Project
1. Click "New Project"
2. Fill in:
   - Name: `SMT Trading Journal`
   - Database Password: (create strong password - SAVE THIS!)
   - Region: (closest to you)
   - Plan: Free
3. Click "Create"
4. Wait 2-3 minutes

### Setup Database
1. Click "SQL Editor" in sidebar
2. Click "New query"
3. Open `supabase-schema.sql` from this project
4. Copy entire contents
5. Paste into SQL editor
6. Click "Run" (or Cmd/Ctrl + Enter)
7. Should see "Success" messages

### Get Credentials
1. Click "Settings" (gear icon)
2. Click "API"
3. Copy these two:
   - **Project URL**
   - **anon/public key**
4. **SAVE THESE** - you'll need them next

---

## Step 3: Vercel (5 min)

### Create Account
1. Go to https://vercel.com
2. Click "Sign Up"
3. **Sign up with GitHub** (makes deployment easier)
4. Authorize Vercel

### Deploy Project
1. Click "Add New..." → "Project"
2. Find your `smt-trading-journal` repository
3. Click "Import"

### Add Environment Variables
In "Configure Project" section:

**Variable 1:**
- Name: `NEXT_PUBLIC_SUPABASE_URL`
- Value: (paste your Project URL from Step 2)

**Variable 2:**
- Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: (paste your anon key from Step 2)

### Deploy!
1. Click "Deploy"
2. Wait 2-3 minutes
3. 🎉 **Your journal is LIVE!**

You'll get a URL like: `https://smt-trading-journal.vercel.app`

---

## Step 4: Test (2 min)

1. Click your Vercel URL
2. You should see your journal
3. **Click the tabs** - they should switch!
4. The tabs use React state - guaranteed to work on mobile

---

## 📱 Install as Mobile App

### iPhone/iPad
1. Open your journal in Safari
2. Tap Share button
3. Tap "Add to Home Screen"
4. Tap "Add"

### Android
1. Open your journal in Chrome
2. Tap menu (3 dots)
3. Tap "Add to Home Screen"
4. Tap "Add"

---

## ✅ Verification Checklist

After deployment:
- [ ] Journal loads
- [ ] Tabs switch when clicked
- [ ] No errors in browser console
- [ ] Can access from phone
- [ ] Can see trade count

---

## 🆘 If Something's Wrong

### "Environment variables missing"
- Go to Vercel → Your Project → Settings → Environment Variables
- Add the Supabase URL and key
- Redeploy (Deployments → ... → Redeploy)

### "Database connection failed"
- Check Supabase credentials are correct
- Verify you ran the SQL schema
- Check Supabase project is "Active"

### Tabs not working
- Open browser console (F12)
- Check for errors
- **This version uses React - tabs WILL work**

### Still stuck?
1. Check browser console for errors
2. Check Vercel deployment logs
3. Check Supabase logs
4. Create GitHub issue with error details

---

## 🎯 What's Next?

Your journal is now:
- ✅ Live on the internet
- ✅ Accessible from any device
- ✅ Syncing to cloud database
- ✅ Never crashes
- ✅ **Tabs work perfectly!**

Start logging trades and enjoy! 📈

---

## 💡 Pro Tips

**Update your journal:**
1. Edit files in GitHub
2. Commit changes
3. Vercel auto-deploys!

**Add custom domain:**
1. Buy domain ($12/year)
2. Vercel Settings → Domains
3. Add your domain

**Monitor usage:**
- Vercel: Check analytics dashboard
- Supabase: Check database size

---

**Total Time:** 20-30 minutes
**Total Cost:** $0

Enjoy your professional SMT trading journal! 🚀
