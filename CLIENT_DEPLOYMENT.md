# Client Deployment Guide for Event Horizon

This guide will help you deploy the **client** (frontend) of your Event Horizon project to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Deploy Client to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
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

3. Navigate to client directory and deploy:
   ```bash
   cd client
   vercel
   ```

## Step 2: Configure Environment Variables

The client will need to know the URL of your server API. Set these environment variables in Vercel:

- `VITE_API_URL`: The URL of your server deployment (e.g., `https://your-server.vercel.app`)

## Step 3: Update API Base URL

Make sure your client code uses the environment variable for API calls. In your API client configuration, use:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

## Project Structure for Client Deployment

```
client/
├── src/                    # React source code
├── index.html             # Entry HTML file
├── package.json           # Client dependencies
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
└── vercel.json            # Vercel configuration
```

## Important Notes

1. **Static Site**: The client is deployed as a static site
2. **API Calls**: All API calls will be made to your separate server deployment
3. **Environment Variables**: Use `VITE_` prefix for client-side environment variables
4. **Build Process**: Uses Vite to build the React app

## Next Steps

After deploying the client, proceed to deploy the server following the `SERVER_DEPLOYMENT.md` guide.

## Troubleshooting

### Build Errors
- Check that all dependencies are properly installed
- Ensure the build command (`npm run build`) works locally
- Verify TypeScript compilation passes

### API Connection Issues
- Check that `VITE_API_URL` environment variable is set correctly
- Ensure your server is deployed and accessible
- Check CORS configuration on your server
