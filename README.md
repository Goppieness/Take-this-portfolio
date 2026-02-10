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

## Quick Start

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

All content is managed through the `/admin` interface after deployment. The CMS allows you to:

- Edit site settings (name, description, navigation, social links)
- Create and edit pages (About, Contact, etc.)
- Manage works (add images, descriptions, links, tags)
- Upload media files

See [Admin Setup](docs/admin-setup.md) for detailed instructions.

## License

MIT

