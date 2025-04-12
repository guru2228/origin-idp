# Origin IDP Deployment Instructions

This document provides instructions for deploying the Origin AI-powered Internal Developer Platform after the fixes made to resolve the deployment issues.

## Prerequisites

- Node.js v18 or higher
- npm v8 or higher
- Git
- Access to the GitHub repository
- Vercel account (for production deployment)

## Local Development Deployment

1. Clone the repository:
   ```bash
   git clone https://github.com/guru2228/origin-idp.git
   cd origin-idp
   ```

2. Switch to the fixed branch:
   ```bash
   git checkout fix/tailwind-build-issues
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Copy `.env.local.example` to `.env.local` (if not already done)
   - Update the values as needed for your environment

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Access the application at http://localhost:3000

## Production Deployment with Vercel

1. Make sure you have pushed all changes to GitHub:
   ```bash
   git push origin fix/tailwind-build-issues
   ```

2. Log in to your Vercel account

3. Import the GitHub repository:
   - Click "Add New" > "Project"
   - Select the repository
   - Configure the project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: npm run build
     - Output Directory: .next

4. Configure environment variables:
   - Add all required environment variables from your `.env.local` file

5. Deploy:
   - Click "Deploy"
   - Wait for the build and deployment to complete

6. Access your deployed application at the provided Vercel URL

## Troubleshooting

If you encounter any issues during deployment:

1. Check the build logs for errors
2. Verify that all environment variables are correctly set
3. Ensure that the database connection is properly configured
4. Refer to the `deployment-fixes.md` file for details on the fixes that were made

## Monitoring

After deployment, monitor the application for any issues:

1. Check the Vercel deployment logs
2. Monitor application performance
3. Test all critical functionality

## Rollback Procedure

If necessary, you can roll back to a previous version:

1. In Vercel, go to the "Deployments" tab
2. Find the previous working deployment
3. Click the three dots menu and select "Promote to Production"

## Contact

If you encounter any issues that cannot be resolved using these instructions, please contact the development team.
