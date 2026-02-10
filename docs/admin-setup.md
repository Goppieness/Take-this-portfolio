# Admin Setup Guide

Complete guide to setting up and using the Decap CMS admin interface.

## Initial Setup

### 1. Enable Netlify Identity

1. In your Netlify dashboard, go to **Site settings → Identity**
2. Click **"Enable Identity"**
3. Choose your registration method:
   - **Open**: Anyone can sign up (not recommended for production)
   - **Invite only**: You invite users (recommended)
   - **Email only**: Users sign up with email (moderate security)

### 2. Enable Git Gateway

1. In **Site settings → Identity → Services**
2. Find **"Git Gateway"**
3. Click **"Enable Git Gateway"**
4. Authorize Netlify to access your repository

This allows the CMS to commit changes directly to your Git repository.

### 3. Configure Email (Optional)

For invite-only registration, configure email:

1. Go to **Site settings → Identity → Email**
2. Choose an email provider:
   - **Netlify Email** (free, limited)
   - **SendGrid** (requires API key)
   - **SMTP** (custom email server)

## Using the CMS

### Accessing the Admin Panel

Visit: `https://your-site-name.netlify.app/admin`

### Site Settings

The **Site Settings** collection contains all global site configuration.

#### Required Fields

- **Site Name**: Displayed in browser tab and headers
- **Artist Name**: Your name, displayed prominently
- **Description**: Short bio/description (used in meta tags)
- **Canonical URL**: Your site's base URL (e.g., `https://yoursite.com`)

#### Navigation

Add menu items that appear in the site navigation:

- **Label**: Text displayed in the menu
- **Path**: URL path (e.g., `/about`, `/works`)

#### Social Links

Add your social media profiles:

- **Platform**: Name of the platform (e.g., "Instagram", "Twitter")
- **URL**: Full URL to your profile
- **Icon**: Optional icon name (auto-detected from platform)

#### Footer Text

Text displayed in the site footer (e.g., copyright notice).

#### Footer Links

Optional list of links (label + URL) shown in the footer below the footer text.

### Theme & Layout

These options control the look and structure of your site. All are editable in **Site Settings**.

#### Visual identity

- **Accent Color** (required): Hex color (e.g. `#2185d0`) used for primary buttons, links, and focus states. Use a color that contrasts with your background (e.g. dark accent on light theme) for accessibility.
- **Font Pairing**: Choose from a curated list of Google Fonts pairings. Fonts are loaded from Google Fonts; no custom font uploads in v1.
- **Theme**: Light only, Dark only, or System preference (follows the visitor’s device setting).

#### Layout

- **Home Page Emphasis**: Choose what appears first after the hero—**Featured works** or **Statement**. If Statement, add content in **Hero Statement** (markdown).
- **Works Grid Density**: **Comfortable** (default) or **Compact** (tighter grid and smaller gaps).
- **Image Aspect Ratio (grid)**: How work images appear in grids: **Original** (default), **Forced square**, or **Forced 4:5**. Does not affect work detail pages.

#### Branding

- **Use logo image**: Toggle to show an image instead of your artist name in the header.
- **Logo Image**: Upload when “Use logo image” is on.
- **Favicon** and **OG Image**: Already in Site Settings; use for browser tab and social previews.
- **Site Tone**: **Neutral**, **Formal**, or **Casual**. Affects contact heading and button labels (e.g. “Contact” vs “Get in touch”, “Say hi”).

#### Navigation

- **Navigation** list order is the menu order. Each item has **Visible** (on/off); turn off to hide items (e.g. Press, Links) without deleting them.

#### Work-level defaults

- **Primary Link Style**: **Button** or **Text link** for the main link on each work.
- **Primary Link Default Label**: Default label when a work’s primary link has no label (e.g. “View”, “Learn more”, “Collect”).
- **Work Order Mode**: **Automatic** (newest first by date) or **Manual** (use the **Order** field on each work; lower numbers appear first). When Manual, set **Order** on each work in the Works collection.

### Pages

Create and edit content pages (About, Contact, etc.).

#### Creating a New Page

1. Click **"New Page"** in the Pages collection
2. Fill in:
   - **Title**: Page title (e.g., "About")
   - **Slug**: URL-friendly identifier (e.g., `about`)
   - **Body**: Markdown content

3. Click **"Publish"**

#### Editing Existing Pages

1. Click on a page in the list
2. Edit the content
3. Click **"Publish"** to save changes

#### Markdown Tips

- Use `# Heading` for headings
- Use `**bold**` for bold text
- Use `- item` for lists
- Use `[link text](url)` for links

