# Custom Domain, DNS, and SSL Setup

Guide to configuring a custom domain with SSL/HTTPS for your artist portfolio.

## Overview

This guide covers:
- Purchasing a domain
- Configuring DNS records
- Setting up SSL/HTTPS
- Verifying the setup

## Prerequisites

- Deployed site on Netlify (recommended) or another platform
- Domain name (or plan to purchase one)

## Step 1: Purchase a Domain

### Option A: Purchase Through Netlify

1. Go to your Netlify site dashboard
2. Click **"Domain settings"**
3. Click **"Add custom domain"**
4. Click **"Buy a new domain"**
5. Search for your desired domain
6. Complete the purchase
7. Netlify automatically configures DNS and SSL

**Pros**: Easiest option, automatic setup
**Cons**: Slightly higher domain prices

### Option B: Purchase from Domain Registrar

Popular registrars:
- **Namecheap** - Good prices, easy interface
- **Google Domains** - Simple, reliable
- **Cloudflare Registrar** - At-cost pricing
- **GoDaddy** - Popular but more expensive

**Steps:**
1. Search for your desired domain
2. Add to cart and checkout
3. Complete registration
4. Proceed to DNS configuration (Step 2)

## Step 2: Configure DNS Records

### For Netlify

1. **Get your Netlify site URL**
   - Format: `your-site-name.netlify.app`
   - Found in your Netlify dashboard

2. **Add DNS records in your domain registrar**

   **Option A: A Record (IPv4)**
   ```
   Type: A
   Name: @ (or leave blank)
   Value: 75.2.60.5
   TTL: Automatic (or 3600)
   ```

   **Option B: CNAME Record (Recommended)**
   ```
   Type: CNAME
   Name: @ (or leave blank for root domain)
   Value: your-site-name.netlify.app
   TTL: Automatic (or 3600)
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: your-site-name.netlify.app
   TTL: Automatic (or 3600)
   ```

3. **Add domain in Netlify**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter your domain (e.g., `yoursite.com`)
   - Netlify will verify DNS configuration

4. **Wait for DNS propagation**
   - Usually takes 1-24 hours
   - Can check status in Netlify dashboard

### For Other Platforms

**Vercel:**
- Add domain in Project settings → Domains
- Follow Vercel's DNS instructions
- Similar CNAME setup

**GitHub Pages:**
- Add domain in repository Settings → Pages
- Create `CNAME` file with your domain
- Configure DNS with GitHub's IP addresses

## Step 3: SSL/HTTPS Setup

### Netlify (Automatic)

Netlify automatically provisions SSL certificates via Let's Encrypt:

1. **Once DNS is configured**, Netlify detects the domain
2. **SSL certificate is automatically issued** (usually within minutes)
3. **HTTPS is enabled automatically**
4. **HTTP redirects to HTTPS** (configured automatically)

**No manual configuration needed!**

### Vercel (Automatic)

Vercel also provides automatic SSL:
- SSL is provisioned automatically
- HTTPS enabled by default
- HTTP redirects to HTTPS

### Manual SSL (Other Platforms)

If using a VPS or other platform:

1. **Use Let's Encrypt with Certbot**
   ```bash
   sudo certbot --nginx -d yoursite.com -d www.yoursite.com
   ```

2. **Configure automatic renewal**
   ```bash
   sudo certbot renew --dry-run
   ```

3. **Update web server config** to use SSL certificates

## Step 4: Verify Setup

### Check DNS Propagation

