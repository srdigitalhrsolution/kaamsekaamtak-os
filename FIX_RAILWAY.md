# FIX for Railway Build Failed

Error: Railpack failed to prepare the build.

Reason: Railway doesn't know whether to build backend or frontend - you pushed monorepo.

## SOLUTION - 2 Ways (Pick ONE):

### WAY 1: Easiest - Set Root Directory in Railway Dashboard (30 sec)

1. Go to Railway -> Your Service (kaamsekamtak-os) -> Settings
2. Scroll to "Root Directory" or "Source"
3. Set it to:  /backend
4. Save -> Redeploy

This tells Railway: only build backend folder.

### WAY 2: Use Dockerfile (Already Added in Fix)

I added:
- backend/Dockerfile
- railway.json
- nixpacks.toml
- Procfile
- .dockerignore

Just push again:

git add .
git commit -m "Fix Railway build - add Dockerfile and config"
git push

Railway will auto-detect Dockerfile now.

### After Fix:
Your API will be live at:
https://your-project.up.railway.app
Test: https://your-project.up.railway.app/api/live-jobs

Then connect frontend Vercel:
VITE_API_URL = your railway url
