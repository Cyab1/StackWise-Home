# StackWise Homepage

Official website for **StackWise (Pty) Ltd** — Reg. 2026/606439/07

**Live:** https://www.stackwiseza.co.za

## Tech stack
- Frontend: React + Vite — deployed on Vercel
- Backend: Python + Flask — deployed on Render
- Domain: stackwiseza.co.za — managed on Afrihost

## Project structure
StackWise-Home/
├── backend/
│ ├── app.py ← Contact form API
│ ├── requirements.txt
│ └── render.yaml ← Render deploy config
└── frontend/
├── public/
│ └── favicon.svg
├── src/
│ ├── pages/
│ │ ├── Home.jsx
│ │ └── Privacy.jsx
│ ├── App.jsx
│ └── index.css
├── .env.development
├── .env.production
└── vercel.json


## Local development

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Deployment
- Frontend: Vercel — auto deploys on push to main
- Backend: Render — auto deploys on push to main

## Contact
stackwiseza@gmail.com · www.stackwiseza.co.za