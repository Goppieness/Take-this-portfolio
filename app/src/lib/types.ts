export interface WorkLink {
  label: string;
  url: string;
  type?: 'external' | 'marketplace' | 'press' | 'video' | 'other';
  isPrimary?: boolean;
}

export interface Work {
  id: string;
  title: string;
  slug: string;
  description: string; // Markdown
  media: string[]; // Image paths
  tags?: string[];
  featured?: boolean;
  links?: WorkLink[];
  date?: string;
  order?: number; // For manual work ordering
}

export interface NavigationItem {
  label: string;
  path: string;
  visible?: boolean; // Default true
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export type ThemeMode = 'light' | 'dark' | 'system'
export type HomeEmphasis = 'featuredWorks' | 'statement'
export type WorksGridDensity = 'comfortable' | 'compact'
export type ImageAspectRatio = 'original' | 'square' | '4-5'
export type SiteTone = 'neutral' | 'formal' | 'casual'
export type PrimaryLinkStyle = 'button' | 'text'
export type WorkOrderMode = 'automatic' | 'manual'

export interface SiteSettings {
  siteName: string;
  artistName: string;
  description: string;
  navigation: NavigationItem[];
  socialLinks: SocialLink[];
  footer: string;
  canonicalUrl: string;
  email?: string;
  favicon?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  heroBackgroundImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroStatement?: string; // Short statement when homeEmphasis is 'statement'
  aboutImage?: string;
  aboutContent?: string;
  contactContent?: string;
  // Visual identity
  accentColor?: string; // Hex; required in CMS, fallback in app
  fontPairing?: string;
  themeMode?: ThemeMode;
  // Layout
  homeEmphasis?: HomeEmphasis;
  worksGridDensity?: WorksGridDensity;
  imageAspectRatio?: ImageAspectRatio;
  // Branding
  useLogoImage?: boolean;
  logoImage?: string;
  siteTone?: SiteTone;
  // Work-level defaults
  primaryLinkStyle?: PrimaryLinkStyle;
  primaryLinkDefaultLabel?: string;
  workOrderMode?: WorkOrderMode;
  // Footer
  footerLinks?: FooterLink[];
}

export interface Page {
  title: string;
  slug: string;
  content: string; // Markdown
}

