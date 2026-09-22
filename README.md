# KaamSeKaamTak OS v2.0 - LIVE Hybrid Edition
India's first Agentic Reverse Skill-to-Job Engine

## Features
- Live Job Intelligence (Apna.co + Internshala + Google Jobs via SerpAPI)
- Hybrid Tech: On-Device SLM (Phi-3) + Cloud GPT-4o
- Skill X-Ray, Mission Path, Auto Portfolio, Auto Apply Bot
- Production Ready for Railway + Vercel + Supabase

## Quick Deploy
### Backend
```
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
# Deploy: railway up
```

### Frontend
```
cd frontend
npm install
npm run dev
# Deploy: vercel --prod
```

### Env Vars
```
SUPABASE_URL=
SUPABASE_KEY=
OPENAI_API_KEY=
APIFY_TOKEN=
SERPAPI_KEY=
```

Live Demo: https://kaamsekaamtak.vercel.app (after deploy)
API: https://kaam-api.up.railway.app/api/live-jobs

Built for Sunil Rozha - Delhi NCR first.
