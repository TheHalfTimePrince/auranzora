/**
 * Case study content config. Each entry drives both the work grid on the homepage
 * and the individual /work/[slug] detail page. Structured for easy CMS migration —
 * swap this file for an API call and the types stay the same.
 */

export interface CaseStudyGalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  clientName: string;
  category: string;
  tagline: string;
  description: string;

  /** Hero / thumbnail used on the grid */
  heroImage: string;

  /** Grid layout hint for the homepage bento grid */
  gridSpan: 'tall' | 'wide' | 'normal';

  /** Year the project was completed */
  year: string;

  /** Tech stack, tools, or services delivered */
  services: string[];

  /** Quantifiable outcomes */
  results: { label: string; value: string }[];

  /** Long-form sections shown on the detail page */
  sections: {
    heading: string;
    body: string;
    image?: string;
  }[];

  /** Screenshot gallery (desktop/tablet/mobile) */
  gallery: CaseStudyGalleryItem[];

  /** Optional live URL */
  liveUrl?: string;

  /** Controls visibility — hide drafts without removing data */
  published: boolean;
}

// ---------------------------------------------------------------------------
// Content entries
// ---------------------------------------------------------------------------

export const caseStudies: CaseStudy[] = [
  {
    slug: 'vertex',
    title: 'E-Commerce Platform Redesign',
    clientName: 'VERTEX',
    category: 'E-Commerce',
    tagline: 'A complete digital storefront overhaul that tripled conversion rates.',
    description:
      'Complete overhaul of an online retail platform, resulting in 150% increase in conversions.',
    heroImage: '/bento/vitaly-gariev-JOBvWZIaWNo-unsplash.jpg',
    gridSpan: 'tall',
    year: '2025',
    services: ['Web Development', 'UI/UX Design', 'Performance Optimisation'],
    results: [
      { label: 'Conversion Increase', value: '150%' },
      { label: 'Faster Load Times', value: '40%' },
      { label: 'Monthly Visitors', value: '200K+' },
    ],
    sections: [
      {
        heading: 'The Challenge',
        body: 'Vertex needed a modern storefront that could handle high traffic volumes while maintaining sub-second load times. The existing platform was losing customers at checkout due to a clunky multi-step flow.',
      },
      {
        heading: 'Our Approach',
        body: 'We rebuilt the entire front-end on a headless commerce architecture, streamlined the checkout to a single page, and introduced progressive image loading throughout the catalogue.',
        image: '/screenshots/beautiful-floral-designs-online-flower-shop/beautiful-floral-designs-online-flower-shop/desktop-full.png',
      },
      {
        heading: 'The Result',
        body: 'Within three months of launch the platform saw a 150% uplift in conversions and a 40% improvement in page load speed. Organic traffic grew by 80% thanks to improved Core Web Vitals.',
      },
    ],
    gallery: [
      {
        src: '/screenshots/beautiful-floral-designs-online-flower-shop/beautiful-floral-designs-online-flower-shop/desktop-full.png',
        alt: 'Vertex homepage — desktop',
      },
      {
        src: '/screenshots/beautiful-floral-designs-online-flower-shop/beautiful-floral-designs-online-flower-shop/tablet-above-fold.png',
        alt: 'Vertex homepage — tablet',
      },
      {
        src: '/screenshots/beautiful-floral-designs-online-flower-shop/beautiful-floral-designs-online-flower-shop/mobile-full.png',
        alt: 'Vertex homepage — mobile',
      },
    ],
    published: true,
  },
  {
    slug: 'nova',
    title: 'Brand Identity System',
    clientName: 'NOVA',
    category: 'Brand Identity',
    tagline: 'A comprehensive visual language built from the ground up.',
    description:
      'Comprehensive visual identity for a tech startup, from logo to full brand guidelines.',
    heroImage: '/bento/hulki-okan-tabak-x3kQTL7yw30-unsplash.jpg',
    gridSpan: 'normal',
    year: '2025',
    services: ['Branding', 'Visual Identity', 'Brand Guidelines'],
    results: [
      { label: 'Brand Recognition', value: '+85%' },
      { label: 'Platform Consistency', value: '12 platforms' },
      { label: 'Industry Recognition', value: 'Award-winning' },
    ],
    sections: [
      {
        heading: 'The Challenge',
        body: 'Nova was an early-stage tech startup with no cohesive visual identity. They needed a brand system flexible enough to work across web, mobile, print, and social without losing impact.',
      },
      {
        heading: 'Our Approach',
        body: "We ran a series of discovery workshops to distil Nova's values into a set of design principles. From there we developed a logo system, colour palette, typography scale, and an extensive component library documented in a living brand book.",
        image: '/screenshots/graceful-spaces/graceful-spaces/desktop-above-fold.png',
      },
      {
        heading: 'The Result',
        body: 'The new identity rolled out across 12 platforms in under six weeks. Brand recognition surveys showed an 85% uplift, and the project went on to win a regional design award.',
      },
    ],
    gallery: [
      {
        src: '/screenshots/graceful-spaces/home/desktop-above-fold.png',
        alt: 'Nova brand — homepage desktop',
      },
      {
        src: '/screenshots/graceful-spaces/about/desktop-full.png',
        alt: 'Nova brand — about page',
      },
      {
        src: '/screenshots/graceful-spaces/contact/desktop-full.png',
        alt: 'Nova brand — contact page',
      },
    ],
    published: true,
  },
  {
    slug: 'pulse',
    title: 'SEO-First Website Build',
    clientName: 'PULSE',
    category: 'Web Development',
    tagline: 'Built from the ground up with search visibility as the primary goal.',
    description:
      'Ground-up website development with search visibility as the primary goal.',
    heroImage: '/bento/logan-voss-SHnGEqdWjtw-unsplash.jpg',
    gridSpan: 'normal',
    year: '2025',
    services: ['SEO Strategy', 'Web Development', 'Content Architecture'],
    results: [
      { label: 'Keywords at #1', value: '20+' },
      { label: 'Organic Traffic Growth', value: '300%' },
      { label: 'Featured Snippets', value: 'Captured' },
    ],
    sections: [
      {
        heading: 'The Challenge',
        body: 'Pulse had zero organic visibility despite years in their market. Competitors dominated every high-intent keyword, and paid acquisition costs were unsustainable.',
      },
      {
        heading: 'Our Approach',
        body: 'We audited the competitive landscape, designed an information architecture around topic clusters, and built a Next.js site with server-side rendering, structured data, and automatic sitemap generation.',
        image: '/screenshots/exhibition-installs-shop-fitting/exhibition-stand-builders-uk/desktop-above-fold.png',
      },
      {
        heading: 'The Result',
        body: 'Within six months Pulse ranked #1 for over 20 target keywords. Organic traffic grew 300% and the site captured multiple featured snippets, drastically reducing reliance on paid channels.',
      },
    ],
    gallery: [
      {
        src: '/screenshots/exhibition-installs-shop-fitting/exhibition-stand-builders-uk/desktop-above-fold.png',
        alt: 'Pulse — homepage desktop',
      },
      {
        src: '/screenshots/exhibition-installs-shop-fitting/about-us/desktop-above-fold.png',
        alt: 'Pulse — about page',
      },
      {
        src: '/screenshots/exhibition-installs-shop-fitting/contact-us/desktop-full.png',
        alt: 'Pulse — contact page',
      },
    ],
    published: true,
  },
  {
    slug: 'drift',
    title: 'Content-Led Marketing Site',
    clientName: 'DRIFT',
    category: 'SEO & Marketing',
    tagline: 'Turning a blog into a traffic engine through strategic content design.',
    description:
      'A marketing site designed around content strategy, driving sustained organic growth.',
    heroImage: '/bento/alexandru-ant-qyAWIbWfvtA-unsplash.jpg',
    gridSpan: 'wide',
    year: '2024',
    services: ['Content Strategy', 'SEO', 'Web Development'],
    results: [
      { label: 'Monthly Readers', value: '50K+' },
      { label: 'Lead Generation', value: '+120%' },
      { label: 'Domain Authority', value: '45 → 62' },
    ],
    sections: [
      {
        heading: 'The Challenge',
        body: 'Drift had plenty of expertise but no content pipeline. Their blog was sporadic and disconnected from their sales funnel.',
      },
      {
        heading: 'Our Approach',
        body: 'We mapped the buyer journey to content themes, designed a hub-and-spoke architecture, and built a CMS-driven site with automated internal linking and schema markup.',
        image: '/screenshots/home-is-where-our-heart-is/home-is-where-our-heart-is-foraging-safety/desktop-full.png',
      },
      {
        heading: 'The Result',
        body: 'Drift now attracts 50K+ monthly readers. Inbound leads increased 120%, and domain authority climbed from 45 to 62 in under a year.',
      },
    ],
    gallery: [
      {
        src: '/screenshots/home-is-where-our-heart-is/home-is-where-our-heart-is-foraging-safety/desktop-full.png',
        alt: 'Drift — content hub desktop',
      },
      {
        src: '/screenshots/home-is-where-our-heart-is/home-is-where-our-heart-is-foraging-safety/desktop-above-fold.png',
        alt: 'Drift — hero section',
      },
    ],
    published: true,
  },
  {
    slug: 'echo',
    title: 'Full Digital Rebrand',
    clientName: 'ECHO',
    category: 'Full Rebrand',
    tagline: 'From outdated to outstanding — a brand transformation across every touchpoint.',
    description:
      'A complete rebrand spanning identity, website, and digital marketing collateral.',
    heroImage: '/bento/fachrizal-maulana-y_uVUwodD44-unsplash.jpg',
    gridSpan: 'tall',
    year: '2024',
    services: ['Branding', 'Web Design', 'Digital Marketing'],
    results: [
      { label: 'Brand Sentiment', value: '+70%' },
      { label: 'Website Sessions', value: '+200%' },
      { label: 'Social Engagement', value: '3× increase' },
    ],
    sections: [
      {
        heading: 'The Challenge',
        body: "Echo's existing brand felt dated and inconsistent across channels. Customer surveys revealed confusion about what the company actually offered.",
      },
      {
        heading: 'Our Approach',
        body: 'We started with stakeholder interviews and competitive analysis, then developed a refreshed positioning, new visual identity, and rebuilt the website with a focus on clarity and conversion.',
        image: '/screenshots/envyrion/envyrion/desktop-full.png',
      },
      {
        heading: 'The Result',
        body: 'Post-rebrand surveys showed a 70% improvement in brand sentiment. Website sessions doubled within two months, and social media engagement tripled.',
      },
    ],
    gallery: [
      {
        src: '/screenshots/envyrion/envyrion/desktop-full.png',
        alt: 'Echo — homepage desktop',
      },
      {
        src: '/screenshots/envyrion/envyrion/tablet-full.png',
        alt: 'Echo — homepage tablet',
      },
      {
        src: '/screenshots/envyrion/envyrion/tablet-above-fold.png',
        alt: 'Echo — above fold tablet',
      },
    ],
    published: true,
  },
  {
    slug: 'axis',
    title: 'Custom Web Application',
    clientName: 'AXIS',
    category: 'Web App',
    tagline: 'A bespoke tool that replaced three off-the-shelf SaaS products.',
    description:
      'A custom web application that streamlined internal workflows and replaced legacy tooling.',
    heroImage: '/bento/olegs-jonins-w13BMngq7JM-unsplash.jpg',
    gridSpan: 'normal',
    year: '2025',
    services: ['Web App Development', 'UI/UX Design', 'API Integration'],
    results: [
      { label: 'Time Saved Weekly', value: '12 hrs' },
      { label: 'SaaS Tools Replaced', value: '3' },
      { label: 'User Satisfaction', value: '96%' },
    ],
    sections: [
      {
        heading: 'The Challenge',
        body: 'Axis relied on three disconnected SaaS tools to manage client projects. Data lived in silos, and the team spent hours each week on manual sync work.',
      },
      {
        heading: 'Our Approach',
        body: 'We designed and built a unified web app with real-time dashboards, automated data pipelines, and role-based access — all wrapped in a clean, intuitive interface.',
        image: '/screenshots/floral-design-in-uttoxeter/joely-ann-davis-floristry/desktop-above-fold.png',
      },
      {
        heading: 'The Result',
        body: 'The team reclaimed 12 hours per week, eliminated three subscription costs, and reported 96% satisfaction in their first internal survey.',
      },
    ],
    gallery: [
      {
        src: '/screenshots/floral-design-in-uttoxeter/joely-ann-davis-floristry/desktop-above-fold.png',
        alt: 'Axis — dashboard desktop',
      },
      {
        src: '/screenshots/floral-design-in-uttoxeter/joely-ann-davis-floristry/tablet-above-fold.png',
        alt: 'Axis — dashboard tablet',
      },
      {
        src: '/screenshots/floral-design-in-uttoxeter/joely-ann-davis-floristry/mobile-above-fold.png',
        alt: 'Axis — dashboard mobile',
      },
    ],
    published: true,
  },
  {
    slug: 'prism',
    title: 'High-Converting Landing Page',
    clientName: 'PRISM',
    category: 'Landing Page',
    tagline: 'One page, one goal — designed to convert.',
    description:
      'A single-page experience optimised for a product launch campaign.',
    heroImage: '/bento/qihang-fan-zbHanmcQfiw-unsplash.jpg',
    gridSpan: 'wide',
    year: '2024',
    services: ['Landing Page Design', 'Conversion Optimisation', 'A/B Testing'],
    results: [
      { label: 'Conversion Rate', value: '14%' },
      { label: 'Bounce Rate Reduction', value: '-35%' },
      { label: 'Campaign ROI', value: '4.2×' },
    ],
    sections: [
      {
        heading: 'The Challenge',
        body: 'Prism was launching a new product and needed a landing page that could turn paid traffic into sign-ups at scale. Previous campaigns had a conversion rate under 3%.',
      },
      {
        heading: 'Our Approach',
        body: 'We designed a scroll-driven narrative with social proof, progressive disclosure, and a single persistent CTA. We ran A/B tests on headline copy, form placement, and visual hierarchy.',
        image: '/screenshots/graceful-spaces/exhibitions/desktop-above-fold.png',
      },
      {
        heading: 'The Result',
        body: 'The final variant achieved a 14% conversion rate — nearly 5× the previous benchmark. Bounce rate dropped 35%, and the campaign delivered a 4.2× return on ad spend.',
      },
    ],
    gallery: [
      {
        src: '/screenshots/graceful-spaces/exhibitions/desktop-above-fold.png',
        alt: 'Prism — landing page desktop',
      },
      {
        src: '/screenshots/graceful-spaces/exhibitions/mobile-above-fold.png',
        alt: 'Prism — landing page mobile',
      },
    ],
    published: true,
  },
  {
    slug: 'flux',
    title: 'Product UI/UX Overhaul',
    clientName: 'FLUX',
    category: 'UI/UX Design',
    tagline: 'Rethinking every interaction to reduce friction and delight users.',
    description:
      'A comprehensive UI/UX redesign that dramatically improved usability and retention.',
    heroImage: '/bento/hulki-okan-tabak-x3kQTL7yw30-unsplash.jpg',
    gridSpan: 'normal',
    year: '2025',
    services: ['UI/UX Design', 'User Research', 'Prototyping'],
    results: [
      { label: 'Task Completion Rate', value: '+60%' },
      { label: 'Support Tickets', value: '-45%' },
      { label: 'User Retention', value: '+30%' },
    ],
    sections: [
      {
        heading: 'The Challenge',
        body: "Flux's product had powerful features buried under a confusing interface. Users churned within the first week, and the support team was overwhelmed.",
      },
      {
        heading: 'Our Approach',
        body: 'We conducted user interviews, mapped pain points with session recordings, and redesigned the core flows from onboarding to daily use. Every screen was prototyped and validated before development.',
        image: '/screenshots/graceful-spaces/gallery/desktop-above-fold.png',
      },
      {
        heading: 'The Result',
        body: 'Task completion rates jumped 60%, support tickets dropped 45%, and 30-day retention improved by 30%. The redesign paid for itself within the first quarter.',
      },
    ],
    gallery: [
      {
        src: '/screenshots/graceful-spaces/gallery/desktop-above-fold.png',
        alt: 'Flux — redesigned interface',
      },
      {
        src: '/screenshots/graceful-spaces/gallery/tablet-full.png',
        alt: 'Flux — tablet view',
      },
    ],
    published: true,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getPublishedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.published);
}
