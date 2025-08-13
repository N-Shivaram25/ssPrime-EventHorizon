# Vercel Deployment Guide for Event Horizon

This guide will help you deploy your Event Horizon project to Vercel using a **separate client and server deployment** approach.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## About This Project

**Important**: This project uses **local storage** (in-memory storage) and does not require a database. All data is stored in memory and will be reset when the serverless function restarts.

## Deployment Strategy

This project is now structured for **separate deployments**:
1. **Client** (Frontend) - Deployed as a static site
2. **Server** (Backend) - Deployed as serverless functions

## Step 1: Deploy Client First

Follow the detailed guide in [`CLIENT_DEPLOYMENT.md`](./CLIENT_DEPLOYMENT.md)

**Quick Setup:**
- **Framework Preset**: Vite
- **Root Directory**: `./client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## Step 2: Deploy Server Second

Follow the detailed guide in [`SERVER_DEPLOYMENT.md`](./SERVER_DEPLOYMENT.md)

**Quick Setup:**
- **Framework Preset**: Other
- **Root Directory**: `./server`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## Step 3: Connect Client and Server

1. Get your server URL from Vercel dashboard
2. Set environment variable in client deployment:
   - `VITE_API_URL`: Your server URL (e.g., `https://your-server.vercel.app`)
3. Redeploy client to apply changes

## Project Structure

```
├── client/               # Frontend React app (separate deployment)
│   ├── src/              # React source code
│   ├── package.json      # Client dependencies
│   ├── vite.config.ts    # Vite configuration
│   ├── vercel.json       # Client Vercel config
│   └── ...
├── server/               # Backend Express server (separate deployment)
│   ├── index.ts          # Main server file
│   ├── package.json      # Server dependencies
│   ├── vercel.json       # Server Vercel config
│   └── ...
├── shared/               # Shared types and schemas
├── CLIENT_DEPLOYMENT.md  # Client deployment guide
├── SERVER_DEPLOYMENT.md  # Server deployment guide
└── ...
```

## Important Notes

1. **Separate Deployments**: Client and server are deployed as separate Vercel projects
2. **Environment Variables**: Client needs `VITE_API_URL` pointing to server
3. **CORS Configuration**: Server must allow requests from client domain
4. **Storage**: Uses in-memory storage (data resets on function restart)

## Benefits of This Approach

- **Better Separation**: Clear separation between frontend and backend
- **Independent Scaling**: Client and server can scale independently
- **Easier Debugging**: Separate logs and monitoring for each part
- **Flexible Deployment**: Can deploy client and server to different regions

## Troubleshooting

### Client Issues
- Check `CLIENT_DEPLOYMENT.md` for client-specific troubleshooting
- Verify `VITE_API_URL` environment variable is set correctly

### Server Issues
- Check `SERVER_DEPLOYMENT.md` for server-specific troubleshooting
- Verify CORS configuration allows your client domain

### Connection Issues
- Ensure both client and server are deployed successfully
- Check that API calls are going to the correct server URL
- Verify CORS settings on the server

## Support

If you encounter issues:
1. Check the respective deployment guides
2. Review Vercel deployment logs for each project
3. Test your build process locally
4. Check the Vercel documentation at [vercel.com/docs](https://vercel.com/docs)
