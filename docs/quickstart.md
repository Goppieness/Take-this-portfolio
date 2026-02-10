# Quick Start Guide

Get your artist portfolio up and running in minutes with this step-by-step guide.

## Prerequisites

- A GitHub account
- A Netlify account (free tier works fine)

## Step 1: Deploy to Netlify

### Option A: Deploy from GitHub (Recommended)

1. **Fork or push this repository to GitHub**
   - If you have this code locally, create a new GitHub repository
   - Push your code to GitHub

2. **Deploy to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account and select your repository
   - Netlify will auto-detect the build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Click "Deploy site"

3. **Wait for the build to complete**
   - Netlify will build your site (usually takes 1-2 minutes)
   - Once complete, you'll get a URL like `your-site-name.netlify.app`

### Option B: One-Click Deploy Button

If this repository is public, you can add a deploy button to your README:

```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_BADGE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_SITE_NAME/deploys)
```

## Step 2: Enable Netlify Identity

1. **Go to your site's Netlify dashboard**
2. **Navigate to Site settings → Identity**
3. **Click "Enable Identity"**
4. **Configure registration** (recommended: "Invite only" for security)
5. **Enable Git Gateway**:
   - Scroll down to "Services" → "Git Gateway"
   - Click "Enable Git Gateway"
   - This allows the CMS to commit changes to your repository

## Step 3: First Admin Login

1. **Visit your site's admin panel**: `https://your-site-name.netlify.app/admin`
2. **Click "Sign up"** (or "Log in" if you already have an account)
3. **Create your account**:
   - Enter your email
   - Set a password
   - If registration is "Invite only", you'll need to invite yourself first from the Netlify dashboard

4. **You're in!** You should now see the CMS interface

## Step 4: Customize Your Site

### Update Site Settings

1. Click on **"Site Settings"** in the left sidebar
2. Edit the fields:
   - **Site Name**: Your portfolio name
   - **Artist Name**: Your name
   - **Description**: Short bio/description
   - **Canonical URL**: Your site's URL (e.g., `https://your-site-name.netlify.app`)
   - **Navigation**: Add/edit menu items
   - **Social Links**: Add your social media profiles
   - **Footer Text**: Copyright or footer message

3. Click **"Save"** (or **"Publish"**)

### Add Your First Work

1. Click on **"Works"** in the left sidebar
2. Click **"New Work"**
3. Fill in the required fields:
   - **ID**: A unique identifier (e.g., `my-first-work`)
   - **Title**: The work's title
   - **Slug**: URL-friendly version (e.g., `my-first-work`)
   - **Description**: Markdown description of the work
   - **Media**: Upload at least one image
   - **Tags**: Optional tags for filtering
   - **Featured**: Check if you want it on the homepage
   - **Links**: Add links (exhibition, purchase, video, etc.)

4. Click **"Publish"**

### Edit Pages

1. Click on **"Pages"** in the left sidebar
2. Edit existing pages (About, Contact) or create new ones
3. Use Markdown for formatting
4. Click **"Publish"**

## Step 5: Verify Changes

1. After publishing changes, Netlify will automatically rebuild your site
2. Wait 1-2 minutes for the build to complete
3. Visit your site URL to see the changes live

## Troubleshooting

### Can't log in to /admin

- Make sure Netlify Identity is enabled
- Check that Git Gateway is enabled
- Try clearing your browser cache
- Check the browser console for errors

### Changes not appearing

- Wait a few minutes for Netlify to rebuild
- Check the Netlify deploy log for errors
- Verify you clicked "Publish" (not just "Save")

### Build failures

- Check that all required fields are filled
- Verify JSON syntax is correct
- Check the Netlify build log for specific errors

## Next Steps

- **[Admin Setup Guide](admin-setup.md)** - Learn more about using the CMS
- **[Deployment Guide](deployment.md)** - Advanced deployment options
- **[Custom Domain Setup](domains-dns-ssl.md)** - Use your own domain

## Need Help?

- Check the [Deployment Guide](deployment.md) for more detailed instructions
- Review the [Admin Setup Guide](admin-setup.md) for CMS usage tips
- Check Netlify's documentation for platform-specific issues

