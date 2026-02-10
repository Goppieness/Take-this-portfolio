# Deployment Guide

Complete guide to deploying your artist portfolio to various platforms.

## Netlify (Recommended)

Netlify is the recommended platform because it provides the easiest path for CMS authentication via Netlify Identity.

### Prerequisites

- GitHub, GitLab, or Bitbucket account
- Netlify account (free tier works)

### Deployment Steps

1. **Push your code to Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider
   - Select your repository
   - Netlify will auto-detect settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Click "Deploy site"

3. **Configure Netlify Identity**
   - Go to Site settings → Identity
   - Enable Identity
   - Enable Git Gateway
   - See [Admin Setup Guide](admin-setup.md) for details

4. **Your site is live!**
   - Visit `https://your-site-name.netlify.app`
   - Access admin at `https://your-site-name.netlify.app/admin`

### Netlify Configuration

The `netlify.toml` file is already configured with:
- Build settings
- Redirect rules for SPA routing
- Security headers
- Cache policies

No additional configuration needed unless you want to customize.

## Vercel

Vercel works well for hosting, but CMS authentication requires additional setup.

### Prerequisites

- GitHub, GitLab, or Bitbucket account
- Vercel account

### Deployment Steps

1. **Push your code to Git** (same as Netlify)

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "Add New Project"
   - Import your repository
   - Configure:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Click "Deploy"

3. **CMS Authentication Limitation**

   **Important**: Decap CMS with Git Gateway requires Netlify Identity, which only works on Netlify.

   **Options for Vercel:**
   - Use Netlify for CMS only (deploy site to Vercel, use Netlify for `/admin`)
   - Use a different authentication method (requires custom backend)
   - Use GitHub OAuth (requires additional setup)

   **Recommended**: If you need the CMS, use Netlify for hosting.

4. **Configure Redirects**

   Create `vercel.json`:
   ```json
   {
     "rewrites": [
       { "source": "/admin", "destination": "/admin/index.html" },
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

## GitHub Pages

GitHub Pages works for static hosting, but CMS functionality is limited.

### Prerequisites

- GitHub account
- Repository with your code

### Deployment Steps

1. **Update Vite Config**

   Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/', // Replace with your repo name
     // ... rest of config
   })
   ```

2. **Create GitHub Actions Workflow**

   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

3. **Enable GitHub Pages**

   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - The workflow will deploy on every push

4. **CMS Limitations**

   - Git Gateway requires Netlify Identity (won't work on GitHub Pages)
   - You'll need to edit content files directly in Git
   - Or use a different CMS solution

## Self-Hosting (VPS)

You can host the static site on any web server, but CMS requires additional setup.

### Prerequisites

- VPS or web server
- Node.js 18+ installed
- Nginx or Apache

### Deployment Steps

1. **Build the site locally:**
   ```bash
   npm install
   npm run build
   ```

2. **Upload `dist` directory** to your server

3. **Configure web server** (Nginx example):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/portfolio/dist;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       location /admin {
           try_files $uri $uri/ /admin/index.html;
       }
   }
   ```

4. **CMS Authentication**

   For CMS to work, you need:
   - Netlify Identity (requires Netlify hosting)
   - Or custom authentication backend
   - Or use GitHub OAuth with custom setup

   **Recommended**: Use Netlify for hosting if you need the CMS.

## Environment Variables

### Netlify

Add environment variables in:
- Site settings → Environment variables

Common variables:
- `NODE_VERSION`: Node.js version (default: 18)

### Vercel

Add environment variables in:
- Project settings → Environment Variables

## Build Configuration

### Build Command

Default: `npm run build`

This runs:
1. TypeScript compilation (`tsc`)
2. Vite build (`vite build`)

### Output Directory

Default: `dist`

Contains:
- `index.html` - Main HTML file
- `assets/` - JavaScript and CSS bundles
- Static files from `public/`

## Troubleshooting

### Build Failures

**Common issues:**

1. **TypeScript errors**
   - Fix type errors in your code
   - Check `tsconfig.json` settings

2. **Missing dependencies**
   - Run `npm install` locally
   - Check `package.json` for all dependencies

3. **Path issues**
   - Verify `vite.config.ts` paths are correct
   - Check that content files exist

4. **Memory errors**
   - Increase build memory limit
   - Optimize images before upload

### Deployment Issues

**Site not loading:**
- Check build logs for errors
- Verify output directory is correct
- Check redirect rules

**Admin not working:**
- Verify Netlify Identity is enabled (Netlify only)
- Check Git Gateway is enabled
- Verify `admin/config.yml` exists

**Images not loading:**
- Check file paths in content files
- Verify `public/uploads/` exists
- Check file permissions

## Performance Optimization

### Image Optimization

- Compress images before uploading
- Use WebP format when possible
- Lazy loading is already implemented

### Code Splitting

- Already configured with React Router lazy loading
- Pages load on demand

### Caching

- Static assets cached for 1 year (configured in `netlify.toml`)
- Content files cached appropriately

## Monitoring

### Netlify

- View deploy logs in the dashboard
- Monitor build times
- Check function logs (if using)

### Vercel

- View build logs in dashboard
- Monitor analytics
- Check function logs

## Backup Strategy

### Git as Backup

Your content is stored in Git, providing:
- Version history
- Automatic backups
- Easy rollback

### Manual Backups

1. Clone your repository regularly
2. Export content files from CMS
3. Backup `public/uploads/` directory

## Next Steps

- **[Custom Domain Setup](domains-dns-ssl.md)** - Use your own domain
- **[Admin Setup Guide](admin-setup.md)** - Configure the CMS
- **[Quick Start Guide](quickstart.md)** - Get started quickly

