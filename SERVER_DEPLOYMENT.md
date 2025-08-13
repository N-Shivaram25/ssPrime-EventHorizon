# Server Deployment Guide for Event Horizon

This guide will help you deploy the **server** (backend) of your Event Horizon project to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. Client already deployed (follow `CLIENT_DEPLOYMENT.md` first)

## Step 1: Deploy Server to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `./server`
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

3. Navigate to server directory and deploy:
   ```bash
   cd server
   vercel
   ```

## Step 2: Configure Environment Variables

Set these environment variables in Vercel:

- `NODE_ENV`: `production`
- `CLIENT_URL`: The URL of your client deployment (e.g., `https://your-client.vercel.app`)

## Step 3: Update CORS Configuration

Make sure your server allows requests from your client domain. In your server code, update CORS settings:

```typescript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
```

## Project Structure for Server Deployment

```
server/
├── index.ts               # Main server file
├── routes.ts              # API routes
├── storage.ts             # Data storage
├── vite.ts                # Vite configuration
├── package.json           # Server dependencies
├── tsconfig.json          # TypeScript configuration
└── vercel.json            # Vercel configuration
```

## Important Notes

1. **Serverless Functions**: The server is deployed as Vercel serverless functions
2. **API Routes**: All `/api/*` routes are handled by the serverless function
3. **Storage**: Uses in-memory storage (data resets on function restart)
4. **CORS**: Must be configured to allow requests from your client domain

## API Endpoints

Your server will provide these endpoints:
- `GET /api/events` - Get all events
- `POST /api/events` - Create a new event
- `PUT /api/events/:id` - Update an event
- `DELETE /api/events/:id` - Delete an event

## Next Steps

After deploying both client and server:

1. Update the client's `VITE_API_URL` environment variable to point to your server URL
2. Test the connection between client and server
3. Verify that API calls work correctly

## Troubleshooting

### Build Errors
- Check that all dependencies are properly installed
- Ensure the build command (`npm run build`) works locally
- Verify TypeScript compilation passes

### API Errors
- Check the Vercel function logs in the dashboard
- Verify that the function is properly deployed
- Check CORS configuration

### Connection Issues
- Ensure client URL is correctly set in server environment variables
- Verify that CORS is configured to allow your client domain
- Check that API endpoints are accessible