Use online tools to verify DNS:
- [whatsmydns.net](https://www.whatsmydns.net)
- [dnschecker.org](https://dnschecker.org)

Enter your domain and check:
- A record points to correct IP (if using A record)
- CNAME record points to correct hostname (if using CNAME)

### Check SSL Certificate

1. **Visit your site**: `https://yoursite.com`
2. **Check browser lock icon** - should show "Secure"
3. **View certificate details**:
   - Click lock icon → Certificate
   - Verify issuer (Let's Encrypt for Netlify/Vercel)
   - Check expiration date

### Test HTTPS Redirect

1. Visit `http://yoursite.com` (HTTP)
2. Should automatically redirect to `https://yoursite.com` (HTTPS)

## Common Issues

### DNS Not Propagating

**Symptoms:**
- Site not loading
- Wrong site loading
- DNS lookup fails

**Solutions:**
- Wait 24-48 hours (DNS can take time)
- Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)
- Check DNS records are correct
- Verify TTL settings

### SSL Certificate Not Issuing

**Symptoms:**
- HTTPS not working
- Browser shows "Not Secure"
- Certificate errors

**Solutions:**
- Verify DNS is fully propagated
- Check domain is added in platform dashboard
- Wait a few hours for certificate issuance
- Check platform status page for issues

### Mixed Content Warnings

**Symptoms:**
- Browser shows "Not Secure" despite HTTPS
- Console shows mixed content errors

**Solutions:**
- Ensure all assets use HTTPS URLs
- Check content files for `http://` links
- Update image URLs to use HTTPS
- Use relative URLs when possible

### www vs Non-www

**Decision:**
- Choose one as primary (www or non-www)
- Redirect the other to primary

**Netlify:**
- Add both domains in Domain settings
- Set one as primary
- Netlify handles redirect automatically

**Manual:**
- Configure redirect in web server
- Or use CNAME for both (if supported)

## Best Practices

### Domain Configuration

1. **Use CNAME for root domain** (if supported by registrar)
2. **Set up www redirect** (or vice versa)
3. **Enable HTTPS only** (disable HTTP)
4. **Set appropriate TTL** (3600 seconds is standard)

### Security

1. **Always use HTTPS** (required for modern web)
2. **Enable HSTS** (HTTP Strict Transport Security)
   - Netlify enables this automatically
   - Add header manually for other platforms

3. **Keep certificates updated**
   - Let's Encrypt auto-renews (Netlify/Vercel)
   - Set up renewal for manual SSL

### Performance

1. **Use CDN** (Netlify/Vercel provide this automatically)
2. **Enable HTTP/2** (automatic with HTTPS)
3. **Minimize DNS lookups** (use few subdomains)

## Updating Site Settings

After setting up your custom domain:

1. **Update Canonical URL** in CMS:
   - Go to `/admin`
   - Edit Site Settings
   - Update "Canonical URL" to `https://yoursite.com`
   - Publish changes

2. **Update any hardcoded URLs** in content files

## Troubleshooting Checklist

- [ ] Domain purchased and registered
- [ ] DNS records configured correctly
- [ ] DNS propagated (checked with tools)
- [ ] Domain added in platform dashboard
- [ ] SSL certificate issued
- [ ] HTTPS working (check browser)
- [ ] HTTP redirects to HTTPS
- [ ] www redirects to non-www (or vice versa)
- [ ] Canonical URL updated in CMS
- [ ] All assets load over HTTPS

## Platform-Specific Notes

### Netlify

- Automatic SSL via Let's Encrypt
- Automatic DNS management (if domain purchased through Netlify)
- HTTP to HTTPS redirect automatic
- HSTS enabled by default

### Vercel

- Automatic SSL
- DNS configuration in dashboard
- HTTP to HTTPS redirect automatic

### GitHub Pages

- SSL available but requires configuration
- Custom domain setup in repository settings
- May require manual SSL certificate

## Need Help?

- **Netlify**: [Domain Management Docs](https://docs.netlify.com/domains-https/custom-domains/)
- **Vercel**: [Custom Domains Docs](https://vercel.com/docs/concepts/projects/domains)
- **DNS Issues**: Check your domain registrar's documentation
- **SSL Issues**: Check platform status pages

## Next Steps

- Test your site on the new domain
- Update social media links
- Update any external references to your site
- Monitor SSL certificate expiration (auto-renewed on Netlify/Vercel)