### Works

Manage your portfolio works.

#### Creating a New Work

1. Click **"New Work"** in the Works collection
2. Fill in required fields:

   **Basic Information:**
   - **ID**: Unique identifier (lowercase, numbers, dashes only)
   - **Title**: Work title
   - **Slug**: URL-friendly identifier
   - **Description**: Markdown description

   **Media:**
   - Click **"Add"** to upload images
   - Upload at least one image (required)
   - Images are stored in `public/uploads/`

   **Metadata:**
   - **Tags**: Add tags for filtering (optional)
   - **Featured**: Check to show on homepage
   - **Order**: When Work Order Mode is Manual, set a number (lower = first). Optional.
   - **Date**: Publication/creation date (optional)

   **Links:**
   - Click **"Add"** to add a link
   - **Label**: Link text (e.g., "View Exhibition")
   - **URL**: Full URL (must start with `http://`, `https://`, `mailto:`, or `/`)
   - **Type**: Link category (optional)
   - **Is Primary**: Check to make this the main CTA button

3. Click **"Publish"**

#### Work Links

Each work can have multiple links:

- **Primary Link**: Displayed as a large, prominent button
- **Secondary Links**: Displayed as smaller buttons

Link types:
- `external`: External website
- `marketplace`: Sales/purchase link
- `press`: Press coverage
- `video`: Video documentation
- `other`: Other link type

#### Editing Works

1. Click on a work in the list
2. Make changes
3. Click **"Publish"** to save

#### Deleting Works

1. Open a work
2. Click the **"Delete"** button (usually in the top right)
3. Confirm deletion

## Media Management

### Uploading Images

1. In any media field, click **"Choose an image"**
2. Select a file from your computer
3. The image is uploaded to `public/uploads/`
4. The path is automatically added to the field

### Image Guidelines

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended max 2MB per image
- **Dimensions**: No strict limits, but larger images slow down the site
- **Aspect Ratio**: Images maintain their aspect ratio

### Best Practices

- Use descriptive filenames (e.g., `work-title-1.jpg`)
- Optimize images before uploading (reduce file size)
- Use consistent image dimensions for works in the same series

## Content Workflow

### Draft vs. Published

- **Save**: Saves changes but doesn't publish (creates a draft)
- **Publish**: Commits changes to Git and triggers a site rebuild

### Publishing Process

1. Click **"Publish"** in the CMS
2. CMS commits changes to your Git repository
3. Netlify detects the commit
4. Netlify rebuilds your site (takes 1-2 minutes)
5. Changes appear live on your site

### Viewing Changes

After publishing:
1. Wait 1-2 minutes for the build to complete
2. Check the Netlify deploy log for any errors
3. Visit your site to see the changes

## Troubleshooting

### Can't Access Admin

- Verify Netlify Identity is enabled
- Check that Git Gateway is enabled
- Clear browser cache
- Try incognito/private browsing mode

### Changes Not Saving

- Check that Git Gateway is properly configured
- Verify you have write access to the repository
- Check the browser console for errors
- Look at Netlify's deploy logs

### Images Not Uploading

- Check file size (should be under 2MB)
- Verify file format (JPG, PNG, WebP)
- Check Netlify's build log for errors
- Ensure `public/uploads/` directory exists

### Build Failures After Publishing

- Check the Netlify build log
- Verify JSON syntax is correct
- Ensure all required fields are filled
- Check for invalid characters in slugs/IDs

### Validation Errors

The CMS validates content before publishing:

- **Slug format**: Must be lowercase, numbers, and dashes only
- **URL format**: Must start with `http://`, `https://`, `mailto:`, or `/`
- **Required fields**: Must be filled in

Fix validation errors before publishing.

## Advanced Configuration

### Customizing CMS Fields

Edit `admin/config.yml` to:
- Add new fields
- Change field types
- Modify validation rules
- Reorder fields

See [Decap CMS Documentation](https://decapcms.org/docs/configuration-options/) for details.

### Adding Collections

To add new content types:

1. Edit `admin/config.yml`
2. Add a new collection
3. Define fields
4. Restart the CMS

## Security Best Practices

1. **Use "Invite only" registration** for production sites
2. **Don't share admin credentials**
3. **Review changes** before publishing
4. **Keep backups** of your content (Git provides version history)
5. **Monitor Netlify access logs** for suspicious activity

## Need Help?

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Netlify Identity Docs](https://docs.netlify.com/visitor-access/identity/)
- Check the [Deployment Guide](deployment.md) for platform-specific issues

