# Artist Portfolio

A high-end, self-hosted artist portfolio built with Vite, React, and Semantic UI. Features a browser-based admin interface powered by Decap CMS (formerly Netlify CMS) for content management without requiring code edits.

## Features

- 🎨 **High-end default design** - Beautiful, professional portfolio out of the box
- 📝 **No-code content management** - Edit all content through a browser-based admin UI
- 🗂️ **File-based content** - All content stored as JSON/Markdown files (no database required)
- 🔗 **Work links** - Support for multiple links per work with primary/secondary styling
- 📱 **Fully responsive** - Mobile-first design using Semantic UI
- ⚡ **Fast & optimized** - Built with Vite for optimal performance
- 🔍 **SEO optimized** - Meta tags, OpenGraph, and Twitter cards
- ♿ **Accessible** - Keyboard navigation and screen reader support

## Tech Stack

- **Vite** - Build tool and dev server
- **React** - UI framework
- **TypeScript** - Type safety
- **Semantic UI React** - Component library
- **React Router** - Client-side routing
- **Decap CMS** - Git-based CMS
- **React Markdown** - Markdown rendering

## Set up your portfolio (step-by-step)

Use this guide to get your portfolio online and start editing it in the browser—no code required after you deploy.

### What you need

- A **GitHub** account  
- A **Netlify** account (free tier is fine)  
- This repo (fork it or use your own copy)

### 1. Deploy to Netlify

1. Push this project to a GitHub repository (create one at [github.com/new](https://github.com/new) if needed).
2. Go to [Netlify](https://app.netlify.com) and click **Add new site** → **Import an existing project**.
3. Connect GitHub and select your repository.
4. Netlify should detect the build settings. Confirm:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site** and wait for the build to finish. You’ll get a URL like `https://your-site-name.netlify.app`.

### 2. Turn on the admin (Identity + Git Gateway)

The admin at `/admin` only works after you enable Netlify’s auth and Git Gateway so the CMS can save changes to your repo.

1. In the Netlify dashboard, open your site → **Site configuration** → **Identity**.
2. Click **Enable Identity**.
3. Under **Registration preferences**, choose **Invite only** (recommended) or **Open** if you’re just testing.
4. If you chose **Invite only:** go to **Identity** → **Invite users**, invite your email, then accept the invite from the link in your email.
5. In **Identity**, scroll to **Services** and click **Enable Git Gateway**. Authorize Netlify if it asks.

### 3. Open the admin and log in

1. In your browser, go to **https://your-site-name.netlify.app/admin** (use your real site URL).
2. (Optional but recommended) So image previews work in the admin, set **site_url** in the repo to your live URL: in `public/admin/config.yml` change `site_url: https://your-site.netlify.app` to your actual URL (e.g. `https://your-site-name.netlify.app`), commit, and push. If you skip this, image previews may show a checkerboard until each deploy finishes.
3. Click **Sign up** or **Log in** and create an account (or log in). If you used **Invite only**, complete the invite first.
4. You should see the CMS with **Site Settings**, **Pages**, and **Works** in the sidebar.

### 4. Edit your site

- **Site Settings** — Site name, your name, hero image and text, navigation, accent color, fonts, light/dark theme, logo, footer, and more. Change what you like and click **Publish**.
- **Pages** — Edit the About and Contact pages (or add new ones).
- **Works** — Add new works, upload images, set titles and descriptions, add links, reorder (if you use manual order), and mark some as featured.

**Important:** After you click **Publish**, Netlify will rebuild your site. Wait 1–2 minutes, then refresh your live site to see changes. New or updated works and images only show up after that rebuild. Image previews in the admin may show a gray checkerboard right after upload until that deploy completes; refresh the admin once the deploy is done to see the preview.

### 5. If something goes wrong

- **Can’t log in at /admin** — Make sure Identity and Git Gateway are both enabled in Netlify, and that you’ve accepted the invite if you use **Invite only**.
- **Changes don’t appear on the site** — Wait for the latest deploy to finish (check the **Deploys** tab in Netlify). If the deploy failed, open the deploy log and fix any errors (e.g. invalid content).
- **Admin looks outdated** — Do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R) on the `/admin` page.
- **Image preview shows a checkerboard in the admin** — The CMS can only show uploaded images after they’re deployed. Right after you upload, wait 1–2 minutes for the deploy to finish, then refresh the admin; the preview should appear. If you open the admin from a deploy preview or a different URL, set **site_url** in `public/admin/config.yml` to your live site URL (e.g. `https://your-site.netlify.app`) so previews load from the correct place.

For more detail (custom domain, deployment options, theme and layout options), see the [Documentation](#documentation) links below.

---

## Quick Start (developers)

### Prerequisites

- Node.js 18+ and npm
- Git
- Netlify account (for deployment)

### Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd artist-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built site will be in the `dist` directory.

## Documentation

- **[Quick Start Guide](docs/quickstart.md)** - Get your portfolio deployed in minutes
- **[Admin Setup](docs/admin-setup.md)** - Configure the CMS and start editing content
- **[Deployment Guide](docs/deployment.md)** - Deploy to Netlify, Vercel, or GitHub Pages
- **[Custom Domain Setup](docs/domains-dns-ssl.md)** - Configure your custom domain with SSL

## Project Structure

```
/
├── app/                    # Vite React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Route pages
│   │   └── lib/           # Utilities and content loading
│   └── index.html
├── content/               # Content files (editable via CMS)
│   ├── site.json          # Global site settings
│   ├── pages/             # About/Contact pages
│   └── works/             # Work entries
├── public/                # Static assets
│   ├── uploads/           # CMS-uploaded media
│   └── favicon/           # Site icons
├── admin/                 # CMS configuration
│   ├── index.html         # CMS entry point
│   └── config.yml         # CMS collections
└── docs/                  # Documentation
```

## Content Management

All content is managed through the **/admin** interface after you deploy and enable Identity (see [Set up your portfolio](#set-up-your-portfolio-step-by-step) above). In the CMS you can:

- Edit **Site Settings** — name, description, hero image and text, navigation, accent color, fonts, theme, logo, footer, and more
- Edit **Pages** — About, Contact, and any other pages
- Manage **Works** — add works, upload images, write descriptions, add links, set order, and mark featured works

See [Admin Setup](docs/admin-setup.md) for detailed field-by-field instructions.

## License

MIT

