export const TIMELINE_CONSTANTS = {
  // Animation timings
  ANIMATION_DURATION: {
    MINIMUM: 600,
    MULTIPLIER: 3,
    FADE_TRANSITION: 0.3,
    PATH_ANIMATION: 2,
  },

  // Intersection observer settings
  INTERSECTION_OBSERVER: {
    THRESHOLD: 0.1,
    ROOT_MARGIN: '0px 0px -100px 0px',
  },

  // Bee animation settings
  BEE_ANIMATION: {
    SIZE: 30,
    Z_INDEX: 5,
    POSITION_TOLERANCE: 5,
    PROGRESS_ADJUSTMENTS: {
      START_OFFSET: 0.05,
      END_OFFSET: 0.95,
      DESKTOP_MILESTONE_2_OFFSET: -0.08,
    },
  },

  // Post-it note settings
  POST_IT: {
    WIDTHS: {
      MOBILE: 'w-full max-w-sm',
      DESKTOP: 'w-[240px] md:w-[260px]',
    },
    STAGGER_POSITIONS: [0, 120, 30, 80],
    HOVER_EFFECTS: {
      LIFT_OFFSET: 4,
      MAX_TILT: 6,
      Z_INDEX_ACTIVE: 10,
      Z_INDEX_INACTIVE: 1,
    },
  },

  // SVG viewBox settings
  SVG_VIEWBOX: {
    DESKTOP: '0 0 1200 400',
    MOBILE: '0 0 400 1200',
  },

  // SVG paths
  SVG_PATHS: {
    DESKTOP:
      'M120,20 C200,20 220,50 300,140 C380,230 420,90 600,50 C780,10 820,70 900,100 C980,130 1020,110 1080,100 C1120,90 1140,80 1180,70',
    MOBILE:
      'M200,50 C200,100 180,150 200,200 C220,250 180,300 200,350 C220,400 180,450 200,500 C220,550 180,600 200,650 C220,700 180,750 200,800 C220,850 180,900 200,950 C220,1000 200,1050 200,1100',
  },

  // Spacing and layout
  SPACING: {
    CONTAINER_MAX_WIDTH: {
      DESKTOP: 'max-w-[1200px]',
      MOBILE: 'max-w-sm',
    },
    PADDING: {
      SECTION: 'py-16 md:py-24 lg:py-32',
      CONTAINER: 'px-4 md:px-6',
      CARD: 'p-4 md:p-6',
      TOP: 'pt-8 md:pt-16',
    },
    GAPS: {
      MOBILE: 'gap-8',
      DESKTOP: 'gap-2 md:gap-4',
    },
  },

  // Typography
  TYPOGRAPHY: {
    TITLE: 'text-2xl md:text-3xl lg:text-4xl font-semibold mb-12 md:mb-16',
    CARD_TITLE: 'text-lg md:text-xl font-bold mb-2 leading-tight',
    CARD_SUBTITLE: 'text-sm font-medium mb-3',
    CARD_DESCRIPTION: 'text-sm md:text-base leading-relaxed',
    ACCESSIBILITY_NOTE: 'text-xs md:text-sm opacity-60',
  },
} as const;

export const TIMELINE_COLORS = {
  POST_IT_BACKGROUNDS: [
    'rgba(255, 242, 204, 0.95)', // Light yellow
    'rgba(217, 234, 211, 0.95)', // Light green
    'rgba(208, 224, 227, 0.95)', // Light blue
    'rgba(234, 209, 220, 0.95)', // Light pink
  ],

  BEE: {
    BODY: '#FFD700',
    STRIPE: '#000000',
    WING: 'rgba(255,255,255,0.7)',
    STROKE: '#000000',
  },

  BADGE_OPACITY: {
    DARK: 'rgba(255, 255, 255, 0.1)',
    LIGHT: 'rgba(0, 0, 0, 0.05)',
  },

  SHADOWS: {
    DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.1)',
    HOVER: '0 6px 12px rgba(0, 0, 0, 0.1)',
    ACTIVE: '0 6px 12px rgba(0, 0, 0, 0.15)',
  },
} as const;

export const JOURNEY_MILESTONES = [
  {
    id: 'university',
    year: '2015 – 2019',
    title: 'BA in Business Management & Marketing',
    subtitle: 'University of Washington',
    description:
      'Graduated with a BA in Business Management & Marketing, where I honed product sense and strategic thinking before pivoting into tech.',
  },
  {
    id: 'sales',
    year: '2019 - 2020',
    title: 'Account Executive',
    subtitle: 'ADP',
    description:
      'Gained a user-focused perspective and strong business acumen while discovering my passion for technology solutions.',
  },
  {
    id: 'bootcamp',
    year: '2020 - 2021',
    title: 'Full-Stack Engineering Fellow',
    subtitle: 'App Academy',
    description:
      'Completed a 1,000-hour intensive bootcamp, building full-stack projects with JavaScript, React, and Python.',
  },
  {
    id: 'engineer',
    year: '2021 – Present',
    title: 'Software Engineer',
    subtitle: 'DroneDeploy (Growth Team)',
    description:
      'Intern to full-time engineer on the Growth team focused on activation and expansion. In 2023, I joined the Walkthroughs team to support post-acquisition unification. Now back on Growth, I bring a product-led, user-focused approach to building scalable UI.',
  },
] as const;
