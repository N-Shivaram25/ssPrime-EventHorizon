# Vercel Deployment Guide for Event Horizon

This guide will help you deploy your Event Horizon project to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## About This Project

**Important**: This project uses **local storage** (in-memory storage) and does not require a database. All data is stored in memory and will be reset when the serverless function restarts.

## Step 1: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

## Step 2: Deploy

1. Push your changes to your Git repository
2. Vercel will automatically trigger a new deployment
3. Wait for the build to complete
4. Your app will be available at the provided Vercel URL

## Project Structure for Vercel

```
├── api/
│   └── index.ts          # Vercel serverless function
├── client/               # Frontend React app
│   ├── package.json      # Client package.json for Vercel
│   └── src/
├── server/               # Backend Express server
├── shared/               # Shared types and schemas
├── vercel.json           # Vercel configuration
├── .vercelignore         # Files to exclude from deployment
└── package.json          # Main package.json
```

## Important Notes

1. **Storage**: This project uses in-memory storage (local storage) - no database required
2. **Data Persistence**: Data will be reset when the serverless function restarts
3. **Build Process**: The frontend is built using Vite and served as static files
4. **API Routes**: All `/api/*` routes are handled by the serverless function
5. **Static Files**: All other routes serve the built React frontend

## Limitations

- **No Data Persistence**: Since this uses local storage, all data will be lost when the serverless function restarts
- **Memory Usage**: All data is stored in memory, which may impact performance with large datasets
- **Scaling**: Each serverless function instance will have its own separate data

## Troubleshooting

### Build Errors
- Check that all dependencies are properly installed
- Ensure the build command (`npm run vercel-build`) works locally

### API Errors
- Check the Vercel function logs in the dashboard
- Verify that the function is properly deployed

## Support

If you encounter issues:
1. Check the Vercel deployment logs
2. Test your build process locally
3. Check the Vercel documentation at [vercel.com/docs](https://vercel.com/docs)
