import type { SiteTone } from './types'

const TONE_LABELS: Record<
  SiteTone,
  { contactHeading: string; primaryCta: string; contactPageTitle: string }
> = {
  neutral: {
    contactHeading: 'Contact',
    primaryCta: 'Contact',
    contactPageTitle: 'Contact',
  },
  formal: {
    contactHeading: 'Contact',
    primaryCta: 'Get in touch',
    contactPageTitle: 'Contact',
  },
  casual: {
    contactHeading: 'Get in touch',
    primaryCta: 'Say hi',
    contactPageTitle: 'Get in touch',
  },
}

const DEFAULT = TONE_LABELS.neutral

export function getToneLabels(tone: SiteTone | undefined) {
  return TONE_LABELS[tone ?? 'neutral'] ?? DEFAULT
}
