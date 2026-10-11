export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Listing", href: "/listing" },
  { label: "Cerita Aplikan", href: "/cerita-aplikan" },
  { label: "Peer Mentoring", href: "/peer-mentoring" },
];

export type SocialLink = {
  name: string;
  href: string;
  icon: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Instagram",
    href: "/",
    icon: "/images/footer/brand-instagram.svg",
  },
  {
    name: "WhatsApp",
    href: "/",
    icon: "/images/footer/brand-whatsapp.svg",
  },
  {
    name: "LinkedIn",
    href: "/",
    icon: "/images/footer/brand-linkedin.svg",
  },
  {
    name: "Email",
    href: "/",
    icon: "/images/footer/mail.svg",
  },
];

export const PLATFORM_LINKS: NavItem[] = [
  { label: "Listing Beasiswa & Sertifikasi", href: "/" },
  { label: "Deadline Terdekat", href: "/" },
  { label: "Cerita Aplikan", href: "/" },
  { label: "Peer Mentoring", href: "/" },
];

export const COMPANY_LINKS: NavItem[] = [{ label: "Tentang Kami", href: "/" }];
