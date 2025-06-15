# Deployment Guide

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Login and link project:
   ```bash
   vercel login
   vercel link
   ```
3. Set environment variables:
   ```bash
   vercel env add OPENAI_API_KEY
   vercel env add GEMINI_API_KEY
   vercel env add ADMIN_USER
   vercel env add ADMIN_PASS
   ```
4. Deploy:
   ```bash
   vercel --prod
   ```
