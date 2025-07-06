# Kathleen Yeh - Portfolio Website

A beautiful, modern portfolio website built with Next.js, featuring dark/light mode, stunning animations, and a responsive design.

## 🚀 Features

- **Modern Design**: Clean, professional layout with stunning visual effects
- **Dark/Light Mode**: Automatic theme detection with manual toggle
- **Animated Components**: Custom cursor effects, smooth transitions, and engaging animations
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Timeline**: Journey visualization with animated bee and post-it notes
- **Accessibility**: Respects user motion preferences and includes proper ARIA labels
- **Performance Optimized**: Built with Next.js App Router for optimal performance

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **Deployment**: Optimized for Vercel deployment

## 🎨 Design Features

### Custom Cursor Effect

- Dual-layer cursor with dot and ring
- Magnetic attraction to interactive elements
- Click ripple effects
- Smooth lerp animation

### Animated Timeline

- Interactive bee animation along SVG path
- Post-it note style milestones
- Hover effects with realistic tilt
- Accessibility-aware animations

### Technical Skills Grid

- Icon-based skill representation
- Staggered animation entrance
- Interactive hover states
- Color-coded categories

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
├── components/
│   ├── cursor/
│   │   └── CursorEffect.tsx # Custom cursor implementation
│   ├── ui/
│   │   ├── AnimatedUnderline.tsx
│   │   ├── LineDrawIcon.tsx
│   │   ├── ScrollProgressIndicator.tsx
│   │   └── SkillIcon.tsx
│   ├── Header.tsx           # Navigation header
│   ├── Hero.tsx             # Hero section with animated intro
│   ├── Timeline.tsx         # Interactive journey timeline
│   ├── Skills.tsx           # Technical skills grid
│   ├── Projects.tsx         # Project showcase
│   └── Footer.tsx           # Footer with social links
├── public/                  # Static assets
└── ...config files
```

## 🎯 Key Sections

### Hero Section

- Animated "HELLO" text with stroke-fill animation
- Interactive profile image with 3D tilt effect
- Easter egg on double-click
- Smooth entrance animations

### My Journey

- SVG-based flight path animation
- Interactive timeline milestones
- Post-it note styling with hover effects
- Bee character following the path

### Technical Skills

- Grid layout with icon representations
- Staggered entrance animations
- Color-coded skill categories
- Interactive hover states

### Projects

- Card-based layout
- Coming soon placeholders
- Technology stack indicators
- Smooth reveal animations

## 🔧 Customization

### Colors

The color scheme is defined in `tailwind.config.js`:

- **Primary**: #007AFF (Apple Blue)
- **Pastels**: Mint, Lavender, Sky, Peach, Rose
- **Dark Mode**: Automatic theme switching

### Animations

- Respects `prefers-reduced-motion` for accessibility
- Configurable timing in CSS custom properties
- Smooth transitions with easing functions

### Content

Update personal information in:

- `components/Hero.tsx` - Bio and social links
- `components/Timeline.tsx` - Journey milestones
- `components/Skills.tsx` - Technical skills
- `app/layout.tsx` - SEO metadata

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Push to GitHub repository
2. Connect to Vercel
3. Automatic deployments on push

### Environment Variables

No environment variables required for basic functionality.

## 🎨 Design System

### Typography Scale

- Heading 1: 64px/72px
- Heading 2: 36px/44px
- Body Large: 20px/28px
- Body: 16px/24px

### Spacing System

- Micro: 4px
- Small: 8px
- Base: 16px
- Medium: 24px
- Large: 48px
- XLarge: 96px

### Motion & Timing

- Fast: 200ms cubic-bezier(0.2, 0, 0.4, 1)
- Medium: 400ms cubic-bezier(0.2, 0.7, 0.4, 1)
- Slow: 800ms cubic-bezier(0.3, 0.9, 0.4, 1)

## 🌟 Performance Features

- **Next.js App Router**: Latest routing paradigm
- **Image Optimization**: Automatic WebP conversion
- **Code Splitting**: Automatic bundle optimization
- **TypeScript**: Full type safety
- **SEO Optimized**: Comprehensive meta tags

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement
- Graceful fallbacks for older browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Animation techniques from industry best practices
- Accessibility guidelines from WCAG 2.1
- TypeScript and Next.js communities

---

**Built with ❤️ by Kathleen Yeh**

For questions or collaborations, reach out via [LinkedIn](https://linkedin.com/in/katyeh) or [email](mailto:kathleenyeh1@gmail.com).
